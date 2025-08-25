const el = document.getElementById('line');
// 先把每个字包成 <span class="char">（略）

el.addEventListener('click', (e) => {
  const s = e.target.closest('span.char'); // ← 这里在事件里“拿到”被点的 span
  if (!s) return;
  speak(s.textContent);
});