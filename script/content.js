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

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'comments') {
      startDanmu(request.comments);

      console.log(barrage.comments);
    }
    else if(request.msg === 'popup'){
      var x = document.getElementById("comment_field");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
  });



$(document).ready(function () {
  // $('#player.style-scope.ytd-watch').after(commentInput);
  $('#info.style-scope.ytd-watch').before(commentInput);
  // $.get("commentInput.html", function (data) {
  //   $('#info.style-scope.ytd-watch').before(commentInput);
  //   console.log('read comment input');
  //   // $("#appendToThis").append(data);
  // });
  $('#bullets').bind("enterKey", function (e) {
    //do stuff here
    console.log($('#bullets').val());
    $('#bullets').val("");
  });
  $('#bullets').keyup(function (e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
});

let pop_textfield = '<textarea rows="2" cols = "50" id ="comment_field" class="pop_textfield">hello everyone</textarea>';
$('.html5-video-player').append(pop_textfield);

