/* ========================================
   Coco's Home - 应用逻辑
   ======================================== */

// ============ 全局状态 ============
let selectedCategories = [];
let currentPage = 'favorites';
let minFixedScroll = 0;  // 保存让标签栏刚好固定的最小滚动距离

// ============ 工具函数 ============
function openProjectPage(url) {
    window.open(url, '_blank');
}

function openBlogPage(url) {
    window.location.href = url;
}

// ============ 渲染函数 ============

// 渲染 Favorites 卡片
// 渲染 Favorites 卡片
// 渲染 Favorites 卡片
function renderCards() {
    const grid = document.getElementById('cardsGrid');
    let filteredCards = cardsData;

    if (selectedCategories.length > 0) {
        filteredCards = cardsData.filter(card => selectedCategories.includes(card.category));
    }

    if (filteredCards.length === 0) {
        grid.innerHTML = '<div class="no-results">没有找到相关内容</div>';
        return;
    }

    grid.innerHTML = filteredCards.map((card, index) => `
        <div class="card ${card.isMyProject ? 'my-project' : ''}" onclick="window.open('${card.link}', '_blank')">
            ${card.isMyProject ? '<div class="card-badge">🛠️ 我开发的</div>' : ''}
            ${card.imageType === 'video' ?
                `<video 
                    poster="${card.poster || ''}"
                    loop muted playsinline
                    preload="none"
                    class="card-image"
                    data-src="${card.image}">
                </video>` :
                `<img 
                    ${index < 6 ? `src="${card.image}"` : `data-src="${card.image}"`}
                    alt="${card.title}" 
                    class="card-image ${index >= 6 ? 'lazy' : ''}">`
            }
            <div class="card-content">
                <div class="card-title">${card.title}</div>
                <div class="card-desc">${card.desc}</div>
            </div>
        </div>
    `).join('');

    // 设置懒加载
    setupLazyLoad();
    setupVideoCards();
}

// 图片懒加载
function setupLazyLoad() {
    const lazyImages = document.querySelectorAll('img.lazy[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// 视频懒加载 + 自动播放
function setupVideoCards() {
    const videoCards = document.querySelectorAll('.card video[data-src]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                if (!video.src && video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    videoCards.forEach(video => videoObserver.observe(video));
}

// 渲染 Code Lab 卡片
function renderCodelabCards() {
    const grid = document.getElementById('codelabCardsGrid');
    grid.innerHTML = codelabProjects.map(project => `
        <div class="card codelab-card" onclick="openProjectPage('${project.link}')">
            <video src="${project.gifImage}" 
                poster="${project.staticImage}"
                loop muted playsinline
                loading="lazy"
                preload="none"
                class="card-image codelab-image">
            </video>
            <div class="card-content">
                <div class="card-title">${project.title}</div>
                <div class="card-desc">${project.subtitle}</div>
            </div>
        </div>
    `).join('');

    // 鼠标悬停播放视频（仅桌面端）
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (hasHover) {
        const codelabCards = document.querySelectorAll('.codelab-card');
        codelabCards.forEach(card => {
            const video = card.querySelector('video');
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.load();
            });
        });
    }
}

// ============ 页面切换 ============
function switchToPage(page) {
    // 重置滚动位置
    document.getElementById('mainContent').scrollTop = 0;
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 移除固定标签
    const sidebarSection = document.getElementById('favoritesSection');
    if (sidebarSection) {
        sidebarSection.classList.remove('fixed');
    }

    // 更新导航按钮
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-btn[data-page="${page}"]`).classList.add('active');

    // 更新页面
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');

    // 更新侧边栏
    const sidebarIntro = document.getElementById('sidebarIntro');
    const favoritesSection = document.getElementById('favoritesSection');
    const mainContent = document.getElementById('mainContent');
    const sidebar = document.getElementById('sidebar');
    const divider = document.getElementById('divider');

    if (page === 'favorites') {
        sidebarIntro.innerHTML = `<strong class="intro-title">Favorites</strong> → 中记录了我喜欢的网站或产品，它们在产品功能、交互或设计上独树一帜，让人使用起来心旷神怡，十分过瘾。<br>以下是用作筛选的标签:`;
        favoritesSection.style.display = 'block';
        sidebar.classList.remove('hidden');
        divider.classList.remove('hidden');
        mainContent.classList.remove('full-width');
        sidebarIntro.style.marginBottom = '';
        mainContent.classList.remove('blog-page');
    } else if (page === 'codelab') {
        sidebarIntro.innerHTML = `<strong class="intro-title">Code Lab</strong> → 记录了一些通过Html、Css、Javascript进行的交互实验，简单的语言也能做出惊艳的效果。`;
        favoritesSection.style.display = 'none';
        sidebar.classList.remove('hidden');
        divider.classList.remove('hidden');
        mainContent.classList.remove('full-width');
        sidebarIntro.style.marginBottom = '20px';
        mainContent.classList.remove('blog-page');
    } else if (page === 'blog') {
        sidebar.classList.add('hidden');
        divider.classList.add('hidden');
        mainContent.classList.add('full-width');
        mainContent.classList.add('blog-page');
    }

    currentPage = page;
    localStorage.setItem('currentPage', page);
}

// ============ 初始化函数 ============
function initApp() {
    // 渲染卡片
    renderCards();
    renderCodelabCards();

    // 恢复上次访问的页面
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && ['favorites', 'codelab', 'blog'].includes(savedPage)) {
        switchToPage(savedPage);
    }
}

// ============ 事件绑定 ============

// DOM 加载完成后
window.addEventListener('DOMContentLoaded', () => {
    initApp();

    // ===== 计算移动端最小固定滚动距离 =====
    const sidebarIntro = document.getElementById('sidebarIntro');
    const sidebarSection = document.getElementById('favoritesSection');
    const placeholder = document.getElementById('placeholder');
    const navHeight = 74;

    // 页面加载时计算让标签栏刚好固定的滚动距离
    const introRect = sidebarIntro.getBoundingClientRect();
    minFixedScroll = introRect.bottom - navHeight + 1;

    // ===== Sidebar 固定逻辑 =====
    window.addEventListener('scroll', () => {
        const introBottom = sidebarIntro.getBoundingClientRect().bottom;
        if (introBottom <= navHeight) {
            placeholder.style.height = `${sidebarSection.offsetHeight}px`;
            sidebarSection.classList.add('fixed');
        } else {
            placeholder.style.height = '0';
            sidebarSection.classList.remove('fixed');
        }
    });

    // ===== Sidebar 渐隐效果 =====
    let ticking = false;
    function updateOpacity() {
        const scrollY = window.scrollY;
        const fadeDistance = 300;
        const opacity = Math.max(0, 1 - (scrollY / fadeDistance));
        sidebarIntro.style.opacity = opacity;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOpacity);
            ticking = true;
        }
    });

    // ===== 标签筛选 =====
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function () {
            const category = this.dataset.category;
            if (!category) return;

            this.classList.toggle('active');

            if (selectedCategories.includes(category)) {
                selectedCategories = selectedCategories.filter(c => c !== category);
            } else {
                selectedCategories.push(category);
            }

            const favoritesSection = document.getElementById('favoritesSection');
            const sidebarIntro = document.getElementById('sidebarIntro');
            const isMobile = window.innerWidth <= 600;
            const wasFixed = favoritesSection.classList.contains('fixed');
            const navHeight = 74;

            // 在渲染前计算 sidebarIntro 底部距离文档顶部的绝对距离
            const introBottomFromDoc = sidebarIntro.getBoundingClientRect().bottom + window.scrollY;
            const targetScroll = introBottomFromDoc - navHeight + 1;

            // 渲染卡片
            renderCards();

            // 移动端：如果标签栏之前是固定的，滚动到固定位置
            if (isMobile && wasFixed) {
                requestAnimationFrame(() => {
                    window.scrollTo(0, targetScroll);
                });
            }
        });
    });

    // ===== 页面导航 =====
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            switchToPage(this.dataset.page);
        });
    });

    // ===== 侧边栏拖拽调整 =====
    const divider = document.getElementById('divider');
    const sidebar = document.getElementById('sidebar');
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    divider.addEventListener('mousedown', function (e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        divider.classList.add('dragging');
        document.body.classList.add('resizing');
        sidebar.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isResizing) return;
        const diff = e.clientX - startX;
        let newWidth = startWidth + diff;
        newWidth = Math.max(180, Math.min(400, newWidth));
        sidebar.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', function () {
        if (isResizing) {
            isResizing = false;
            divider.classList.remove('dragging');
            document.body.classList.remove('resizing');
            sidebar.style.transition = '';
        }
    });

    // ===== Profile 模态框 =====
    const userSection = document.getElementById('userSection');
    const profileModal = document.getElementById('profileModal');
    const modalClose = document.getElementById('modalClose');

    userSection.addEventListener('click', () => profileModal.classList.add('active'));
    modalClose.addEventListener('click', () => profileModal.classList.remove('active'));
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) profileModal.classList.remove('active');
    });

    // ===== 简历验证模态框 =====
    const downloadResume = document.getElementById('downloadResume');
    const verificationModal = document.getElementById('verificationModal');
    const verificationClose = document.getElementById('verificationClose');
    const nameInput = document.getElementById('nameInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const verificationError = document.getElementById('verificationError');

    downloadResume.addEventListener('click', () => {
        verificationModal.classList.add('active');
        nameInput.value = '';
        nameInput.classList.remove('error');
        verificationError.classList.remove('show');
    });

    verificationClose.addEventListener('click', () => verificationModal.classList.remove('active'));
    verificationModal.addEventListener('click', (e) => {
        if (e.target === verificationModal) verificationModal.classList.remove('active');
    });

    verifyBtn.addEventListener('click', () => {
        const inputValue = nameInput.value.trim();
        if (inputValue === CONFIG.correctName) {
            verificationModal.classList.remove('active');
            const link = document.createElement('a');
            link.href = CONFIG.resumePdfPath;
            link.download = 'Coco_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('验证成功！正在下载简历...');
        } else {
            nameInput.classList.add('error');
            verificationError.classList.add('show');
        }
    });

    nameInput.addEventListener('input', () => {
        nameInput.classList.remove('error');
        verificationError.classList.remove('show');
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyBtn.click();
    });
});