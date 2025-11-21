<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Member, ESIMCard } from '../types/member';
import ESIMCardItem from './ESIMCardItem.vue';
import AllocateModal from './AllocateModal.vue';

const { t } = useI18n();

const props = defineProps<{
  member: Member;
}>();

const showAllocateModal = ref(false);
const selectedCard = ref<ESIMCard | null>(null);

const remainingData = computed(() => {
  const allocated = props.member.esimCards?.reduce((sum, card) => sum + card.allocatedData, 0) || 0;
  return props.member.totalData! - allocated;
});

const allocatedCards = computed(() =>
  props.member.esimCards?.filter(card => card.isAllocated) || []
);

const availableCards = computed(() =>
  props.member.esimCards?.filter(card => !card.isAllocated) || []
);

function openAllocateModal(card: ESIMCard) {
  selectedCard.value = card;
  showAllocateModal.value = true;
}

function closeAllocateModal() {
  showAllocateModal.value = false;
  selectedCard.value = null;
}

function handleAllocate(data: { email: string; data: number }) {
  if (selectedCard.value) {
    selectedCard.value.email = data.email;
    selectedCard.value.allocatedData = data.data;
    selectedCard.value.isAllocated = true;
    selectedCard.value.allocatedDate = new Date().toISOString().split('T')[0];
    closeAllocateModal();
  }
}
</script>

<template>
  <div class="member-view">
    <div class="header">
      <h1>{{ t('memberView.title') }}</h1>
      <div class="status-badge">{{ t('memberView.vipBadge') }}</div>
    </div>

    <div class="stats-card">
      <div class="stat-item">
        <div class="stat-label">{{ t('memberView.stats.remainingDays') }}</div>
        <div class="stat-value">{{ member.remainingDays }}{{ t('memberView.stats.daysUnit') }}</div>
      </div>
      <div class="stat-divider"></div>
      <!-- <div class="stat-item">
        <div class="stat-label">{{ t('memberView.stats.totalData') }}</div>
        <div class="stat-value">{{ member.totalData }}GB</div>
      </div>
      <div class="stat-divider"></div> -->
      <div class="stat-item">
        <div class="stat-label">{{ t('memberView.stats.availableData') }}</div>
        <div class="stat-value">{{ remainingData }}GB</div>
      </div>
    </div>

    <div class="section">
      <h2>{{ t('memberView.sections.allocatedCards') }}</h2>
      <div v-if="allocatedCards.length === 0" class="empty-state">
        {{ t('memberView.emptyStates.noAllocatedCards') }}
      </div>
      <div v-else class="cards-list">
        <ESIMCardItem
          v-for="card in allocatedCards"
          :key="card.id"
          :card="card"
          :is-allocated="true"
        />
      </div>
    </div>

    <div class="section">
      <h2>{{ t('memberView.sections.availableCards') }}</h2>
      <div v-if="availableCards.length === 0" class="empty-state">
        {{ t('memberView.emptyStates.noAvailableCards') }}
      </div>
      <div v-else class="cards-list">
        <ESIMCardItem
          v-for="card in availableCards"
          :key="card.id"
          :card="card"
          :is-allocated="false"
          :remaining-data="remainingData"
          @allocate="openAllocateModal(card)"
        />
      </div>
    </div>

    <AllocateModal
      v-if="showAllocateModal && selectedCard"
      :max-data="remainingData"
      @close="closeAllocateModal"
      @allocate="handleAllocate"
    />
  </div>
</template>

<style scoped lang="scss">
.member-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    color: #333;
  }

  .status-badge {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #333;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }
}

.stats-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
}

.stat-item {
  text-align: center;

  .stat-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #06c755;
  }
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #e0e0e0;
}

.section {
  margin-bottom: 32px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
  }
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
