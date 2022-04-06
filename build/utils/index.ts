import { projectRoot } from './paths'
import { spawn } from 'child_process'
export const withTaskName = <T>(name: string, fn: T) => Object.assign(fn, { displayName: name })

// 在node使用子进程来运行脚本
export const run = async (command: string) => {
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit', // 直接将这个子进程输出
      shell: true, // 默认情况下 linux才支持rm -rf (安装git bash可以支持)
    })
    app.on('close', resolve)
  })
}
