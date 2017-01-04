#ES6介绍
##什么是ES6?
`ES6`, 在2000年开始酝酿,那时叫ecmascript4, 因为太激进, 后来演变成`ecmascript5`(`ES5`)[09年发布], 和现在的`ecmascript6`(`ES6`);
在2015年正式推出, 使用年份命名版本,所以有名 `ES2015`=`ES6`;

##特性
###箭头函数
函数的简洁写法, 有类似特性的的语言:C#,Java8和CoffeeScript.

```
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};
```

###class/extends
用面向对象模式编程的语法糖.

```
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

###增强的对象字面量

```
var obj = {
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42

};
```

###模板字符串
构造字符串的语法糖. 有类似特性的语言有:Perl,Python

```
// Multiline strings
`In ES5 this is
 not legal.`

// Interpolate variable bindings
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

###解构赋值
简化赋值语法. fail-soft(工作可靠但性能下降)

```
// list matching
var [a, ,b] = [1,2,3];
a === 1;

b === 3;

// object matching
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode()

```

###默认值

```
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
```

###Rest参数
- 数组,绑定尾部的参数到一个数组. 替代 `arguments`
- 对象,绑定其他的成员变量到一个对象.(ES7)


```
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}

f(3, "hello", true) == 6

let {x, y, ...z} = {x:1, y:2, a:3, b:4};
x//1
y//2
z//{a:3, b:4}
```

###扩展运算符(...)
- 数组, 将数组扩展展开成序列.
- 对象, 将对象扩展展开到新的对象.(ES7)


```
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument

f(...[1,2,3]) == 6

let z = {a:3, b:4};
let n = {...z}
n//{a:3, b:4}
等同于
let n = Object.assign({}, z);
```

###let + const
支持块作用域;
不存在变量提升;
不允许重复声明;
暂时性死区(temporal dead zone, TDZ): 使用let命令声明变量之前,该变量是不可用的.

```
function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      x = "foo";
    }
    // okay, declared with `let`
    x = "bar";
    // error, already declared in block
    let x = "inner";
  }
}
```
```
if(true){
	//TDZ开始
	tmp = 'abc'; //ReferenceError
	console.log(tmp); //ReferenceError
	
	let tmp;
	console.log(tmp); //undefined
	
	tmp = 123;
	console.log(tmp); //123
}
```

###Symbols
第七种数据类型,表示独一无二的值;

```
//typeof
typeof Symbol(); //symbol

// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

s1 === s2 // false
```

###Map + Set + WeakMap + WeakSet

- Set: 不重复的数组
- WeakSet:成员只能是对象
- Map: key可以是任意数据类型
- WeakMap:key只能是对象,null除外

```
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

```

###Proxy
属于”元编程”(meta programming),即对编程语言进行编程.
用于修改某些操作的默认行为,等同于在语言层面做出修改.

```
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```
>不能被转化或polyfill, 需要javascript engine支持


###Reflect
暴露运行时对象的元操作,
配合Proxy使用;

###Iterators + For..Of
遍历器（Iterator）它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

Iterator接口主要供for...of消费

```
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}
```

###Generator
一种异步编程解决方案.

Generator函数,内部可封装n个内部状态,返回一个可以遍历的状态机对象.

yield 是暂停标记;

next 方法可以恢复执行,执行到下一个暂停标记

```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

###Promise
一种异步编程的解决方案.

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果.

特点:
 
-  对象的状态不受外界影响.(`Pending`（进行中）、`Resolved`（已完成，又称Fulfilled）和`Rejected`（已失败）)
-  一旦状态改变，就不会再变，任何时候都可以得到这个结果.

```
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

###Modules
模块管理方案,完全可以替代之前的CommonJS, AMD方案.

```
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```
// app.js
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));
```
```
// otherApp.js
import {sum, pi} from "lib/math";
alert("2π = " + sum(pi, pi));
```
```
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```
```
// app.js
import exp, {pi, e} from "lib/mathplusplus";
alert("2π = " + exp(pi, e));
```

##参照
- [ES6标准入门](http://es6.ruanyifeng.com/) 
- [Babel 学习ES6](http://babeljs.cn/docs/learn-es2015/#binary-and-octal-literals)