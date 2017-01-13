/*
* @Author: dellpc
* @Date:   2016-11-02 09:18:29
* @Last Modified by:   dellpc
* @Last Modified time: 2016-11-02 13:53:28
*/

'use strict';
function getStyle(obj,property){
	if (obj.currentStyle) {
		return obj.currentStyle[property]
	}else{
		return getComputedStyle(obj,false)[property]
	};
}
function move(json,obj,fnEnd){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			var cur = 0 ;        //获取当前元素某个属性的值
			if (attr == "opacity") {
				cur = parseFloat(getStyle(obj,attr))*100;
			}else{
				cur = parseInt(getStyle(obj,attr));
			};
			var speed = (json[attr]-cur)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if (cur!=json[attr]) {
				bStop = false
			};
			if (cur==json[attr]&&fnEnd) {
				bStop = true
			};
			cur+=speed;
			if (attr=="opacity") {
				obj.style[attr] = cur/100
			}else{
				obj.style[attr] = cur + "px"
			};
			if (bStop) {
				clearInterval(obj.timer);
				if (fnEnd) {
					fnEnd;
				};
			};
		}
	},30)
}