// 仅当 <body data-feature="scroll-reveal"> 时启用本模块 
if (document.body.dataset.feature === 'scroll-reveal') {

    const observer = new IntersectionObserver(callback)

    function callback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // 进入视口时做的事情
            console.log(entry.target)
            entry.target.classList.add('show');
            } else {
            // 离开视口时做的事情（可选）
            entry.target.classList.remove('show');
            }
        });
    }
    const todoElements = document.querySelectorAll(".todo");
    todoElements.forEach(el => observer.observe(el));
}