/*
* @Author: dellpc
* @Date:   2016-11-09 16:00:55
* @Last Modified by:   dellpc
* @Last Modified time: 2016-11-09 17:23:06
*/

'use strict';

window.onload = function() {
	var imgs = document.getElementsByClassName("number");
	var imgHeight = parseInt(imgs[0].offsetHeight);
	var currentHeight;
	var arr = [2012,12,22,13,55,33,2];
	function setImages(arr) {
		var tempImgs = [];
		var str = arr.join('');
		for (var i = 0; i < str.length; i++) {
			tempImgs[i] = str.charAt(i);
		}
		return tempImgs;
	}

	// var arr1 = setImages(arr);
	// console.log(arr1);

	window.setInterval(function(){
		var timer = window.setInterval(function() {
			var arr1 = setImages(arr);
			var flag = true;
			for (var i = 0; i < imgs.length; i++) {
				if(imgs[i].currentHeight) {//若有当前高度的数学
					currentHeight = imgs[i].currentHeight;//保存当前高度
				} else {//若没有就是最初的高度
					currentHeight = imgHeight;
				}
				currentHeight = currentHeight - 5;//改变高度
				imgs[i].currentHeight = currentHeight;//将改变的高度重新设给currentHeight属性
				if(Math.abs(currentHeight) < imgHeight) {
					flag = false;//清空定时器
				} else {
					currentHeight = imgHeight;
					imgs[i].currentHeight = currentHeight;
				}
				if(currentHeight > 0) {
					imgs[i].style.height=currentHeight + 'px';			//将高度值赋给图片
					imgs[i].style.top=-(imgHeight - currentHeight) / 2 + 'px';	//图片的top值为初始高度值与当前高度值差值的一半
				} else {
					imgs[i].style.height=-currentHeight + 'px';					//高度重新置为37px
					imgs[i].style.top=-(imgHeight + currentHeight) / 2 + 'px';			//top值为初始高度值与当前高度值和值的一半
				}
				imgs[i].src = "images/" + arr1[i] + ".png";
			};
			
			if(flag) {
				clearInterval(timer);
			}
		}, 30)
	}, 1000);
	
}





