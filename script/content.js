//console.log('hi');
// var commentsContainer = '<div class="comments-container"></div>';

// $(".html5-video-player").append(commentsContainer);

// var container = $(".comments-container");

//console.log(container);

// console.log(video);

// var video;

var barrage = new Barrage(container, []);

var startDanmu = function(comments){
  var container;

  var video;

  if($(".comments-container").length === 0){
    var commentsContainer = '<div class="comments-container"></div>';

    $(".html5-video-player").append(commentsContainer);
  
    video = $("video")[0];

    video.ontimeupdate = function() {
      var currentTime = Math.floor(video.currentTime);
      if (currentTime === 0 || barrage.currentTime !== currentTime) {
        barrage.currentTime = currentTime;
        barrage.popDanmu();
      }
    };
  
    video.onpause = function() {
      barrage.pause();
    };
  
    video.onplay = function() {
      barrage.resume();
    };
  
    video.onseeked = function() {
      var currentTime = Math.floor(video.currentTime);
      barrage.currentIndex = 0;
      barrage.currentTime = currentTime;
    };
  }
  container = $(".comments-container");
  container.empty();
  console.log(container);
  barrage.update(container, comments);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  startDanmu(request.comments);

  console.log(barrage.comments);
});

// video.onPlay

// var getDuration = function(){
//   var temp = Math.random() * 10;
//   if (temp < 1.5) return 'slow';
//   if (temp > 8.5) return 'fast';
//   else return 'medium';
// };

// var getCommentHTML = function(content,currentIndex){
//   return '<div class = "comment '+ getDuration() +'" style="top:'+ (currentIndex%15+1) * 5.5 +'%">'+content+'</div>'
// }

// var updateCurrentComments = function(currentTime){
//   var num = 0;
//   while (currentIndex < comments.length && comments[currentIndex].videoTime <= currentTime){
//     if(currentTime === comments[currentIndex].videoTime && num<15){
//       container.append(getCommentHTML(comments[currentIndex].comment, currentIndex));
//       num ++;
//     }
//     currentIndex ++;
//   };
// };
