### Set和Map数据结构  
1. Set  
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。通过.size来展示有几个成员。
Set本身是一个构造函数，用来生成 Set 数据结构。
```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
```
使用Set可以去除数组中的重复的值、字符串中重复的字符
```javascript
// 去除数组的重复成员
[...new Set(array)]

[...new Set('ababbc')].join('')
// "abc"
```
向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
```javascript
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

另外，两个对象总是不相等的。
```javascript
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

2. Set实例的属性和方法
Set 结构的实例有以下属性。

```Set.prototype.constructor```：构造函数，默认就是Set函数。  
```Set.prototype.size```：返回Set实例的成员总数。  
Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

```Set.prototype.add(value)```：添加某个值，返回 Set 结构本身。  
```Set.prototype.delete(value)```：删除某个值，返回一个布尔值，表示删除是否成功。  
```Set.prototype.has(value)```：返回一个布尔值，表示该值是否为Set的成员。  
```Set.prototype.clear()```：清除所有成员，没有返回值。  

```Array.from()```方法可以将Set结构转为数组。
这就提供了去除数组重复成员的另一种方法。
```javascript
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
遍历操作：  
```Set.prototype.keys()```：返回键名的遍历器
```Set.prototype.values()```：返回键值的遍历器
```Set.prototype.entries()```：返回键值对的遍历器
```Set.prototype.forEach()```：使用回调函数遍历每个成员，forEach方法还可以接受第二个参数，用来绑定this。  
需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。  

keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

3. ```WeakSet```  
  WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。  
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。  
**WeakSet 不可遍历、WeakSet 没有size属性，没有办法遍历它的成员。**  
WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

4. Map   
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。  
Map构造函数接受数组作为参数时，实际上执行的是下面的方法  
```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"


const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```
事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
**注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。**
```javascript
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```
由上可知，Map 的键实际上是跟**内存地址**绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。  

5. Map 实例的属性和操作方法  
```size``` 属性  
```Map.prototype.set(key, value)```设置值，可以链式操作    
```Map.prototype.get(key)```获取值  
```Map.prototype.has(key)```是否存在  
```Map.prototype.delete(key)```删除键  
```Map.prototype.clear()```清除所有成员  
遍历方法  
```Map.prototype.keys()```：返回键名的遍历器。  
```Map.prototype.values()```：返回键值的遍历器。  
```Map.prototype.entries()```：返回所有成员的遍历器。  
```Map.prototype.forEach()```：遍历 Map 的所有成员。forEach方法还可以接受第二个参数，用来绑定this。  
需要特别注意的是，Map 的遍历顺序就是插入顺序。

6. WeakMap  
首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

#### WeakMap 用途  
前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。
```javascript
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```
上面代码中，myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。