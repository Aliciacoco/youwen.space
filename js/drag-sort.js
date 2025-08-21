// 仅当 <body data-feature="drag-sort"> 时启用本模块
if (document.body.dataset.feature === 'drag-sort') {

//#region STEP1:拖拽某个竖条

//初始化变量
let blocksArr = [...document.querySelectorAll('.one-unit')];
let draggedItem = null;  // 当前拖动的元素
let unitMouseDownPos = { x: 0, y: 0 };  // 鼠标按下时的位置
let unitMouseBasicTrans = { x: 0, y: 0 };  // 记录元素的初始位置
let unitMovable = false;  // 控制是否正在拖拽
let unitdisX = 0, unitdisY = 0;  // 鼠标的偏移量
let moveWidth;

//监听元素
blocksArr.forEach(item => {
item.addEventListener('pointerdown', handleMouseDown, { passive: false });
});
// 为避免移动过快导致拖动区域失去监听，将move/up事件监听绑定在全局
window.addEventListener('pointermove', handleMouseMove);
window.addEventListener('pointerup', handleMouseUp);


// 鼠标按下时，记录鼠标初始位置
function handleMouseDown(e){
    //控制台调试用
    console.log("mousedown on", e.target);
    unitMovable = true;

    //记录当前被点击的元素
    draggedItem = e.currentTarget;
    draggedItem.classList.add('is-dragging');

    // 获取当前元素的 transform 偏移作为初始值
    const style = window.getComputedStyle(draggedItem);
    const matrix = new DOMMatrixReadOnly(style.transform);
    unitMouseBasicTrans.x = matrix.m41;
    unitMouseBasicTrans.y = matrix.m42;

    //记录鼠标位置
    unitMouseDownPos.x = e.clientX;
    unitMouseDownPos.y = e.clientY;
    //调整层级至最上方
    draggedItem.style.zIndex = 999;

    //获取该元素的宽度（STEP4使用）
    unitWidth = draggedItem.getBoundingClientRect().width;
    moveWidth = unitWidth + gapWidth;
}
//鼠标移动时，更新位置
function handleMouseMove(e){
    if (unitMovable) {
        unitdisX = unitMouseBasicTrans.x + (e.clientX - unitMouseDownPos.x);  // 计算新的位置
        unitdisY = unitMouseBasicTrans.y + (e.clientY - unitMouseDownPos.y);
        
        // 使用 CSS transform 属性实时更新位置
        draggedItem.style.transition = "none";
        draggedItem.style.transform = `translate(${unitdisX}px, ${unitdisY}px)`;

        //移动过程中其他元素自动排序（Step2使用）
        changePos(unitdisX,moveWidth);
    }
}

//#endregion

//#region STEP2:移动过程中其他元素自动排序

let unitWidth = null;//被选中元素宽度
let gapWidth = 16;//间隔宽度
let moveItem = null;
let moveItemIndex = null;
let moveStep;


function changePos(disX, moveWidth){
    moveStep = parseInt(disX / moveWidth);
    console.log(moveStep);

    //来回拖动重置位置
    for(let i = 0; i < blocksArr.length;i++){
        if(i !== blocksArr.indexOf(draggedItem)){
            blocksArr[i].style.transform = `translateX(0px) `
        }
        }
        //向左移动
        if(moveStep < 0){
            for(let i = 1; i <= Math.abs(moveStep); i++){
                moveItemIndex = blocksArr.indexOf(draggedItem) - i;
                //判断是否在有效数组范围内，避免超出限制
                if(moveItemIndex >= 0 && blocksArr[moveItemIndex]){
                    moveItem = blocksArr[moveItemIndex];
                    moveItem.style.transform = `translateX(${moveWidth}px)`;
                }
                else{
                    return;
                }
            }
        }
        //向右移动
        else if(moveStep > 0){
            for(let i = 1; i <= Math.abs(moveStep); i++){
                moveItemIndex = blocksArr.indexOf(draggedItem) + i;
                //判断是否在有效数组范围内，避免超出限制
                if(moveItemIndex >= 0 && moveItemIndex < blocksArr.length){
                    moveItem = blocksArr[moveItemIndex];
                    moveItem.style.transform = `translateX(-${moveWidth}px)`;
                }
            }
        }
}
//#endregion

//#region STEP3: 鼠标松开时，停止拖拽
function handleMouseUp(e){
    if (!unitMovable || !draggedItem) return;  
    
    //让鼠标移动时不会触发move函数
    unitMovable = false;  

    //鼠标抬起后自动落位
    //moveStep超出范围时如何处理
    // //超出左边界
    if(moveStep + blocksArr.indexOf(draggedItem) < 0){
        moveStep = -blocksArr.indexOf(draggedItem)
    }
    //超出右边界
    else if(moveStep + blocksArr.indexOf(draggedItem) >= blocksArr.length - 1){
        moveStep = blocksArr.length - blocksArr.indexOf(draggedItem) -1;
    }

    //只处理“被拖拽元素”的 “transform” 过渡结束
    //定义回调 onEnd，等事件发生时再去调用 handleTransitionEnd(e)
    const onEnd = (e) => {
    if (e.propertyName !== 'transform' || e.target !== draggedItem) return;
    handleTransitionEnd(e);
    };
    //在动画结束时触发 onEnd，仅触发一次
    draggedItem.addEventListener('transitionend', onEnd, { once: true });


    //移动动画
    if (draggedItem) {
        draggedItem.style.transition = "transform 0.2s ease-in-out";
        draggedItem.style.transform = `translateX(${moveStep * moveWidth}px)`;
    }
    console.log("鼠标抬起, moveStep=", moveStep);
}
//#endregion

//#region STEP4:插入后更新index

function handleTransitionEnd(e){

    console.log("触发handleTransitionEnd")
    
    //声明目标索引位置
    const targetIndex = moveStep + blocksArr.indexOf(draggedItem);

    if (targetIndex >= 0 && targetIndex < blocksArr.length) {
        
        let parentElement = draggedItem.parentNode;  // 获取父节点

        //向左移动，在目标前插入
        if(moveStep < 0){
            parentElement.insertBefore(draggedItem, blocksArr[targetIndex]); 
        }
        //向右移动，在目标后一个元素前插入
        else if(moveStep > 0){
            parentElement.insertBefore(draggedItem, blocksArr[targetIndex + 1]); 
        }
        //重新获取当前页面上所有可排序项
        blocksArr = [...document.querySelectorAll('.one-unit')];
        //临时关闭过渡
        blocksArr.forEach(el => el.style.transition = 'none');
        //清除位移
        blocksArr.forEach(el => el.style.transform  = '');
        //强制重排：立即让上面的样式变更生效
        void parentElement.offsetWidth;
        //下一帧恢复过渡
        requestAnimationFrame(() => 
        blocksArr.forEach(el => el.style.transition = ''));
        }

        blocksArr.forEach(el => {
            el.style.removeProperty('z-index'); // 清掉所有内联 z-index
            // 去掉拖拽时加的类
            el.classList.remove('is-dragging');
});
}
//#endregion

}