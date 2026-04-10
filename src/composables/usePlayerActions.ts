/**
 * 玩家操作 — 修炼、升级肉体/灵根/功法、法宝管理
 */
import BigNumber from 'bignumber.js'
import type { GameState } from '@/data/types'
import { getRandomSkill } from '@/data/skills'
import { getRandomItem } from '@/data/items'
import { randomSkillName, randomItemName, randomNewSkillLog, randomNewItemLog } from '@/data/names'

export function usePlayerActions(gs: GameState, tick: () => void) {
  /** 手动修炼 */
  function addByBody() {
    if (gs.life.isGreaterThan(0)) {
      gs.point = gs.point.plus(gs.body.num)
      tick()
    }
  }

  /** 每tick自动增加修为 */
  function countAutoAdd() {
    gs.point = gs.point.plus(gs.pointPerSec)
    if (gs.point.isLessThan(0)) { gs.point = new BigNumber(0) }
  }

  /** 升级灵根 */
  function talentLvUp() {
    if (!gs.point.isLessThan(gs.talent.need)) {
      gs.point = gs.point.minus(gs.talent.need)
      gs.talent = gs.talent.getNext()!
      gs.logTxt.splice(0, 0, '灵根提升！升级为' + gs.talent.name + '！')
      tick()
    }
  }

  /** 升级肉体 */
  function bodyLvUp() {
    if (!gs.point.isLessThan(gs.body.need)) {
      gs.point = gs.point.minus(gs.body.need)
      gs.body = gs.body.getNext()!
      gs.logTxt.splice(0, 0, '肉体强化！脱胎为' + gs.body.name + '！')
      tick()
    }
  }

  /** 升级功法 */
  function skillLvUp(i: number) {
    if (!gs.point.isLessThan(gs.skills[i].object.need)) {
      gs.point = gs.point.minus(gs.skills[i].object.need)
      gs.skills[i].object = gs.skills[i].object.getNext()!
      gs.logTxt.splice(0, 0, '潜心修练' + gs.skills[i].name + '，功力提升！')
      tick()
    }
  }

  /** 学习新功法 */
  function getNewSkill() {
    if (gs.talent.num.isGreaterThan(gs.skills.length) &&
      !gs.point.isLessThan(gs.level.max.div(2))) {
      gs.point = gs.point.div(gs.skills.length + 2).dp(0)
      const randName = randomSkillName()
      gs.skills.push({ name: randName, object: getRandomSkill() })
      gs.logTxt.splice(0, 0, randomNewSkillLog(randName) + '！')
      tick()
    }
  }

  /** 散功（移除功法） */
  function skillRemove(id: number) {
    if (!gs.money.isLessThan(gs.removeCost)) {
      gs.money = gs.money.minus(gs.removeCost)
      gs.removeCost = gs.removeCost.plus(10)
      gs.skills.splice(id, 1)
      tick()
    }
  }

  /** 获取新法宝 */
  function getNewItem() {
    if (!(gs.point.isLessThan(gs.level.max.div(2))) &&
      !(gs.point.isLessThan(gs.itemCost))) {
      gs.point = gs.point.div(10).dp(0)
      gs.itemCost = gs.itemCost.times(1.1).dp(0)
      gs.itemInterval = gs.itemInterval.plus(1)
      gs.itemWait = gs.itemInterval.toNumber()
      const randName = randomItemName()
      const newItem = { name: randName, object: getRandomItem() }
      gs.logTxt.splice(0, 0, randomNewItemLog(randName) + '！')
      gs.items.splice(0, 0, newItem)
      tick()
    }
  }

  /** 使用法宝 */
  function useItem(id: number) {
    if (gs.items[id].object.useAble) {
      const used = gs.items.splice(id, 1)[0]
      used.object.start(gs)
      tick()
    }
  }

  /** 舍弃所有法宝 */
  function removeItems() {
    gs.items = []
    gs.logTxt.splice(0, 0, '作减求空!果断放弃所有因缘，重新来过')
    tick()
  }

  return {
    addByBody,
    countAutoAdd,
    talentLvUp,
    bodyLvUp,
    skillLvUp,
    getNewSkill,
    skillRemove,
    getNewItem,
    useItem,
    removeItems,
  }
}
