#顶级API
##React
`React` 是React库的入口点.如果你使用了任何预编译的包,它在全局作用域中可用;假如你正在用CommonJS模块,你可以用`require()`的方式使用它.
###React.Component

```
class Component

```
当用es6类定义组件时,`React.Component`是基类.关于如何在`React`中使用es6类,参照[可复用组件](https://facebook.github.io/react/docs/reusable-components.html).要看基类真正提供了那些方法,参照[Component API](https://facebook.github.io/react/docs/component-api.html).

###React.createClass
```
ReactClass createClass(object specification)
```
创建一个组件类,被传递一个具体对象.一个组件实现一个`render`方法, `render`方法只返回一个孩子元素.那个孩子元素可以有任意深度的孩子元素结构.你不需要用new去创建组件,这也是组件不同于标准原型类的一个方面.`createClass`是一个方便的包装器,它构造返回一个实例(通过 new).
要看更多关于具体对象的信息,参照[Component 规格说明和生命周期](https://facebook.github.io/react/docs/component-specs.html)

###React.createElement
```
ReactElement createElement(
  string/ReactClass type,
  [object props],
  [children ...]
)
```
创建并返回一个新的指定类型的`ReactElement`.类型参数可以是html标签字符串(比如'div', 'span', 等等),也可以是`ReactClass`(通过`React.createClass`创建).

###React.cloneElement
```
ReactElement cloneElement(
  ReactElement element,
  [object props],
  [children ...]
)
```
用`element`作为开始点克隆并返回一个新的`ReactElement`.被返回的元素拥有浅拷贝了的原始元素的属性和新的属性的合并后的属性.新的孩子将替换存在的孩子.不像`React.addons.cloneWithProps`,来自原始元素的`key`和`ref`将被保留.合并任何元素都没有其他特别的行为(不像`cloneWithProps`).更多其他细节参照[v0.13 RC2 博客帖子](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html)

###React.isValidElement

###React.DOM

###React.propTypes

###React.Children

#####React.Children.map
#####React.Children.forEach
#####React.Children.count
#####React.Children.count
#####React.Children.only
#####React.Children.toArray

##ReactDOM
###ReactDOM.render
###ReactDOM.unmountComponentAtNode
###ReactDOM.findDOMNode

##ReactDOMServer
###ReactDOMServer.renderToString
###ReactDOMServer.renderToStaticMarkup
