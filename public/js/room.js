var room = {
	render: function(){
		loader.start('他の参加者を探しています...');
		var socket = io.connect('/room');
		socket.on('ready',function(num){
			if(loader.isLoad()){
				$('div.container').tag('div.msg').text('現在' +  num + '人参加予定').gat();
				$('div.container').tag('div#start.btn').text('start').gat();
				$('#start').tap(function(){
					socket.emit('go');
				});
				loader.finish();
			} else {
				$('div.msg').text('現在' +  num + '人参加予定');
			}
		});
		socket.on('unready',function(){
			if(loader.isLoad()){
			} else {
				$('div.container *').remove();
				loader.start('他の参加者を探しています...');
			}
		});
		socket.on('start',function(token){
			socket.disconnect();
			var hash = $.dispatcher.createHash('game','main',{id:token});
			$.dispatcher.execute(hash);
		});

	}
}
