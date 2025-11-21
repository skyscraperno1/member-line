<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NonMemberView from './components/NonMemberView.vue';
import MemberView from './components/MemberView.vue';
import { getLineIdFromLiff, getMemberByLineId } from './services/mockData';
import type { Member } from './types/member';

const loading = ref(true);
const member = ref<Member | null>(null);

onMounted(() => {
  setTimeout(() => {
    const lineId = getLineIdFromLiff();
    member.value = getMemberByLineId(lineId);
    loading.value = false;
  }, 500);
});
</script>

<template>
  <div class="app">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <NonMemberView v-else-if="!member?.isMember" />
    <MemberView v-else :member="member" />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f0f0f0;
    border-top-color: #06c755;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  p {
    color: #666;
    font-size: 15px;
    margin: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
