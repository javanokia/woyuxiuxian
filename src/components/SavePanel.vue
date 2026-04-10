<template>
  <div>
    <div class="log-area text-left">
      <p v-for="(t, idx) in gs.logTxt" :key="idx">{{ t }}</p>
    </div>
    <div>
      <input class="save-input" type="text" :value="gs.record" @input="onRecordInput">
      <button class="btn btn-default" @click="showData">记录传承</button>
      <button class="btn btn-default" @click="loadData">接受传承</button>
      <button class="btn btn-default" @click="clearData">重新做人</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameState } from '@/data/types'

const props = defineProps<{
  gs: GameState
  showData: () => void
  loadData: () => void
  clearData: () => void
}>()

function onRecordInput(e: Event) {
  props.gs.record = (e.target as HTMLInputElement).value
}
</script>
