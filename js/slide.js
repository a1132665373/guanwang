var pauseBanner = false;
$(function(){
	var win=$(".pic");
	var links=$(".tit li a");
	var float=$(".float");
	var divs=$(".box-1 div");
	var banners = $(".box-1 .indexbanner");
	var showtime = $($(".box-1 .indexbanner")[0]).data("time");
	var nowtime = 0;
	var num1=0;  //
	var num2=0;
	var timer=null; //定时器返回值，主要用于关闭定时器
 	var iNow=0; //iNow为正在展示的图片索引值，当用户打开网页时首先显示第一张图，即索引值为0
	win.hover(function(){
		$(".leftB,.rightB").css("display","block");
	},function(){
		$(".leftB,.rightB").css("display","none");
	});
	$(".leftB").click(function(){
		divs.finish();
		float.stop(true);
		var temp=num1;
		num1--;
		if(num1==-1){
			num1=bannerCount-1;
		}
		showtime = banners.eq(num1).data("time");
		nowtime = 0;
		divs.eq(num1).css("left",4000).animate({left:0});
		divs.eq(temp).animate({left:-4000});
		links.css("font-size","16px");
		links.eq(num1).css("font-size","24px"); 
	});
	$(".rightB").click(function(){
		divs.finish();
		float.stop(true);
		var temp=num1;
		num1++;
		if(num1==bannerCount){
			num1=0;
		}
		showtime = banners.eq(num1).data("time");
		nowtime = 0;
		divs.eq(num1).css("left",-4000).animate({left:0});
		divs.eq(temp).animate({left:4000});
		links.css("font-size","16px");
		float.animate({left:links.eq(num1).position().left})
		links.eq(num1).css("font-size","24px");
	});
	links.hover(function(){
		pauseBanner = true;
		//
		divs.finish();
		float.stop(true);
		links.css("font-size","16px");
		var that=$(this);
		var lefts=$(this).position().left;
		float.animate({left:lefts},function(){
			that.css("font-size","24px");
		})
		//
		var index=$(this).index(".tit li a");

		setNums(index);
		iNow=index;
	},function(){
		pauseBanner = false;
	});

	$(".box-1").hover(function(){
		pauseBanner = true;
	},function(){
		pauseBanner = false;
	});

	var setNums = function(num){
		num2 = num;
		links.css("font-size","16px");
		//links.css("color","#fff");
		links.eq(num).css("font-size","24px");
		//links.eq(num).css("color","#ff0000");

		showtime = banners.eq(num).data("time");
		nowtime = 0;
		//console.log("设置为显示" + showtime + "秒");
		if(num1==num2){
			return;
		}else if(num1<num2){
			divs.eq(num2).css("left",4000).animate({left:0});
			divs.eq(num1).animate({left:-4000});
		}else if(num1>num2){
			divs.eq(num2).css("left",-4000).animate({left:0});
			divs.eq(num1).animate({left:4000});
		}
		num1 = num2;
		num2 = "";
	}

	timer=setInterval(function(){ //打开定时器
		if(!pauseBanner){//未暂停时
			nowtime++;
			//console.log(nowtime);
			if(nowtime>=showtime){
				iNow++;    //让图片的索引值次序加1，这样就可以实现顺序轮播图片
				if(iNow>links.length-1){ //当到达最后一张图的时候，让iNow赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
					iNow=0;
				}
				//console.log(iNow);
				setNums(iNow);
					links.eq(iNow).trigger("click"); //模拟触发数字按钮的click
				}
			}

		},1000); //1秒检测1次
});