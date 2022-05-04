/**
 * 安装依赖 pnpm install fast-glob -w -D
 */
import fs from 'fs/promises'
import path from 'path'
import { parallel, series } from 'gulp'
import { rollup } from 'rollup'
import type { OutputOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import glob, { sync } from 'fast-glob' // 同步查找文件
import { Project } from 'ts-morph'
import type { SourceFile } from 'ts-morph'
import * as VueCompiler from '@vue/compiler-sfc'
import { pathRewriter, run } from '../utils'
import { buildOutput, projectRoot, vueComponentRoot } from '../config/paths'
import type { Module } from '../config/bundle'
import { bundleConfig } from '../config/bundle'

// 打包每个组件
const buildEachComponent = async () => {
  // 查找 components 下所有的组件目录 ["icon", "button", ...]
  const files = sync('*', {
    cwd: vueComponentRoot,
    onlyDirectories: true, // 只查找文件夹
  })

  // 分别把components文件夹下的组件，放到dist/es/components下 和 dist/lib/components
  const builds = files.map(async (file: string) => {
    // 找到每个组件的入口文件 index.ts
    const input = path.resolve(vueComponentRoot, file, 'index.ts')
    const config = {
      input,
      plugins: [nodeResolve(), typescript(), vue(), commonjs()],
      external: id => /^vue/.test(id) || /^@tg-ui/.test(id), // 排除掉vue和@w-plus的依赖
    }
    const bundle = await rollup(config)
    const options = Object.values(bundleConfig).map(config => ({
      format: config.format,
      file: path.resolve(config.output.path, `components/${file}/index.js`),
      paths: pathRewriter(config.output.name as Module), // @tg-ui => tg-ui/es tg-ui/lib  处理路径
      exports: 'named',
    }))

    await Promise.all(
      options.map(option => bundle.write(option as OutputOptions)),
    )
  })

  return Promise.all(builds)
}

async function genTypes() {
  const project = new Project({
    // 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(buildOutput, 'types'),
      baseUrl: projectRoot,
      paths: {
        '@tg-ui/*': ['packages/*'],
      },
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  })

  const filePaths = await glob('**/*', {
    // ** 任意目录  * 任意文件
    cwd: vueComponentRoot,
    onlyFiles: true,
    absolute: true,
  })

  const sourceFiles: SourceFile[] = []

  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8')
        const sfc = VueCompiler.parse(content)
        const { script } = sfc.descriptor
        if (script) {
          const content = script.content // 拿到脚本  icon.vue.ts  => icon.vue.d.ts
          const sourceFile = project.createSourceFile(`${file}.ts`, content)
          sourceFiles.push(sourceFile)
        }
      }
      else {
        const sourceFile = project.addSourceFileAtPath(file) // 把所有的ts文件都放在一起 发射成.d.ts文件
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
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      })
      await fs.writeFile(filepath, pathRewriter('es' as Module)(outputFile.getText()))
    })
    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}

function copyTypes() {
  const src = path.resolve(buildOutput, 'types/components/')
  const copy = (module) => {
    const output = path.resolve(buildOutput, module, 'components')
    return () => run(`cp -r ${src}/* ${output}`)
  }
  return parallel(copy('es'), copy('lib'))
}

async function buildComponentEntry() {
  const config = {
    input: path.resolve(vueComponentRoot, 'index.ts'),
    plugins: [typescript()],
    external: () => true,
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(bundleConfig)
      .map(config => ({
        format: config.format,
        file: path.resolve(config.output.path, 'components/index.js'),
      }))
      .map(config => bundle.write(config as OutputOptions)),
  )
}

export const buildComponent = series(
  buildEachComponent,
  genTypes,
  copyTypes(),
  buildComponentEntry,
)
