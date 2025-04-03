'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // 确保组件在客户端挂载后再执行相关操作
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    if (!mounted) return;
    
    try {
      const nextLang = i18n.language === 'zh' ? 'en' : 'zh';
      
      // 检查 changeLanguage 方法是否存在
      if (typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(nextLang);
      } else {
        console.warn('i18n.changeLanguage 不是一个函数，尝试使用替代方法');
        // 尝试使用替代方法
        if (i18n.options) {
          i18n.options.lng = nextLang;
        }
      }
      
      // 保存语言选择到本地存储
      if (typeof window !== 'undefined') {
        localStorage.setItem('i18nextLng', nextLang);
        // 强制刷新页面以应用新语言
        window.location.reload();
      }
    } catch (error) {
      console.error('切换语言时出错:', error);
    }
  };

  // 在客户端挂载前不渲染任何内容，避免水合错误
  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-600 transition-colors"
    >
      {i18n.language === 'zh' ? 'English' : '中文'}
    </motion.button>
  );
}