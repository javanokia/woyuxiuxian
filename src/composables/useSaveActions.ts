/**
 * 存档操作 — 存档、读档、清除
 */
import type { GameState } from '@/data/types'
import { saveGame, loadGame, autoLoad, clearSave, applySaveData } from '@/utils/save'

export function useSaveActions(gs: GameState, tick: () => void) {
  function showData() {
    gs.record = saveGame(gs)
    tick()
  }

  function loadData() {
    const data = loadGame(gs.record)
    if (data) applySaveData(gs, data)
    tick()
  }

  function clearData() {
    const isClear = confirm('果断放弃所有因缘，重新来过！')
    if (isClear) {
      clearSave()
      window.location.reload()
    }
  }

  function tryAutoLoad() {
    const data = autoLoad()
    if (data) applySaveData(gs, data)
  }

  return { showData, loadData, clearData, tryAutoLoad }
}
