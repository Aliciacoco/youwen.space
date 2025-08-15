
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 切换选中样式
        tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
        // 显示对应面板
        panels.forEach(panel => {
            panel.hidden = panel.id !== tab.getAttribute('aria-controls');
        });
    });
});