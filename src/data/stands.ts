import BigNumber from 'bignumber.js'
import type { StandData, GameState, GroupData, DungeonData } from './types'

// 类型从此文件 re-export，保持向后兼容
export type { StandData, GameState, GroupData, DungeonData } from './types'

const _stands: Record<string, StandData> = {
  _0: {
    name: '天命圣人',
    num: new BigNumber(1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isGreaterThan(0)) { return pointPerSec.times(1.5) }
      else { return pointPerSec.times(0.8) }
    },
  },
  _1: {
    name: '名门正派',
    num: new BigNumber(1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isGreaterThan(0)) { return pointPerSec.times(1.3) }
      else { return pointPerSec.times(0.9) }
    },
  },
  _2: {
    name: '刚正不阿',
    num: new BigNumber(1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isGreaterThan(0)) { return pointPerSec.times(1.1) }
      else { return pointPerSec }
    },
  },
  _3: {
    name: '中立无为',
    num: new BigNumber(1),
    filter: (pointPerSec: BigNumber) => {
      return pointPerSec.abs().times(0.9)
    },
  },
  _4: {
    name: '阴险小人',
    num: new BigNumber(-1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isLessThan(0)) { return pointPerSec.abs().times(1.1) }
      else { return pointPerSec.times(-1) }
    },
  },
  _5: {
    name: '无恶不做',
    num: new BigNumber(-1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isLessThan(0)) { return pointPerSec.abs().times(1.3) }
      else { return pointPerSec.times(-0.9) }
    },
  },
  _6: {
    name: '混世魔头',
    num: new BigNumber(-1),
    filter: (pointPerSec: BigNumber) => {
      if (pointPerSec.isLessThan(0)) { return pointPerSec.abs().times(1.5) }
      else { return pointPerSec.times(-0.8) }
    },
  },
}

function findStand(num: BigNumber): StandData {
  if (num.gt(8000)) { return _stands._0 }
  else if (num.gt(5000)) { return _stands._1 }
  else if (num.gt(2000)) { return _stands._2 }
  else if (num.gt(-2000)) { return _stands._3 }
  else if (num.gt(-5000)) { return _stands._4 }
  else if (num.gt(-8000)) { return _stands._5 }
  else { return _stands._6 }
}

const stands = Object.assign(_stands, { find: findStand })

export { stands }
