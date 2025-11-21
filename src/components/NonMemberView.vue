<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const shopifyUrl = 'https://jpesim.desim.tech/products/japan-esim-365-days?_pos=1&_fid=e6489169e&_ss=c&variant=47956329791730'
</script>

<template>
  <div class="non-member">
    <!-- <LanguageSwitcher /> -->

    <div class="header">
      <h1>{{ t('nonMember.title') }}</h1>
      <p class="subtitle">{{ t('nonMember.subtitle') }}</p>
    </div>

    <div class="benefits">
      <div class="benefit-card">
        <div class="icon">📱</div>
        <h3>{{ t('nonMember.benefits.data.title') }}</h3>
        <p>{{ t('nonMember.benefits.data.description') }}</p>
      </div>

      <div class="benefit-card">
        <div class="icon">🎁</div>
        <h3>{{ t('nonMember.benefits.esim.title') }}</h3>
        <p>{{ t('nonMember.benefits.esim.description') }}</p>
      </div>

      <div class="benefit-card">
        <div class="icon">✨</div>
        <h3>{{ t('nonMember.benefits.flexible.title') }}</h3>
        <p>{{ t('nonMember.benefits.flexible.description') }}</p>
      </div>
    </div>

    <div class="description">
      <h2>{{ t('nonMember.details.title') }}</h2>
      <ul>
        <li>{{ t('nonMember.details.item1') }}</li>
        <li>{{ t('nonMember.details.item2') }}</li>
        <li>{{ t('nonMember.details.item3') }}</li>
        <li>{{ t('nonMember.details.item4') }}</li>
      </ul>
    </div>

    <a :href="shopifyUrl" class="purchase-btn" target="_blank">
      {{ t('nonMember.purchaseButton') }}
    </a>
  </div>
</template>

<style scoped lang="scss">
.non-member {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
}

.language-switcher {
  margin-bottom: 24px;
}

.header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #06c755;
  }

  .subtitle {
    font-size: 16px;
    color: #666;
    margin: 0;
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}

.description {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      font-size: 15px;
      line-height: 1.8;
      color: #555;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.purchase-btn {
  display: block;
  width: 100%;
  background: #06c755;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #05b34c;
  }
}
</style>
