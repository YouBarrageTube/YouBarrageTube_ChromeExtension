// console.log('hi form youbarragetube');
// console.log($('video'));


// function GetURLParameter(sParam){
//     var sPageURL = window.location.search.substring(1);
//     var sURLVariables = sPageURL.split('&');
//     for (var i = 0; i < sURLVariables.length; i++)
//     {
//         var sParameterName = sURLVariables[i].split('=');
//         if (sParameterName[0] == sParam)
//         {
//             return sParameterName[1];
//         }
//     }
// };
// console.log(GetURLParameter('v'));

// var videoId = GetURLParameter('v')
console.log('hi');
var commentsContainer='<div class="comments-container"></div>';

$('.html5-video-player').append(commentsContainer);

var container = $('.comments-container');

console.log(container);

var comments = [];

var currentIndex = 0;

var video = $('video')[0];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    // console.log(comments);
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
  // console.log(comments);
  // console.log(currentIndex);
  // console.log(currentTime);
  var num = 0;
  while (currentIndex < comments.length && comments[currentIndex].videoTime <= currentTime){
    console.log('in the loop');
    if(currentTime === comments[currentIndex].videoTime && num<15){
      // console.log(getCommentHTML(comments[currentIndex].comment, currentIndex))
      console.log(container);
      container.append(getCommentHTML(comments[currentIndex].comment, currentIndex));
      num ++;
    }
    currentIndex ++;
  };
};
// a = getCommentHTML('hahaha',3)
// console.log(getCommentHTML('hahaha',3));
// container.append(a);

setInterval(function(){
  // console.log(comments[0])
  updateCurrentComments(Math.floor(video.currentTime));
},500);