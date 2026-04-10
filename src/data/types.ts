/**
 * 核心类型定义 — 所有接口集中在此，消除模块间循环依赖
 */
import type BigNumber from 'bignumber.js'

// ─── 基础数据节点 ───

export interface LevelData {
  id: string
  name: string
  max: BigNumber
  life: BigNumber
  top: boolean
  getNext: () => LevelData | null
}

export interface BodyData {
  id: string
  name: string
  num: BigNumber
  need: BigNumber
  top: boolean
  getNext: () => BodyData | null
}

export interface TalentData {
  id: string
  name: string
  need: BigNumber
  num: BigNumber
  top: boolean
  getNext: () => TalentData | null
}

// ─── 功法 / 法宝 / 阵营 / 门派 / 副本 ───

export interface SkillData {
  id: string
  top: boolean
  degree: string
  info: string
  need: BigNumber
  run: (state: GameState) => void
  num?: BigNumber
  getPrev: () => SkillData | null
  getNext: () => SkillData | null
}

export interface ItemData {
  info: string
  useAble: boolean
  start: (state: GameState) => void
  runPerSec: (state: GameState) => void
}

export interface StandData {
  name: string
  num: BigNumber
  filter: (pointPerSec: BigNumber) => BigNumber
}

export interface GroupData {
  info: string
  start: (state: GameState) => void
  run: (state: GameState) => void
  end: (state: GameState) => void
}

export interface DungeonData {
  info: string
  start: (state: GameState) => void
  run?: (state: GameState) => void
}

// ─── 游戏状态 ───

export interface GameState {
  point: BigNumber
  pointPerSec: BigNumber
  life: BigNumber
  pastLife: BigNumber
  renown: BigNumber
  money: BigNumber
  standPerSec: BigNumber
  standPoint: BigNumber
  stand: StandData
  skills: Array<{ name: string; object: SkillData }>
  items: Array<{ name: string; object: ItemData }>
  level: LevelData
  body: BodyData
  talent: TalentData
  group: { exist: boolean; object: GroupData | null; name: string }
  group1: { exist: boolean; object: DungeonData | null; name: string }
  group2: { exist: boolean; object: DungeonData | null; name: string }
  groupInterval: BigNumber
  groupInterval1: BigNumber
  groupInterval2: BigNumber
  itemCost: BigNumber
  itemInterval: BigNumber
  itemWait: number
  groupWait: number
  group1Wait: number
  group2Wait: number
  removeCost: BigNumber
  logTxt: string[]
  world: string[]
  worldTimes: number
  name: string
  born: boolean
  record: string
}
