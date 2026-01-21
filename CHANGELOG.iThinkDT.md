# iThinkDT CHANGELOG

## Next Version

## 1.8.2 [naive: 2.43.2] (2026-01-21)

- `n-image` 新增参数 `onPreviewDownload`，点击下载执行的回调，若不传则执行默认下载

## 1.8.1 [naive: 2.43.2] (2025-11-18)

- 同步 naive-ui `2.43.2`

- `n-upload` 新增参数 `to`，当 `abstract` 为 `true` 时，指定上传组件挂载的目标元素

## 1.8.0 [naive: 2.43.1] (2025-10-20)

- 同步 naive-ui `2.43.1`

## 1.7.3 [naive: 2.42.0] (2025-08-12)

- `n-tree` 暴露 `setDragStart`，以支持跨窗口拖拽

## 1.7.2 [naive: 2.42.0] (2025-07-17)

- 重构 fork

## 1.7.0 [naive: 2.42.0] (2025-07-16)

- 同步 naive-ui `2.42.0`

## 1.6.5 [naive: 2.41.1] (2025-07-15)

- 修复 `n-image` 预览工具条的样式

## 1.6.4 [naive: 2.41.1] (2025-07-15)

- 修复 `n-image` 预览支持 namespace

## 1.6.3 [naive: 2.41.1] (2025-06-17)

- `n-form-border` 新增组件

## 1.6.2 [naive: 2.41.1] (2025-06-16)

- 同步 naive-ui `2.41.1`

## 1.5.6 [naive: 2.40.1] (2024-10-12)

- `styleIsolate` 样式隔离时，内部组件被挂载于其他位置的 DOM 的类名

## 1.5.5 [naive: 2.40.1] (2024-10-12)

- `styleIsolate` 样式隔离时，特殊处理 `@` 定义。如 `@keyframes`

## 1.5.4 [naive: 2.40.1] (2024-10-08)

- `n-scrollbar` 添加参数 `abstract`，是否包裹 DOM 元素

## 1.5.3 [naive: 2.40.1] (2024-10-08)

- `n-scrollbar` 修复默认插槽参数错误

## 1.5.2 [naive: 2.40.1] (2024-10-08)

- `n-scrollbar` 默认插槽传递 `container` 和 `content` 的属性

## 1.5.1 [naive: 2.40.1] (2024-10-08)

- `n-avator` 添加参数 `radix`，文本内容的缩放系数

## 1.5.0 [naive: 2.40.1] (2024-09-30)

- 同步 naive-ui `2.40.1`

- `date-fns` 的 locale 资源直接从对应文件导入

## 1.4.6 [naive: 2.39.0] (2024-09-10)

- `n-config-provider` 的 `style-isolate` 生效时使用 `:where(.${namespace})`

## 1.4.5 [naive: 2.39.0] (2024-08-23)

- `use-style` 添加参数 `styleIsolate`，可单独控制是否隔离

## 1.4.4 [naive: 2.39.0] (2024-08-08)

- `n-config-provider` 添加 `style-isolate` 属性控制 `namespace` 是否应用到内部组件

## 1.4.3 [naive: 2.39.0] (2024-08-08)

- `n-config-provider` 的 `namespace` 应用到内部组件 style 标签的 `cssr-id`

## 1.4.2 [naive: 2.39.0] (2024-08-08)

- `n-config-provider` 的 `namespace` 应用到组件 style 标签的 `cssr-id`

## 1.4.1 [naive: 2.39.0] (2024-08-07)

- 修复 `date-fns` 打包

## 1.4.0 [naive: 2.39.0] (2024-08-07)

- 同步 naive-ui `2.39.0`

- `n-config-provider` 的 `namespace` 渲染到 NConfigProvider 的 class 中

- `n-data-picker` 移除 range 范围选择 `now` 操作

## 1.3.5 [naive: 2.38.2] (2024-06-05)

### Features

- `n-data-picker` range 范围选择支持 `now` 操作

## 1.3.4 [naive: 2.38.2] (2024-05-31)

### Fixes

- 修复 `n-data-table` 列 `fixed` 时，thead 被遮挡

## 1.3.3 [naive: 2.38.2] (2024-05-29)

### Fixes

- 修复 `n-data-table` 列 `fixed` 时，会被 `Upload` 的图片遮挡

## 1.3.2 [naive: 2.38.2] (2024-05-24)

### Features

- `n-data-table` 列配置增加 `csvTitle` 字段

## 1.3.1 [naive: 2.38.2] (2024-05-24)

### Fixes

- 修复 `generateCsv` 渲染标题 title 为 function 类型时的错误

## 1.3.0 [naive: 2.38.2] (2024-05-08)

- 同步 naive-ui `2.38.2`

## 1.2.6 [naive: 2.37.3] (2024-02-20)

- `n-icon` 属性 `component` 支持函数组件

## 1.2.5 [naive: 2.37.3] (2024-01-19)

- `n-dynamic-input` 修复无数据默认无创建按钮

## 1.2.4 [naive: 2.37.3] (2024-01-11)

- `n-dynamic-input` 修复创建按钮多一个

## 1.2.3 [naive: 2.37.3] (2024-01-11)

- `n-dynamic-input` 创建按钮传递正确的 `index`

## 1.2.2 [naive: 2.37.3] (2024-01-11)

- 同步 naive-ui `2.37.3`
- `n-dynamic-input` 新增 `always-show-create` 属性

## 1.2.1 [naive: 2.37.0] (2024-01-08)

- fix 文档

## 1.2.0 [naive: 2.37.0] (2024-01-08)

- 同步 naive-ui `2.37.0`

## 1.1.2 [naive: 2.36.0] (2023-12-21)

- 同步 naive-ui github

## 1.1.1 [naive: 2.36.0] (2023-12-20)

- 同步 naive-ui `2.36.0`
- 替换 `naive-ui` -> `ithinkdt-ui`

### Features

- `n-upload` 新增 `img-props` `previewed-img-props` 属性

## 1.0.3 [naive: 2.35.0] (2023-10-03)

- 同步 naive-ui `2.35.0`

## 1.0.2 [naive: 2.34.4] (2023-07-27)

## Refactors

- `n-scrollbar` 去除组件包裹，直接使用 `_internal` 内的组件

### Fixes

- 修复 `n-scrollbar` 丢失局部样式标记 `scopedId`

## 1.0.1 [naive: 2.34.4] (2023-07-26)

包发布测试

## 1.0.0 [naive: 2.34.4] (2023-07-25)

包发布测试
