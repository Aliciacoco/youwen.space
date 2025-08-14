// lightbox.js — 一处引入，全站可用
(function () {
  let group = [], idx = 0, startX = 0;

  // 创建覆盖层（只创建一次）
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = `
    <button class="lb-btn lb-prev" aria-label="上一张">‹</button>
    <img class="lb-img" alt="">
    <button class="lb-btn lb-next" aria-label="下一张">›</button>
    <button class="lb-close" aria-label="关闭">×</button>
  `;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(lb));

  //获取图片元素的工具函数
  const imgEl = () => lb.querySelector('.lb-img');
  //打开图片的方法
  const openAt = (list, i) => {
    group = list; idx = (i + group.length) % group.length;
    imgEl().src = group[idx].dataset.large || group[idx].src;
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  };
  //关闭图片的方法
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; imgEl().src = ''; };
  //切换图片的方法
  const jump = d => openAt(group, idx + d);

  // 打开：事件委托，点击任意 .img-row img
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('.img-row img')) {
      const box = t.closest('.img-row');
      const list = [...box.querySelectorAll('img')];
      openAt(list, list.indexOf(t));
    } else if (t === lb) {
      close(); // 点遮罩空白关闭
    }
  });

  // 控件点击
  lb.addEventListener('click', e => {
    if (e.target.classList.contains('lb-prev')) jump(-1);
    if (e.target.classList.contains('lb-next')) jump(1);
    if (e.target.classList.contains('lb-close')) close();
  });

  // 键盘：← → Esc
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') jump(-1);
    if (e.key === 'ArrowRight') jump(1);
    if (e.key === 'Escape') close();
  });

  // 触摸滑动切换（手机）
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) jump(dx > 0 ? -1 : 1);
  }, { passive: true });
})();
