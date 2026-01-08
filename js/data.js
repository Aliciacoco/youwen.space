/* ========================================
   Coco's Home - 数据文件
   ======================================== */

// Favorites 卡片数据
const cardsData = [
    // 我的作品 - 置顶
    {
        id: 0,
        title: 'CloudPool【即将内测】',
        desc: '重塑消费习惯的周预算工具',
        category: '我的作品',
        image: '/assets/imgs/cloudpool-cover.svg',
        link: 'https://cloudpool.youwen.space/#home'
    },
    {
        id: 1,
        title: 'Recompressor',
        desc: '在线图片压缩工具',
        category: '图片/PDF处理工具',
        image: '/assets/imgs/favorites/Recompressor.webp',
        link: 'https://recompressor.com'
    },
    {
        id: 2,
        title: 'iLovePDF',
        desc: '在线PDF工具箱',
        category: '图片/PDF处理工具',
        image: '/assets/imgs/favorites/ilovepdf.webp',
        link: 'https://www.ilovepdf.com'
    },
    {
        id: 3,
        title: 'Pixabay',
        desc: '免费音效/图片素材',
        category: '音效/图片素材',
        image: '/assets/imgs/favorites/pixabay.webp',
        link: 'https://pixabay.com'
    },
    {
        id: 4,
        title: 'Pexels',
        desc: '免费图片素材',
        category: '音效/图片素材',
        image: '/assets/imgs/favorites/pexels.webp',
        link: 'https://pexels.com'
    },
    {
        id: 5,
        title: 'Aconvert',
        desc: '音频格式在线转换',
        category: '音效/图片素材',
        image: '/assets/imgs/favorites/aconvert.webp',
        link: 'https://www.aconvert.com/cn/audio/'
    },
    {
        id: 6,
        title: 'TopMediai',
        desc: 'AI文字转语音',
        category: 'AI',
        image: '/assets/imgs/favorites/topmediAI.webp',
        link: 'https://www.topmediai.com'
    },
    {
        id: 7,
        title: 'darkstarfury',
        desc: 'Patrick Heintzmann 制作的在线街机射击游戏',
        category: '游戏',
        image: '/assets/imgs/favorites/darkstarfury.webp',
        link: 'https://www.darkstarfury.com'
    },
    {
        id: 8,
        title: '《The Boat》',
        desc: '互动图像小说，讲述越南战后难民的故事',
        category: '互动网页',
        image: '/assets/imgs/favorites/the-boat.webm',
        poster: '/assets/imgs/favorites/the-boat.webp',  // 添加静态图
        imageType: 'video',
        link: 'https://www.sbs.com.au/theboat'
    },
    {
        id: 9,
        title: 'Dropbox × McLaren F1',
        desc: 'Dropbox 与 McLaren F1 团队合作的展示页面',
        category: '互动网页',
        image: '/assets/imgs/favorites/dropbox.webp',
        link: 'https://dash.dropbox.com/mclarenf1'
    },
    {
        id: 10,
        title: 'Arcade Labs',
        desc: '位于洛杉矶的品牌设计工作室',
        category: '互动网页',
        image: '/assets/imgs/favorites/arcade-labs.webp',
        link: 'https://www.arcadelabs.co/'
    },
    {
        id: 11,
        title: 'Dead Simple Sites',
        desc: 'Arcade Labs 策划的极简网站集合',
        category: '互动网页',
        image: '/assets/imgs/favorites/deadsimplesites.webp',
        link: 'https://deadsimplesites.com/?ref=arcade'
    },
    {
        id: 12,
        title: 'Devouring Details',
        desc: '设计师 Rauno Freiberg 创建的互动参考手册',
        category: '互动网页',
        image: '/assets/imgs/favorites/devouringdetails.webp',
        link: 'https://devouringdetails.com'
    },
    {
        id: 13,
        title: 'Emily Lonetto',
        desc: 'Arcade Labs 策划的极简网站集合产品与增长领域的个人作品集网站',
        category: '互动网页',
        image: '/assets/imgs/favorites/emilylonetto.webp',
        link: 'https://emilylonetto.com'
    },
    {
        id: 14,
        title: 'Making Software',
        desc: '产品与增长领域的个人作品集网站',
        category: '互动网页',
        image: '/assets/imgs/favorites/makingsoftware.webp',
        link: 'https://makingsoftware.com'
    },
    {
        id: 15,
        title: 'FC88',
        desc: '创意工作室的品牌与项目展示',
        category: '互动网页',
        image: '/assets/imgs/favorites/thisisfc88.webp',
        link: 'https://thisisfc88.com'
    },
    {
        id: 16,
        title: 'GTA6 Landing Page',
        desc: 'Rockstar Games 为 GTA6 制作的互动宣传页面',
        category: 'GSAP',
        image: '/assets/imgs/favorites/gta.webp',
        link: 'https://www.rockstargames.com/VI'
    },
    {
        id: 17,
        title: 'GSAP 官网',
        desc: '专业级 JavaScript 动画库',
        category: 'GSAP',
        image: '/assets/imgs/favorites/gasp.webp',
        link: 'https://gsap.com/'
    },
    {
        id: 18,
        title: 'Apple AirPods',
        desc: '结合 GSAP 和精美视觉设计，实现流畅的滚动与过渡动画',
        category: 'GSAP',
        image: '/assets/imgs/favorites/apple.webp',
        link: 'https://www.apple.com/airpods-pro/'
    },
    {
        id: 19,
        title: 'Active Theory',
        desc: '顶级互动工作室，为 Google I/O、NASA 等制作项目，广泛使用 GSAP',
        category: 'GSAP',
        image: '/assets/imgs/favorites/activetheory.webp',
        link: 'https://activetheory.net/work'
    },
    {
        id: 20,
        title: 'Dogstudio',
        desc: '著名创意数字工作室，擅长融合 GSAP 动画与沉浸式体验',
        category: 'GSAP',
        image: '/assets/imgs/favorites/dogstudio.webp',
        link: 'https://dogstudio.co/'
    },
    {
        id: 21,
        title: 'Bruno Simon 个人作品集',
        desc: '使用 WebGL + GSAP + ScrollTrigger 构建的"边玩边看的"3D 互动作品集',
        category: 'GSAP',
        image: '/assets/imgs/favorites/bruno-simon.webm',
        poster: '/assets/imgs/favorites/bruno-simon.webp',  // 添加静态图
        imageType: 'video',
        link: 'https://bruno-simon.com/'
    },
    {
        id: 22,
        title: 'Google Earth',
        desc: 'Google 提供的 3D 地球浏览器，完全基于 WebGL 渲染',
        category: 'WebGL',
        image: '/assets/imgs/favorites/earth.google.webp',
        link: 'https://earth.google.com'
    },
    {
        id: 23,
        title: '彩虹鼠标拖尾',
        desc: '用 WebGL（OGL 库） 做的"彩虹鼠标拖尾"效果',
        category: 'WebGL',
        image: '/assets/imgs/favorites/Rainbow Mouse Animation Effect.webm',
        poster: '/assets/imgs/favorites/Rainbow Mouse Animation Effect.webp',  // 添加静态图
        imageType: 'video',
        link: 'https://codepen.io/sijad/full/XJmZLgg?utm_source=extension&utm_medium=click&utm_campaign=muzli'
    },
    {
        id: 24,
        title: 'Three.js',
        desc: '基于 WebGL 的 JavaScript 3D 图形库官方示例',
        category: 'WebGL',
        image: '/assets/imgs/favorites/three-js.webp',
        link: 'https://threejs.org/examples/#webgl_animation_keyframes'
    },
    {
        id: 25,
        title: '实时大规模流体模拟演示',
        desc: '社区用户使用 WebGPU 技术实现的实时大规模流体模拟',
        category: 'WebGL',
        image: '/assets/imgs/favorites/splash-fluid.webp',
        link: 'https://splash-fluid.netlify.app/'
    },
    {
        id: 26,
        title: 'Kinder und Klinik',
        desc: '创意工作室的品牌与项目展示',
        category: '互动网页',
        image: '/assets/imgs/favorites/kinder-und-klinik.webp',
        link: 'https://kinder-und-klinik.de'
    }
];

// Code Lab 项目数据
const codelabProjects = [
    {
        id: 1,
        title: '拖拽移动',
        subtitle: 'Drag to Move',
        staticImage: '/assets/imgs/codelab/drag-to-move.webp',
        gifImage: '/assets/imgs/codelab/drag-to-move.webm',
        link: '/pages/lab/drag-to-move.html'
    },
    {
        id: 2,
        title: '拖拽排序',
        subtitle: 'Drag Sort',
        staticImage: '/assets/imgs/codelab/drag-sort.webp',
        gifImage: '/assets/imgs/codelab/drag-sort.webm',
        link: '/pages/lab/drag-sort.html'
    },
    {
        id: 3,
        title: '悬停放大',
        subtitle: 'Hover Zoom',
        staticImage: '/assets/imgs/codelab/hover-zoom.webp',
        gifImage: '/assets/imgs/codelab/hover-zoom.webm',
        link: '/pages/lab/hover-zoom.html'
    },
    {
        id: 4,
        title: '视差滚动',
        subtitle: 'Parallax Scrolling',
        staticImage: '/assets/imgs/codelab/parallax-scrolling.webp',
        gifImage: '/assets/imgs/codelab/parallax-scrolling.webm',
        link: '/pages/lab/parallax-scrolling.html'
    },
    {
        id: 5,
        title: '滚动翻页',
        subtitle: 'Wheel Pager',
        staticImage: '/assets/imgs/codelab/wheel-pager.webp',
        gifImage: '/assets/imgs/codelab/wheel-pager.webm',
        link: '/pages/lab/wheel-pager.html'
    },
    {
        id: 6,
        title: '滚动显现',
        subtitle: 'Scroll Reveal',
        staticImage: '/assets/imgs/codelab/scroll-reveal.webp',
        gifImage: '/assets/imgs/codelab/scroll-reveal.webm',
        link: '/pages/lab/scroll-reveal.html'
    }
];

// 简历验证配置
const CONFIG = {
    correctName: '张珂欣',
    resumePdfPath: '/assets/pdf/简历_张珂欣_17794505545.pdf'
};