// 仅当 <body data-feature="drag-to-move"> 时启用本模块
if (document.body.dataset.feature === 'drag-to-move') {

    // 获取可拖动的元素
    const moveBar = document.querySelector('.moveBar');
    const container = document.querySelector('.container');

    // 初始化变量
    let mouseDownPos = { x: 0, y: 0 };  // 鼠标按下时的位置
    let mouseBasicTrans = { x: 0, y: 0 };  // 记录元素的初始位置
    let disX = 0, disY = 0;  // 鼠标的偏移量
    let movable = false;  // 控制是否正在拖拽

    // 监听元素
    moveBar.addEventListener('pointerdown', onPointerDown);
    // 为避免移动过快导致拖动区域失去监听，将move/up事件监听绑定在全局
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);


    // 鼠标按下时，记录鼠标初始位置
    function onPointerDown(e) {
        e.preventDefault(); // 防止触屏下变成页面滚动
        mouseDownPos.x = e.clientX;
        mouseDownPos.y = e.clientY;
        movable = true;
    }
    
    // 鼠标移动时，更新位置
    // 使用 document.body 监听 mousemove 事件,在鼠标移动速度较快时，moveBar 能够平滑地跟随鼠标，而不会出现 过快或拖拽失效的情况。
    function onPointerMove(e) {
        if (!movable) return;
        disX = mouseBasicTrans.x + (e.clientX - mouseDownPos.x);
        disY = mouseBasicTrans.y + (e.clientY - mouseDownPos.y);
        // 使用 CSS transform 属性实时更新位置
        container.style.transform = `translate(${disX}px, ${disY}px)`;
    }    
    

    // 鼠标松开时，停止拖拽
    function onPointerUp(e) {
        if (!movable) return;
        movable = false;
        mouseBasicTrans.x = disX;
        mouseBasicTrans.y = disY;
    }

    
    //#endregion
}

