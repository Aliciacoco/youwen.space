// 仅当 <body data-feature="wheel-pager"> 时启用本模块 
if (document.body.dataset.feature === 'wheel-pager') {

    // 实验一: 上下翻页******************************************************************************
    // 获取整个页面
    const containerUp = document.querySelector('.content-box-up');
    // 当前页的索引（初始为第1页）
    let currentIndexUp = 1;
    //监听滚轮wheel事件
    containerUp.addEventListener('wheel',(e)=>{
        // 阻止默认滚动行为
        e.preventDefault();
        // 输出滚动距离（调试用）
        console.log(e.deltaY )
        // 页面向上移动时，e.deltaY > 0
        if(e.deltaY > 0){
            // 最多到第4页
            if(currentIndexUp > 3){
                currentIndexUp = 4;
            }
            else{
                currentIndexUp++;
                console.log('当前页面序号',currentIndexUp)
            }
        }
        // 页面向下移动时，e.deltaY < 0
        else{
            // 最少到第1页
            if(currentIndexUp < 2 ){
                currentIndexUp = 1;
            }
            else{
                currentIndexUp--;
                console.log('当前页面序号',currentIndexUp)
            }
        }
        // 根据当前页更新整体位移
        containerUp.style.transform = `translateY(${-(currentIndexUp-1)*100}%)`; 
        console.log(containerUp.style.transform)
    })

    // 实验二: 左右翻页******************************************************************************

    // 获取整个页面
    const containerLeft = document.querySelector('.content-box-left');
    // 当前页的索引（初始为第1页）
    let currentIndexLeft = 1;

    //监听滚轮wheel事件
    containerLeft.addEventListener('wheel',(e)=>{
        // 阻止默认滚动行为
        e.preventDefault();
        // 输出滚动距离（调试用）
        console.log(e.deltaY)
        // 页面向上移动时，e.deltaX > 0
        if(e.deltaY > 0){
            // 最多到第4页
            if(currentIndexLeft > 3){
                currentIndexLeft = 4;
            }
            else{
                currentIndexLeft++;
                console.log('当前页面序号',currentIndexLeft)
            }
        }
        // 页面向下移动时，e.deltaX < 0
        else{
            // 最少到第1页
            if(currentIndexLeft < 2 ){
                currentIndexLeft = 1;
            }
            else{
                currentIndexLeft--;
                console.log('当前页面序号',currentIndexLeft)
            }
        }
        // 根据当前页更新整体位移
        containerLeft.style.transform = `translateX(${-(currentIndexLeft-1)*25}%)`; 
        console.log(containerLeft.style.transform)
    })
}
