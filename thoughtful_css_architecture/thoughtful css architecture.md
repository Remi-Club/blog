title: thoughtful css architecture
speaker: wupeng
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/assets/css/index.css
theme: moon

[slide data-transition: zoomin]

# thoughtful css architecture

[slide data-transition="vertical3d"]

# **深思熟虑的CSS架构**

### *2016年10月11日 NATHAN RAMBECK*

Nathan提供了一个CSS架构的简介用来帮助设计css代码结构，避免你的项目和团队混乱生长。

> ### 架构：某些事物复杂或精心设计的结构

&emsp;&emsp;你是否曾经做过css项目，慢慢的就发现项目一团糟？很难追踪是什么样式影响了页面表现：微小的改动修复了一个问题，但是却制造了三个问题且需要引入很low的hacks，而且很小的CSS改动就能破坏js功能。感同身受吧，其实这些问题在项目开始时通过精心的计划可以很大程度的避免。让我们来谈谈CSS架构。

[slide]

## 深思熟虑结构的好处

&emsp;&emsp;精心设计的CSS结构最主要好处是可扩展性。对任何开发项目来说可扩展性都是个挑战，不管是领域增长或是团队的壮大，CSS也无一例外是个原因。层叠和全局都使CSS成为一种强有力的开发工具，但同时也使CSS不易维护。如果你写过CSS，不管多长时间，你都会发现自己为改了一行CSS修复了一个问题但是却破坏了临近的元素样式而烦恼。精心策划CSS结构就有如下好处：

* 较少的样式规则
* 较少的样式冲突
* 长期可维护性
* 新团队成员更快入手
* 团队成员间合作更容易
* 更顺畅的项目交接

[slide]

## CSS规则类型

&emsp;&emsp;[Jonathan Snook](https://snook.ca/)在他的[Scalable and Modular Architecture for CSS](https://smacss.com/)(SMACSS)一书中努力推广分组CSS规则的概念。按照这些规范定义的概念规划我们的CSS规则可以帮我们和我们的团队更好的理解我们每一条样式规则的目的和作用。我使用了SMACSS中强力推荐的七种概念。

* 基本样式(Base styles)
* 对象(Objects)
* 组件(Components)
* 状态(State)
* 主题(Themes)
* 工具(Utilities)
* js钩子(Javascript hooks)

&emsp;&emsp;理解这些概念和它们的意义能赋予你写的样式更高级的意义。

[slide]

## 基本样式(Base Styles)

&emsp;&emsp;基本样式是为全部的元素创建的样式规则。它们是整个网站的默认样式。一般，这些覆盖排版(typography)、盒子类型(box-sizing)和你想在所有浏览器里[正常化(normalize)](https://necolas.github.io/normalize.css/)的元素。写基本元素样式是一个常见的错误就是权重太高（难以覆盖）且创建了些并不是真正需要的CSS规则。你真想移除全局的标准无序列表样式或只在某个特定情况下？

[slide]

## 对象(Object)

&emsp;&emsp;对象是只关注结构和布局的规则。不允许装饰性样式。对象classes的概念是[Nicole Sullivan推广的](http://www.slideshare.net/stubbornella/object-oriented-css)，目的是重用常用结构和布局模式。找出你设计中的结构模式并创建在多个组件和网站多个部分中可用的对象类。通过把样式集中到对象类中，你可以避免样式冗余、减少CSS文件的尺寸。栅格系统(Grid system)，不管是自定义的还是借用框架的都符合对象类的概念。

[slide]

## 组件（Components）

&emsp;&emsp;组件是独立的UI片段。它们是原子设计的基础，且会占据样式的绝大部分。一个组件可以小到一个按钮(button)也可以大到一个轮播图(carousel)。写出健壮组件的关键是使它们独立于页面的其他部分且包含自己所需的样式和模版的(self-contained，感觉意思是内聚的)。你可以把组件放到任何页面的任何位置，这些组件包含自己的结构和设计（模版和样式）。

[slide]

## 状态(State)

&emsp;&emsp;状态类是改变组件状态的辅助类。比如，手风琴组件(accordions)是打开的或闭合的，链接(links)是激活的或非激活的，或元素是显示的还是隐藏的。通常是通过js来添加或移除状态类。并不是通过js来操作样式，而是可以通过更新组件类并在样式表里定义每种状态的具体视觉样式。

[slide]

## 主题(Themes)

&emsp;&emsp;主题类就是简单的改变一个组件的颜色、字体或者其他装饰。组件类可以用来修改整个页面或仅仅改变一个单独的组件。主题类并不是要每个项目都必须的但需要的时候确实是很有用。

```
<blockquote class="c-pullquote t-light">
	<p>A great quote from someone special.</p>
</blockquote>
```

[slide]

## 工具(Utilities)

&emsp;&emsp;工具类是实现特定样式规则的单一目标辅助类。它们用来调整间距、改变字体大小、居中文字、添加clearfix、隐藏元素等。工具类可以帮助你微调布局，像在组件间添加间距、清除浮动。也可以在现有组件的基础上做微小调整而不用重新创建一个新组件。

```
.u-sp {
  margin-bottom: 1em !important;
}

.u-clearfix:after {
  content: " ";
  display: block; clear: both; visibility: hidden;
  height: 0; font-size: 0;
}

.u-txt-center {
  text-align: center !important;
}

.u-txt-larger {
  font-size: 130% !important;
}
```

```
<div class="promo u-sp"></div>
<div class="promo u-sp"></div>
<div class="promo"></div>
```

[slide]

## Javascript钩子(Javascript Hooks)

&emsp;&emsp;尽可能的解耦Javascript和样式。当CSS重构和js依赖不明的时候，在制定样式规则和用js做DOM选择时都用类名会在以后引起问题。相反，完全使用classes做js钩子。

```
<button class="btn btn--buy js-buy-now"></button>
```

[slide]

# Classes命名

&emsp;&emsp;当命名classes时，确保你的类名足够长来区分它们(.pullquote not .pq)，但如果能区分就不用太长(.nav not .navigation)。可读性的类名对帮助团队成员现在和以后理解其后呈现的逻辑有很重要的作用。

&emsp;&emsp;起一个描述性、有意义的名字是写CSS中最麻烦的问题之一，但是如果精心设计后还是很有帮助的。多个词连接的类名之间是不允许使用空格的，可以查看我们非常受欢迎的文章获取更多细节。这篇文章是[Ethan Muller](https://twitter.com/ethanmuller)发表的[Naming CSS Stuff is Really Hard](https://seesparkbox.com/foundry/naming_css_stuff_is_really_hard)。

[slide]

## BEM命名规范

&emsp;&emsp;BEM(Block Element Modifier)是中非常流行和很有帮助的CSS命名规范，该规范是非常流行的俄语搜索引擎Yandex开发的。BEM命名规范很简单：

**[BLOCK]__[ELEMENT]--[MODIFIER]**

&emsp;&emsp;使用这么长的类名你可能会纠结，但是在项目中使用BEM方式添加的类名很快就会延迟这种担心。下面是使用BEM命名的示例组件。

```
<div class="alert alert--warning">
  <h1 class="alert__title">
    <span class="alert__icon"></span>
    Alert Title
  </h1>
  <p class="alert__description">The password you entered is invalid.</p>
</div>
```

对你的项目BEM命名提供了三个主要好处：

* **可读性(Readability)**：在多数元素上使用描述清楚的类名将使某些人能更容易的读懂你的HTML或CSS文件。
* **自我描述(Self-description)**：使用层级的命名方式使元素间的从属关系很明显。
* **指定性(Specificity)**：在每个元素上添加类是过度的，但是通过这种方式，你可以保持你每个选择器下的元素的指定性并能更加直接的覆盖。

[slide]

## 命名空间

&emsp;&emsp;另一种命名类名的最佳实践是把我们之前描述的类使用前缀区分出命名空间。这些前缀在你的类名之前加几个字符，但是这几个字符能让你很快弄清楚你HTML和样式表中的类名的目的，非常有用。下面是我用的一些命名空间：

* 对象(Objects)：`.o-`
* 组件(Components)：`.c-`
* 状态(State)：`.is-`或`.has-`
* 主题(Theme)：`.t-`
* 工具类(Utilities)：`.u-`
* Javascript钩子(Javascript Hooks)：`.js-`

```
<footer class="c-footer">
  <div class="o-container-wide">
    <a class="c-footer__logo" href="/">The Assist</a>
    <div class="c-social c-social--follow">
      <div class="c-social__label u-txt-center">Join the conversation</div>
      <ul class="c-social__list">
        <li class="c-social__item"></li>
        <li class="c-social__item is-active"></li>
        <li class="c-social__item"></li>
      </ul>
    </div>
    <p class="c-footer__credit"></p>
  </div>
</footer>
```

&emsp;&emsp;更多命名空间的值参见Harry Robert的[关于这个主题的文章](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)。

[slide]

# 代码风格

&emsp;&emsp;像其他代码一样，在你的CSS项目中使用一贯的代码风格是很重要的。这包括关于空格、缩进、命名规范、注释等的指导。你也可以从[Google](https://google.github.io/styleguide/htmlcssguide.xml)、[Github](http://primercss.io/guidelines/)或[Nicolas Gallagher](https://github.com/necolas/idiomatic-css)上找到些合理的指导规范。使用它们的或你自己创建的相似的指导规范集。

[slide]

# 代码组织

&emsp;&emsp;为了获得最佳的代码组织结构，你应该使用一种预编译工具([Sass](http://sass-lang.com/)、[Less](http://lesscss.org/)、[Stylus](http://stylus-lang.com/))或后处理工具([PostCSS](http://postcss.org/))来编译你的代码。有很多优势，包括变量(variables)、函数(functions)、mixins、imports和嵌套(nesting)这样的feature。这些feature能帮你实现只有CSS无法实现的更有组织的代码结构。

&emsp;&emsp;使用imports，你可以把样式拆分到有意义的文件中。

```
@import "variables";
@import "mixins";
@import "normalize";
@import "typography";
@import "headings";
@import "headings";
@import "layout";
@import "carousel";
```

&emsp;&emsp;当任何值被使用超过一次是就可以使用变量(variables)。在变量名中添加前缀能帮你弄明白它们的目的并使代码补全更有用。

```
// Colors
$c-warning: Red;
$c-primary: Blue;
$c-background: White;
```

&emsp;&emsp;一些全局变量应该存到单独的变量文件中，而其他的局部变量就只应该在它们的组件中使用和定义。在Sass里，变量可以包含在一个嵌套结构的局部作用域里。

```
.alert {
  $background-color: Red;
  $foreground-color: Cream;
  background-color: $background-color;
  color: $foreground-color;
}
```

[slide]

# 源码顺序

&emsp;&emsp;因为CSS的层叠特性，样式的顺序也是有影响的。如果你不确定你引入文件的顺序，你会不断的和样式层叠影响做斗争。

&emsp;&emsp;最近，Harry Roberts发布了他叫ITCSS(Inverted Triangle CSS)的文章[a sensible method for ordering your styles](http://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731)，这篇文章的目的是防止命名空间冲突、特定问题、有漏洞的样式(leaky styles)和无意义的回归(inadvertent regressions)([查看幻灯片](https://speakerdeck.com/dafed/managing-css-projects-with-itcss))。这个概念很简单：你的CSS设置以最宽泛和特定性最低的开始，以最精准特定性最高的设置结尾。这意味着你的变量定义和普通元素的样式定义总是最先开始，而工具类和IE Hacks放在最后。

&emsp;&emsp;Harry定义了七组文件，并把这些文件排序：

* 设置(Settings)：变量和其他设置
* 工具(Tools)：自定义函数和mixins
* 普通类(Generic)：字体(Font-face)、盒子类型(box-sizing)、常态化(normalize)等
* 元素类(Elements)：普通元素的默认样式，像标题和链接
* 组件(Components)：独立组件
* 辅助类(Trumps)：工具类(Utilities)和覆盖其他一切的规则

```
@import "settings.global";
@import "settings.colors";
@import "tools.functions";
@import "tools.mixins";
@import "generic.box-sizing";
@import "generic.normalize";
@import "elements.headings";
@import "elements.links";
@import "objects.wrappers";
@import "objects.grid";
@import "components.nav";
@import "components.buttons";
@import "components.promos";
@import "trumps.utilities";
@import "trumps.ie8";
```

[slide]

# 深入了解

&emsp;&emsp;这段内容只是广泛和深入话题的简介， 但是希望能启发你更多的考虑怎样设计CSS项目的结构。如果你想深入的了解这个话题，继续跟进这篇文章的许多链接，并关注下面的资源和这个领域里的思想领袖。

* **Harry Roberts** - 这个领域里最高产的思想领袖之一。关注他的[Twitter](https://twitter.com/csswizardry)，订阅他的[博客](http://csswizardry.com/)、阅读他的[CSS Guidelines文档](http://cssguidelin.es/)
* **Jonathan Snook** - 在他的文章和在线电子书上推广CSS架构，[Scalable and Modular Architecture for CSS](https://smacss.com/)
* **Nicole Sullivan** - 在[Github wiki](https://github.com/stubbornella/oocss/wiki)里引入了面向对象CSS的概念。

&emsp;&emsp;这篇文章基于我最近在同样话题上的介绍。查看[幻灯片](http://nathan.rambeck.org/presentations/css-architecture/#/)或观看下面的视频。

[slide class="center-img"]

[![视频](/assets/img.png)](https://player.vimeo.com/video/172444121)

[slide]

# 原文链接

[https://seesparkbox.com/foundry/thoughtful_css_architecture](https://seesparkbox.com/foundry/thoughtful_css_architecture)