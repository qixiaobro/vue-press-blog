module.exports = {
    title: 'QiXiao', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'QiXiao', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link',
            {
                rel: 'icon',
                href: '/Fire.png'
            }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],
    ],
    themeConfig: {
        logo: '/Fire.png', //网页顶端导航栏左上角的图标
        lastUpdated: 'Last Updated', // string | boolean
        //顶部导航栏
        nav: [
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            {
                text: '首页',
                link: '/'
            },

            //格式二：添加下拉菜单，link指向的文件路径
            {
                text: '分类', //默认显示        
                ariaLabel: '分类', //用于识别的label
                items: [{
                    text: 'ES6',
                    link: '/pages/JS/解构赋值.md'
                },
                //点击标签会跳转至link的markdown文件生成的页面
                {
                    text: 'Vue.js',
                    link: '/pages/JS/外部点击事件.md'
                },
                {
                    text: 'React',
                    link: '/pages/JS/Redux.md'
                },
                {
                    text: '技术总结',
                    link: '/pages/JS/blobDownload.md'
                },
                {
                    text: '通用方法封装',
                    link: '/pages/JS/tool.md'
                },


                ]
            },

            //格式三：跳转至外部网页，需http/https前缀
            {
                text: 'Github',
                link: 'https://github.com/qixiaobro'
            },
        ],
        sidebar: {
            '/pages/JS/': [{
                title: 'ES6', // 一级菜单名称
                collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                children: [
                    ['解构赋值.md', '解构赋值'], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                    ['数值的扩展.md', '数值的扩展'],
                    ['数组的扩展.md', '数组的扩展'],
                    ['对象的扩展.md', '对象的扩展'],
                    ['对象的新增方法.md', '对象的新增方法'],
                    ['函数的扩展.md', '函数的扩展'],
                    ['字符串的扩展.md', '字符串的扩展'],
                    ['字符串的新增方法.md', '字符串的新增方法'],
                    ['async.md', 'async'],
                    ['Promise.md', 'Promise'],
                    ['Proxy.md', 'Proxy'],
                    ['Reflect.md', 'Reflect'],
                    ['Set和Map数据结构.md', 'Set和Map'],
                    ['Symbol.md', 'Symbol'],
                    ['module语法.md', 'module语法'],
                ]
            },
            {
                title: 'Vue.js',
                collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                children: [
                    ['外部点击事件.md', '外部点击事件'],
                    ['组件通信方法.md', '组件通信高级方法'],
                ]
            }, {
                title: 'React.js',
                collapsable: true,
                children: [
                    [
                        'Redux.md', 'Redux'
                    ],
                ]
            }, {
                title: 'React-Native',
                collapsable: true,
                children: [
                    [
                        'React-Native-01.md', 'macOS搭建React-Native开发环境'
                    ],
                ]
            }, {
                title: '技术总结',
                collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                children: [
                    ['blobDownload.md', '二进制流文件下载（兼容IE）'],
                ]
            }, {
                title: '通用方法封装',
                collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                children: [
                    ['tool.md', '通用方法封装'],
                ]
            },
            ],

            //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
        }
    }
}