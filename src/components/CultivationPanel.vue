<template>
  <div class="ink-card">
    <!-- 公告（自动消失） -->
    <div class="ink-scroll" :class="{ hidden: announcementHidden }">
      <div class="ink-scroll-inner">
        <span class="ink-scroll-text">公告：Vue 3 版本重制完成！</span>
      </div>
    </div>

    <!-- 修为核心 -->
    <div class="cultivation-hero">
      <div class="cultivation-label">修 为</div>
      <div class="cultivation-point">{{ pointText }}</div>
    </div>

    <!-- 修炼按钮 -->
    <div class="cultivation-btn-wrap">
      <button class="ink-btn ink-btn--primary" @click="addByBody">修 炼</button>
    </div>

    <!-- 信息栏 -->
    <div class="cultivation-info">
      <div class="cultivation-world">
        <div class="cultivation-world-level">第{{ worldTimes }}重天</div>
        <div class="cultivation-world-name">{{ worldName }}界</div>
      </div>
      <div class="cultivation-realm">
        <div class="cultivation-realm-name">{{ levelName }} 境界</div>
        <div class="cultivation-realm-progress">
          <div class="ink-progress ink-progress--realm">
            <div class="ink-progress-fill" :style="{ width: progressValue + '%' }"></div>
          </div>
          <span class="cultivation-progress-label">{{ progressLabel }}</span>
        </div>
        <div class="cultivation-persec">
          每秒
          <template v-if="!isPointPerSecNegative"><span class="positive">增加</span></template>
          <template v-else><span class="negative">减少</span></template>
          {{ pointPerSecText }} 修为
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { numFilterTxt } from '@/utils/numFilter'
import { useGameState } from '@/composables/useGameState'

const { gs, display, addByBody } = useGameState()

const pointText = display(() => numFilterTxt(gs.point.dp(0).toString()))
const worldTimes = display(() => gs.worldTimes)
const worldName = display(() => gs.world[0])
const levelName = display(() => gs.level.name)
const pointPerSecText = display(() => numFilterTxt(gs.pointPerSec.abs().times(10).dp(0).toString()))
const isPointPerSecNegative = display(() => gs.pointPerSec.isLessThan(0))

const progressValue = display(() => {
  if (gs.level.max.isZero()) return 0
  const ratio = gs.point.div(gs.level.max).times(100).toNumber()
  return Math.min(Math.max(ratio, 0), 100)
})

const progressLabel = display(() => progressValue.value.toFixed(1) + '%')

// 公告自动消失
const announcementHidden = ref(false)
onMounted(() => {
  setTimeout(() => {
    announcementHidden.value = true
  }, 8000)
})
</script>
