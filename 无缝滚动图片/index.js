/*
* @Author: dellpc
* @Date:   2016-10-30 09:31:04
* @Last Modified by:   dellpc
* @Last Modified time: 2016-11-01 09:18:09
*/


window.onload = function(){
	function move(obj,speed)
{
	clearInterval(timer)
	timer = setInterval(function()
	{
		
		var a = parseInt(obj.offsetLeft);
		var b = parseInt(obj.offsetWidth/2);
		document.title = a + ',' + speed;
		// console.log(a);
		
		
		if (speed>0) 
		{
			if(a>=0)
			{
				obj.style.left = -b + 'px';
			};
			flag = true;
		}
		else if(speed<0)
		{
			if (a <= -b) 
			{
				obj.style.left = '0px';
			}
			flag = false;
		};
		if (oChk.checked) {
			var pause_time = parseInt(oPause.value)					//546px,364px;182px;0px;
				console.log("offsetLeft:"+a)
				console.log("offsetLeft%182的绝对值："+Math.abs(a%182))
			
			if (Math.abs(a%182)<Math.abs(speed)&&a<=0) {
				clearInterval(timer)
				var timer1 = setTimeout(function(){
					move(oUl,speed);
					console.log("***********************************************************")
				},pause_time)
			};
		};
		obj.style.left = obj.offsetLeft + speed + 'px';
	},30)

}
	var flag = null;           //true代表向右移动，此时speed大于0
	var oDiv = document.getElementsByClassName('roll');
	var oUl = document.getElementsByTagName('ul')[0];

	oUl.innerHTML += oUl.innerHTML;
	var oLi = oUl.getElementsByTagName('li');
	var a = getComputedStyle(oLi[0],false).width;
	var b = oLi.length;
	console.log(typeof (a*b))
	oUl.style.width = parseInt(a)*parseInt(b) + 'px';
	var oSpeed = document.getElementById('sel_speed');
	var speed = parseInt(oSpeed.value);
	var timer = null;


	//默认移动
	move(oUl,speed);

	//左右按键控制运动方向
	var oALeft = document.getElementsByClassName('btn_left')[0];
	var oARight = document.getElementsByClassName('btn_right')[0];
	oALeft.onclick = function()
	{
		move(oUl,-speed);
	}
	oARight.onclick = function()
	{
		move(oUl,speed);
	};

	//鼠标移入每个li，运动停止
	for(var i=0 ; i<oLi.length ; i++){
		oLi[i].onmouseover = function(){
			clearInterval(timer)
		}
		oLi[i].onmouseout = function(){
			if (flag) {
				move(oUl,speed)
			}else{
				move(oUl,-speed)
			};
		}
	};
	
	//通过选择控制运动的速度
	oSpeed.onchange = function (){
		speed = parseInt(oSpeed.value);
		if (flag) {
			move(oUl,speed)
		}else{
			move(oUl,-speed)
		};
	}

	//间隔停顿
	var oChk = document.getElementById('chk_pause');
	var oPause = document.getElementById('pause_time');
	// oChk.onchange = oPause.onchange = function(){

	// };	

	
}