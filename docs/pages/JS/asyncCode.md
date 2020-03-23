# 异步编程

### 并发（concurrency）、并行（parallelism）的区别

* 并发是宏观上的，有A、B两个任务，在一段时间内通过任务间的切换完成了这两个任务。
* 并行是微观上的，cpu有A、B两个核心，同一时间A核心处理A任务，B核心处理B任务。

### 回调函数（callback）

回调函数有一个致命的弱点，那就是容易出现回调地狱（callback hell)。

根本原因：

1. 嵌套函数存在耦合性，一旦有所改动，容易导致所有的都需要改动，牵一发而动全身。
2. 嵌套函数一多，很难处理错误。

缺点：1. 不能使用```try catch```捕获错误，不能直接```return```.

### Generator

​	Generator函数跟其它函数不同，它会停在yield的地方。每次传的参数会被当作上一次yield的结果。

### Promise

有三种状态：

			1. pending
   			2. resolved
      			3. rejected

```javascript
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```

```promise```实现了链式调用，即每次```then```返回后的都是一个```promise```，并且是一个全新的```promise```，如果在```then```中使用了```return```，则```return```的值会被```resolve```.

缺点：无法取消```promise```

### async & await

1. 一个函数如果加上```async```,那么该函数就会返回一个```promise```

2. ```await```只能跟```async```一起用

3. 相比于```promise```来说，优势是不用写很多```then```,优雅解决回调地狱问题。

4. 如果多个异步代码没有依赖性缺使用了```await```会导致性能上的降低。

   ```javascript
   async function test(){
     await fetch(url1)
     await fetch(url2)
     await fetch(url3)
   }
   //完全可以使用promise.all
   Promise.all[fetch(url1),fetch(url2),fetch(url3)]
   ```

5. ```await```其实就是```Generator``` 加上```Promise```的语法糖





