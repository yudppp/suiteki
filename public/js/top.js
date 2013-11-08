var topPage = {
	render: function(){
		loader.start();
		$('div.container').tag('div#wait.btn').text('wating room').gat();
		$('#wait').tap(function(){
			var hash = $.dispatcher.createHash('game','room');
			$.dispatcher.execute(hash);
		});
		loader.finish();
	}
}
