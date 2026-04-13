<template>
  <div class="ink-card ink-card--item">
    <div class="ink-header">
      <span class="ink-header-icon">✦</span>
      <span class="ink-header-title">法宝器物</span>
    </div>

    <!-- 法宝操作 -->
    <div class="ink-row">
      <div class="ink-row-name">法宝 <small>{{ itemCount }}个</small></div>
      <div class="ink-row-desc">
        <template v-if="itemWait !== 0">
          <span class="ink-wait">下次秘境开启 {{ itemWait }} 秒，</span>
        </template>
        门槛需达 <span class="highlight">{{ itemThresholdText }}</span> 修为，消耗九成修为<br/>
        拥有法宝越多、阁下的孽缘越多，可能会消耗寿命
      </div>
      <div class="ink-row-actions">
        <button class="ink-btn ink-btn--jade ink-btn--sm" @click="getNewItem" :disabled="cantGetNewItem">寻找机缘</button>
        <template v-if="itemCount !== 0">
          <button class="ink-btn ink-btn--danger ink-btn--sm" @click="removeItems">舍弃法宝</button>
        </template>
      </div>
    </div>

    <!-- 法宝列表 -->
    <div v-for="(item, id) in gs.items" :key="id" class="ink-row">
      <div class="ink-row-name">{{ item.name }}</div>
      <div class="ink-row-desc">{{ item.object.info }}</div>
      <div class="ink-row-actions">
        <div v-if="item.object.useAble">
          <button class="ink-btn ink-btn--sm" @click="useItem(id)">使用</button>
        </div>
        <div v-else>
          <span class="ink-badge ink-badge--passive">被动</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { numFilterTxt } from '@/utils/numFilter'
import { useGameState } from '@/composables/useGameState'

const { gs, display, getNewItem, useItem, removeItems } = useGameState()

const itemCount = display(() => gs.items.length)
const itemWait = display(() => gs.itemWait)

const itemThresholdText = display(() => {
  const half = gs.level.max.div(2)
  return numFilterTxt(half.isGreaterThan(gs.itemCost) ? half.toString() : gs.itemCost.toString())
})

const cantGetNewItem = display(() => {
  return gs.point.isLessThan(gs.level.max.div(2)) || gs.point.isLessThan(gs.itemCost) || gs.itemWait !== 0
})
</script>
