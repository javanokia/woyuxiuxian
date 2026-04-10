<template>
  <table class="table table-bordered table-condensed game-table">
    <tbody>
      <tr class="tr-group"><td colspan="4" class="text-left">副本</td></tr>
      <tr>
        <td><h4>{{ gs.group1.name }}</h4></td>
        <td colspan="2">
          为世人所厌恶，大于500金币，献祭8成金币给古神获取命运博弈。
          <span v-if="gs.group1Wait > 0"> {{ gs.group1Wait }} 秒后即可献祭。</span>
        </td>
        <td><button class="btn btn-default" @click="joinGroup1" :disabled="cantJoinGroup1">献祭赌博</button></td>
      </tr>
      <tr>
        <td><h4>{{ gs.group2.name }}</h4></td>
        <td colspan="2">
          世人所信仰的神，大于1000寿元，贡献7成寿元给予神明。
          <span v-if="gs.group2Wait > 0"> {{ gs.group2Wait }} 秒后即可贡献。</span>
        </td>
        <td><button class="btn btn-default" @click="joinGroup2" :disabled="cantJoinGroup2">信仰贡献</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DUNGEON_GHOST_MONEY, DUNGEON_GOD_LIFE } from '@/data/constants'
import type { GameState } from '@/data/types'

const props = defineProps<{
  gs: GameState
  updateTick: number
  joinGroup1: () => void
  joinGroup2: () => void
}>()

const cantJoinGroup1 = computed(() => { props.updateTick; return props.gs.money.isLessThan(DUNGEON_GHOST_MONEY) })
const cantJoinGroup2 = computed(() => { props.updateTick; return props.gs.group2Wait !== 0 || props.gs.life.isLessThan(DUNGEON_GOD_LIFE) })
</script>
