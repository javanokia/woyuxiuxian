<template>
  <div class="row">
    <div class="announcement">
      <marquee direction="up" height="40" scrollamount="1" scrolldelay="1">
        <p class="text-center"><span class="announce-label">公告：</span>Vue 3 版本重制完成！</p>
      </marquee>
    </div>

    <h1>修为: {{ pointText }}</h1>
    <div class="col-md-4 text-left">
      第{{ gs.worldTimes }}重天 <h2>{{ gs.world[0] }}界</h2>
    </div>
    <div class="col-md-4 text-center">
      <button class="btn btn-lg btn-default btn-cultivate" @click="addByBody">修炼</button>
    </div>
    <div class="col-md-4 text-right">
      <h3>{{ gs.level.name }} 境界</h3>
      <p>
        <progress :value="progressValue" max="100"></progress>
        {{ levelMaxText }}
      </p>
      <p>每秒
        <template v-if="!isPointPerSecNegative">增加</template>
        <template v-else>减少</template>
        {{ pointPerSecText }} 修为
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { numFilterTxt } from '@/utils/numFilter'
import type { GameState } from '@/data/types'

const props = defineProps<{
  gs: GameState
  updateTick: number
  addByBody: () => void
}>()

const pointText = computed(() => { props.updateTick; return numFilterTxt(props.gs.point.dp(0).toString()) })
const levelMaxText = computed(() => { props.updateTick; return numFilterTxt(props.gs.level.max.toString()) })
const pointPerSecText = computed(() => { props.updateTick; return numFilterTxt(props.gs.pointPerSec.abs().times(10).dp(0).toString()) })
const isPointPerSecNegative = computed(() => { props.updateTick; return props.gs.pointPerSec.isLessThan(0) })

const progressValue = computed(() => {
  props.updateTick
  if (props.gs.level.max.isZero()) return 0
  const ratio = props.gs.point.div(props.gs.level.max).times(100).toNumber()
  return Math.min(Math.max(ratio, 0), 100)
})
</script>
