/**
 * 游戏主循环 — requestAnimationFrame 驱动的 tick 和秒循环
 *
 * 优化：timerId/then/secThen/autosaveSec 全部收入闭包，
 * 避免模块级变量被多实例共享，符合 Vue 3 composable 最佳实践。
 */
import type { GameState } from '@/data/types'
import { TICK_INTERVAL, SEC_INTERVAL, AUTOSAVE_TICKS } from '@/data/constants'
import { autoSave } from '@/utils/save'

export interface GameLoopCallbacks {
  onTick: () => void
  onSec: () => void
  onDeath: () => void
}

export function useGameLoop(gs: GameState, callbacks: GameLoopCallbacks) {
  let timerId: number | null = null
  let then = 0
  let secThen = 0
  let autosaveSec = 0

  function startTimer() {
    then = Date.now()
    secThen = Date.now()
    timerId = window.requestAnimationFrame(timerLoop)
  }

  function timerLoop() {
    const now = Date.now()
    const elapsed = now - then
    if (elapsed > TICK_INTERVAL) {
      then = now - (elapsed % TICK_INTERVAL)
      callbacks.onTick()
    }

    const secElapsed = now - secThen
    if (secElapsed > SEC_INTERVAL) {
      secThen = now - (secElapsed % SEC_INTERVAL)
      callbacks.onSec()
    }

    if (autosaveSec > AUTOSAVE_TICKS) {
      autosaveSec = 0
      autoSave(gs)
    }
    autosaveSec++

    if (gs.life.isEqualTo(0) || gs.life.isLessThan(0)) {
      callbacks.onDeath()
    } else {
      timerId = window.requestAnimationFrame(timerLoop)
    }
  }

  function stopTimer() {
    if (timerId !== null) {
      window.cancelAnimationFrame(timerId)
      timerId = null
    }
  }

  return { startTimer, stopTimer }
}
