<template>
  <div class="ink-card ink-card--dungeon">
    <div class="ink-header">
      <span class="ink-header-icon">⚔</span>
      <span class="ink-header-title">秘境副本</span>
    </div>

    <!-- 献祭赌博 -->
    <div class="ink-row">
      <div class="ink-row-name ink-text-crimson">{{ group1Name }}</div>
      <div class="ink-row-desc">
        为世人所厌恶，大于500金币，献祭8成金币给古神获取命运博弈。
        <span v-if="group1Wait > 0" class="ink-wait">{{ group1Wait }} 秒后即可献祭。</span>
      </div>
      <div class="ink-row-actions">
        <button class="ink-btn ink-btn--danger ink-btn--sm" @click="joinGroup1" :disabled="cantJoinGroup1">献祭赌博</button>
      </div>
    </div>

    <!-- 信仰贡献 -->
    <div class="ink-row">
      <div class="ink-row-name ink-text-spirit">{{ group2Name }}</div>
      <div class="ink-row-desc">
        世人所信仰的神，大于1000寿元，贡献7成寿元给予神明。
        <span v-if="group2Wait > 0" class="ink-wait">{{ group2Wait }} 秒后即可贡献。</span>
      </div>
      <div class="ink-row-actions">
        <button class="ink-btn ink-btn--spirit ink-btn--sm" @click="joinGroup2" :disabled="cantJoinGroup2">信仰贡献</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUNGEON_GHOST_MONEY, DUNGEON_GOD_LIFE } from '@/data/constants'
import { useGameState } from '@/composables/useGameState'

const { gs, display, joinGroup1, joinGroup2 } = useGameState()

const group1Name = display(() => gs.group1.name)
const group1Wait = display(() => gs.group1Wait)
const group2Name = display(() => gs.group2.name)
const group2Wait = display(() => gs.group2Wait)

const cantJoinGroup1 = display(() => gs.money.isLessThan(DUNGEON_GHOST_MONEY))
const cantJoinGroup2 = display(() => gs.group2Wait !== 0 || gs.life.isLessThan(DUNGEON_GOD_LIFE))
</script>
