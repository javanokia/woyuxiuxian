const attr1 = [
  '九阳', '九阴', '八九', '至尊', '无极', '太虚', '洪荒', '天幻', '妙空', '妙有',
  '纯阳', '道真', '九龙', '真幻', '大藏', '天魔', '圣魔', '神魔', '天佛', '菩提',
  '青龙', '白虎', '凤凰', '玄武', '腾蛇', '麒麟', '般若', '烛龙', '盛灭', '末法',
  '千鹤', '万剑', '刹那', '卍咒', '皇霸', '真龙', '灭绝', '如来', '三圣', '九天',
  '九煌', '轩辕', '日月', '星辰', '绝尘', '太清', '圣言', '死海', '地狱', '狂天',
  '伏羲', '女娲', '洪荒', '真武', '万象', '太乙', '乾元', '混元', '梵天', '轮迴',
  '真禅', '火源', '梦迴', '圣极', '绝念', '空幻', '七色', '虹辉', '三才', '太元',
  '圣灵', '朔望', '梦彩', '宿飞', '星迴', '紫霄', '千峰', '苦叹', '圣殇', '绝华',
]

const attr2 = [
  '紫霞', '七星', '星霞', '古蜀', '红霞', '幻海', '赤焰', '飞星', '炼狱', '紫光',
  '流剑', '绝刀', '八卦', '双燕', '迷魂', '墨羽', '定海', '闪光', '星爆', '弥勒',
  '灵蛇', '水镜', '飞雪', '洛英', '森罗', '碧云', '天狼', '孤星', '天照', '流光',
  '五彩', '天罗', '碎星', '定天', '极乐', '八卦', '天蚕', '地藏', '巽风', '风舞',
  '血阳', '苍羽', '屠罗', '飞霜', '流风', '狂岚', '无双', '星月', '真日', '证道',
  '四象', '虚空', '浪涛', '迷魂', '阴阳', '灵霄', '太岁', '太白', '极上', '轮转',
  '孤月', '弦月', '怒涛', '凄煌', '灵狐', '转生', '无垠', '无垢', '无限', '百仙',
  '天罡', '仁王', '修罗', '罗刹', '菩萨', '蛇蝎', '五毒', '虎啸', '莲花', '七曜',
  '风雨', '百花', '金光', '六道', '巨灵', '琉璃', '七宝', '潇湘', '缥缈', '无痕',
  '无量', '勾魂', '离梦', '苍穹', '昊天', '冥道', '绝渊', '破天', '十方', '威震',
]

const typeName = [
  '功', '图', '咒', '录', '诀', '谱', '典', '书', '经', '卷',
  '抄', '法', '术',
]

const itemNameArr = [
  '谱', '琴', '画', '卷', '萧', '盒', '镜', '扇', '瓶', '珠',
  '剑', '刀', '钟', '鼎', '印', '石', '如意', '玉', '旗', '杖',
  '伞', '塔', '笔', '环', '鼓', '枪', '镯', '轮', '壶', '尺',
]

const attrType = [
  '圣', '禁', '大', '秘', '真', '古', '绝', '神', '灵', '奇',
  '宝', '之', '无上', '神仙', '心',
]

const groupNameArr = [
  '世家', '教', '派', '门', '帮', '会', '堂', '楼', '宫', '寺',
  '宗', '大寨', '峰', '道', '院', '殿', '观',
]

const sengokuName = [
  '石', '晶', '陨', '珠',
]

function randomSkillName(): string {
  const a1 = attr1[Math.floor(Math.random() * attr1.length)]
  const a2 = attr2[Math.floor(Math.random() * attr2.length)]
  const t = typeName[Math.floor(Math.random() * typeName.length)]
  const a = attrType[Math.floor(Math.random() * attrType.length)]

  const rand = Math.random()
  if (rand < 0.2) { return a1 + a2 + a + t }
  else if (rand < 0.4) { return a2 + a1 + a + t }
  else if (rand < 0.6) { return a1 + a + t }
  else if (rand < 0.8) { return a2 + a + t }
  else { return a1 + a2 + t }
}

function randomItemName(): string {
  const a1 = attr1[Math.floor(Math.random() * attr1.length)]
  const a2 = attr2[Math.floor(Math.random() * attr2.length)]
  const a3 = attr2[Math.floor(Math.random() * attr2.length)]
  const i = itemNameArr[Math.floor(Math.random() * itemNameArr.length)]
  const a = attrType[Math.floor(Math.random() * attrType.length)]

  const rand = Math.random()
  if (rand < 0.2) { return a1 + a2 + i }
  else if (rand < 0.4) { return a2 + a1 + i }
  else if (rand < 0.6) { return a1 + '之' + i }
  else if (rand < 0.8) { return a2 + '之' + i }
  else { return a3 + a2 + i }
}

function randomWorldName(): string {
  return attr1[Math.floor(Math.random() * attr1.length)]
}

function randomGroupName(): string {
  const a2 = attr2[Math.floor(Math.random() * attr2.length)]
  const g = groupNameArr[Math.floor(Math.random() * groupNameArr.length)]
  return a2 + g
}

function randomNewSkillLog(randName: string): string {
  const rand = Math.random()
  if (rand < 0.2) { return '不慎摔下山谷！大难不死，竟习得' + randName }
  else if (rand < 0.4) { return '侥倖获得古神遗物！获得' + randName + '传承' }
  else if (rand < 0.6) { return '偶遇千年大机缘！习得' + randName }
  else if (rand < 0.8) { return '获上玄真尊青睐，赏赐' + randName }
  else { return '系统当机大放送，轻松学得' + randName }
}

function randomNewItemLog(randName: string): string {
  const rand = Math.random()
  if (rand < 0.2) { return '潜入封印的门派禁地，寻得' + randName }
  else if (rand < 0.4) { return '原来祖上身分非凡，在自家仓库捡到' + randName }
  else if (rand < 0.6) { return '前辈高人遇难，临死前转赠' + randName }
  else if (rand < 0.8) { return '在二手拍卖市场捡漏，慧眼独具买到' + randName }
  else { return '随身系统的抽奖机中大奖！获得' + randName }
}

export {
  randomSkillName,
  randomItemName,
  randomWorldName,
  randomGroupName,
  randomNewSkillLog,
  randomNewItemLog,
}
