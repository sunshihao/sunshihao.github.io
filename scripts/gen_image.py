#!/usr/bin/env python3
"""AI 生图：任何 OpenAI 兼容 /images/generations 的服务都能用。

凭据走环境变量，不写在命令行里：
  IMAGE_BASE_URL   例 https://ark.cn-beijing.volces.com/api/v3
  IMAGE_API_KEY
  IMAGE_MODEL      例 doubao-seedream-4-0-250828 / gpt-image-1 / wanx2.1-t2i-turbo

用法：
  python3 scripts/gen_image.py --prompt "abstract ink wash, deep green on cream" \
      --out assets/img/covers/x.jpg --size 1536x1024
"""
import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request

BASE = os.environ.get("IMAGE_BASE_URL", "").rstrip("/")
KEY = os.environ.get("IMAGE_API_KEY", "")
MODEL = os.environ.get("IMAGE_MODEL", "")


def post(url, payload, key, timeout=180):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--size", default="1024x1024")
    ap.add_argument("--n", type=int, default=1)
    ap.add_argument("--model", default=MODEL)
    ap.add_argument("--base", default=BASE)
    ap.add_argument("--key", default=KEY)
    ap.add_argument("--timeout", type=int, default=180)
    a = ap.parse_args()

    missing = [k for k, v in {"--base/IMAGE_BASE_URL": a.base, "--key/IMAGE_API_KEY": a.key,
                              "--model/IMAGE_MODEL": a.model}.items() if not v]
    if missing:
        sys.exit("缺少参数：" + "、".join(missing))

    url = f"{a.base.rstrip('/')}/images/generations"
    payload = {"model": a.model, "prompt": a.prompt, "n": a.n, "size": a.size}

    try:
        data = post(url, payload, a.key, a.timeout)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:600]
        sys.exit(f"HTTP {e.code} {body}")
    except urllib.error.URLError as e:
        sys.exit(f"网络错误：{e.reason}")

    items = data.get("data") or []
    if not items:
        sys.exit(f"返回里没有图片：{json.dumps(data, ensure_ascii=False)[:400]}")

    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    saved = []
    for i, it in enumerate(items):
        out = a.out if len(items) == 1 else a.out.replace(".", f"-{i+1}.", 1)
        if it.get("b64_json"):
            open(out, "wb").write(base64.b64decode(it["b64_json"]))
        elif it.get("url"):
            with urllib.request.urlopen(it["url"], timeout=a.timeout) as r:
                open(out, "wb").write(r.read())
        else:
            sys.exit(f"未知返回格式：{json.dumps(it)[:200]}")
        saved.append((out, os.path.getsize(out)))

    for out, size in saved:
        print(f"{out}\t{size} bytes")


if __name__ == "__main__":
    main()
