# vue

## 
1. vue本身并不是一个框架；
2. vue结合周边生态构成一个灵活的、渐进式的框架；
   * 声明式渲染
   * 组件系统
   * 客户端路由
   * 大规模状态管理
   * 构建工具

## 核心思想
 * 数据驱动
 * 组件化
 * view -> viewmodel -> model  
   view <- viewmodel <- model

## 如何实现Vue双向绑定``` Object.defineProperty()```
```js


<!DOCTYPE html>
<html>

<head>
 <meta charset="utf-8">
 <title>title</title>
</head>

<body>
 <input type="text" id="username" />
 <span id="user"></span>
 <script>
  var obj = {};
  Object.defineProperty(obj, "username", {
   get: function () {
    console.log("get init")
   },
   set: function (val) {
    console.log("set init")
    document.getElementById('username').value = val;
    document.getElementById('user').innerHTML = val;
   }
  })
  document.getElementById('username').addEventListener("keyup", function (event) {
   obj.username = event.target.value;
  })
 </script>
</body>

</html>
 ```

 ## vue框架优缺点

 vue：
   * 模版和渲染函数的弹性选择
   * 简单的语法及项目创建
   * 更快的渲染速度和更小的体积

 react：
  * 更适用于大型应用和更好的可测试性
  * 同时适用于web端和元素app
  * 更大的生态圈


## vue环境搭建以及vue-cli使用

  cnpm i vue-cli -g

  vue init webpack-simple

## vue 路由基础介绍  

### 前端路由优缺点  
* 优点  
  * 用户体验好，不需要每次都从服务器全部获取，快速呈现给用户；
* 缺点
  * 不利于seo
  * 使用浏览器的前进后退键的时候会重新发送请求，没有合理地利用缓存。
  * 单页面无法记住之前滚动的位置，无法在前进


### vue-router  
  * ```<router-link></router-link>``` 或者 ```this.$router.push({path:''})```
  * ```<router-view></router-view>```

  1. 动态路由匹配
  2. 嵌套路由
  3. 编程式路由
  4. 命名路由和命名视图

#### 动态路由匹配
```js
  {
    path: '/goods/:goodsId/userId/:userId', //动态路由
    name: 'GoodList',
    component: GoodList
  },
```
#### 嵌套路由
```js
    {
    path: '/goods', //动态路由
    name: 'GoodList',
    component: GoodList,
    children:[
      path: 'title', //动态路由
      name: 'title',
      component: Title,
    ]
  },

  //在GoodList.vue 里需要注册 <router-view></router-view> 装载二级路由
  //使用<router-link to="/goods/title"></router-link>
```
#### 编程式路由  
```js
  $router.push("name");
  $router.push({path:"name"});
  $router.push({path:"name?a=123"}) 
  $router.push({path:"name",query:{a:123}})
  $router.go()
```
#### 命名路由和命名视图  
* 给路由定义不同的名字，根据名字匹配  
  1. 给路由定义名字 name
  2. ```<router-link :to="{name:title,params:{userId:123}}"></router-link>```
* 给不同的router-view定义名字，通过名字进行对应组件的渲染
  1. 给不同的router-view定义名字
  2. router中定义组件


#### axios 基础介绍



### ES6

#### ES6常用命令 
var 函数级作用域

let const 块级作用域

结构赋值

rest参数

函数、数组、对象扩展
```js
console.log(...[4,8]);//4 8  
var [x,...y]=[1,2,3,4];//x:1 y:[2,3,4]
let [a,b,c]="123";//a:"1",b:"2",c:"3"
let xy=[..."es6"];//xy:["e","s","6"]
```

AMD CMD CommJs es6的对比  
amd 依赖前置  
cmd 依赖就近  
commjs 通常是nodejs里使用 module.export  
es6 export/import 

