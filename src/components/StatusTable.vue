<template>
  <div class="ink-card">
    <div class="ink-header">
      <span class="ink-header-icon">☰</span>
      <span class="ink-header-title">道途境况</span>
    </div>

    <!-- 核心属性 -->
    <div class="ink-grid ink-grid-4">
      <div class="ink-cell">
        <div class="ink-cell-label">寿 命</div>
        <div class="ink-cell-value jade">{{ lifeText }}</div>
        <div class="ink-cell-sub">/ {{ pastLifeText }} 秒</div>
      </div>
      <div class="ink-cell">
        <div class="ink-cell-label">阵 营</div>
        <div class="ink-cell-value" :class="standClass">{{ standName }}</div>
        <div class="ink-cell-sub">{{ standPointText }}</div>
      </div>
      <div class="ink-cell">
        <div class="ink-cell-label">名 望</div>
        <div class="ink-cell-value gold">{{ renownText }}</div>
      </div>
      <div class="ink-cell">
        <div class="ink-cell-label">财 富</div>
        <div class="ink-cell-value gold">{{ moneyText }}<small class="ink-unit">金</small></div>
      </div>
    </div>

    <!-- 门派归属 -->
    <div class="ink-section-gap">
      <div class="ink-row">
        <div class="ink-row-name">{{ groupName }}</div>
        <div class="ink-row-desc">
          <template v-if="groupExist">{{ groupInfo }}</template>
          <template v-else>
            <span v-if="groupWait > 0" class="ink-wait">耗费 {{ groupWait }} 秒游历天下，</span>
            花费 100 名望探访名师
          </template>
        </div>
        <div class="ink-row-actions">
          <template v-if="groupExist">
            <button class="ink-btn ink-btn--danger ink-btn--sm" @click="exitGroup">金盆洗手</button>
          </template>
          <template v-else>
            <button class="ink-btn ink-btn--jade ink-btn--sm" @click="joinGroup" :disabled="cantJoinGroup">拜师学艺</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { numFilterTxt } from '@/utils/numFilter'
import { GROUP_RENOWN_COST } from '@/data/constants'
import { useGameState } from '@/composables/useGameState'

const { gs, display, joinGroup, exitGroup } = useGameState()

const lifeText = display(() => gs.life.toString())
const pastLifeText = display(() => gs.pastLife.toString())
const standName = display(() => gs.stand.name)
const standPointText = display(() => gs.standPoint.div(100).dp(0).toString() + '%')
const renownText = display(() => numFilterTxt(gs.renown.toString()))
const moneyText = display(() => numFilterTxt(gs.money.toString()))
const groupName = display(() => gs.group.name)
const groupExist = display(() => gs.group.exist)
const groupInfo = display(() => gs.group.object?.info ?? '')
const groupWait = display(() => gs.groupWait)

const cantJoinGroup = display(() => gs.groupWait !== 0 || gs.renown.isLessThan(GROUP_RENOWN_COST))

const standClass = display(() => {
  const sp = gs.standPoint.toNumber()
  if (sp > 2000) return 'jade'
  if (sp < -2000) return 'crimson'
  return ''
})
</script>
