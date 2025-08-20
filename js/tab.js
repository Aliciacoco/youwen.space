//找到所有 按钮(tab) 和 面板(panel)
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 给当前按钮 t 设置 aria-selected 属性，值就是上面的 true 或 false。
        tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
        // 如果面板的 id 和按钮的 aria-controls 不一样 → 返回 true
        panels.forEach(panel => {
            panel.hidden = panel.id !== tab.getAttribute('aria-controls');
        });
    });
});