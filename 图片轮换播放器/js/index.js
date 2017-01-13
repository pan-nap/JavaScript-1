/*
* @Author: dellpc
* @Date:   2016-11-02 08:48:06
* @Last Modified by:   dellpc
* @Last Modified time: 2016-11-02 22:05:29
*/

'use strict';
window.onload = function(){
	function getByClass(element,str){
		var aChild = element.getElementsByTagName("*");
		var res = [];
		for(var i=0 ;i<aChild.length ; i++){
			if (aChild[i].className==str) {
				res.push(aChild[i])
			};
		};
		return res;
	}
	var oSmall_pic = getByClass(document,"small_pic")[0];
	var oUl = oSmall_pic.getElementsByTagName("ul")[0];
	var opic = getByClass(document,"pic")[0];
	var oLi = opic.getElementsByTagName('li');
	//左右按钮
	var oPrev = getByClass(document,"prev")[0];
	var oNext = getByClass(document,"next")[0];
	var oMark_left = getByClass(document,"mark_left")[0];
	var oMark_right = getByClass(document,"mark_right")[0];
	oPrev.onmouseover = oMark_left.onmouseover = function(){
		move({"opacity":100},oPrev)
	}
	oPrev.onmouseout = oMark_left.onmouseout = function(){
		move({"opacity":0},oPrev)
	}
	oNext.onmouseover = oMark_right.onmouseover = function(){
		move({"opacity":100},oNext)
	}
	oNext.onmouseout = oMark_right.onmouseout = function(){
		move({"opacity":0},oNext)
	}

	//大图切换
	var nowIndex = 2 ;
	var now = 0;
	var aLi = oUl.getElementsByTagName('li');
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onclick = function(){
			if (this.index==now) return;

			now = this.index;
			tab()
		}
		aLi[i].onmouseover = function(){
			move({"opacity":100},this)
		}
		aLi[i].onmouseout = function(){
			if (this.index!=now) {
				move({"opacity":60},this)
			};
			
		}
	};
	function tab(){
		oLi[now].style.zIndex = nowIndex++;
		oLi[now].style.height = 0;
		
		for (var i = 0; i < aLi.length; i++) {
			move({"opacity":60},aLi[i]);
		};

		move({"height":392},oLi[now]);
		move({"opacity":100},aLi[now]);
		if (now==0) {
			move({"left":0},oUl)
		}else if(now==aLi.length-1){
			move({"left":-(now-2)*160},oUl)
		}else{
			move({"left":-(now-1)*160},oUl)	
		};
	}
	oPrev.onclick = function(){
		now--;
		if (now==-1) {
			now = oLi.length-1
		};
		tab()
	}
	oNext.onclick = function(){
		now++;
		if (now==oLi.length) {
			now = 0
		};
		tab()
	}
	var timer = setInterval(oNext.onclick,2000);
	var oDiv = getByClass(document,"big_pic")[0];
	oDiv.onmouseover = function(){
		clearInterval(timer)
	}
	oDiv.onmouseout = function(){
		timer = setInterval(oNext.onclick,2000);
	}
	// var i = 0
	// var timer = setInterval(function(){
	// 	console.log(i)
	// 	move({"left":-160*(i+1)},oUl);
	// 	move({"top":-392},oImg[i]);   
	// 	i++;
	// },3000)
}