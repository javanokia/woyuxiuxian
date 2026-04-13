<template>
  <div class="game-bg">
    <div class="game-container">
      <!-- 修炼面板 -->
      <CultivationPanel />

      <hr class="ink-divider" />

      <!-- 状态表 -->
      <StatusTable />

      <!-- 功法 -->
      <SkillTable />

      <!-- 副本 -->
      <DungeonPanel />

      <!-- 法宝 -->
      <ItemTable />

      <hr class="ink-divider" />

      <!-- 存档面板 -->
      <SavePanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameState } from '@/composables/useGameState'
import CultivationPanel from '@/components/CultivationPanel.vue'
import StatusTable from '@/components/StatusTable.vue'
import SkillTable from '@/components/SkillTable.vue'
import DungeonPanel from '@/components/DungeonPanel.vue'
import ItemTable from '@/components/ItemTable.vue'
import SavePanel from '@/components/SavePanel.vue'

const { startTimer, stopTimer, tryAutoLoad } = useGameState()

onMounted(() => {
  tryAutoLoad()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
