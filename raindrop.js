window.onload=function () {
    //步骤1：设置canvas宽高为全屏
    var canvas=document.querySelector('#canvas');
    var w,h;
    (function setSize(){
        window.onresize=arguments.callee;
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h; 
    })();

    
    var ctx = canvas.getContext("2d");      //获取可绘制区域
    var arrRain = [];                       //保存所有的雨滴实例对象
    createRain(50, 200);                    //创建所有的雨滴对象

    //控制雨滴移动
    setInterval(() => {
        ctx.beginPath();            //抬笔
        //加一层蒙版
        ctx.fillStyle="rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, w, h);    
        for(var item of arrRain){ //for of：item变量指数组里元素的每一个元素  //for in：item变量指数组里元素的每一个元素下标(包括原型链上可遍历的元素)
            item.move();
        }
    }, 1000/60);
    

    /**
    * 绘制雨滴
    * @param {*} num 雨滴数量
    * @param {*} time 所有雨滴出现的时间间隔
    * 注：因为for循环执行的时间很快，所有几乎所有的雨滴在同一时间被创建，所有都在time时间后出现
    * 解决的办法给延迟的间隔时间*i
    */
    function createRain(num, time) {
        for (var i = 0; i < num; i++) {
            setTimeout(() => {
                var rain = new Rain();
                rain.init();
                rain.draw();
                arrRain.push(rain);
            }, time * i);
        }
    }  
    
    /**
     * 定义雨滴对象
     */
    function Rain() {}
    Rain.prototype={
        init:function() {
            this.x=Math.random()*w;     //新生成雨滴的x坐标 屏幕宽度范围随机值
            this.y=0;                   //从顶部开始下落
            this.vY=Math.random()+4;    //设置雨滴的速度为4~5之间
            this.h=Math.random()*0.1*h+0.8*h;   //设置雨滴最大下落的高度在屏幕的0.8-0.9h之间
            this.r=1;                   //雨滴落地后的圆半径
            this.vr=1;                  //圆半径的半径扩大的速度
            this.maxR=60;               //雨滴最大的半径

        },
        draw:function() {
            if(this.y<this.h){
                ctx.beginPath();            //抬笔
                ctx.fillStyle = "#fff"
                ctx.fillRect(this.x, this.y, 2, 6);   //改变y坐标，重新绘画
            }else{
                ctx.beginPath();            //抬笔
                ctx.strokeStyle = "#fff"
                ctx.arc(this.x, this.y,this.r,0,Math.PI*2);   //改变y坐标，重新绘画 
                ctx.stroke();
            }
           
            
        },
        move:function() {
            //当雨滴还未落地 y一直变化，落地后y就不变
            if (this.y < this.h) {
                this.y += this.vY;
            }else{
                //在小于最大半径之前半径一直扩大，在扩大到最大后初始化
                if(this.r<this.maxR){
                    this.r += this.vr;
                }else{
                    this.init();
                }
            }
            this.draw();
        }
    }
   
}