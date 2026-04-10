/**
 * 游戏主循环 — requestAnimationFrame 驱动的 tick 和秒循环
 */
import BigNumber from 'bignumber.js'
import type { GameState } from '@/data/types'
import { TICK_INTERVAL, SEC_INTERVAL, AUTOSAVE_TICKS, STAND_LIMIT } from '@/data/constants'
import { autoSave } from '@/utils/save'

export interface GameLoopCallbacks {
  onTick: () => void
  onSec: () => void
  onDeath: () => void
}

let timerId: number | null = null
let then = 0
let secThen = 0
let autosaveSec = 0

export function useGameLoop(gs: GameState, callbacks: GameLoopCallbacks) {
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
