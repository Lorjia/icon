## 问题
- Hero 区域的“开始浏览图标”按钮没有绑定点击事件，因此点击无任何效果（src/components/Hero.tsx:72）。
- 目标行为：点击后滚动到图标展示区域，便于用户立即浏览搜索结果/图标列表。

## 方案
1. 为按钮添加点击处理：`onClick={() => document.getElementById('icons')?.scrollIntoView({ behavior: 'smooth' })}`。
2. 给结果区添加锚点：在 `src/components/ResultsGrid.tsx` 的根 `section` 增加 `id="icons"`，与导航/按钮的锚点一致。
3. 可选增强：若未来恢复 `IconShowcase`，保持该组件也使用相同 `id`，确保跳转统一。

## 变更文件
- `src/components/Hero.tsx`：为按钮添加 `onClick` 点击事件。
- `src/components/ResultsGrid.tsx`：根 `section` 增加 `id="icons"`。

## 验收
- 点击按钮页面平滑滚动到图标列表区域。
- 无报错，兼容桌面与移动端。