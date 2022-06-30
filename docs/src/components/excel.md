# Excel

`excel` 导入导出操作。

依赖于 `xlsx`，具体文档可以参考 [xlsx](https://github.com/sheetjs/sheetjs)。

## Import

### Usage

``` vue
<script setup lang="ts">
import type { ExcelData } from '~/components/Excel'
import { ImportExcel } from '~/components/Excel'

interface Table {
  title: string
  dataSource: ExcelData[]
  columns: any[]
}

const tableList = ref<Table[]>([])
const importSuccess = (excelDataList: ExcelData[]) => {
  tableList.value = []
  for (const excelData of excelDataList) {
    const {
      header,
      results,
      meta: { sheetName }
    } = excelData
    const columns = []
    for (const title of header)
      columns.push({ title, dataIndex: title })

    tableList.value.push({ title: sheetName, dataSource: results, columns })
  }
}
</script>

<template>
  <import-excel @success="importSuccess" />
</template>
```

### Events

| 事件    | 回调参数                  | 说明       |
| ------- | ----------------------- | ---------- |
| success | (res:ExcelData) => void | 导入成功回调 |
| error   | (err) => void           | 导出错误    |

### ExcelData

| 属性    | 类型                   | 默认值 | 说明         |
| ------- | --------------------- | ----- | ----------- |
| header  | string[]              | -     | table 表头  |
| results | T[]                   | any[] | table 数据  |
| meta    | { sheetName: string } | -     | table title |

## Export

``` ts
import { aoaToSheetXlsx, jsonToSheetXlsx } from '~/components/Excel'
```

### 数组格式数据导出

``` ts
import { aoaToSheetXlsx } from '~/components/Excel'

// 保证 data 顺序与 header 一致
aoaToSheetXlsx({
  data: [],
  header: [],
  filename: '二维数组方式导出excel.xlsx'
})
```

### 自定义导出格式

``` ts
import { jsonToSheetXlsx } from '~/components/Excel'

jsonToSheetXlsx({
  data,
  filename,
  write2excelOpts: {
    // 可以是 xlsx/html/csv/txt
    bookType
  }
})
```

### json 格式导出

``` ts
import { jsonToSheetXlsx } from '~/components/Excel'

jsonToSheetXlsx({
  data,
  filename: '使用 key 作为默认头部.xlsx',
})

jsonToSheetXlsx({
  data,
  header: {
    id: 'ID',
    name: '姓名',
    age: '年龄',
    no: '编号',
    address: '地址',
    beginTime: '开始时间',
    endTime: '结束时间'
  },
  filename: '自定义头部.xlsx',
  json2sheetOpts: {
    // 指定顺序
    header: ['name', 'id']
  }
})
```

### Function

| 方法            | 回调参数                  | 返回值  | 说明                        |
| --------------- | ----------------------- | ------ | --------------------------- |
| jsonToSheetXlsx | `Function(JsonToSheet)` |        | json 格式数据，导出到 excel |
| aoaToSheetXlsx  | `Function(AoAToSheet)`  |        | 数组格式，导出到 excel      |

### JsonToSheet Type

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | `T[]` |  | JSON 对象数组 |
| header?: | `T`; |  | 表头未设置则取 JSON 对象的 `key` 作为 `header` |
| filename?: | `string` | `excel-list.xlsx` | 导出的文件名 |
| json2sheetOpts?: | `JSON2SheetOpts` |  | 调用 `XLSX.utils.json_to_sheet` 的可选参数 |
| write2excelOpts?: | `WritingOptions` | `{ bookType: 'xlsx' }` | 调用 `XLSX.writeFile` 的可选参数，具体参 XLSX 文档 |

### AoAToSheet Type

| 属性              | 类型            | 默认值                 | 说明                             |
| ----------------- | --------------- | ---------------------- | -------------------------------- |
| data              | T[][];          |                        | 二维数组                         |
| header?:          | T;              |                        | 表头 ；未设置则没有表头          |
| filename?:        | string;         | `excel-list.xlsx`      | 导出的文件名                     |
| write2excelOpts?: | WritingOptions; | `{ bookType: 'xlsx' }` | 调用 `XLSX.writeFile` 的可选参数 |
