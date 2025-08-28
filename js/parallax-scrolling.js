// 仅当 <body data-feature="parallax-scrolling"> 时启用本模块  
if (document.body.dataset.feature === 'parallax-scrolling') {
    const title = document.querySelector('.title');
    let ticking = false;

    // 滚动事件：用 requestAnimationFrame 降低频率提升性能
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                // 计算角度：周期性摇摆，防止抖动
                const angle = Math.sin(y / 300) * 10;
                title.style.transform = `translate(-50%, ${y}px) rotate(${angle}deg)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}