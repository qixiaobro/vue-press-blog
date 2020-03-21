# XMLHttpRequest以及使用XMLHttpRequest实现ajax

## XMLHttpRequest

### 概述

2005年2月，AJAX 这个词第一次正式提出，它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。后来，AJAX 这个词就成为 JavaScript 脚本发起 HTTP 通信的代名词，也就是说，只要用脚本发起通信，就可以叫做 AJAX 通信。W3C 也在2006年发布了它的国际标准。AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 这个名字已经成了一个通用名词，字面含义已经消失了。

### ajax步骤

1. 创建XMLHttpRequese对象
2. 发出http请求
3. 接收服务器返回的数据
4. 根据数据更新网页

### `XMLHttpRequese.readyState`

`XMLHttpRequese.readyState`返回一个整数，表示实例对象的当前状态。该属性只读。可能返回的整数：

`0`：表示实例已生成，但是还`XMLHttpRequese`实例已经生成，但是实例的`open()`方法还没有调用。

`1`:表示`open()`方法已经被调用，但是实例的`send()`方法还没有调用，还可以使用实例的`setRequestHeader()`,设定HTTP请求的头信息。

`2`:表示实例的`send()`的方法已被调用，并且服务器返回的头信息和状态码已经收到。

`3`:表示正在接收服务器传来的数据体（`body`部分）。这时，如果实例的`responseType`属性等于`text`或者空字符串，`responeText`属性就会包含已经收到的部分信息。

`4`:表示服务器已返回的数据已经完全接收了，或者本次接收已经失败。



### `XMLHttpRequse.onreadystatechange`

指向一个监听函数，通信过程中，每当实例对象发生状态变化，它的`readyState`属性的值就会改变。这个值每一次变化，都会触发`readyStateChange`事件

### `XMLHttpRequest.response`

表示服务器返回的数据，即http的body部分，可能是任何数据类型。字符串、对象、二进制。具体的类型由`XMLHttpRequest.responseType`属性决定。该属性只读。如果本次请求没有成功或者数据不完整，该属性等于`null`。但是，如果`responseType`属性等于`text`或空字符串，在请求没有结束之前（`readyState`等于3的阶段），`response`属性包含服务器已经返回的部分数据。

### `XMLHttpRequest.responseType`

表示服务器返回数据的类型。在`open()`方法之后，`set()`方法之前调用设置。未设置默认为返回`text`类型的数据。

1. ""（空字符串）：等同于`text`，表示服务器返回文本数据。
2. "arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组。
3. "blob"：Blob 对象，表示服务器返回二进制对象。适合图片文件
4. "document"：Document 对象，表示服务器返回一个文档对象。
5. "json"：JSON 对象。由浏览器自动将返回数据用JSON.parse转换。
6. "text"：字符串。

### `XMLHttpRequest.responseText`

表示从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据

### `XMLHttpRequest.status`

1. 200, OK，访问正常
2. 301, Moved Permanently，永久移动
3. 302, Moved temporarily，暂时移动
4. 304, Not Modified，未修改
5. 307, Temporary Redirect，暂时重定向
6. 401, Unauthorized，未授权
7. 403, Forbidden，禁止访问
8. 404, Not Found，未发现指定网址
9. 500, Internal Server Error，服务器发生错误

### `XMLHttpRequest.timeout`

返回一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于0，就表示没有时间限制。

### 事件监听属性

1. XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
2. XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
3. XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了`abort()`方法）的监听函数
4. XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
5. XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
6. XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
7. XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数

## ajax实现

```js
//使用promise封装请求
function ajax (options) {
        let url = options.url
        const method = options.method.toLocaleLowerCase() || 'get'
        const async = options.async != false // default is true
        const data = options.data
        const xhr = new XMLHttpRequest()

        if (options.timeout && options.timeout > 0) {
            xhr.timeout = options.timeout
        }

        return new Promise ( (resolve, reject) => {
            xhr.ontimeout = () => reject && reject('请求超时')
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        resolve && resolve(xhr.responseText)
                    } else {
                        reject && reject()
                    }
                }
            }
            xhr.onerror = err => reject && reject(err)

            let paramArr = []
            let encodeData
            if (data instanceof Object) {
                for (let key in data) {
                    // 参数拼接需要通过 encodeURIComponent 进行编码
                    paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) )
                }
                encodeData = paramArr.join('&')
            }

            if (method === 'get') {
                  // 检测 url 中是否已存在 ? 及其位置
                const index = url.indexOf('?')
                if (index === -1) url += '?'
                else if (index !== url.length -1) url += '&'
                  // 拼接 url
                url += encodeData
            }

            xhr.open(method, url, async)
            if (method === 'get') xhr.send(null)
            else {
                // post 方式需要设置请求头
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
                xhr.send(encodeData)
            }
        } )
    }

//使用方法
ajax({
    url: 'your request url',
    method: 'get',
    async: true,
    timeout: 1000,
    data: {
        test: 1,
        aaa: 2
    }
}).then(
    res => console.log('请求成功: ' + res),
    err => console.log('请求失败: ' + err)
)
```

```js
//原生方式
function ajax(option) {
    var xhr = null;

    //判断是否有XMLHttpRequest对象
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }

    //提取option数据
    var url = option.url  //请求url
    var data = option.data //请求参数
    var method = option.method //请求方法
    var async = option.async    //是否异步

    //设置超时时间
    xhr.timeout = (option.timeout && option.timeout > 0) ? option.timeout : 0

    //设置监听函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status > 200 && xhr.status < 300 || xhr.status == 304) {
                option.success(xhr.responeText)
            } else {
                option.error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
            }
            option.finally()
        }
    }

    //设置超时监听
    xhr.ontimeout = function () {
        option.error('请求超时，请重试！');
        option.finally()
    }

    xhr.onerror = function (err) {
        option.error(err);
        option.finally()
    }

    var paramArr = []//参数数组
    var encodeData//转码参数
    if (data instanceof Object) {
        for (var key in data) {
            // 参数拼接需要通过 encodeURIComponent 进行编码
            paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        }
        encodeData = paramArr.join('&')
    }

    if (method === 'get') {
        // 检测 url 中是否已存在 ? 及其位置
        var index = url.indexOf('?')
        if (index === -1) {
            url += '?'
        }else if (index !== url.length - 1) {
            url += '&'
        }
        // 拼接 url
        url += encodeData
    }

    xhr.open(method, url, async)

    if (method === 'get') {
        xhr.send(null)
    } else {
        // post 方式需要设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
        xhr.send(encodeData)
    }


}
//使用方法
ajax({
    url:'url',
    method:'get',
    async:false,
    timeout:5000,
    data:data,
    success:function(data){

    },
    error:function(error){

    },
    finally:function(){

    }
})
```

