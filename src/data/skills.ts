import BigNumber from 'bignumber.js'
import type { GameState, SkillData } from './types'

const skills: Record<string, SkillData> = {
  // 正统功法 a0
  a0_0: { id: 'a0_0', top: false, degree: '入门', info: '每秒增加10正统修为', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.plus(1); s.standPerSec = s.standPerSec.plus(1) }, num: new BigNumber(1), getPrev: () => null, getNext: () => skills.a0_1 },
  a0_1: { id: 'a0_1', top: false, degree: '初级', info: '每秒增加30正统修为', need: new BigNumber(2000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(3); s.standPerSec = s.standPerSec.plus(1) }, getPrev: () => skills.a0_0, getNext: () => skills.a0_2 },
  a0_2: { id: 'a0_2', top: false, degree: '中级', info: '每秒增加50正统修为', need: new BigNumber(10).pow(4).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.plus(5); s.standPerSec = s.standPerSec.plus(1) }, getPrev: () => skills.a0_1, getNext: () => skills.a0_3 },
  a0_3: { id: 'a0_3', top: false, degree: '高级', info: '每秒增加200正统修为', need: new BigNumber(10).pow(5).times(7), run: (s) => { s.pointPerSec = s.pointPerSec.plus(20); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a0_2, getNext: () => skills.a0_4 },
  a0_4: { id: 'a0_4', top: false, degree: '进阶', info: '每秒增加2,000正统修为', need: new BigNumber(10).pow(7).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.plus(200); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a0_3, getNext: () => skills.a0_5 },
  a0_5: { id: 'a0_5', top: false, degree: '精通', info: '每秒增加10,000正统修为', need: new BigNumber(10).pow(9).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.plus(1000); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a0_4, getNext: () => skills.a0_6 },
  a0_6: { id: 'a0_6', top: false, degree: '高手', info: '每秒增加3,333,000正统修为', need: new BigNumber(10).pow(11), run: (s) => { s.pointPerSec = s.pointPerSec.plus(333300); s.standPerSec = s.standPerSec.plus(3) }, getPrev: () => skills.a0_5, getNext: () => skills.a0_7 },
  a0_7: { id: 'a0_7', top: false, degree: '大师', info: '每秒增加50,505,050正统修为，增加1点寿元', need: new BigNumber(10).pow(12), run: (s) => { s.pointPerSec = s.pointPerSec.plus(5050505); s.standPerSec = s.standPerSec.plus(3); s.life = s.life.plus(1) }, getPrev: () => skills.a0_6, getNext: () => skills.a0_8 },
  a0_8: { id: 'a0_8', top: true, degree: '宗师', info: '每秒增加111,111,110正统修为，增加2点寿元', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(11111111); s.standPerSec = s.standPerSec.plus(4); s.life = s.life.plus(2) }, getPrev: () => skills.a0_7, getNext: () => null },

  // 先苦后甘型 a1
  a1_0: { id: 'a1_0', top: false, degree: '入门', info: '每秒增加10正统修为', need: new BigNumber(1000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(1); s.standPerSec = s.standPerSec.plus(1) }, num: new BigNumber(1), getPrev: () => null, getNext: () => skills.a1_1 },
  a1_1: { id: 'a1_1', top: false, degree: '初级', info: '每秒增加30正统修为', need: new BigNumber(5000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(3); s.standPerSec = s.standPerSec.plus(1) }, getPrev: () => skills.a1_0, getNext: () => skills.a1_2 },
  a1_2: { id: 'a1_2', top: false, degree: '中级', info: '每秒增加50正统修为', need: new BigNumber(10).pow(5), run: (s) => { s.pointPerSec = s.pointPerSec.plus(5); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a1_1, getNext: () => skills.a1_3 },
  a1_3: { id: 'a1_3', top: false, degree: '高级', info: '每秒增加100正统修为', need: new BigNumber(10).pow(6).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.plus(10); s.standPerSec = s.standPerSec.plus(3) }, getPrev: () => skills.a1_2, getNext: () => skills.a1_4 },
  a1_4: { id: 'a1_4', top: false, degree: '进阶', info: '每秒增加1,000正统修为，修行心性', need: new BigNumber(10).pow(8).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.plus(100); s.standPerSec = s.standPerSec.plus(5) }, getPrev: () => skills.a1_3, getNext: () => skills.a1_5 },
  a1_5: { id: 'a1_5', top: false, degree: '精通', info: '每秒增加10,000正统修为，修行心性、延年益寿', need: new BigNumber(10).pow(10).times(5), run: (s) => { s.pointPerSec = s.pointPerSec.plus(1000); s.standPerSec = s.standPerSec.plus(5); s.life = s.life.plus(1) }, getPrev: () => skills.a1_4, getNext: () => skills.a1_6 },
  a1_6: { id: 'a1_6', top: false, degree: '高手', info: '每秒增加200,000正统修为，修行心性、延年益寿', need: new BigNumber(10).pow(11), run: (s) => { s.pointPerSec = s.pointPerSec.plus(20000); s.standPerSec = s.standPerSec.plus(6); s.life = s.life.plus(1) }, getPrev: () => skills.a1_5, getNext: () => skills.a1_7 },
  a1_7: { id: 'a1_7', top: false, degree: '大师', info: '每秒增加3,000,000正统修为，修行心性、延年益寿', need: new BigNumber(10).pow(13), run: (s) => { s.pointPerSec = s.pointPerSec.plus(300000); s.standPerSec = s.standPerSec.plus(8); s.life = s.life.plus(1) }, getPrev: () => skills.a1_6, getNext: () => skills.a1_8 },
  a1_8: { id: 'a1_8', top: true, degree: '宗师', info: '每秒增加99,999,999,990正统修为，修行心性、延年益寿', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(9999999999); s.standPerSec = s.standPerSec.plus(10); s.life = s.life.plus(1) }, getPrev: () => skills.a1_7, getNext: () => null },

  // 纯练正功 a2
  a2_0: { id: 'a2_0', top: false, degree: '入门', info: '每秒增加10正统修为', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.plus(1); s.standPerSec = s.standPerSec.plus(1) }, num: new BigNumber(1), getPrev: () => null, getNext: () => skills.a2_1 },
  a2_1: { id: 'a2_1', top: false, degree: '初级', info: '每秒增加50正统修为', need: new BigNumber(5000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(5); s.standPerSec = s.standPerSec.plus(1) }, getPrev: () => skills.a2_0, getNext: () => skills.a2_2 },
  a2_2: { id: 'a2_2', top: false, degree: '中级', info: '每秒增加300正统修为', need: new BigNumber(10).pow(4).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.plus(30); s.standPerSec = s.standPerSec.plus(1) }, getPrev: () => skills.a2_1, getNext: () => skills.a2_3 },
  a2_3: { id: 'a2_3', top: false, degree: '高级', info: '每秒增加1,000正统修为', need: new BigNumber(10).pow(5).times(6), run: (s) => { s.pointPerSec = s.pointPerSec.plus(100); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a2_2, getNext: () => skills.a2_4 },
  a2_4: { id: 'a2_4', top: false, degree: '进阶', info: '每秒增加7,000正统修为', need: new BigNumber(10).pow(7), run: (s) => { s.pointPerSec = s.pointPerSec.plus(700); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a2_3, getNext: () => skills.a2_5 },
  a2_5: { id: 'a2_5', top: false, degree: '精通', info: '每秒增加90,000正统修为', need: new BigNumber(10).pow(8).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.plus(9000); s.standPerSec = s.standPerSec.plus(2) }, getPrev: () => skills.a2_4, getNext: () => skills.a2_6 },
  a2_6: { id: 'a2_6', top: false, degree: '高手', info: '每秒增加100,000正统修为', need: new BigNumber(10).pow(10), run: (s) => { s.pointPerSec = s.pointPerSec.plus(10000); s.standPerSec = s.standPerSec.plus(3) }, getPrev: () => skills.a2_5, getNext: () => skills.a2_7 },
  a2_7: { id: 'a2_7', top: false, degree: '大师', info: '每秒增加3,000,000正统修为', need: new BigNumber(10).pow(11), run: (s) => { s.pointPerSec = s.pointPerSec.plus(300000); s.standPerSec = s.standPerSec.plus(3) }, getPrev: () => skills.a2_6, getNext: () => skills.a2_8 },
  a2_8: { id: 'a2_8', top: true, degree: '宗师', info: '每秒增加500,000,000正统修为', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(50000000); s.standPerSec = s.standPerSec.plus(4) }, getPrev: () => skills.a2_7, getNext: () => null },

  // 中立功法 b0
  b0_0: { id: 'b0_0', top: false, degree: '入门', info: '每秒增加10一般修为', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(1)) }, getPrev: () => null, getNext: () => skills.b0_1 },
  b0_1: { id: 'b0_1', top: false, degree: '初级', info: '每秒增加40一般修为', need: new BigNumber(2000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(4)) }, getPrev: () => skills.b0_0, getNext: () => skills.b0_2 },
  b0_2: { id: 'b0_2', top: false, degree: '中级', info: '每秒增加100一般修为', need: new BigNumber(10).pow(4).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(10)) }, getPrev: () => skills.b0_1, getNext: () => skills.b0_3 },
  b0_3: { id: 'b0_3', top: false, degree: '高级', info: '每秒增加500一般修为，增加1点财富', need: new BigNumber(10).pow(5).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(50)); s.money = s.money.plus(1) }, getPrev: () => skills.b0_2, getNext: () => skills.b0_4 },
  b0_4: { id: 'b0_4', top: false, degree: '进阶', info: '每秒增加6,000一般修为，增加1点财富', need: new BigNumber(10).pow(6).times(8), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(600)); s.money = s.money.plus(1) }, getPrev: () => skills.b0_3, getNext: () => skills.b0_5 },
  b0_5: { id: 'b0_5', top: false, degree: '精通', info: '每秒增加60,000一般修为，增加2点财富', need: new BigNumber(10).pow(8).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(6000)); s.money = s.money.plus(2) }, getPrev: () => skills.b0_4, getNext: () => skills.b0_6 },
  b0_6: { id: 'b0_6', top: false, degree: '高手', info: '每秒增加990,000一般修为，增加2点财富和1点名气', need: new BigNumber(10).pow(9), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(99000)); s.money = s.money.plus(2); s.renown = s.renown.plus(1) }, getPrev: () => skills.b0_5, getNext: () => skills.b0_7 },
  b0_7: { id: 'b0_7', top: false, degree: '大师', info: '每秒增加2,020,000一般修为，增加2点财富和2点名气', need: new BigNumber(10).pow(10), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(202000)); s.money = s.money.plus(2); s.renown = s.renown.plus(2) }, getPrev: () => skills.b0_6, getNext: () => skills.b0_8 },
  b0_8: { id: 'b0_8', top: true, degree: '宗师', info: '每秒增加33,110,000一般修为，增加3点财富和2点名气', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(3311000)); s.money = s.money.plus(3); s.renown = s.renown.plus(2) }, getPrev: () => skills.b0_7, getNext: () => null },

  // 修财富 b1
  b1_0: { id: 'b1_0', top: false, degree: '入门', info: '每秒增加10一般修为', need: new BigNumber(200), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(1)) }, getPrev: () => null, getNext: () => skills.b1_1 },
  b1_1: { id: 'b1_1', top: false, degree: '初级', info: '每秒增加20一般修为，增加1点财富', need: new BigNumber(600), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(2)); s.money = s.money.plus(1) }, getPrev: () => skills.b1_0, getNext: () => skills.b1_2 },
  b1_2: { id: 'b1_2', top: false, degree: '中级', info: '每秒增加100一般修为，增加1点财富', need: new BigNumber(5000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(10)); s.money = s.money.plus(1) }, getPrev: () => skills.b1_1, getNext: () => skills.b1_3 },
  b1_3: { id: 'b1_3', top: false, degree: '高级', info: '每秒增加300一般修为，增加2点财富和1点名气', need: new BigNumber(10).pow(4).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(30)); s.money = s.money.plus(2); s.renown = s.renown.plus(1) }, getPrev: () => skills.b1_2, getNext: () => skills.b1_4 },
  b1_4: { id: 'b1_4', top: false, degree: '进阶', info: '每秒增加2,000一般修为，增加3点财富和2点名气', need: new BigNumber(10).pow(5).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(200)); s.money = s.money.plus(3); s.renown = s.renown.plus(2) }, getPrev: () => skills.b1_3, getNext: () => skills.b1_5 },
  b1_5: { id: 'b1_5', top: false, degree: '精通', info: '每秒增加10,000一般修为，增加4点财富和3点名气', need: new BigNumber(10).pow(6).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(1000)); s.money = s.money.plus(4); s.renown = s.renown.plus(3) }, getPrev: () => skills.b1_4, getNext: () => skills.b1_6 },
  b1_6: { id: 'b1_6', top: false, degree: '高手', info: '每秒增加400,000一般修为，增加5点财富和4点名气', need: new BigNumber(10).pow(8), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(40000)); s.money = s.money.plus(5); s.renown = s.renown.plus(4) }, getPrev: () => skills.b1_5, getNext: () => skills.b1_7 },
  b1_7: { id: 'b1_7', top: false, degree: '大师', info: '每秒增加600,000一般修为，增加8点财富和5点名气', need: new BigNumber(10).pow(9), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(600000)); s.money = s.money.plus(8); s.renown = s.renown.plus(8) }, getPrev: () => skills.b1_6, getNext: () => skills.b1_8 },
  b1_8: { id: 'b1_8', top: true, degree: '宗师', info: '每秒增加9,000,000一般修为，增加10点财富和5点名气', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(900000)); s.money = s.money.plus(10); s.renown = s.renown.plus(5) }, getPrev: () => skills.b1_7, getNext: () => null },

  // 耗财 b2
  b2_0: { id: 'b2_0', top: false, degree: '入门', info: '每秒增加10一般修为', need: new BigNumber(100), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(1)) }, getPrev: () => null, getNext: () => skills.b2_1 },
  b2_1: { id: 'b2_1', top: false, degree: '初级', info: '每秒增加20一般修为', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(2)) }, getPrev: () => skills.b2_0, getNext: () => skills.b2_2 },
  b2_2: { id: 'b2_2', top: false, degree: '中级', info: '每秒增加80一般修为', need: new BigNumber(2000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(8)) }, getPrev: () => skills.b2_1, getNext: () => skills.b2_3 },
  b2_3: { id: 'b2_3', top: false, degree: '高级', info: '每秒增加200一般修为', need: new BigNumber(8000), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(20)); s.money = s.money.plus(1) }, getPrev: () => skills.b2_2, getNext: () => skills.b2_4 },
  b2_4: { id: 'b2_4', top: false, degree: '进阶', info: '每秒增加600一般修为', need: new BigNumber(10).pow(4).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(60)); s.money = s.money.plus(2) }, getPrev: () => skills.b2_3, getNext: () => skills.b2_5 },
  b2_5: { id: 'b2_5', top: false, degree: '精通', info: '每秒增加10,000一般修为，修练十分昂贵，耗费2点财富', need: new BigNumber(10).pow(6), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(1000)); s.money = s.money.minus(2) }, getPrev: () => skills.b2_4, getNext: () => skills.b2_6 },
  b2_6: { id: 'b2_6', top: false, degree: '高手', info: '每秒增加200,000一般修为，修练十分昂贵，耗费4点财富', need: new BigNumber(10).pow(7), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(20000)); s.money = s.money.minus(4) }, getPrev: () => skills.b2_5, getNext: () => skills.b2_7 },
  b2_7: { id: 'b2_7', top: false, degree: '大师', info: '每秒增加3,000,000一般修为，修练十分昂贵，耗费8点财富', need: new BigNumber(10).pow(8), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(300000)); s.money = s.money.minus(8) }, getPrev: () => skills.b2_6, getNext: () => skills.b2_8 },
  b2_8: { id: 'b2_8', top: true, degree: '宗师', info: '每秒增加777,000,000一般修为，修练十分昂贵，耗费10点财富', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.plus(s.stand.num.times(77700000)); s.money = s.money.minus(10) }, getPrev: () => skills.b2_7, getNext: () => null },

  // 邪派功法 c0
  c0_0: { id: 'c0_0', top: false, degree: '入门', info: '每秒增加20邪派修为', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.minus(2); s.standPerSec = s.standPerSec.minus(1) }, getPrev: () => null, getNext: () => skills.c0_1 },
  c0_1: { id: 'c0_1', top: false, degree: '初级', info: '每秒增加100邪派修为', need: new BigNumber(2000), run: (s) => { s.pointPerSec = s.pointPerSec.minus(10); s.standPerSec = s.standPerSec.minus(1) }, getPrev: () => skills.c0_0, getNext: () => skills.c0_2 },
  c0_2: { id: 'c0_2', top: false, degree: '中级', info: '每秒增加400邪派修为', need: new BigNumber(10).pow(4), run: (s) => { s.pointPerSec = s.pointPerSec.minus(40); s.standPerSec = s.standPerSec.minus(2) }, getPrev: () => skills.c0_1, getNext: () => skills.c0_3 },
  c0_3: { id: 'c0_3', top: false, degree: '高级', info: '每秒增加1,000邪派修为', need: new BigNumber(10).pow(5).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.minus(100); s.standPerSec = s.standPerSec.minus(2) }, getPrev: () => skills.c0_2, getNext: () => skills.c0_4 },
  c0_4: { id: 'c0_4', top: false, degree: '进阶', info: '每秒增加30,000邪派修为', need: new BigNumber(10).pow(6).times(5), run: (s) => { s.pointPerSec = s.pointPerSec.minus(3000); s.standPerSec = s.standPerSec.minus(3) }, getPrev: () => skills.c0_3, getNext: () => skills.c0_5 },
  c0_5: { id: 'c0_5', top: false, degree: '精通', info: '每秒增加550,000邪派修为', need: new BigNumber(10).pow(8), run: (s) => { s.pointPerSec = s.pointPerSec.minus(55000); s.standPerSec = s.standPerSec.minus(4) }, getPrev: () => skills.c0_4, getNext: () => skills.c0_6 },
  c0_6: { id: 'c0_6', top: false, degree: '高手', info: '每秒增加12,300,000邪派修为', need: new BigNumber(10).pow(9).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.minus(1230000); s.standPerSec = s.standPerSec.minus(5) }, getPrev: () => skills.c0_5, getNext: () => skills.c0_7 },
  c0_7: { id: 'c0_7', top: false, degree: '大师', info: '每秒增加55,555,500邪派修为', need: new BigNumber(10).pow(11), run: (s) => { s.pointPerSec = s.pointPerSec.minus(5555550); s.standPerSec = s.standPerSec.minus(8) }, getPrev: () => skills.c0_6, getNext: () => skills.c0_8 },
  c0_8: { id: 'c0_8', top: true, degree: '宗师', info: '每秒增加333,333,300邪派修为', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.minus(33333330); s.standPerSec = s.standPerSec.minus(10) }, getPrev: () => skills.c0_7, getNext: () => null },

  // 初期用 c1
  c1_0: { id: 'c1_0', top: false, degree: '入门', info: '每秒增加50邪派修为，污染道心', need: new BigNumber(500), run: (s) => { s.pointPerSec = s.pointPerSec.minus(5); s.standPerSec = s.standPerSec.minus(1) }, getPrev: () => null, getNext: () => skills.c1_1 },
  c1_1: { id: 'c1_1', top: false, degree: '初级', info: '每秒增加500邪派修为，污染道心', need: new BigNumber(3000), run: (s) => { s.pointPerSec = s.pointPerSec.minus(50); s.standPerSec = s.standPerSec.minus(5) }, getPrev: () => skills.c1_0, getNext: () => skills.c1_2 },
  c1_2: { id: 'c1_2', top: false, degree: '中级', info: '每秒增加8,000邪派修为，污染道心', need: new BigNumber(10).pow(4).times(5), run: (s) => { s.pointPerSec = s.pointPerSec.minus(800); s.standPerSec = s.standPerSec.minus(10) }, getPrev: () => skills.c1_1, getNext: () => skills.c1_3 },
  c1_3: { id: 'c1_3', top: false, degree: '高级', info: '每秒增加60,000邪派修为，污染道心', need: new BigNumber(10).pow(5).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.minus(6000); s.standPerSec = s.standPerSec.minus(12) }, getPrev: () => skills.c1_2, getNext: () => skills.c1_4 },
  c1_4: { id: 'c1_4', top: false, degree: '进阶', info: '每秒增加444,000邪派修为，污染道心', need: new BigNumber(10).pow(5).times(6), run: (s) => { s.pointPerSec = s.pointPerSec.minus(44400); s.standPerSec = s.standPerSec.minus(14) }, getPrev: () => skills.c1_3, getNext: () => skills.c1_5 },
  c1_5: { id: 'c1_5', top: false, degree: '精通', info: '每秒增加6,666,660邪派修为，污染道心', need: new BigNumber(10).pow(6), run: (s) => { s.pointPerSec = s.pointPerSec.minus(666666); s.standPerSec = s.standPerSec.minus(16) }, getPrev: () => skills.c1_4, getNext: () => skills.c1_6 },
  c1_6: { id: 'c1_6', top: false, degree: '高手', info: '每秒增加8,888,880邪派修为，污染道心', need: new BigNumber(10).pow(7), run: (s) => { s.pointPerSec = s.pointPerSec.minus(888888); s.standPerSec = s.standPerSec.minus(18); s.renown = s.renown.minus(7); s.life = s.life.minus(5) }, getPrev: () => skills.c1_5, getNext: () => skills.c1_7 },
  c1_7: { id: 'c1_7', top: true, degree: '大师', info: '每秒增加11,111,110邪派修为，污染道心', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.minus(1111111); s.standPerSec = s.standPerSec.minus(20); s.renown = s.renown.minus(8); s.life = s.life.minus(10) }, getPrev: () => skills.c1_6, getNext: () => null },

  // 难练 c2
  c2_0: { id: 'c2_0', top: false, degree: '入门', info: '每秒增加50邪派修为，邪功练法诡谲损害名气', need: new BigNumber(10).pow(4), run: (s) => { s.pointPerSec = s.pointPerSec.minus(5); s.standPerSec = s.standPerSec.minus(1); s.renown = s.renown.minus(1) }, getPrev: () => null, getNext: () => skills.c2_1 },
  c2_1: { id: 'c2_1', top: false, degree: '初级', info: '每秒增加60邪派修为，邪功练法诡谲损害名气', need: new BigNumber(10).pow(6), run: (s) => { s.pointPerSec = s.pointPerSec.minus(6); s.standPerSec = s.standPerSec.minus(1); s.renown = s.renown.minus(2) }, getPrev: () => skills.c2_0, getNext: () => skills.c2_2 },
  c2_2: { id: 'c2_2', top: false, degree: '中级', info: '每秒增加70邪派修为，邪功练法诡谲损害名气', need: new BigNumber(10).pow(7), run: (s) => { s.pointPerSec = s.pointPerSec.minus(7); s.standPerSec = s.standPerSec.minus(2); s.renown = s.renown.minus(3) }, getPrev: () => skills.c2_1, getNext: () => skills.c2_3 },
  c2_3: { id: 'c2_3', top: false, degree: '高级', info: '每秒增加80邪派修为，邪功练法诡谲、损名伤身', need: new BigNumber(10).pow(7).times(2), run: (s) => { s.pointPerSec = s.pointPerSec.minus(8); s.standPerSec = s.standPerSec.minus(2); s.renown = s.renown.minus(4); s.life = s.life.minus(1) }, getPrev: () => skills.c2_2, getNext: () => skills.c2_4 },
  c2_4: { id: 'c2_4', top: false, degree: '进阶', info: '每秒增加90邪派修为，邪功练法诡谲、损名伤身', need: new BigNumber(10).pow(7).times(3), run: (s) => { s.pointPerSec = s.pointPerSec.minus(9); s.standPerSec = s.standPerSec.minus(3); s.renown = s.renown.minus(5); s.life = s.life.minus(1) }, getPrev: () => skills.c2_3, getNext: () => skills.c2_5 },
  c2_5: { id: 'c2_5', top: false, degree: '精通', info: '每秒增加100邪派修为，邪功练法诡谲、损名伤身', need: new BigNumber(10).pow(7).times(4), run: (s) => { s.pointPerSec = s.pointPerSec.minus(10); s.standPerSec = s.standPerSec.minus(4); s.renown = s.renown.minus(6); s.life = s.life.minus(3) }, getPrev: () => skills.c2_4, getNext: () => skills.c2_6 },
  c2_6: { id: 'c2_6', top: false, degree: '高手', info: '每秒增加200邪派修为，邪功练法诡谲、损名伤身', need: new BigNumber(10).pow(7).times(5), run: (s) => { s.pointPerSec = s.pointPerSec.minus(20); s.standPerSec = s.standPerSec.minus(5); s.renown = s.renown.minus(7); s.life = s.life.minus(5) }, getPrev: () => skills.c2_5, getNext: () => skills.c2_7 },
  c2_7: { id: 'c2_7', top: false, degree: '大师', info: '每秒增加500邪派修为，邪功练法诡谲、损名伤身', need: new BigNumber(10).pow(9), run: (s) => { s.pointPerSec = s.pointPerSec.minus(50); s.standPerSec = s.standPerSec.minus(6); s.renown = s.renown.minus(8); s.life = s.life.minus(10) }, getPrev: () => skills.c2_6, getNext: () => skills.c2_8 },
  c2_8: { id: 'c2_8', top: true, degree: '宗师', info: '每秒增加11,111,111,111,110邪派修为，邪功总算大成', need: new BigNumber(10).pow(16), run: (s) => { s.pointPerSec = s.pointPerSec.minus(1111111111111); s.standPerSec = s.standPerSec.minus(7); s.renown = s.renown.minus(10); s.life = s.life.minus(100) }, getPrev: () => skills.c2_7, getNext: () => null },
}

function getRandomSkill(): SkillData {
  const rand = Math.random()
  if (rand < 0.2) {
    const c = [skills.c0_0, skills.c1_0, skills.c2_0]
    return c[Math.floor(Math.random() * c.length)]
  } else if (rand < 0.5) {
    const a = [skills.a0_0, skills.a1_0, skills.a2_0]
    return a[Math.floor(Math.random() * a.length)]
  } else {
    const b = [skills.b0_0, skills.b1_0, skills.b2_0]
    return b[Math.floor(Math.random() * b.length)]
  }
}

export { skills, getRandomSkill }
