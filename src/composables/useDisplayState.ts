/**
 * useDisplayState — 响应式显示层
 *
 * 问题：gs 是纯 JS 对象（BigNumber + Vue 3 Proxy 冲突），不能直接 reactive。
 * 旧方案：每个 computed 手动写 `props.updateTick` 来"骗"Vue 追踪依赖。
 *
 * 新方案：useDisplayState 提供一个 `display()` 函数，
 *   内部自动绑定 tick 信号，组件无需再手动引用 updateTick。
 */
import { computed, type Ref, type ComputedRef } from 'vue'

/** display() 返回的只读 computed 类型 */
export type DisplayRef<T> = Readonly<ComputedRef<T>>

export function useDisplayState(tickSignal: Ref<number>) {
  /**
   * 创建一个自动追踪 tick 信号的 computed。
   * 传入一个 getter 函数，返回只读 ComputedRef。
   */
  function display<T>(getter: () => T): DisplayRef<T> {
    return computed(() => {
      void tickSignal.value // 追踪 tick 信号，确保每次 tick 后 computed 重新求值
      return getter()
    }) as DisplayRef<T>
  }

  return { display }
}
