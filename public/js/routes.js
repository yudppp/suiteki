$.ready(function(){
	$.routes('game', {
		'/top' : {
			name:'top',
			action:function(){
				topPage.render();
			}
		},
		'/main/:id' : {
			name:'main',
			action:function(vars){
				var id = vars.params.id;
				$('div.container *').remove();
				game.start(id);
			}
		},
		'/room' : {
			name:'room',
			action:function(){
				$('div.container *').remove();
				room.render();
			}
		}
	});
	var hash = $.dispatcher.createHash('game','top');
	$.dispatcher.execute(hash);
})
