/**
 * 世界操作 — 门派、副本、境界突破、破碎虚空
 */
import BigNumber from 'bignumber.js'
import { level, body, talent } from '@/data/levels'
import { stands } from '@/data/stands'
import type { GameState } from '@/data/types'
import { getRandomGroup, getRandomGroup1, getRandomGroup2 } from '@/data/groups'
import { randomWorldName, randomGroupName } from '@/data/names'
import { STAND_LIMIT, GROUP_RENOWN_COST, DUNGEON_GHOST_MONEY, DUNGEON_GOD_LIFE, INIT_ITEM_COST, INIT_REMOVE_COST } from '@/data/constants'

export function useWorldActions(gs: GameState, tick: () => void) {
  /** 计算每秒修为 */
  function countPointPerSec() {
    gs.pointPerSec = new BigNumber(0)
    gs.standPerSec = new BigNumber(0)
    for (const s of gs.skills) { s.object.run(gs) }
    for (const i of gs.items) { i.object.runPerSec(gs) }
    if (gs.group.exist && gs.group.object) { gs.group.object.run(gs) }
    gs.standPoint = gs.standPoint.plus(gs.standPerSec)
    gs.stand = stands.find(gs.standPoint)
    gs.pointPerSec = gs.stand.filter(gs.pointPerSec)
    gs.life = gs.life.minus(Math.floor(gs.items.length / 5))
  }

  /** 每秒结算 */
  function countPerSec() {
    countPointPerSec()
    gs.life = gs.life.minus(1)
    gs.pastLife = gs.pastLife.plus(1)
    gs.itemWait = gs.itemWait > 0 ? gs.itemWait - 1 : 0
    gs.groupWait = gs.groupWait > 0 ? gs.groupWait - 1 : 0
    gs.group1Wait = gs.group1Wait > 0 ? gs.group1Wait - 1 : 0
    gs.group2Wait = gs.group2Wait > 0 ? gs.group2Wait - 1 : 0

    if (gs.money.lt(0)) { gs.money = new BigNumber(0) }
    if (gs.renown.lt(0)) { gs.renown = new BigNumber(0) }
    if (gs.standPoint.gt(STAND_LIMIT)) { gs.standPoint = new BigNumber(STAND_LIMIT) }
    else if (gs.standPoint.lt(-STAND_LIMIT)) { gs.standPoint = new BigNumber(-STAND_LIMIT) }
  }

  /** 加入门派 */
  function joinGroup() {
    if (!gs.renown.isLessThan(GROUP_RENOWN_COST)) {
      gs.renown = gs.renown.minus(GROUP_RENOWN_COST)
      const obj = getRandomGroup()
      const gName = randomGroupName()
      gs.group = { exist: true, object: obj, name: gName }
      obj.start(gs)
      gs.logTxt.splice(0, 0, '拜入「' + gName + '」门下，修行之路从此有师承！')
      tick()
    }
  }

  /** 退出门派 */
  function exitGroup() {
    const oldName = gs.group.name
    if (gs.group.object) gs.group.object.end(gs)
    gs.group = { exist: false, object: null, name: '散修' }
    gs.groupInterval = gs.groupInterval.plus(10)
    gs.groupWait = gs.groupInterval.toNumber()
    gs.logTxt.splice(0, 0, '金盆洗手，退出「' + oldName + '」，重归散修之身！')
    tick()
  }

  /** 献祭赌博（古神副本） */
  function joinGroup1() {
    if (!gs.money.isLessThan(DUNGEON_GHOST_MONEY)) {
      gs.money = gs.money.div(5).dp(0)
      const obj = getRandomGroup1()
      gs.group1 = { exist: false, object: obj, name: '远古之神' }
      obj.start(gs)
      gs.logTxt.splice(0, 0, '献祭八成金币于古神，命运博弈由此开启！')
      tick()
    }
  }

  /** 信仰贡献（神裔副本） */
  function joinGroup2() {
    if (!gs.life.isLessThan(DUNGEON_GOD_LIFE)) {
      gs.life = gs.life.div(5).dp(0)
      const obj = getRandomGroup2()
      gs.group2 = { exist: false, object: obj, name: '正义联盟' }
      obj.start(gs)
      gs.logTxt.splice(0, 0, '贡献七成寿元于神明，换取神恩庇佑！')
      tick()
    }
  }

  /** 境界突破检查 */
  function checkLevelUp() {
    while (gs.point.isGreaterThan(gs.level.max)) {
      if (gs.level.getNext() == null) {
        gotoNextWorld()
        break
      }
      gs.level = gs.level.getNext()!
      gs.life = gs.life.plus(gs.level.life)
      gs.logTxt.splice(0, 0, '修为积累，境界突破！进入' + gs.level.name + '阶段！')
    }
  }

  /** 破碎虚空 — 进入新世界 */
  function gotoNextWorld() {
    gs.worldTimes += 1
    gs.world.splice(0, 0, randomWorldName())
    gs.point = new BigNumber(0)
    gs.pointPerSec = new BigNumber(0)
    gs.level = level._0
    gs.body = body._0
    gs.standPoint = new BigNumber(0)
    gs.renown = new BigNumber(10)
    gs.money = new BigNumber(100)
    gs.group = { exist: false, object: null, name: '散修' }
    gs.group1 = { exist: false, object: null, name: '散修' }
    gs.group2 = { exist: false, object: null, name: '散修' }
    gs.groupInterval = new BigNumber(60)
    gs.groupInterval1 = new BigNumber(60)
    gs.groupInterval2 = new BigNumber(60)
    gs.groupWait = gs.groupInterval.toNumber()
    gs.group1Wait = gs.groupInterval1.toNumber()
    gs.group2Wait = gs.groupInterval2.toNumber()
    if (gs.skills.length > 0) {
      let leftSkill = gs.skills[Math.floor(Math.random() * gs.skills.length)]
      for (let i = 0; i < 4; i++) {
        if (leftSkill.object.getPrev() != null) {
          leftSkill = { name: leftSkill.name, object: leftSkill.object.getPrev()! }
        }
      }
      gs.skills = [leftSkill]
      gs.talent = talent._1
    } else {
      gs.skills = []
      gs.talent = talent._0
    }
    gs.removeCost = new BigNumber(INIT_REMOVE_COST).plus(10 * gs.worldTimes)
    if (gs.items.length > 0) {
      const leftItem = gs.items[Math.floor(Math.random() * gs.items.length)]
      gs.items = [leftItem]
    } else {
      gs.items = []
    }
    gs.itemCost = new BigNumber(INIT_ITEM_COST)
    gs.itemInterval = new BigNumber(10)
    gs.itemWait = gs.itemInterval.toNumber()
    gs.logTxt.splice(0, 0, '境界圆满，破碎虚空！超脱当前世界进入' + gs.world[0] + '界！')
  }

  return {
    countPerSec,
    joinGroup,
    exitGroup,
    joinGroup1,
    joinGroup2,
    checkLevelUp,
  }
}
