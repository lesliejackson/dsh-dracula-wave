# Wave Terminal Dracula（`@local/dsh-dracula-wave`）

把 Wave Terminal 内置的 **Dracula** 终端配色移植到 DeepSeek Harness 的**内置深色模式**之上。轻量实现：没有 Host 逻辑、没有配置项、不注册新主题，只注入一张作用域限定在深色调色板的样式表。

## 生效方式

在 **设置 → 通用 → 外观** 选择「深色」；或保持「跟随系统」并让系统处于深色模式。浅色模式不受影响。

## 覆盖内容

- 深色底/面板/侧边栏：`#282A36` 底、`#21222C` 侧边栏、`#44475A` 选中行；
- 前景与次级文字：主文字在 Dracula 的 `#F8F8F2` 基础上调冷为 **`#D8D9E0`**（只改 `--dsw-alias-label-primary`，调色板的 50 号停靠点保持原值，所以由它派生的表面与混色不变），次级文字仍走 Dracula 灰阶；
- 强调色：紫 `#BD93F9`（品牌/信息/焦点环）、青 `#8BE9FD`（链接/图表）、粉 `#FF79C6`、绿 `#50FA7B`、红 `#FF5555`、黄 `#F1FA8C`、橙 `#FFB86C`；
- 代码高亮（shiki）按 Dracula ANSI 语义重映射；
- 文件 diff、JSON 树、菜单/悬浮表面等硬编码深色值一并调整。

调色板取自本机 Wave Terminal 的 `resources/app.asar/dist/bin/wavesrv.x64.exe` 内置 `termthemes.json` 中 `dracula` 主题的原始色值（背景 `#282a36`，ANSI 16 色 + bright 变体）。

## 限制

- 只改**内置深色模式**：样式表仅在解析结果为内置 `dark`（外观选「深色」，或「跟随系统」且系统为深色）时挂载；浅色模式和通过 `ctx.theme` 注册的第三方主题（如 Catppuccin）都不受本插件影响。
- 通过 `--dsw-*` 语义 token 覆盖实现；产品中少量固定内联 SVG / 图片（品牌图、文件类型图标等）不随主题变化。
- 禁用插件会立即移除样式表，恢复出厂深色配色。
