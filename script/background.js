console.log("hola");

var activeTabs = [];

var videoId;

var regx = new RegExp('https://www.youtube.com/watch.?');

var getURLParameter = function (sPageURL, sParam){
  var url = new URL(sPageURL);
  return url.searchParams.get(sParam);
};

var sendCommentstoTab = function(videoId, tabId){
  $.get('http://www.youbarragetube.com/v1/comments',
  {videoId:videoId},
  function(data){
    // console.log(tabId);
    //console.log(data);
    chrome.tabs.sendMessage(tabId, {msg: 'comments', comments: data});
  },
  "json"
  ).fail(function(){ 
    console.log('No comments for this video');
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  var newComment = {videoId,...request};
  console.log(newComment);
  $.post('http://www.youbarragetube.com/v1/comment',
  {videoId,...request},
  "json"
  )
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // console.log(changeInfo);
  // var tabIndex = activeTabs.indexOf(tabId);
  // if(changeInfo.url && changeInfo.url.match(regx)){
  //   // a new tab visit youtube, request comments for new id
  //   if(tabIndex<0){
  //     activeTabs.push(tabId);
  //     console.log('new tab');
  //   }
  //   var videoId = getURLParameter(changeInfo.url,'v');
  //   sendCommentstoTab(videoId, tabId);
  // }else 
  if(changeInfo.status && changeInfo.status==='complete'){
    // refresh
    console.log('tabUpdated');
    chrome.tabs.get(tabId,function(tab){
      var url = tab.url
      if(url.match(regx)){
        videoId = getURLParameter(url,'v');
        sendCommentstoTab(videoId, tabId);
      }
    });
  };
});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  chrome.tabs.query(  {currentWindow: true, active : true},
    function(tabArray){
      console.log(tabArray);
      chrome.tabs.sendMessage(tabArray[0].id, {msg: 'popup'});
    });
  });

