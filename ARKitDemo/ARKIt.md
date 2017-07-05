#什么是AR, 与VR的区别
>VR*(Virtual Reality)*是AR*(Augmented Reality)*的极端情况,VR是AR的真子集. 往裸眼画面上增加数字信息, 投放后呈现的画面就是增强现实. 当我们增加的数字信息增加得无穷多的时候,就是虚拟现实.我们看到的现实画面被数字内容全部覆盖


#AR工作原理
![](http://imageshack.com/img924/1493/cW5vkl.png)
###大致分为三个部分
- **虚拟场景生成单元**: 负责虚拟场景的建模、管理、绘制和其它外设的管理
- **显示器**:显示虚拟和现实融合后的信号
- **交互设备**:实现感官信号及环境控制操作信号的输入输出


>对真实环境识别后, 需要对虚拟生成物三维配准,由最早的**二维图片定位**到**三维物体定位**到**同时定位和地图构建(三维环境定位)SLAM**,是AR最核心的技术,也是目前发展的难点 


>标准的视觉SLAM问题可以这么描述为：把你空投到一个陌生的环境中，你要解决“我在哪”的问题。这里的“我”基本上等同于相机或者眼睛（因为单目，即单相机，请把自己想象成独眼龙），“在”就是要定位（就是localization），“哪”需要一张本来不存在的需要你来构建的地图（就是mapping）。你带着一只眼睛一边走，一边对周边环境进行理解（建图），一边确定在所建地图中的位置（定位），这就是SLAM了。换句话说，在走的过程中，一方面把所见到（相机拍到）的地方连起来成地图，另一方面把走的轨迹在地图上找到。


###

![](http://imageshack.com/img923/7859/QyPvsH.gif)
**(这是假的)**

#AR框架
- [Vuforia](https://developer.vuforia.com/)
- [EasyAR](http://www.easyar.cn/)
- [HiAR](https://www.hiscene.com/sdk/)
- [ARKit](https://developer.apple.com/documentation/arkit#overview)


#ARKIT
![](http://imageshack.com/img923/5863/c1RwT1.png)

- 快速稳定的环境定位,时运算,运动定位
- 平面和边界探测 碰撞检测和光线估算

#框架
![](http://imageshack.com/img922/5935/5JB0H7.png)

###**四个主要类:**
###ARSessionConfiguration
配置session(判断设备是否支持, 设置平面检测, 光线检测等)

###ARSession
增加, 移除锚点, 运行, 暂停, 事件处理等

###ARFrame
监听图像,相机等信息

###ARAnchor
在真实环境中放置虚拟物体的锚点


### 创建一个简单的AR场景

```
	var sceneView: ARSCNView! //创建展示场景的页面
	sceneView.delegate = self //设置事件监听
	let scene = SCNScene(named: "****.scn")!//创建场景   
	sceneView.scene = scene //添加到页面
	let configuration =ARWorldTrackingSessionConfiguration()//创建配置
	sceneView.session.run(configuration) //运行
```


#应用
[链接](https://sspai.com/post/39806)



