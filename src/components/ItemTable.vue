<template>
  <table class="table table-bordered table-condensed game-table">
    <tbody>
      <tr class="tr-item">
        <td class="text-left">法宝：{{ gs.items.length }}个</td>
        <td colspan="2" class="text-center">
          <template v-if="gs.itemWait !== 0">下次秘境开启 {{ gs.itemWait }} 秒 ，</template>
          门槛需达 {{ itemThresholdText }} 修为，消耗九成修为<br/>
          拥有法宝越多、阁下的孽缘越多，可能会消耗寿命
        </td>
        <td class="text-center">
          <button class="btn btn-default" @click="getNewItem" :disabled="cantGetNewItem">寻找机缘</button>
          <template v-if="gs.items.length !== 0">
            <button class="btn btn-default" @click="removeItems">舍弃法宝</button>
          </template>
        </td>
      </tr>
      <tr v-for="(i, id) in gs.items" :key="i.name + '-' + id">
        <td><h5>{{ i.name }}</h5></td>
        <td colspan="2" class="text-left">{{ i.object.info }}</td>
        <td>
          <div v-if="i.object.useAble"><button class="btn btn-default" @click="useItem(id)">使用</button></div>
          <div v-else class="text-muted">被动</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { numFilterTxt } from '@/utils/numFilter'
import type { GameState } from '@/data/types'

const props = defineProps<{
  gs: GameState
  updateTick: number
  getNewItem: () => void
  useItem: (id: number) => void
  removeItems: () => void
}>()

const itemThresholdText = computed(() => {
  props.updateTick
  const half = props.gs.level.max.div(2)
  return numFilterTxt(half.isGreaterThan(props.gs.itemCost) ? half.toString() : props.gs.itemCost.toString())
})

const cantGetNewItem = computed(() => {
  props.updateTick
  return props.gs.point.isLessThan(props.gs.level.max.div(2)) || props.gs.point.isLessThan(props.gs.itemCost) || props.gs.itemWait !== 0
})
</script>
