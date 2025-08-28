// 仅当 <body data-feature="parallax-scrolling"> 时启用本模块 
if (document.body.dataset.feature === 'parallax-scrolling') {
    //获取要移动的文字
        const title = document.querySelector('.title');
        //监听滚动事件
        window.addEventListener('scroll',()=>{
            //获取滚动距离
            const y = window.scrollY;
            console.log(y);
            // 设置变换：下落 + 摇摆
            // Math.sin(y / 30)周期性正弦函数，输出值在 -1 ~ +1 之间来回变化：
            const angle = Math.sin(y / 300) * 10; 
            title.style.transform = `translate(-50%, ${y}px) rotate(${angle}deg)`;
         });

}
