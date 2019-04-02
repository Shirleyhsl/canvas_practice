## canvas练习
### 雨滴下落效果
* 让canvas元素大小和浏览器窗口高一致
    * 获取canvas元素
    * 获取浏览器窗口宽高
    * 给canvas设置一个宽高
    * 当浏览器窗口发生改变时，要重新设置canvas的宽高。因为canvas是根据初始刷新
>设置之后，会有一个问题，就是实际canvas元素的高度会比窗口大小大，这是因为canvas是行内元素，会有行间距，解决的办法就是将canvas的display设置为block就好了。
* 绘制canvas
    * 获取canvas
* setInterval()
* 会动的雨滴
* 绘制多个数量的雨滴
    * 每隔0.2s下一滴雨
