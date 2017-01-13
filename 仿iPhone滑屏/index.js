function getStyle(obj,attr){
        		if (obj.currentStyle) {
        			return obj.currentStyle[attr]
        		}else{
        			return getComputedStyle(obj,false)[attr]
        		};
        	}
        	function move(obj,json,fn){
        		clearInterval(obj.timer);
        		
    			obj.timer = setInterval(function(){
    				var bStop = true;
    				for(var attr in json){
        				
	        			var cur = 0 ;
	        			if (attr =="opacity") {
	        				cur = parseFloat(getStyle(obj,attr))*100
	        			}else{
	        				cur = parseInt(getStyle(obj,attr))
	        			}

	        			var speed = (json[attr] - cur)/6;
	        			speed = speed>0?Math.ceil(speed):Math.floor(speed);
	        			if (cur!=json[attr]) {
	        				bStop=false
	        			}
	        			if (cur==json[attr]&&fn) {
	        				bStop = true;
	        			}
	        			cur+=speed;
	        			if (attr=="opacity") {
	        				obj.style[attr] = cur/100
	        			}else{
	        				obj.style[attr] = cur + "px";
	        			}
	        		}
	        		if (bStop) {
	        			clearInterval(obj.timer);
	        			if (fn) {
	        				fn();
	        			}
	        		}
        		}, 30)	
        	}
        	window.onload = function(){
        		var oDiv = document.getElementById("div1");
        		var oUl = document.getElementById("ul1");
        		var aLi = oUl.getElementsByTagName("li");
        		var w = 0;
        		function ready(){
	    			w = aLi[0].offsetWidth;
	        		oUl.style.width = w*aLi.length + "px";
	        		oDiv.style.height = aLi[0].offsetHeight + "px";
        		}
        		ready();
        		window.onresize  = function(){
        			ready();
        			oUl.style.left = Now*w + "px";
        		}
        		
        		var downX = 0;
        		var upX = 0;
        		var Now = 0;
        		var downTime = 0;
        		var offset = 0;

        		oUl.addEventListener("touchstart",function(e){
        			downTime = Date.now();	//h5新方法，获取毫秒数
        			var ev = e||window.event;
        			//移动端获取到事件对象之后，不能直接获取相应的clientX
        			//需要获取changedTouches对象,手指操作的集合 ,是个类数组对象，多指操作时，数组长度增加，单指时需加下标
        			
					//手指按下瞬间坐标
        			downX = ev.changedTouches[0].clientX; 
        			offsetX = oUl.offsetLeft;
        			oUl.addEventListener("touchmove", function(e){
        				var ev = e||window.event;
						var moveX = ev.changedTouches[0].clientX;
						if (this.offsetLeft>=0) {
							//第一张图片时，滑动变慢
							oUl.style.left = (moveX - downX)/3 + "px"
						}else if(this.offsetLeft <= oDiv.offsetWidth - oUl.offsetWidth ){
							//最后一张时，滑动变慢
							oUl.style.left = (moveX - downX)/3 + oDiv.offsetWidth - oUl.offsetWidth + "px"
						}else{
							oUl.style.left = moveX - downX + offsetX + "px"
						}
        			}, false);
        		} , false)
        		oUl.addEventListener("touchend", function(e){
        			var ev = e||window.event;
        			upX = ev.changedTouches[0].clientX;
        			if (upX-downX>0) {
        				if (Now!=0&&(Math.abs(upX-downX)>w/2||(Date.now()-downTime<300&&Math.abs(upX-downX)>10))) {
        					Now++;
        				}
        			}else{
        				if (Now!=-(aLi.length-1)&&(Math.abs(upX-downX)>w/2||(Date.now()-downTime<300)&&(Math.abs(upX-downX)>10))) {
        					Now--
        				}
        			}
        			move(oUl,{"left":Now*w});
        		}, false)
        	}