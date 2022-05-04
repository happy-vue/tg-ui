import { dirname, relative, resolve } from 'path'
import fs from 'fs/promises'
import { parallel, series } from 'gulp'
import glob from 'fast-glob' // 同步查找文件
import { Project } from 'ts-morph'
import type { SourceFile } from 'ts-morph'
// sfc 解析
import * as VueCompiler from '@vue/compiler-sfc'
import type { Module, ModuleName } from '../config/bundle'
import { pathRewriter, run } from '../utils'
import { buildOutput, componentTypeOutput, projectRoot, tsConfigRoot, typesOutput, vueComponentRoot } from '../config/paths'

// 临时索引
let index = 1
// 编译组件类型
export async function genTypesTask() {
  const project = new Project({
    // 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: typesOutput, // 输出文件地址
      baseUrl: projectRoot, // 编译文件地址
      paths: {
        '@tg-ui/*': ['packages/*'],
      }, // 路径映射
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: tsConfigRoot, // tsconfig配置文件
    skipAddingFilesFromTsConfig: true, // 跳过从 tsconfig 添加文件
  })

  // 打包 packages 目录 正则匹配所有的 js vue ts
  const filePaths = await glob('**/*.{js(x),ts(x),vue}', {
    // ** 任意目录  * 任意文件
    cwd: vueComponentRoot,
    onlyFiles: true,
    absolute: true,
  })

  const sourceFiles: SourceFile[] = []

  await Promise.all(
    filePaths.map(async (file) => {
      // vue 文件解析后放入
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8') // 读取文件内容
        const sfc = VueCompiler.parse(content) // sfc 解析
        const { script, scriptSetup } = sfc.descriptor // 分割 脚本 和 setup 部分
        if (script || scriptSetup) {
          let content = script?.content ?? '' // 拿到脚本  icon.vue.ts  => icon.vue.d.ts

          // 编译 setup
          if (scriptSetup) {
            const compiled = VueCompiler.compileScript(sfc.descriptor, {
              id: `${index++}`, // 源码中是为解析 CSS 变量而存在的, 这里只需提供一个索引即可
            })
            // 编译后产物组合
            content += compiled.content
          }

          // 获取脚本语言类型
          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${relative(process.cwd(), file)}.${lang}`,
            content,
          )
          // 放入源文件数组
          sourceFiles.push(sourceFile)
        }
      }
      else {
        // 其他文件直接放入
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
  )
  await project.emit({
    // 默认是放到内存中的
    emitOnlyDtsFiles: true,
  })

  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput()
    const tasks = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(dirname(filepath), {
        recursive: true,
      })
      await fs.writeFile(filepath, pathRewriter('es' as Module)(outputFile.getText()))
    })
    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}

// 拷贝类型到 输出目录
function copyTypes() {
  const copy = (module: ModuleName) => {
    const output = resolve(buildOutput, module, 'components')
    return () => run(`cp -r ${componentTypeOutput}/* ${output}`)
  }
  return parallel(copy('es'), copy('lib'))
}

export const genTypes = series(genTypesTask, copyTypes())
