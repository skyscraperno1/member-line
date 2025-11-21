<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  maxData: number;
}>();

const emit = defineEmits<{
  close: [];
  allocate: [data: { email: string; data: number }];
}>();

const currentStep = ref(1);
const email = ref('');
const allocatedData = ref(1); // 默认值改为1
const emailError = ref('');
const dataError = ref('');
const showModal = ref(true);

// 计算剩余流量（分配后还剩多少）
const remainingData = computed(() => {
  return props.maxData - allocatedData.value;
});

// 检查数据输入是否有效
const isDataValid = computed(() => {
  return allocatedData.value >= 1 && 
         allocatedData.value <= props.maxData && 
         Number.isInteger(allocatedData.value);
});

// 监听分配数据变化，实时校验
watch(allocatedData, (newValue) => {
  dataError.value = '';
  
  if (!newValue || newValue <= 0) {
    dataError.value = t('allocateModal.step1.errors.dataRequired');
    return;
  }
  
  if (!Number.isInteger(newValue)) {
    dataError.value = t('allocateModal.step1.errors.dataInvalid');
    return;
  }
  
  if (newValue > props.maxData) {
    dataError.value = t('allocateModal.step1.errors.dataExceeded', { max: props.maxData });
    return;
  }
}, { immediate: true });

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function handleStep1Next() {
  // 由于有实时校验，这里只需要检查是否有效
  if (!isDataValid.value) {
    return;
  }

  currentStep.value = 2;
}

function handleStep2Back() {
  currentStep.value = 1;
  emailError.value = '';
}

function handleStep2Confirm() {
  emailError.value = '';

  if (!email.value) {
    emailError.value = t('allocateModal.step2.errors.emailRequired');
    return;
  }

  if (!validateEmail(email.value)) {
    emailError.value = t('allocateModal.step2.errors.emailInvalid');
    return;
  }

  emit('allocate', {
    email: email.value,
    data: allocatedData.value
  });
}

function handleClose() {
  showModal.value = false;
  emit('close');
}
</script>

<template>
  <van-popup 
    v-model:show="showModal" 
    position="center" 
    :style="{ width: '90%', maxWidth: '400px' }"
    round
    @close="handleClose"
  >
    <!-- Step 1: 分配流量 -->
    <div v-if="currentStep === 1" class="modal-step">
      <van-nav-bar 
        :title="t('allocateModal.step1.title')" 
        right-text="×"
        @click-right="handleClose"
      />
      
      <div class="modal-body">
        <div class="stepper-section">
          <div class="stepper-label">{{ t('allocateModal.step1.dataLabel') }}</div>
          <van-stepper 
            v-model="allocatedData" 
            :min="1" 
            :max="maxData"
            :step="1"
            button-size="32px"
            input-width="60px"
          />
          <div class="stepper-unit">GB</div>
        </div>
        
        <div v-if="dataError" class="error-message">{{ dataError }}</div>
        
        <div class="data-info">
          <div class="info-item">
            <span class="info-label">{{ t('allocateModal.step1.availableHint', { amount: maxData }) }}</span>
          </div>
          <div class="info-item remaining">
            <span class="info-label">{{ t('allocateModal.step1.remainingHint', { amount: remainingData }) }}</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <van-button 
          block 
          plain 
          @click="handleClose"
        >
          {{ t('allocateModal.step1.cancelButton') }}
        </van-button>
        <van-button 
          block 
          type="primary" 
          :disabled="!isDataValid"
          @click="handleStep1Next"
        >
          {{ t('allocateModal.step1.nextButton') }}
        </van-button>
      </div>
    </div>

    <!-- Step 2: 输入邮箱 -->
    <div v-if="currentStep === 2" class="modal-step">
      <van-nav-bar 
        :title="t('allocateModal.step2.title')" 
        left-text="←"
        right-text="×"
        @click-left="handleStep2Back"
        @click-right="handleClose"
      />
      
      <div class="modal-body">
        <van-field
          v-model="email"
          :label="t('allocateModal.step2.emailLabel')"
          :placeholder="t('allocateModal.step2.emailPlaceholder')"
          type="email"
          :error-message="emailError"
        />
        
        <div class="allocation-summary">
          <van-cell 
            :title="t('allocateModal.step1.dataLabel')" 
            :value="`${allocatedData}GB`" 
          />
        </div>
      </div>

      <div class="modal-footer">
        <van-button 
          block 
          plain 
          @click="handleStep2Back"
        >
          {{ t('allocateModal.step2.backButton') }}
        </van-button>
        <van-button 
          block 
          type="primary" 
          @click="handleStep2Confirm"
        >
          {{ t('allocateModal.step2.confirmButton') }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.modal-step {
  background: white;
}

.modal-body {
  padding: 16px;
}

.stepper-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  .stepper-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    min-width: 100px;
  }
  
  .stepper-unit {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
}

.error-message {
  margin-bottom: 16px;
  font-size: 13px;
  color: #ff4444;
  padding: 8px 12px;
  background: #fff5f5;
  border-radius: 6px;
  border-left: 3px solid #ff4444;
}

.data-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.remaining {
      font-weight: 600;
      color: #06c755;
    }
    
    .info-label {
      font-size: 13px;
    }
  }
}

.allocation-summary {
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 16px;
  
  :deep(.van-button) {
    flex: 1;
  }
}

// 自定义 Vant 组件样式
:deep(.van-nav-bar) {
  background: #f8f8f8;
  
  .van-nav-bar__title {
    font-weight: 600;
  }
  
  .van-nav-bar__right {
    font-size: 20px;
    font-weight: bold;
  }
  
  .van-nav-bar__left {
    font-size: 18px;
  }
}

:deep(.van-field) {
  .van-field__label {
    font-weight: 600;
    color: #333;
  }
}

:deep(.van-cell) {
  .van-cell__title {
    font-weight: 600;
    color: #333;
  }
  
  .van-cell__value {
    color: #06c755;
    font-weight: 600;
  }
}

:deep(.van-stepper) {
  .van-stepper__minus,
  .van-stepper__plus {
    background: #f7f8fa;
    border-color: #ebedf0;
    color: #323233;
    
    &:hover {
      background: #e8e9eb;
    }
    
    &:active {
      background: #d2d3d6;
    }
  }
  
  .van-stepper__input {
    background: white;
    border-color: #ebedf0;
    color: #323233;
    font-weight: 600;
    text-align: center;
  }
}
</style>
