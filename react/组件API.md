#组件API
##React.Component
React组件的实例在React内部渲染时被创建.那些实例在随后渲染时被重复利用,并且能够被组件方法中的`this`访问.在React外部,唯一处理React组件实例的方式是用变量保存`ReactDOM.render`返回的值.在组件内部,可用用[refs](https://facebook.github.io/react/docs/more-about-refs.html)来访问到相同的结果.

###setState
```javescript
void setState(){
  function|object nextState,
  [function callback]
}
```
执行nextState到当前状态的浅合并.这是主要的方法用来在事件处理器和服务端请求回调中调用,触发界面的更新.
第一个参数可以是对象(包含零个或多个用作更新的keys),或则是一个函数(拥有state和props),该函数必须返回一个包含用作更新的keys的对象.	
下面是一个简单的用法:	

```javascript
setState({mykey: 'my new value'});
```
当第一个参数是函数时,它的签名是`function(state, props)`.这个在需要参照先前的state和props的值进行更精细的更新处理时很有用.下面这个例子,假设想要累加state的的一个值:

```
setState(function(previousState, currentProps) {
  return {myInteger: previousState.myInteger + 1};
});
```
第二个参数可选,是一个回调函数, 一旦`setState`被完成并且组件被渲染更新(`componentDidUpdate`执行了)后, 该回调函数才被执行.
####备注
>不要直接改变`this.state`,把它当做一个不可变的对象.只通过`setState`去做改变.	
>
>`setState`不会立即改变`this.state`,而是创建了一个用来过渡的待定状态.`setState`被调用后就访问`this.state`返回的是当前存在的值.	
>
>`setState`不是同步处理`this.state`的,为了更高效,它是被批量处理的.
>
>`setState`总是触发重新渲染,除非`shouldComponentUpdate()`被实现返回false.
>

###reaplceState
```
void replaceState(
  object nextState,
  [function callback]
)
```

类似`setState`,但是删除了先前存在的状态keys值.
####备注
>这个方法在es6中不支持,在React的未来版本中可能被废弃. 

###forceUpdate
```
void forceUpdate(
  [function callback]
)
```
如果`this.state`中某个成员变量本身没有改变指向,而是对象内部数据变化,这时如果需要重新渲染组件,就可以调用`forceUpdate()`.

调用`forceUpdate()`将跳过`shouldComponentUpdate()`直接引起`render()`被调用.孩子组件的生命周期保持正常.

正常情况下应该避免使用`forceUpdate()`,仅仅是在`render()`中读取`this.props`和`this.state`.这可以使组件更"纯粹",并且应用更简单高效.


###isMounted
将被废弃, 参照[从现在开始迁移isMounted()](https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html), 可使用组件对象存在标志来解决.