import BigNumber from 'bignumber.js'
import type { GameState, ItemData } from './types'
import { randomItemName, randomNewItemLog } from './names'
import { stands } from './stands'

const items: ItemData[] = [
  // 使用类
  { info: '直接获得大量的财富', useAble: true, start: (s) => { s.money = s.money.plus(s.removeCost.times(10)) }, runPerSec: () => {} },
  { info: '直接获得大量的声望', useAble: true, start: (s) => { s.renown = s.renown.plus(1000) }, runPerSec: () => {} },
  { info: '直接获得大量的寿元', useAble: true, start: (s) => { s.life = s.life.plus(1000) }, runPerSec: () => {} },
  { info: '直接获得大量的修为', useAble: true, start: (s) => { s.point = s.point.plus(s.level.max.div(5).dp(0)) }, runPerSec: () => {} },
  { info: '直接获得当前境界一半容量的修为', useAble: true, start: (s) => { s.point = s.point.plus(s.level.max.div(2).dp(0)) }, runPerSec: () => {} },
  { info: '精神时光屋，可瞬间修练100次', useAble: true, start: (s) => { s.point = s.point.plus(s.body.num.times(100)) }, runPerSec: () => {} },
  { info: '将当前的修为直接翻倍', useAble: true, start: (s) => { s.point = s.point.times(2) }, runPerSec: () => {} },
  { info: '将当前的财富直接翻倍', useAble: true, start: (s) => { s.money = s.money.times(2) }, runPerSec: () => {} },
  { info: '将当前的名气直接翻倍', useAble: true, start: (s) => { s.renown = s.renown.times(2) }, runPerSec: () => {} },
  { info: '淨化心灵，提升正派心性10%', useAble: true, start: (s) => { s.standPoint = s.standPoint.plus(1000) }, runPerSec: () => {} },
  { info: '污染心灵，逆天而行堕落10%', useAble: true, start: (s) => { s.standPoint = s.standPoint.minus(1000) }, runPerSec: () => {} },
  { info: '将肉体能力提升一个等级', useAble: true, start: (s) => { if (!s.body.top) { s.body = s.body.getNext()!; s.logTxt.splice(0, 0, '肉体强化！脱胎为' + s.body.name + '！') } }, runPerSec: () => {} },
  { info: '将灵根提升一个等级', useAble: true, start: (s) => { if (!s.talent.top) { s.talent = s.talent.getNext()!; s.logTxt.splice(0, 0, '灵根提升！升级为' + s.talent.name + '！') } }, runPerSec: () => {} },
  {
    info: '将境界直接提升一个等级', useAble: true,
    start: (s) => {
      if (!s.level.top) {
        s.level = s.level.getNext()!
        s.logTxt.splice(0, 0, '修为积累，境界突破！进入' + s.level.name + '阶段！')
      } else {
        s.logTxt.splice(0, 0, '境界无法提升，' + s.level.name + '阶段要认真修炼，勿借助外来法宝！')
        // Vue 3 版本不实现 getPrevious（原代码有bug：调用了不存在的方法）
      }
    },
    runPerSec: () => {},
  },
  {
    info: '将升级消耗最低的功法提升一个等级', useAble: true,
    start: (s) => {
      if (s.skills.length === 0) return
      let id = 0
      for (let i = 0; i < s.skills.length; i++) {
        if (s.skills[i].object.need.isLessThan(s.skills[id].object.need)) { id = i }
      }
      if (s.skills[id].object.getNext() != null) {
        s.skills[id].object = s.skills[id].object.getNext()!
        s.logTxt.splice(0, 0, '潜心修练' + s.skills[id].name + '，功力提升！')
      }
    },
    runPerSec: () => {},
  },
  { info: '丢弃所有法宝以大幅提升自身一般修为', useAble: true, start: (s) => { s.point = s.point.plus(s.level.max.div(100).times(s.items.length)); s.items = [] }, runPerSec: () => {} },
  {
    info: '再来一次!获得两个新法宝', useAble: true,
    start: (s) => {
      for (let i = 0; i < 2; i++) {
        const newItem = { name: randomItemName(), object: getRandomItem() }
        s.logTxt.splice(0, 0, randomNewItemLog(newItem.name) + '！')
        s.items.splice(0, 0, newItem)
      }
    },
    runPerSec: () => {},
  },
  {
    info: '耗费所有财富，每5000金购买新法宝，最多买10个', useAble: true,
    start: (s) => {
      for (; s.money.isGreaterThan(5000); s.money = s.money.minus(5000)) {
        const newItem = { name: randomItemName(), object: getRandomItem() }
        s.logTxt.splice(0, 0, randomNewItemLog(newItem.name) + '！')
        s.items.splice(0, 0, newItem)
        if (s.items.length > 10) break
      }
    },
    runPerSec: () => {},
  },
  { info: '耗费所有名声寻找长生之道，每100名气换取10秒', useAble: true, start: (s) => { const t = s.renown.div(100).dp(0); s.renown = s.renown.minus(t.times(100)); s.life = s.life.plus(t) }, runPerSec: () => {} },
  { info: '换个地方重新出发，将立场回归中立', useAble: true, start: (s) => { s.standPoint = new BigNumber(0); s.stand = stands.find(s.standPoint) }, runPerSec: () => {} },

  // 常驻类
  { info: '每秒获得等同修练十次的一般修为', useAble: false, start: () => {}, runPerSec: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(s.body.num)) } },
  { info: '每秒获得等同境界容量之万分之一的一般修为', useAble: false, start: () => {}, runPerSec: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(s.level.max.div(100000))) } },
  { info: '每秒获得当前修为之万分之一的一般修为', useAble: false, start: () => {}, runPerSec: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(s.point.div(100000))) } },
  { info: '每秒可获得1点财富', useAble: false, start: () => {}, runPerSec: (s) => { s.money = s.money.plus(1) } },
  { info: '每秒可获得1点名气', useAble: false, start: () => {}, runPerSec: (s) => { s.renown = s.renown.plus(1) } },
  { info: '每秒可获得1点寿元', useAble: false, start: () => {}, runPerSec: (s) => { s.life = s.life.plus(1) } },
  { info: '可持续增加正派心性', useAble: false, start: () => {}, runPerSec: (s) => { s.standPerSec = s.standPerSec.plus(2) } },
  { info: '古神使用过的道具，持续堕落滋长魔性', useAble: false, start: () => {}, runPerSec: (s) => { s.standPerSec = s.standPerSec.minus(2) } },
]

function getRandomItem(): ItemData {
  return items[Math.floor(Math.random() * items.length)]
}

export { items, getRandomItem }
