# 由闻之境 · Vercel 部署（瀑布流 + 弹窗 + 新增并保存服务端）

## 结构
- index.html — 前端（静态）
- api/posts.js — Serverless 后端（Vercel Functions，使用 Vercel Blob 存 posts.json）

## 一键部署步骤
1) 推到 GitHub 仓库（保持此目录结构）。
2) 在 Vercel 导入仓库创建项目。
3) 在 Vercel 控制台 -> Storage -> Create -> 选择 **Blob**，创建一个 Blob Store，并启用 **Read-Write** token（默认会注入环境变量）。
4) 重新部署。访问站点，点击左下角“＋ 新增卡片”提交后会：
   - 前端立即显示；
   - 后端写入 Blob 的 `posts.json`；
   - 下次打开会通过 GET /api/posts 读取线上数据。

## 注意
- 如果你要私有访问，可把 Blob access 改成 private，并在函数中用临时签名 URL 读取；当前示例为 public 便于入门。
- 若改用数据库（Supabase / Vercel Postgres / Mongo Atlas），只需把 `api/posts.js` 里的读取/写入逻辑替换为对应 SDK 即可。
