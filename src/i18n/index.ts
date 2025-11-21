import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

const messages = {
  zh,
  en,
  ja
}

const i18n = createI18n({
  legacy: false,
  locale: 'ja', // 默认语言：日语
  fallbackLocale: 'en',
  messages
})

export default i18n
