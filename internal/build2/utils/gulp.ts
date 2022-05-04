import type { TaskFunction } from 'gulp'
import { buildRoot } from '../config/paths'
import { run } from './process'

// 携带任务名称
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

// 执行任务
export const runTask = (name: string) =>
  withTaskName(`shellTask: ${name}`, () => {
    run(`pnpm run build ${name}`, buildRoot)
  })

