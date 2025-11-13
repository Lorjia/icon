## 目标
- 接入 iTunes Search API，支持按区域（中国 CN、美国 US、日本 JP、韩国 KR）搜索应用并展示图标。
- 支持多格式下载：PNG、JPEG、WebP、ICO，并显示下载进度与完成通知。
- 实现收藏夹功能（本地存储），无需账号登录与同步。

## API 接入
- 请求格式：`https://itunes.apple.com/search?term=<关键词>&country=<区域>&media=software&entity=<软件类型>&limit=<数量>`
- 关键参数：
  - `term`：URL 编码的搜索词（空格用 `+`，其他字符按 URL 编码规范）。
  - `country`：区域代码，支持 `CN/US/JP/KR`。
  - `media`：固定为 `software`。
  - `entity`：`software | iPadSoftware | macSoftware`（默认 `software`）。
  - `limit`：默认 50，可配置 1–200。
  - `lang`：可选；日本区域设置为 `ja_jp`，其他区域使用默认 `en_us`。
- 结果字段：使用 `trackId`, `trackName`, `artworkUrl60/100/512` 等，优先展示 `artworkUrl512`（若缺失则回退到较小尺寸）。

## 组件与状态架构
- 状态管理：`zustand`
  - `searchStore`：关键词、区域、实体类型、结果列表、加载状态、错误信息。
  - `downloadStore`：每个下载任务的进度（0–100）、状态（idle/downloading/completed/failed）。
  - `favoritesStore`：收藏列表（以 `trackId` 为主键），持久化到 `localStorage`。
- 组件：
  - `SearchBar`：输入关键词并触发搜索，内置防抖与回车提交。
  - `RegionSelector`：区域选择（CN/US/JP/KR）与实体类型选择（软件/iPad/mac）。
  - `ResultsGrid`：搜索结果网格；每个卡片展示图标、名称、下载量（若无则省略）。
  - `ResultCard`：包含收藏按钮、下载菜单（PNG/JPEG/WebP/ICO）、下载进度条、完成提示。
  - `Toast`：统一通知（成功/失败）。
  - `DownloadProgressBar`：下载进度（从 `downloadStore` 读取）。

## 搜索流程
- `searchItunes(term, country, entity, limit)`：构造 URL（严格 URL 编码），发起请求并解析 JSON。
- 错误处理：网络失败、限流/429、空结果、字段缺失（无 `artworkUrl512` 时降级）。
- 对日本区域：增加 `lang=ja_jp` 参数；其他区域默认。

## 图标下载与格式转换
- 原始图标下载：优先 `artworkUrl512`，使用 `fetch` + `ReadableStream` 实现进度回调（依据 `Content-Length`）。
- 格式转换：
  - 使用 `<canvas>` 将图片绘制后 `canvas.toBlob(type)` 生成不同格式：
    - PNG：`image/png`
    - JPEG：`image/jpeg`（支持质量调节）
    - WebP：`image/webp`
  - ICO：生成 16/32/48/64（按需要）多尺寸位图，再打包为 ICO 二进制；若浏览器环境限制，提供降级策略：提供 256px PNG 作为替代，同时保留 ICO 生成选项（兼容性提示）。
- 下载保存：创建 `Blob` 后通过 `URL.createObjectURL` 触发保存；文件名格式：`<trackName>-<size>.<ext>`。

## 下载进度与完成通知
- 进度实现：`response.body.getReader()` 按 chunk 读取，累计字节并根据 `Content-Length` 计算百分比；下载与转换分别维护进度阶段（下载/转换/保存）。
- 通知：
  - 成功：显示 “下载完成” Toast，自动消失且可点击打开文件（或提示保存完成）。
  - 失败：显示错误信息（网络/转换失败）。

## 收藏夹（本地存储）
- 数据结构：`{ trackId, trackName, artworkUrl512, country, entity }`。
- `favoritesStore`：
  - `toggleFavorite(item)`：添加/移除。
  - `isFavorite(trackId)`：状态查询。
  - `persist`：启动时从 `localStorage` 读取，变更时写入（使用 `JSON.stringify`）。
- UI：结果卡片右上角心形按钮（填充表示已收藏），提供“只看收藏”过滤。

## 错误处理与边界情况
- 无结果：展示空状态与建议关键词（示例：应用名称、公司名）。
- 跨域：iTunes API 支持跨域；若遇到 CORS 异常，提示使用服务端代理（可选后续增强）。
- 速率限制：退避重试，提示用户稍后重试。
- `Content-Length` 缺失：进度以已下载字节近似估计或切换为不确定状态的加载条。

## 验收标准
- 能在 CN/US/JP/KR 四个区域搜索并展示结果图标。
- 每个结果可选择 PNG/JPEG/WebP/ICO 任一格式下载；有进度显示与完成通知。
- 收藏夹功能可用、刷新后仍保留；支持“只看收藏”过滤。
- UI 响应式，移动端可用。

## 实施步骤
1. 新增 API 服务模块：`services/itunes.ts`（URL 构造、请求、解析）。
2. 创建 `zustand` stores：`searchStore`, `downloadStore`, `favoritesStore`（含持久化）。
3. 实现组件：`SearchBar`, `RegionSelector`, `ResultsGrid`, `ResultCard`, `FormatDownloadMenu`, `DownloadProgressBar`, `Toast`。
4. 编写图片下载与转换工具：`lib/image.ts`（加载、canvas 绘制、`toBlob` 转换），`lib/download.ts`（进度读取、保存）。
5. 集成到首页：导航搜索联动、区域选择、结果展示、收藏与下载。
6. 自测：区域切换、不同格式下载与进度、收藏持久化、错误场景。

## 后续优化（可选）
- 批量下载与打包压缩（ZIP）。
- 更丰富的筛选：iPhone/iPad/Mac 平台、付费/免费。
- 服务端代理以提升稳定性与缓存命中。

请确认以上方案；确认后我将开始实现并交付可运行的功能。