#!/usr/bin/env python3
"""为周刊生成配图（商汤日日新 U1.5 Lite，OpenAI 兼容 /images/generations）。

  python3 scripts/make_covers.py --issue 20261030-20261105

读 briefs/week/<期号>/image-prompts.json：
  {"style": "...", "items": [{"name":"hero","size":"1536x1024","prompt":"..."}, ...]}
输出到 briefs/week/<期号>/assets/img/<期号>/<name>.jpg，并打印结果。
"""
import argparse
import base64
import json
import os
import pathlib
import subprocess
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent


def load_env():
    p = ROOT / ".env"
    if p.exists():
        for line in p.read_text().splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())


def post(url, payload, key, timeout=300, attempts=4):
    last = None
    for i in range(attempts):
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode(),
                headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")[:200]
            if e.code in (429, 500, 502, 503, 504):
                last = f"HTTP {e.code} {body}"
                time.sleep(8 * (i + 1))
                continue
            raise
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            last = f"网络断开：{e}"
            time.sleep(8 * (i + 1))
    raise RuntimeError(f"重试 {attempts} 次仍失败：{last}")


def to_jpg(png_path, jpg_path, quality=82):
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(quality), str(png_path), "--out", str(jpg_path)],
        check=True, capture_output=True,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--issue", required=True, help="期号，如 20261030-20261105")
    ap.add_argument("--only", default="", help="只生成指定项，逗号分隔")
    ap.add_argument("--force", action="store_true", help="覆盖已存在的文件")
    a = ap.parse_args()

    load_env()
    base = os.environ.get("SENSENOVA_BASE", "https://token.sensenova.cn/v1").rstrip("/")
    key = os.environ.get("SENSENOVA_API_KEY", "")
    model = os.environ.get("SENSENOVA_IMAGE_MODEL", "sensenova-u1.5-lite")
    if not key:
        sys.exit("缺少 SENSENOVA_API_KEY（.env）")

    issue_dir = pathlib.Path("/Users/ssh/briefs/week") / a.issue
    spec = json.loads((issue_dir / "image-prompts.json").read_text())
    out_dir = issue_dir / "assets" / "img" / a.issue
    out_dir.mkdir(parents=True, exist_ok=True)
    style = spec.get("style", "")
    only = {s.strip() for s in a.only.split(",") if s.strip()}

    failed = []
    for item in spec["items"]:
        name = item["name"]
        if only and name not in only:
            continue
        jpg = out_dir / f"{name}.jpg"
        if jpg.exists() and not a.force:
            print(f"skip {name}（已存在）")
            continue
        prompt = f"{item['prompt']}. {style}".strip()
        payload = {
            "model": model,
            "prompt": prompt,
            "n": 1,
            "size": item.get("size", "1024x1024"),
            "watermark": False,
        }
        t0 = time.time()
        try:
            data = post(f"{base}/images/generations", payload, key)
        except Exception as e:  # noqa: BLE001
            print(f"FAIL {name}: {e}")
            failed.append(name)
            continue
        b64 = data["data"][0].get("b64_json")
        if not b64:
            sys.exit(f"{name}: 返回无 b64_json {str(data)[:200]}")
        tmp = out_dir / f".{name}.png"
        tmp.write_bytes(base64.b64decode(b64))
        to_jpg(tmp, jpg)
        tmp.unlink()
        w, h = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(jpg)],
                              capture_output=True, text=True).stdout.split("\n")[1:3]
        print(f"{name}\t{jpg.name}\t{jpg.stat().st_size//1024} KB\t{w.split(':')[1].strip()}x{h.split(':')[1].strip()}\t{time.time()-t0:.0f}s")

    if failed:
        sys.exit(f"未完成：{', '.join(failed)}")


if __name__ == "__main__":
    main()
