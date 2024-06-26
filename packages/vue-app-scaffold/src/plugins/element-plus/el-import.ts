import type { App } from 'vue'

import setting from '@/settings/projectSetting'

import fullLoadEl from './fullLoad'
import loadOnRemand from './loadOnDemand'

export function setupElementPlus(app: App) {
  if (setting.loadOnDemandEl) {
    return loadOnRemand(app)
  } else {
    return fullLoadEl(app, { size: setting.elementSize })
  }
}
