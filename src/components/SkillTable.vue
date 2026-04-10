<template>
  <table class="table table-bordered table-condensed game-table">
    <tbody>
      <tr class="tr-header"><td>名称</td><td>能力</td><td>升级需求</td><td></td></tr>
      <tr class="tr-body"><td colspan="4" class="text-left">身体</td></tr>
      <tr>
        <td><h4>{{ gs.body.name }}</h4></td>
        <td>每次修炼增加 {{ bodyNumText }} 修为</td>
        <td><template v-if="!gs.body.top">{{ bodyNeedText }} 修为</template></td>
        <td><button class="btn btn-default" @click="bodyLvUp" :disabled="cantBodyLvUp">升级</button></td>
      </tr>
      <tr class="tr-talent"><td colspan="4" class="text-left">灵根</td></tr>
      <tr>
        <td><h4>{{ gs.talent.name }}</h4></td>
        <td>可修炼 {{ talentNumText }} 项功法</td>
        <td><template v-if="!gs.talent.top">{{ talentNeedText }} 修为</template></td>
        <td><button class="btn btn-default" @click="talentLvUp" :disabled="cantTalentLvUp">升级</button></td>
      </tr>
      <tr class="tr-skill">
        <td class="text-left">功法：{{ gs.skills.length }}项</td>
        <td colspan="2" class="text-center">
          <template v-if="canGetNewSkill">
            门槛需达 {{ skillThresholdText }} 修为，消耗修为至{{ gs.skills.length + 2 }}分之一
          </template>
        </td>
        <td>
          <template v-if="canGetNewSkill">
            <button class="btn btn-default" @click="getNewSkill" :disabled="cantGetNewSkill">学习新功法</button>
          </template>
        </td>
      </tr>
      <tr v-for="(skill, id) in gs.skills" :key="skill.name + '-' + id">
        <td><h5>{{ skill.name }} - {{ skill.object.degree }}</h5></td>
        <td>{{ skill.object.info }}</td>
        <td><template v-if="!skill.object.top">{{ skillNeedText(id) }} 修为</template></td>
        <td>
          <button class="btn btn-default" @click="skillLvUp(id)" :disabled="cantSkillLvUp(id)">升级</button>
          <button class="btn btn-default" @click="skillRemove(id)" :disabled="cantSkillRemove">散功({{ removeCostText }}金)</button>
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
  bodyLvUp: () => void
  talentLvUp: () => void
  skillLvUp: (id: number) => void
  getNewSkill: () => void
  skillRemove: (id: number) => void
}>()

const bodyNumText = computed(() => { props.updateTick; return numFilterTxt(props.gs.body.num.toString()) })
const bodyNeedText = computed(() => { props.updateTick; return numFilterTxt(props.gs.body.need.toString()) })
const talentNumText = computed(() => { props.updateTick; return props.gs.talent.num.toString() })
const talentNeedText = computed(() => { props.updateTick; return numFilterTxt(props.gs.talent.need.toString()) })
const removeCostText = computed(() => { props.updateTick; return props.gs.removeCost.toString() })

const skillThresholdText = computed(() => { props.updateTick; return numFilterTxt(props.gs.level.max.div(2).toString()) })
const canGetNewSkill = computed(() => { props.updateTick; return props.gs.talent.num.isGreaterThan(props.gs.skills.length) })
const cantGetNewSkill = computed(() => { props.updateTick; return props.gs.point.isLessThan(props.gs.level.max.div(2)) })

const cantBodyLvUp = computed(() => { props.updateTick; return props.gs.point.isLessThan(props.gs.body.need) || props.gs.body.top })
const cantTalentLvUp = computed(() => { props.updateTick; return props.gs.point.isLessThan(props.gs.talent.need) || props.gs.talent.top })

function cantSkillLvUp(id: number): boolean {
  props.updateTick
  return props.gs.point.isLessThan(props.gs.skills[id].object.need) || props.gs.skills[id].object.top
}

function skillNeedText(id: number): string {
  props.updateTick
  return numFilterTxt(props.gs.skills[id].object.need.toString())
}

const cantSkillRemove = computed(() => { props.updateTick; return props.gs.money.isLessThan(props.gs.removeCost) })
</script>
