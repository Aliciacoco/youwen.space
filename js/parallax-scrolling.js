// 仅当 <body data-feature="parallax-scrolling"> 时启用本模块 
if (document.body.dataset.feature === 'parallax-scrolling') {
    // 获取滚动容器
    const container = document.querySelector('.content-scrolling');
    
    
    // 获取“20”数字元素
    const el = document.querySelector('.fixed-number'); 
    
    // 获取“20”和“25”的初始位置
    const el20 = document.querySelector('.fixed-number'); // "20"
    const el25 = document.querySelectorAll('.parallax')[3].querySelector('h1'); // "25"
    // 计算 "20" 到 "25" 之间的垂直距离，作为最大位移值
    const maxTranslateY = el25.offsetTop - el20.offsetTop; // 最大位移距离（即 20 和 25 之间的垂直距离）
    
    
    // 监听容器的滚动事件
    container.addEventListener('scroll', () => {
        
        // 获取当前滚动距离
        const y = container.scrollTop; 


        //效果一：让“20”向下慢慢移动
        // 固定“20”的反方向移动
        const translateY = Math.min(Math.round(y * 1.05), maxTranslateY); // 1.05 控制速度
        el.style.transform = `translateY(${translateY}px)`; 
        // 注意：由于滚动发生在容器内，先执行scroll再执行transform时，使用鼠标中键滚动时会出现抖动！

        //效果二：让字体颜色变化
        // 获取容器总高和可视高度
        const scrollHeight = container.scrollHeight;  // 容器总高
        const clientHeight = container.clientHeight;  // 容器可视高度

        //滚动进度 = 已滚动距离/可滚动距离
        const scrollProgress = y / (scrollHeight - clientHeight);  
        
        // 动态计算字体颜色
        const r = Math.min(255, Math.floor(255 * scrollProgress));  // 红色（从0到255）
        const g = Math.min(255, Math.floor(255 * (1 - scrollProgress)));  // 绿色（从255到0）
        const b = 200;  // 蓝色固定为 200

        // 动态设置所有 .parallax h1 元素的字体颜色
        document.querySelectorAll('.parallax h1').forEach(h1 => {
        h1.style.color = `rgb(${r}, ${g}, ${b})`;  // 根据滚动进度改变字体颜色
        });
    });
}
