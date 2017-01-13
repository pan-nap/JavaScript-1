/*
* @Author: dellpc
* @Date:   2016-10-30 16:57:57
* @Last Modified by:   dellpc
* @Last Modified time: 2016-11-09 18:35:27
*/
window.onload = function(){
	var numberImg = [
		{"number":0,"src":"images/0.png"},
		{"number":1,"src":"images/1.png"},
		{"number":2,"src":"images/2.png"},
		{"number":3,"src":"images/3.png"},
		{"number":4,"src":"images/4.png"},
		{"number":5,"src":"images/5.png"},
		{"number":6,"src":"images/6.png"},
		{"number":7,"src":"images/7.png"},
		{"number":8,"src":"images/8.png"},
		{"number":9,"src":"images/9.png"}
	] 
	var weekImg = [
		{"week":0,"src":"images/seven.png"},
		{"week":1,"src":"images/one.png"},
		{"week":2,"src":"images/two.png"},
		{"week":3,"src":"images/three.png"},
		{"week":4,"src":"images/four.png"},
		{"week":5,"src":"images/five.png"},
		{"week":6,"src":"images/six.png"}
	]

	function buling(a){
		if (a<10) {
			return "" + 0 + a;
		}else{
			return a;
		};
	}
	function getTime(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var week = date.getDay();
		var str = "" + year + buling(month) + buling(day) + buling(hours) + buling(minutes) + buling(seconds) + week;
		var arr = str.split("")
		return arr;
	}
	var aImg = document.getElementsByClassName('number');
	for (var i = aImg.length - 1; i >= 0; i--) {
		aImg[i].now = -1;
	};
	var arr = [];
	var g_height = 37;
	// setTime()
	setInterval(setTime, 1000)//时间定时器
	// setTime()
	function setTime(){

		timer = setInterval(roll,30);//反转定时器;动画函数
	}
	function roll(){
		arr = getTime();
		var flag = true;			//假设所有图片均已转到位置，并停止定时器，
		g_height -= 5; 
		if(Math.abs(g_height) < 37) {
			flag=false;				//但是开始旋转，flag被置为false，定时器不停止，一直执行反转动画，（注：是所有当前now值不一致的图片一起完成的动画，
									//即，每执行一次roll函数，所有now值不一致的图片，一起从37——32——27——22——17——12——7——2——转换图片的src——（-3）——（-8）——（-13）
									//——（-18）——（-23）——（-28）——（37））
		} else {
			g_height = 37;			//进入该语句表示，图片已反转完毕，并且src已经转换完成，-38时被置为37，此时将now全部置为正确值，并停止定时器
		}
		for (var i = 0 ; i<aImg.length; i++) {
			if (aImg[i].now!=arr[i]) {
				var res = null;
				if (i==aImg.length-1) {
					res = weekImg.filter(function(item,index,array){
						return (item.week == arr[i])
					})	 
				}else{
					res = numberImg.filter(function(item,index,array){
						return (item.number == arr[i])
					})
				};	
				if (g_height>0) {												//当g_height大于零时，变化的是上一个时间图片的src
					aImg[i].style.height = g_height + "px";
					aImg[i].style.top = -(37 - g_height) / 2 + 'px';
				} else {
					aImg[i].src = res[0].src;									//当g_height小于零时，变换图片的src
					aImg[i].style.height = -g_height + "px";					//新图片慢慢变大
					aImg[i].style.top = -(g_height+37) / 2 + "px";
				};
			};
		};
		if(flag) {																	//flag为真，表示此时g_height已变为小于-37的值，重新置为37 图片处于原位
			for (var i = aImg.length - 1; i >= 0; i--) {
				aImg[i].now = arr[i];												//将now置为当前正确的时间值
			};
			clearInterval(timer);	
		}
	}
}


