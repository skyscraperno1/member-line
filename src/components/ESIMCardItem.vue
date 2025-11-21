<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ESIMCard } from '../types/member';

const { t } = useI18n();

const props = defineProps<{
  card: ESIMCard;
  isAllocated: boolean;
  remainingData?: number;
}>();

const emit = defineEmits<{
  allocate: [];
}>();

const usagePercentage = computed(() => {
  if (!props.card.allocatedData) return 0;
  return Math.round((props.card.usedData / props.card.allocatedData) * 100);
});
</script>

<template>
  <div class="esim-card" :class="{ allocated: isAllocated }">
    <div v-if="!isAllocated" class="available-card">
      <div class="card-icon">📧</div>
      <div class="card-info">
        <h3>{{ t('esimCard.blankTitle') }}</h3>
        <p>{{ t('esimCard.blankDescription') }}</p>
      </div>
      <button
        class="allocate-btn"
        @click="emit('allocate')"
        :disabled="remainingData === 0"
      >
        {{ remainingData === 0 ? t('esimCard.noDataAvailable') : t('esimCard.allocateButton') }}
      </button>
    </div>

    <div v-else class="allocated-card">
      <div class="card-header">
        <div class="email-info">
          <div class="email-icon">✉️</div>
          <div>
            <div class="email">{{ card.email }}</div>
            <div class="date">{{ t('esimCard.allocatedTime') }} {{ card.allocatedDate }}</div>
          </div>
        </div>
      </div>

      <div class="usage-info">
        <div class="usage-text">
          <span class="usage-label">{{ t('esimCard.dataUsage') }}</span>
          <span class="usage-value">{{ card.usedData }}GB / {{ card.allocatedData }}GB</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: usagePercentage + '%' }"></div>
        </div>
        <div class="usage-percentage">{{ usagePercentage }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.esim-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

.available-card {
  display: flex;
  align-items: center;
  gap: 16px;

  .card-icon {
    font-size: 36px;
  }

  .card-info {
    flex: 1;

    h3 {
      font-size: 16px;
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

  .allocate-btn {
    padding: 10px 24px;
    background: #06c755;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover:not(:disabled) {
      background: #05b34c;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}

.allocated-card {
  .card-header {
    margin-bottom: 16px;
  }

  .email-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .email-icon {
      font-size: 28px;
    }

    .email {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .date {
      font-size: 13px;
      color: #666;
    }
  }

  .usage-info {
    .usage-text {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      .usage-label {
        font-size: 14px;
        color: #666;
      }

      .usage-value {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
    }

    .progress-bar {
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 4px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #06c755, #04a646);
        transition: width 0.3s;
      }
    }

    .usage-percentage {
      text-align: right;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
