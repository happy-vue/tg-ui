import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import type { SourceFile } from 'ts-morph'
import { ModuleKind, Project, ScriptTarget } from 'ts-morph'
import { parallel, series } from 'gulp'
import { run, withTaskName } from './utils'
import { outDir, projectRoot, tgRoot } from './utils/paths'
import { buildConfig } from './utils/config'

export const genEntryTypes = async () => {
  const files = await glob('*.ts', {
    cwd: tgRoot,
    absolute: true,
    onlyFiles: true,
  })

  const project = new Project({
    compilerOptions: {
      declaration: true,
      module: ModuleKind.ESNext,
      allowJs: true,
      emitDeclarationOnly: true,
      noEmitOnError: false,
      outDir: path.resolve(outDir, 'entry/types'),
      target: ScriptTarget.ESNext,
      rootDir: tgRoot,
      strict: false,
    },
    skipFileDependencyResolution: true,
    tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  })
  const sourceFiles: SourceFile[] = []
  files.map((f) => {
    const sourceFile = project.addSourceFileAtPath(f)
    sourceFiles.push(sourceFile)
    return f
  })
  await project.emit({
    emitOnlyDtsFiles: true,
  })
  const tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filepath), { recursive: true })
      await fs.writeFile(
        filepath,
        outputFile.getText().split('@tg-ui').join('.'),
        'utf8',
      )
    }
  })
  await Promise.all(tasks)
}

export const copyEntryTypes = () => {
  const src = path.resolve(outDir, 'entry/types')
  const copy = (module) => {
    return parallel(
      withTaskName(`copyEntryTypes:${module}`, async () => {
        await run(
          `cp -r ${src}/* ${path.resolve(
            outDir,
            buildConfig[module].output.path,
          )}/`,
        )
      }),
    )
  }
  return parallel(copy('esm'), copy('cjs'))
}

export const genTypes = series(genEntryTypes, copyEntryTypes())
