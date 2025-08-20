// 获取可拖动的元素
const moveBar = document.querySelector('.moveBar');
const wallet = document.querySelector('.container');

// 初始化变量
let mouseDownPos = { x: 0, y: 0 };  // 鼠标按下时的位置
let mouseBasicTrans = { x: 0, y: 0 };  // 记录元素的初始位置
let disX = 0, disY = 0;  // 鼠标的偏移量
let movable = false;  // 控制是否正在拖拽

// 鼠标按下时，记录鼠标初始位置
moveBar.addEventListener('mousedown', (e) => {
    mouseDownPos.x = e.clientX;
    mouseDownPos.y = e.clientY;
    movable = true;
    console.log(mouseDownPos.x,mouseDownPos.y)
});

// 鼠标移动时，更新位置
//使用 document.body 监听 mousemove 事件,在鼠标移动速度较快时，moveBar 能够平滑地跟随鼠标，而不会出现 过快或拖拽失效的情况。
document.body.addEventListener('mousemove', (e) => {
    if (movable) {
        disX = mouseBasicTrans.x + (e.clientX - mouseDownPos.x);  // 计算新的位置
        disY = mouseBasicTrans.y + (e.clientY - mouseDownPos.y);
        // 使用 CSS transform 属性实时更新位置
        wallet.style.transform = `translate(${disX}px, ${disY}px)`;
        //console.log(moveBar.style.transform)
    }
});

// 鼠标松开时，停止拖拽
moveBar.addEventListener('mouseup', () => {
    movable = false;  // 停止拖拽
    mouseBasicTrans.x = disX;  // 更新元素的位置
    mouseBasicTrans.y = disY;
});
//#endregion