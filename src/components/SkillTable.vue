<template>
  <div class="ink-card ink-card--skill">
    <div class="ink-header">
      <span class="ink-header-icon">☷</span>
      <span class="ink-header-title">功法修炼</span>
    </div>

    <!-- 身体 -->
    <div class="ink-card ink-card--body ink-card--nested">
      <div class="ink-header">
        <span class="ink-header-icon">◆</span>
        <span class="ink-header-title">身体</span>
      </div>
      <div class="ink-row">
        <div class="ink-row-name">{{ bodyName }}</div>
        <div class="ink-row-desc">每次修炼增加 {{ bodyNumText }} 修为</div>
        <div class="ink-row-need">
          <template v-if="!bodyTop">{{ bodyNeedText }} 修为</template>
          <template v-else><span class="ink-gold-text">已圆满</span></template>
        </div>
        <div class="ink-row-actions">
          <button class="ink-btn ink-btn--spirit ink-btn--sm" @click="bodyLvUp" :disabled="cantBodyLvUp">升级</button>
        </div>
      </div>
    </div>

    <!-- 灵根 -->
    <div class="ink-card ink-card--talent ink-card--nested">
      <div class="ink-header">
        <span class="ink-header-icon">◈</span>
        <span class="ink-header-title">灵根</span>
      </div>
      <div class="ink-row">
        <div class="ink-row-name">{{ talentName }}</div>
        <div class="ink-row-desc">可修炼 {{ talentNumText }} 项功法</div>
        <div class="ink-row-need">
          <template v-if="!talentTop">{{ talentNeedText }} 修为</template>
          <template v-else><span class="ink-gold-text">已圆满</span></template>
        </div>
        <div class="ink-row-actions">
          <button class="ink-btn ink-btn--jade ink-btn--sm" @click="talentLvUp" :disabled="cantTalentLvUp">升级</button>
        </div>
      </div>
    </div>

    <!-- 功法列表 -->
    <div class="ink-section-gap">
      <div class="ink-row">
        <div class="ink-row-name">功法 <small>{{ skillCount }}项</small></div>
        <div class="ink-row-desc">
          <template v-if="canGetNewSkill">
            门槛需达 <span class="highlight">{{ skillThresholdText }}</span> 修为，消耗修为至{{ skillCount + 2 }}分之一
          </template>
          <template v-else>
            <span class="ink-dim-text">灵根不足以修炼更多功法</span>
          </template>
        </div>
        <div class="ink-row-actions">
          <template v-if="canGetNewSkill">
            <button class="ink-btn ink-btn--sm" @click="getNewSkill" :disabled="cantGetNewSkill">学习新功法</button>
          </template>
        </div>
      </div>

      <div v-for="(skill, id) in gs.skills" :key="id" class="ink-row">
        <div class="ink-row-name">{{ skill.name }} <small>{{ skill.object.degree }}</small></div>
        <div class="ink-row-desc">{{ skill.object.info }}</div>
        <div class="ink-row-need">
          <template v-if="!skill.object.top">{{ skillNeedTexts[id] }} 修为</template>
          <template v-else><span class="ink-gold-text">已圆满</span></template>
        </div>
        <div class="ink-row-actions">
          <button class="ink-btn ink-btn--sm" @click="skillLvUp(id)" :disabled="cantSkillLvUps[id]">升级</button>
          <button class="ink-btn ink-btn--danger ink-btn--sm" @click="skillRemove(id)" :disabled="cantSkillRemove">散功</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { numFilterTxt } from '@/utils/numFilter'
import { useGameState } from '@/composables/useGameState'

const { gs, display, bodyLvUp, talentLvUp, skillLvUp, getNewSkill, skillRemove } = useGameState()

// 身体
const bodyName = display(() => gs.body.name)
const bodyNumText = display(() => numFilterTxt(gs.body.num.toString()))
const bodyNeedText = display(() => numFilterTxt(gs.body.need.toString()))
const bodyTop = display(() => gs.body.top)
const cantBodyLvUp = display(() => gs.point.isLessThan(gs.body.need) || gs.body.top)

// 灵根
const talentName = display(() => gs.talent.name)
const talentNumText = display(() => gs.talent.num.toString())
const talentNeedText = display(() => numFilterTxt(gs.talent.need.toString()))
const talentTop = display(() => gs.talent.top)
const cantTalentLvUp = display(() => gs.point.isLessThan(gs.talent.need) || gs.talent.top)

// 功法
const skillCount = display(() => gs.skills.length)
const skillThresholdText = display(() => numFilterTxt(gs.level.max.div(2).toString()))
const canGetNewSkill = display(() => gs.talent.num.isGreaterThan(gs.skills.length))
const cantGetNewSkill = display(() => gs.point.isLessThan(gs.level.max.div(2)))
const cantSkillRemove = display(() => gs.money.isLessThan(gs.removeCost))

// 功法列表 — 用 display() 返回数组，响应式追踪
const skillNeedTexts = display(() => gs.skills.map(s => numFilterTxt(s.object.need.toString())))
const cantSkillLvUps = display(() => gs.skills.map(s => gs.point.isLessThan(s.object.need) || s.object.top))
</script>
