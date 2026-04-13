# 我欲修仙

一款修仙放置类网页游戏，水墨仙风主题，在浏览器中体验修仙世界的境界突破、功法修炼、秘境探索。

## 在线体验

直接用浏览器打开即可，无需服务器。

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build
```

## 游戏玩法

### 修炼体系
- **修炼**：点击修炼按钮，消耗时间积累修为
- **境界突破**：修为达到上限自动突破，获得寿命奖励
- **破碎虚空**：境界圆满后超脱当前世界，进入更高维度的「重天」

### 功法与法宝
- **身体升级**：提升每次修炼获得的修为
- **灵根升级**：增加可同时修炼的功法数量
- **学习功法**：消耗修为获得新功法，功法自动产出修为
- **寻找法宝**：消耗修为探索秘境，法宝提供被动/主动加成

### 门派与副本
- **拜师学艺**：花费名望加入门派，获得门派加成
- **金盆洗手**：退出门派重归散修
- **献祭赌博**：献祭金币给古神，博取命运馈赠
- **信仰贡献**：贡献寿元给神明，换取庇佑

### 阵营系统
- 行为影响阵营值，阵营值决定正道/邪道/中立
- 不同阵营对修为产出有不同加成

### 传承录
- 游戏事件自动记录
- 存档系统：记录传承密钥 / 接受传承 / 重新做人

## 技术栈

- **Vue 3.5** + Composition API
- **Vite 8** (Rolldown 统一打包器)
- **TypeScript 6**
- **BigNumber.js v10** — 高精度数值计算
- **LZString** — 存档压缩

## 架构设计

### 核心策略：BigNumber + Vue 3 Proxy 冲突解决方案

BigNumber.js 实例不能被 Vue 3 的 Proxy 代理（会触发无限递归），因此采用：

- **纯 JS 对象 `gs`**：存储游戏状态，不经过 Vue 响应式
- **`ref` 计数器 `updateTick`**：每次修改 gs 后 +1，作为更新信号
- **`display()` 响应式层**：`useDisplayState` composable 提供 `display(() => expr)` 函数，自动追踪 tick 信号

### 组件架构

```
子组件直接调用 useGameState() 获取 gs / display / 操作函数
→ 无需 props 传递，App.vue 极简
```

### 项目结构

```
src/
  main.ts              - 入口
  App.vue              - 主组件（组合入口）
  components/
    CultivationPanel.vue   - 修炼面板（修为核心 + 境界 + 世界）
    StatusTable.vue        - 道途境况（寿命/阵营/名望/财富/门派）
    SkillTable.vue         - 功法修炼（身体/灵根/功法列表）
    DungeonPanel.vue       - 秘境副本（献祭/信仰）
    ItemTable.vue          - 法宝器物（法宝列表 + 操作）
    SavePanel.vue          - 传承录（日志 + 存档）
  composables/
    useGameState.ts        - 状态 + 组合入口
    useDisplayState.ts     - display() 响应式层
    useGameLoop.ts         - requestAnimationFrame 游戏循环
    usePlayerActions.ts    - 玩家操作（修炼/升级/法宝）
    useWorldActions.ts     - 世界操作（门派/副本/突破）
    useSaveActions.ts      - 存档操作
  data/
    types.ts               - 核心类型定义
    constants.ts           - 游戏常量
    levels.ts              - 境界/身体/灵根数据
    skills.ts              - 功法数据
    items.ts               - 法宝数据
    stands.ts              - 阵营数据
    groups.ts              - 门派/副本数据
    names.ts               - 随机名称
  utils/
    numFilter.ts           - 数字格式化
    save.ts                - 存档系统（LZString 压缩）
  styles/
    game.css               - 水墨仙风主题样式
```

## UI 主题：水墨仙风

- **配色**：墨黑底 `#0a0c10` + 金色 `#d4af55` + 翠玉 `#6abf8a` + 朱砂 `#c94040` + 灵蓝 `#5b8dd9` + 紫雾 `#9b6fc0`
- **字体**：马善政书法体（标题）+ Noto Serif SC 衬线体（正文）
- **组件体系**：ink-card / ink-row / ink-cell / ink-btn / ink-progress / ink-divider / ink-badge / ink-scroll

## 许可证

MIT
