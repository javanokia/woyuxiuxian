<template>
  <table class="table table-bordered table-condensed game-table">
    <tbody>
      <tr class="tr-header"><td>寿命</td><td>阵营</td><td>名望</td><td>财富</td></tr>
      <tr>
        <td>{{ lifeText }} / {{ pastLifeText }} 秒</td>
        <td>{{ gs.stand.name }} {{ standPointText }}</td>
        <td>{{ renownText }}</td>
        <td>{{ moneyText }}金</td>
      </tr>
      <tr class="tr-group"><td colspan="4" class="text-left">归属</td></tr>
      <tr>
        <td><h4>{{ gs.group.name }}</h4></td>
        <td colspan="2">
          <template v-if="gs.group.exist">{{ gs.group.object?.info }}</template>
          <template v-else>
            <span v-if="gs.groupWait > 0">耗费 {{ gs.groupWait }} 秒游历天下，</span>
            花费 100 名望探访名师
          </template>
        </td>
        <td>
          <template v-if="gs.group.exist">
            <button class="btn btn-default" @click="exitGroup">金盆洗手</button>
          </template>
          <template v-else>
            <button class="btn btn-default" @click="joinGroup" :disabled="cantJoinGroup">拜师学艺</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { numFilterTxt } from '@/utils/numFilter'
import { GROUP_RENOWN_COST } from '@/data/constants'
import type { GameState } from '@/data/types'

const props = defineProps<{
  gs: GameState
  updateTick: number
  joinGroup: () => void
  exitGroup: () => void
}>()

const lifeText = computed(() => { props.updateTick; return props.gs.life.toString() })
const pastLifeText = computed(() => { props.updateTick; return props.gs.pastLife.toString() })
const standPointText = computed(() => { props.updateTick; return props.gs.standPoint.div(100).dp(0).toString() + '%' })
const renownText = computed(() => { props.updateTick; return numFilterTxt(props.gs.renown.toString()) })
const moneyText = computed(() => { props.updateTick; return numFilterTxt(props.gs.money.toString()) })
const cantJoinGroup = computed(() => { props.updateTick; return props.gs.groupWait !== 0 || props.gs.renown.isLessThan(GROUP_RENOWN_COST) })
</script>
