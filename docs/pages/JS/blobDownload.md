### 后台返回二进制文件流，前端解析下载解决方法(兼容IE)以及学习扩展


## 资料介绍
### ```blob```对象  
```blob```对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是```JavaScript```原生格式的数据。要从其他非```blob```对象和数据构造一个 ```blob```，请使用```blob()``` 构造函数。

[blob对象介绍_MDB](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

### ```File```对象  
文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下， ```File```对象是来自用户在一个 ```<input>```元素上选择文件后返回的 ```FileList```对象,也可以是来自由拖放操作生成的```DataTransfer``` 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。```File```对象是特殊类型的``` Blob```，且可以用在任意的 ```Blob``` 类型的 ```context```中。比如说， ```FileReader```, ```URL.createObjectURL()```, ```createImageBitmap()```, 及 ```XMLHttpRequest.send()``` 都能处理 ```Blob``` 和 ```File```。  

[File对象介绍_MDB](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

### ```URL.createObjectURL()```
```URL.createObjectURL()```静态方法会创建一个```DOMString```，其中包含一个表示参数中给出的对象的```URL```。这个```URL```的生命周期和创建它的窗口中的 ```document```绑定。这个新的URL对象表示指定的```File```对象或```Blob```对象。在每次调用```URL.createObjectURL()```方法时，都会创建一个新的```URL```对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用```URL.revokeObjectURL()```方法来释放。浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 兼容IE
Internet Explorer 10 的```msSaveBlob```和```msSaveOrOpenBlob```方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因。  
msSaveBlob：只提供一个保存按钮;msSaveOrOpenBlob：提供保存和打开按钮

### 主要代码
```javascript
            VM.$axios({
                method: 'POST',
                url: url,
                data: data,
                timeout: 5000,
                responseType: 'blob'//返回格式
            }).then((res) => {
                        if (flag === 1) {//查看图片
                            const blob = new Blob([res])
                            VM.img_src=window.URL.createObjectURL(blob);
                        } else {
                            if('msSaveOrOpenBlob' in navigator){//IE
                                window.navigator.msSaveOrOpenBlob(res, fileName);
                            }else{
                                const alink = document.createElement('a')
                                alink.download = fileName
                                alink.style.display = 'none'
                                alink.href = URL.createObjectURL(res)   // 这里是将文件流转化为一个文件地址
                                document.body.appendChild(alink)
                                var evt = document.createEvent("MouseEvents");
                                evt.initEvent("click", false, false);
                                alink.dispatchEvent(evt);
                                URL.revokeObjectURL(alink.href)//释放
                                document.body.removeChild(alink)
                            }
                        }
            })

```

