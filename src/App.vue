<template>
  <div class="game-bg">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1 text-center game-center">
          <hr/>

          <!-- 修炼面板 -->
          <CultivationPanel
            :gs="gs"
            :update-tick="updateTick"
            :add-by-body="addByBody"
          />

          <!-- 状态表 + 功法 + 副本 + 法宝 -->
          <div class="row table-row">
            <br/>
            <StatusTable
              :gs="gs"
              :update-tick="updateTick"
              :join-group="joinGroup"
              :exit-group="exitGroup"
            />

            <SkillTable
              :gs="gs"
              :update-tick="updateTick"
              :body-lv-up="bodyLvUp"
              :talent-lv-up="talentLvUp"
              :skill-lv-up="skillLvUp"
              :get-new-skill="getNewSkill"
              :skill-remove="skillRemove"
            />

            <br/>

            <DungeonPanel
              :gs="gs"
              :update-tick="updateTick"
              :join-group1="joinGroup1"
              :join-group2="joinGroup2"
            />

            <br/>

            <ItemTable
              :gs="gs"
              :update-tick="updateTick"
              :get-new-item="getNewItem"
              :use-item="useItem"
              :remove-items="removeItems"
            />

            <br/>
          </div>

          <hr/>

          <!-- 存档面板 -->
          <SavePanel
            :gs="gs"
            :show-data="showData"
            :load-data="loadData"
            :clear-data="clearData"
          />

          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameState } from '@/composables/useGameState'
import CultivationPanel from '@/components/CultivationPanel.vue'
import StatusTable from '@/components/StatusTable.vue'
import SkillTable from '@/components/SkillTable.vue'
import DungeonPanel from '@/components/DungeonPanel.vue'
import ItemTable from '@/components/ItemTable.vue'
import SavePanel from '@/components/SavePanel.vue'

const {
  gs,
  updateTick,
  startTimer,
  stopTimer,
  addByBody,
  talentLvUp,
  bodyLvUp,
  skillLvUp,
  getNewSkill,
  skillRemove,
  getNewItem,
  useItem,
  removeItems,
  joinGroup,
  exitGroup,
  joinGroup1,
  joinGroup2,
  showData,
  loadData,
  clearData,
  tryAutoLoad,
} = useGameState()

onMounted(() => {
  tryAutoLoad()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
