var create = {
	set: function(ratio,type,cnt,speed){
		if(type == 'rain'){
			return this.rain(ratio,cnt,speed);
		}else if(type=='kaminari'){
			return this.kaminari(ratio,cnt,speed);
		}else{
			return this.heart(ratio,cnt,speed);
		}
	},
	rain : function(ratio,cnt,speed){
		var elm = $.tag('div#'+cnt+'.obj').position({x:ratio* 2.7}).tag('img').attr('src','/img/rain.png').gat();
		var sType = speedType(speed);
		elm.cls(sType.type);
		elm.tap(function(){
			elm.cls({animated: 1,bounceOut: 1});
			elm.off('tap');
			var self = this;
			console.log('tap')
			setTimeout(function(){self.remove();},1000);
			$('div.btn.sub').text(counter.up());
			if($('div.btn.sub.hide')){
				$('div.btn.sub.hide').cls({hide: -1});
				$('div.btn.sub').off('touchstart');
				$('div.btn.sub').on('touchstart',game.tap);
				$('div.btn.sub').on('click',function(){
					$('div.btn.sub').cls({isPresed: -1})
				})
			}
		});
		setTimeout(function(){elm.remove();},sType.time);
		return elm;
	},
	kaminari: function(ratio,cnt,speed){
		var elm = $.tag('div#'+cnt+'.obj').position({x:ratio* 2.7}).tag('img').attr('src','/img/kaminari.png').gat();
		var sType = speedType(speed);
		elm.cls(sType.type);
		var stopId = setTimeout(function(){
			$('#life'+life.get()).cls({animated: 1, fadeOutUp: 1});
			setTimeout(function(){$('#life'+life.get()).remove();},1000);
			elm.remove();
			if(life.down() == 0){
				loader.start('you lose');
				game.lose();
				setTimeout(function(){
					location.reload()
				},5000);
			}
		},sType.time);
		elm.tap(function(){
			elm.cls({animated: 1,bounceOut: 1});
			elm.off('tap');
			clearTimeout(stopId);
			var self = this;
			setTimeout(function(){self.remove();},1000);
			$('div.btn.sub').text(counter.superUp());
			if($('div.btn.sub.hide')){
				$('div.btn.sub.hide').cls({hide: -1});
				$('div.btn.sub').off('touchstart');
				$('div.btn.sub').on('touchstart',game.tap);
				$('div.btn.sub').on('click',function(){
					$('div.btn.sub').cls({isPresed: -1})
				})
			}
		});
		return elm;
	},
	//TODO
	heart: function(ratio,cnt,speed){
		var elm = $.tag('div#'+cnt+'.obj.life').position({x:ratio* 2.7}).tag('img').attr('src','/img/heart.png').gat();
		var sType = speedType(speed);
		elm.cls(sType.type);
		elm.tap(function(){
			elm.cls({animated: 1,bounceOut: 1});
			elm.off('tap');
			var self = this;
			setTimeout(function(){self.remove();},1000);
			if(life.get() <= 5){
				$('.lifes').tag('div#life'+life.up()+'.life').tag('img').attr('src','/img/heart.png').gat().gat();
				$('div.btn.sub').text(counter.up());
			}else{
				$('div.btn.sub').text(counter.superUp());
			}
			if($('div.btn.sub.hide')){
				$('div.btn.sub.hide').cls({hide: -1});
				$('div.btn.sub').off('touchstart');
				$('div.btn.sub').on('touchstart',game.tap);
				$('div.btn.sub').on('click',function(){
					$('div.btn.sub').cls({isPresed: -1})
				})
			}
		});
		setTimeout(function(){elm.remove();},sType.time);
		return elm;
	}
};

var game = (function(){
	var socket;
	return {
		start: function(id){
			loader.start(id);
			socket = io.connect('/game');
			socket.emit('join',id);
			$('header').tag('div.lifes').tag('div#life1.life').tag('img').attr('src','/img/heart.png').gat().gat().tag('div#life2.life').tag('img').attr('src','/img/heart.png').gat().gat().tag('div#life3.life').tag('img').attr('src','/img/heart.png').gat().gat().gat();
			$('body').tag('footer').tag('div.btn.sub.hide').text('').gat().gat();
			socket.on('create',function(ratio,type,cnt,speed){
				if(loader.isLoad()){
					loader.finish();
				}
				var elm = create.set(ratio,type,cnt,speed);//type) ? create.rain(ratio,cnt,speed): create.kaminari(ratio,cnt,speed);
				$('div.container').append(elm);
				setTimeout(function(){elm.cls({down: 1});},10);
				socket.on('win',function(){
					loader.start('you win');
					setTimeout(function(){
						location.reload()
					},5000);
				})
			});
		},
		lose: function(){
			socket.disconnect();
		},
		tap: function(){
			$('div.btn.sub').text(counter.down());
			$('div.btn.sub').cls('isPresed');
			if(!counter.get()){
				$('div.btn.sub').cls('hide');
				$('div.btn.sub').off('touchstart');
			}
			socket.emit('tap');
		}
	}
})();

var speedType= function(speed){
	if(speed < 40){
		return {type :'nomal',time: 3000};
	} else if(speed> 80) {
		return {type :'slow',time: 4000};
	}else{
		return {type :'fast',time: 2000};
	}
}



var counter = (function () {
	var cnt = 0;
	return {
		superUp: function(){
			cnt += 10;
			return cnt;
		},
		up: function(){
			return ++cnt;
		},
		down: function(){
			return --cnt;
		},
		clear: function(){
			return cnt = 0;
		},
		get : function(){
			return cnt;
		}
	}
})();

var life = (function(){
	var life = 3;
	return {
		up : function(){
			return ++life;
		},
		down : function(){
			return --life;
		},
		get: function(){
			return life;
		}
	}
})();