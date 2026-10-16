# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库性质

这是一个**纯静态页面部署仓库**，不包含源码。仓库里只有已构建好的 HTML/CSS/JS 产物；源码（React + Vite + Tailwind 项目）放在别处，编译后才把产物拷贝到这里。`package.json` 是构建脚本的副本，`node_modules/` 已在 `.gitignore` 里——本仓库内**不要尝试 `pnpm install` / `pnpm dev`**，跑不起来。

## 入口结构

四个独立入口，每个都是一个完整可双击打开的 HTML：

| 文件 | 形态 | 说明 |
| --- | --- | --- |
| `index.html` | 引用 `assets/index-*.js` + `assets/index-*.css` | 每日喝水。需要随上游构建更新这两份带 hash 的 bundle |
| `checkIn.html` | 单文件，`<style>` 与 `<script>` 内联 | 打卡助手。改这一个文件即可 |
| `feishu.html` | 单文件，所有 CSS 与数据内联 | 「通往 AGI 之路」文章分类索引。改这一个文件即可 |
| `list/index.html` | 引用 `list/assets/*.js` + `*.css` | 任务管理（晨光便签）。**源码不对外开放**，对外文档维持「暂未开源」口径。具体源仓库位置见 `CLAUDE.LOCAL.md` |

`build.flag` 是上游构建留下的标记文件，没有功能性含义。`icons/` 下的 PNG 是各入口的 favicon。

## 修改时的要点

- **`index.html` / `list/index.html`**：HTML 壳子本身通常不需要改；若改，要么同步修改上游源码，要么只调整 title/meta/图标这种壳层字段。带 hash 的 JS/CSS 文件名不要手改，会和构建对不上。
- **`list/` 下的所有文件**：是源仓库构建后的只读产物，**不要在本仓库直接编辑**。任何功能/UI/数据改动都要在源仓库做、重新构建后再拷贝进来。源仓库路径、构建命令、拷贝步骤、踩坑提示见 `CLAUDE.LOCAL.md`。
- **`checkIn.html` / `feishu.html`**：单文件，所有逻辑与样式都在文件内。直接编辑即可。
- **新增工具**：参考 `checkIn.html` 的「单文件 + 内联 style/script」形态最简单；若选择走构建产物的形态，注意 bundle 也要由上游构建流程产出并拷贝进来。
- **数据存储**：四个入口都用浏览器本地存储（`localStorage` / `IndexedDB`），不连后端。新功能不要引入网络请求或鉴权逻辑。
- **README.md**：是用户面向的对外文档。用户明确要求**不要写技术栈（React/Vite/Tailwind）和本地开发命令**，按「一组静态 HTML 工具，双击 HTML 即可使用」的口径描述；`list/index.html` 写「源码暂未开源」。

## 图标

`icons/water.png`、`icons/checkin.png` 分别是 `index.html`、`checkIn.html` 的 favicon。`list/fav.png` 是任务管理的图标。修改后保持文件名不变即可。
