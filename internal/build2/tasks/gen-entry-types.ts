import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import type { SourceFile } from 'ts-morph'
import { ModuleKind, Project, ScriptTarget } from 'ts-morph'
import { parallel, series } from 'gulp'
import { buildOutput, tsConfigRoot, uiRoot, uiTypeOutput } from '../config/paths'
import { bundleConfig } from '../config/bundle'
import type { Module } from '../config/bundle'
import { run, withTaskName } from '../utils'

export const genEntryTypesTask = async () => {
  const files = await glob('*.ts', {
    cwd: uiRoot,
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
      outDir: uiTypeOutput,
      target: ScriptTarget.ESNext,
      rootDir: uiRoot,
      strict: false,
    },
    skipFileDependencyResolution: true,
    tsConfigFilePath: tsConfigRoot,
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
  const copy = (module: Module) => {
    return parallel(
      withTaskName(`copyEntryTypes:${module}`, async () => {
        await run(
          `cp -r ${uiTypeOutput}/* ${path.resolve(
            buildOutput,
            bundleConfig[module as Module].output.path,
          )}/`,
        )
      }),
    )
  }
  return parallel(copy('esm'), copy('cjs'))
}

export const genEntryTypes = series(genEntryTypesTask, copyEntryTypes())
