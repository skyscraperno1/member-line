<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const languageOptions = [
  { text: '中文', value: 'zh' },
  { text: 'English', value: 'en' },
  { text: '日本語', value: 'ja' }
]

const currentLanguage = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
  }
})
</script>

<template>
  <div class="language-switcher">
    <van-dropdown-menu>
      <van-dropdown-item 
        v-model="currentLanguage" 
        :options="languageOptions"
        title="语言 / Language"
      />
    </van-dropdown-menu>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  display: flex;
  justify-content: flex-end;
  
  :deep(.van-dropdown-menu) {
    width: 200px;
  }
  
  :deep(.van-dropdown-menu__title) {
    font-size: 14px;
    color: #333;
  }
  
  :deep(.van-dropdown-menu__bar) {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}
</style>
