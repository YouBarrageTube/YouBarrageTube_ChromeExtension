var Barrage = function(container, comments){
  var that = this;
  this.container = container;
  this.comments = comments;
  this.currentIndex = 0;
  this.currentTime = 0;
  this.row = 15;
  //bind player event
}

Barrage.prototype.popDanmu = function(){
  if ((!this.comments) || this.comments.length === 0) return;
  var num = 0;
  while(this.currentIndex < this.comments.length 
    && this.comments[this.currentIndex].videoTime <= this.currentTime
    && num < this.row){
      if(this.comments[this.currentIndex].videoTime === this.currentTime && num < 15){
        // Add danmu
        var danmu = $('<div class="comment" id="' + this.currentIndex + '">' + this.comments[this.currentIndex].comment + '</div>');
        var animatedTime = 7000 + Math.floor(Math.random()*5000);
        danmu.css({
          'top': (this.currentIndex%15+1) * 5.5 + '%',
          'color': this.generateColor(),
        }).appendTo(this.container).animate({
          left:'-100%'
        },animatedTime,"linear",function(){
          this.remove();
        });

        //console.log(danmu);
        num ++;
      }
      this.currentIndex ++;
  }
}

Barrage.prototype.pause = function(){
  $('.comment').pause();
}

Barrage.prototype.resume = function(){
  $('.comment').resume();
}

Barrage.prototype.update = function(container, comments){
  this.container = container;
  this.comments = comments;
  this.currentIndex = 0;
}

Barrage.prototype.generateColor = function(){
  var rand = Math.random();
  if(rand<0.8) return 'white';
  else if (rand<0.85) return 'pink';
  else if (rand<0.90) return 'aqua';
  else if (rand<0.95) return 'blanchedalmond';
  else return 'coral';
}

Barrage.prototype.newDanmu = function (comment) {
  var danmu = $('<div class="comment"">' + comment + '</div>');
  var animatedTime = 7000 + Math.floor(Math.random()*5000);
  danmu.css({
    'top': ((this.currentIndex)%15+1) * 5.5 + '%',
    'color': this.generateColor(),
  }).appendTo(this.container).animate({
    left:'-100%'
  },animatedTime,"linear",function(){
    this.remove();
  });
}