//console.log('hi');
var commentsContainer='<div class="comments-container"></div>';

$('.html5-video-player').append(commentsContainer);

var container = $('.comments-container');

//console.log(container);

var comments = [];

var currentIndex = 0;

var video = $('video')[0];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    comments = request.comments;
    currentIndex = 0;
    container.empty();
});

var getDuration = function(){
  var temp = Math.random() * 10;
  if (temp < 1.5) return 'slow';
  if (temp > 8.5) return 'fast';
  else return 'medium';
};

var getCommentHTML = function(content,currentIndex){
  return '<div class = "comment '+ getDuration() +'" style="top:'+ (currentIndex%15+1) * 5.5 +'%">'+content+'</div>'
}

var updateCurrentComments = function(currentTime){
  var num = 0;
  while (currentIndex < comments.length && comments[currentIndex].videoTime <= currentTime){
    if(currentTime === comments[currentIndex].videoTime && num<15){
      container.append(getCommentHTML(comments[currentIndex].comment, currentIndex));
      num ++;
    }
    currentIndex ++;
  };
};

setInterval(function(){
  // console.log(comments[0])
  updateCurrentComments(Math.floor(video.currentTime));
},500);