/**
 * 游戏状态入口 — 初始化状态 + 组合所有 composable
 *
 * 核心策略：
 * - 游戏状态存储在普通 JS 对象 gs 中（不经过 Vue 响应式代理）
 * - 用一个 ref 计数器 updateTick 作为更新信号，每次修改状态后 +1
 * - 组件模板通过 gs.xxx 直接访问原始对象的属性
 * - 模板中引用 updateTick 确保依赖追踪
 */
import { ref } from 'vue'
import BigNumber from 'bignumber.js'
import { level, body, talent } from '@/data/levels'
import { stands } from '@/data/stands'
import type { GameState } from '@/data/types'
import { clearSave } from '@/utils/save'
import { INIT_LIFE, INIT_RENOWN, INIT_MONEY, INIT_ITEM_COST, INIT_REMOVE_COST } from '@/data/constants'
import { useGameLoop } from './useGameLoop'
import { usePlayerActions } from './usePlayerActions'
import { useWorldActions } from './useWorldActions'
import { useSaveActions } from './useSaveActions'

function bn(v: number | string): BigNumber {
  return new BigNumber(v)
}

// ─── 游戏状态：纯普通对象，不经过任何 Vue 响应式包装 ───

const gs: GameState = {
  point: bn(0),
  pointPerSec: bn(0),
  life: bn(INIT_LIFE),
  pastLife: bn(0),
  renown: bn(INIT_RENOWN),
  money: bn(INIT_MONEY),
  standPerSec: bn(0),
  standPoint: bn(1),
  stand: stands._3,
  level: level._0,
  body: body._0,
  talent: talent._0,
  skills: [],
  items: [],
  group: { exist: false, object: null, name: '散修' },
  group1: { exist: false, object: null, name: '献祭赌博' },
  group2: { exist: false, object: null, name: '信仰神裔' },
  groupInterval: bn(10),
  groupInterval1: bn(10),
  groupInterval2: bn(10),
  groupWait: 30,
  group1Wait: 150,
  group2Wait: 200,
  itemCost: bn(INIT_ITEM_COST),
  itemInterval: bn(5),
  itemWait: 10,
  removeCost: bn(INIT_REMOVE_COST),
  logTxt: [],
  world: ['基础'],
  worldTimes: 0,
  name: '空',
  born: true,
  record: '',
}

// ─── 更新信号 — 每次修改 gs 后 +1 触发 UI 刷新 ───

const updateTick = ref(0)

function tick() {
  updateTick.value++
}

// ─── 组合各模块 ───

const player = usePlayerActions(gs, tick)
const world = useWorldActions(gs, tick)
const save = useSaveActions(gs, tick)

const { startTimer, stopTimer } = useGameLoop(gs, {
  onTick: () => {
    player.countAutoAdd()
    world.checkLevelUp()
    tick()
  },
  onSec: () => {
    world.countPerSec()
  },
  onDeath: () => {
    stopTimer()
    alert('寿元已尽，请来世再修吧！')
    clearSave()
  },
})

// ─── 导出统一接口 ───

export function useGameState() {
  return {
    gs,
    updateTick,
    startTimer,
    stopTimer,
    // 玩家操作
    addByBody: player.addByBody,
    talentLvUp: player.talentLvUp,
    bodyLvUp: player.bodyLvUp,
    skillLvUp: player.skillLvUp,
    getNewSkill: player.getNewSkill,
    skillRemove: player.skillRemove,
    getNewItem: player.getNewItem,
    useItem: player.useItem,
    removeItems: player.removeItems,
    // 世界操作
    joinGroup: world.joinGroup,
    exitGroup: world.exitGroup,
    joinGroup1: world.joinGroup1,
    joinGroup2: world.joinGroup2,
    // 存档操作
    showData: save.showData,
    loadData: save.loadData,
    clearData: save.clearData,
    tryAutoLoad: save.tryAutoLoad,
  }
}
