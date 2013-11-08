
exports.init = function(io){
  var waitPeople = 0;
  var view = io.of('/room').on('connection',function(socket){
    waitPeople++;
    if(waitPeople>=1){
      view.emit('ready',waitPeople);
    }
    socket.on('go',function(data){
      view.emit('start',Math.random().toString(36).slice(-15));
    })
    socket.on('disconnect', function () {
      waitPeople--;
      if(waitPeople>=1){
        view.emit('unready');
      }
    });
  });

  var game = io.of('/game').on('connection',function(socket){
    var timer;
    var token;
    socket.on('join',function(_token){
      token = _token;
      console.log('join in');
      socket.join(token);
      setTimeout(function(){
        timer = gameStart();
      },Math.random()*3000)
    });
    socket.on('disconnect', function () {
      clearInterval(timer);
      socket.emit('win');
    });
    socket.on('tap',function(){
      /** y , type , id , speed*/
      socket.in(token).broadcast.emit('create', Math.random()*100,rndType() ,counter.up(),Math.random()*100);
    })
  });

  var gameStart = function(token){
    return setInterval(function(){
        /** y , type , id , speed*/
      game.in(token).emit('create', Math.random()*100,rndType() ,counter.up(),Math.random()*100);
    }, 5000);
  }
  var counter = (function(){
    var cnt = 0;
    return {
      up: function(token){
        return ++cnt;
      }
    }
  })();
  var rndType = function(){
    var rnd = Math.random()*100;
    if(rnd < 85){
      return 'rain';
    }else if(rnd < 95){
      return 'kaminari';
    }else{
      return 'heart';
    }
  }

}




