import LZString from 'lz-string'
import BigNumber from 'bignumber.js'
import { level, body, talent } from '@/data/levels'
import { skills } from '@/data/skills'
import { items } from '@/data/items'
import { stands } from '@/data/stands'
import type { GameState } from '@/data/types'
import { SAVE_KEY } from '@/data/constants'

export interface SaveData {
  point: string
  levelId: string
  bodyId: string
  talentId: string
  name: string
  world: string[]
  worldTimes: number
  life: string
  pastLife: string
  money: string
  renown: string
  standPoint: string
  skills: Array<{ name: string; id: string }>
  items: Array<{ name: string; id: number }>
  itemCost: string
  itemInterval: string
}

function buildSaveData(state: GameState): SaveData {
  return {
    point: state.point.dp(0).toString(),
    levelId: state.level.id,
    bodyId: state.body.id,
    talentId: state.talent.id,
    name: state.name || '空',
    world: [...state.world],
    worldTimes: state.worldTimes,
    life: state.life.toString(),
    pastLife: state.pastLife.toString(),
    money: state.money.toString(),
    renown: state.renown.toString(),
    standPoint: state.standPoint.toString(),
    skills: state.skills.map(s => ({ name: s.name, id: s.object.id })),
    items: state.items.map((i, idx) => ({ name: i.name, id: items.indexOf(i.object) })),
    itemCost: state.itemCost.toString(),
    itemInterval: state.itemInterval.toString(),
  }
}

export function saveGame(state: GameState): string {
  const data = buildSaveData(state)
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data))
  // 也存到 localStorage
  localStorage.setItem(SAVE_KEY, compressed)
  return compressed
}

export function loadGame(record: string): SaveData | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(record)
    if (!decompressed) {
      alert('存档输入错误，请检查内容。')
      return null
    }
    return JSON.parse(decompressed) as SaveData
  } catch (e) {
    alert('存档读取失败：' + e)
    return null
  }
}

export function autoSave(state: GameState): void {
  const data = buildSaveData(state)
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data))
  localStorage.setItem(SAVE_KEY, compressed)
}

export function autoLoad(): SaveData | null {
  const record = localStorage.getItem(SAVE_KEY)
  if (!record) return null
  return loadGame(record)
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function applySaveData(state: GameState, data: SaveData): void {
  state.point = new BigNumber(data.point)
  state.level = level[data.levelId]
  state.body = body[data.bodyId]
  state.talent = talent[data.talentId]
  state.world = data.world
  state.worldTimes = data.worldTimes
  state.life = new BigNumber(data.life)
  state.pastLife = new BigNumber(data.pastLife)
  state.money = new BigNumber(data.money)
  state.renown = new BigNumber(data.renown)
  state.standPoint = new BigNumber(data.standPoint)
  state.stand = stands.find(state.standPoint)
  state.logTxt = []
  state.skills = data.skills.map(s => ({
    name: s.name,
    object: skills[s.id],
  }))
  state.items = data.items.map(i => ({
    name: i.name,
    object: items[i.id],
  }))
  state.itemCost = new BigNumber(data.itemCost)
  state.itemInterval = new BigNumber(data.itemInterval)
  state.itemWait = state.itemInterval.toNumber()
}
