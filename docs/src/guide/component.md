# 组件开发规范

[src/components](https://github.com/zgsgs/zgsgs/packges/components) 下新增组件需遵从以下规范。

## 目录结构

```bash
├── components
│   ├── example
│   │   ├── src
│   │   │   ├── example.less
│   │   │   ├── example.ts
│   │   │   ├── example.vue
│   │   │   ├── example-other.ts
│   │   └── index.ts
```

## `index.ts` 作为统一出口

``` ts
// Example/index.ts
import { withInstall } from '@tg-ui/utils/with-install'
import Example from './src/example.vue'

const TgExample = withInstall(Example)

export { TgExample }
export default TgExample

```

## 组件示例、文档

当你完成了一个组件开发，在提交 PR 之前，请更新 Demo 示例，以及编写相关文档。

文档仓库地址：[tg-ui](https://github.com/zgsgs/tg-ui)

文档编写模版：[Example](../components/example)
