// api/posts.js — Vercel Serverless Function
// 用 Vercel Blob 存储 posts.json（追加写入）
// 前置：在 Vercel 项目 Storage 里创建 Blob store，并启用 Read-Write Token（会注入环境变量）
// 文档：https://vercel.com/docs/vercel-blob

import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  const FILE_KEY = 'posts.json';

  if (req.method === 'OPTIONS') {
    // 简单的 CORS 处理（同域通常不需要；保留以便本地测试）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: FILE_KEY });
      if (!blobs.length) {
        return res.status(200).json([]);
      }
      const url = blobs[0].url;
      const r = await fetch(url);
      const json = await r.json();
      return res.status(200).json(json);
    } catch (e) {
      console.error('GET /api/posts error', e);
      return res.status(500).json({ error: 'Failed to read posts' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newPost = req.body;
      // 简单校验
      if (!newPost?.id || !newPost?.title) {
        return res.status(400).json({ error: 'Missing id or title' });
      }

      // 读取现有
      let current = [];
      try {
        const { blobs } = await list({ prefix: FILE_KEY });
        if (blobs.length) {
          const url = blobs[0].url;
          const r = await fetch(url);
          current = await r.json();
        }
      } catch {}

      // 追加并去重（按 id）
      const map = new Map();
      [...current, newPost].forEach(p => map.set(p.id, p));
      const next = Array.from(map.values()).sort((a,b)=> (b.date||'').localeCompare(a.date||''));

      // 写回 Blob（public，便于 GET 读取）
      await put(FILE_KEY, JSON.stringify(next, null, 2), {
        access: 'public',
        contentType: 'application/json; charset=utf-8',
      });

      return res.status(201).json({ ok: true });
    } catch (e) {
      console.error('POST /api/posts error', e);
      return res.status(500).json({ error: 'Failed to write post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
