<template>
  <div class="ink-card">
    <div class="ink-header">
      <span class="ink-header-icon">☁</span>
      <span class="ink-header-title">传承录</span>
    </div>

    <!-- 日志区 -->
    <div class="ink-log">
      <p v-for="(t, idx) in logTxt" :key="idx">{{ t }}</p>
    </div>

    <!-- 存档操作栏 -->
    <div class="ink-save-bar">
      <input class="ink-input" type="text" v-model="recordText" placeholder="传承密钥…">
      <button class="ink-btn ink-btn--sm" @click="showData">记录传承</button>
      <button class="ink-btn ink-btn--jade ink-btn--sm" @click="loadData">接受传承</button>
      <button class="ink-btn ink-btn--danger ink-btn--sm" @click="clearData">重新做人</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameState } from '@/composables/useGameState'

const { gs, display, showData, loadData, clearData } = useGameState()

const logTxt = display(() => gs.logTxt)

// v-model 双向绑定：读取用 display()，写入直接赋值 gs.record
const recordText = computed({
  get: () => gs.record,
  set: (val: string) => { gs.record = val },
})
</script>
