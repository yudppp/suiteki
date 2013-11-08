var loader = {
	start: function(loadMsg){
		$('div.container').tag('div.loader').tag('span').gat().tag('span').gat().tag('span').gat().gat();
		if(loadMsg){
			$('div.container').tag('div.loadMsg').text(loadMsg).gat();
		}
	},
	finish: function(){
		$('div.loader').remove();
		$('div.loadMsg').remove();
		setTimeout(scrollTo, 100, 0, 1);
	},
	isLoad: function(){
		return $('div.loader').length() != 0;
	}
}
