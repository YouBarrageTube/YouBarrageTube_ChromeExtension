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
  //console.log(container);
  barrage.update(container, comments);
}

var createInputArea = function () {
  if ($('#bullets').length === 0) {
  var commentInput = '<div style="padding-top=20px;width=100%;">\
                        <br>\
                        <label>Share your comments below!</label>\
                        <input id="bullets" type="text" />\
                        <span class="highlight"></span>\
                        <span class="bar"></span>\
                      </div>';
  $('#info.style-scope.ytd-watch').before(commentInput);
    $('#bullets').bind("enterKey", function (e) {
      //do stuff here
      console.log($('#bullets').val());
      let comment = $('#bullets').val();
      let videoTime = barrage.currentTime;
      submitComment(comment,videoTime);
      $('#bullets').val("");
    });
    $('#bullets').keyup(function (e) {
      if (e.keyCode == 13) {
        $(this).trigger("enterKey");
      }
    });
  }

  if ($('#comment-field').length == 0) {
    let pop_textfield = '<textarea rows="2" cols = "50" id ="comment-field" class="pop_textfield">hello everyone</textarea>';
    $('#movie_player').append(pop_textfield);
    $('#comment-field').bind("enterKey", function (e) {
      //do stuff here
      console.log($('#comment-field').val());
      let comment = $('#comment-field').val();
      let videoTime = barrage.currentTime;
      submitComment(comment,videoTime);
      $('#comment-field').val("");
    });
    $('#comment-field').keyup(function (e) {
      console.log(e);
      e.stopPropagation(); 
      if (e.keyCode == 13) {
        $(this).trigger("enterKey");
      }
    });
    $('#comment-field').keypress(function(e){
      e.stopPropagation(); 
    });
    $('#comment-field').keydown(function(e){
      e.stopPropagation(); 
    });
  }
}

var submitComment = function (comment,videoTime) {
  chrome.runtime.sendMessage({comment,videoTime},function(response){
    barrage.update($(".comments-container"), response.comments);
  });
  barrage.newDanmu(comment);
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'comments') {
      createInputArea();
      startDanmu(request.comments);
      console.log(barrage.comments);
    }
    else if(request.msg === 'popup'){
      var x = document.getElementById("comment-field");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
  });



// $(document).ready(function () {
//   // $('#player.style-scope.ytd-watch').after(commentInput);
//   var commentInput = '<div style="padding-top=20px;width=100%;"><input id="bullets" type="text" /></div>';
//   $('#info.style-scope.ytd-watch').before(commentInput);
//   // console.log($('div#player.style-scope.ytd-watch'));
//   // $('#player').append(commentInput);
//   // $.get("commentInput.html", function (data) {
//   //   $('#info.style-scope.ytd-watch').before(commentInput);
//   //   console.log('read comment input');
//   //   // $("#appendToThis").append(data);
//   // });
//   $('#bullets').bind("enterKey", function (e) {
//     //do stuff here
//     console.log($('#bullets').val());
//     $('#bullets').val("");
//   });
//   $('#bullets').keyup(function (e) {
//     if (e.keyCode == 13) {
//       $(this).trigger("enterKey");
//     }
//   });
// });

// let pop_textfield = '<textarea rows="2" cols = "50" id ="comment-field" class="pop_textfield">hello everyone</textarea>';
// $('.html5-video-player').append(pop_textfield);

