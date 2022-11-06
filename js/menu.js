$(function(){
	$(".icon-caidan").click(function(){
		$('.nav').removeClass('top');
		$('.nav').addClass('show');
	});
	$(".nav .icon-sousuo").click(function(){
		$('.nav').removeClass('top');
		$('.nav').addClass('showSearch');
		$('#searchDiv input').focus()
;
	});
	$(".siderbg").click(function(){
		$('.nav').removeClass('show');
		$('.nav').removeClass('showSearch');
		$('#searchDiv input').val("");
		$('#searchResult').html("");
	});
});

function vc(ml){
	var playCT = $('video')[0].currentTime;
	var isPaused = $('video')[0].paused;
	
﻿	$('video').attr('src', '/video/'+ videoUrl +'_'+ ml +'.mp4');
	$('video a').attr('href', '/video/'+ videoUrl +'_'+ ml +'.mp4');
	$('#div_ml span[data-ml='+ml+']').css('color', 'rgb(255, 0, 0)');
	$('#div_ml span[data-ml!='+ml+']').css('color', 'rgb(115, 115, 115)');


	//console.log(isPaused);
	if(!isPaused){
		$('video')[0].play();
	}
	if(playCT>0){
		setTimeout("$('video')[0].currentTime = "+ playCT +";", 200)
	}
}
