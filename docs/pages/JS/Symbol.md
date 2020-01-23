### Symbol

1. 为了解决对象属性名容易产生冲突的问题，ES6引入```Symbol```，使得能够保证对象属性名字都是独一无二的。是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。  
2. Symbol值通过```Symbol```函数生成，但是不能用new命令，这是因为生成的Symbol是一个原始类型的值，不是对象，也就不能添加属性。基本上，它是一种类似于字符串的数据类型。  

3. 可接受一个字符串作为参数，用来描述此Symbol值。
```let foo = Symbol('foo);```

4. Symbol函数的参数只是对Symbol值得描述，因此相同参数得Symbol值函数返回值是不相等的。

5. Symbol值不能与其它类型的值进行运算。Symbol值可以转为字符串、Boolean值，不能转为数值。

6. ```Symbol.prototype.description```  
用来获取Symbol值的描述。
```javascript
let a = Symbol('foo);
a.description // "foo"
```

7. 作为属性名的Symbol  
用Symbol值来做属性名，就能够保证不会出现同名的属性。  
```javascript
let mySymbol = Symbol();

//第一种写法
let a={};
a[mySymbol] = 'Hello';

//第二种写法
let a= {
    [mySymbol]:'Hello';
}

//第三种写法
let a={};
Object.defineProperty(a,mySymbol,{value:'Hello'});

//以上写法都是同样的结果。
a[mySymbol]='Hello'
```

**注意**：使用Symbol值作为对象属性名时，不能用点运算符。因为点运算符后面跟的是字符串，它不会读去使用Symbol值作为属性名的那个值。所以，也就代表，在对象内部，需使用Symbol值定义属性时，Symbol必须放在方括号内。
```javascript
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);

//采用增强的对象写法：
let obj = {
    [s](arg):{...}
}
```


8. 实例：消除魔术字符串  
**魔术字符串**：指的是，在代码中出现多次、与代码形成强耦合的某一个具体的字符串或者数值。不利于将来的修改和维护。  
eg:
```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```
上面的Triangle就是魔术字符串。

使用Symbol值改写  
```javascript
const shapeType = {
  triangle: Symbol();
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```
可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可.

9. 属性名的遍历
Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。  
但是它也不是私有属性，使用```Object.getOwnPropertySymbols()```方法，可以获取指定对象的所有Symbol属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。  
另一个新的 API，```Reflect.ownKeys()```方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
```javascript
let obj={
    [Symbol('foo')]:1,
    bar:2,
    num:3
}

Reflect.ownKeys(obj)//["bar", "num", Symbol(foo)] 

```
10. ```Symbol.for()```、```Symbol.keyFor()```  
有时，我们希望重新使用同一个 Symbol 值，```Symbol.for()```方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。  
```Symbol.for()```与```Symbol()```这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。```Symbol.for()```不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

```Symbol.keyFor()```方法返回一个已登记的 Symbol 类型值的key。
**```Symbol.for()```的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。**

