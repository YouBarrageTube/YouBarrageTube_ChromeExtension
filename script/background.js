console.log("hola");

var activeTabs = [];

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
    // console.log(data);
    chrome.tabs.sendMessage(tabId, {comments: data});
  },
  "json"
  ).fail(function(){ 
    console.log('No comments for this video');
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(changeInfo);
  var tabIndex = activeTabs.indexOf(tabId);
  if(changeInfo.url && changeInfo.url.match(regx)){
    // a new tab visit youtube, request comments for new id
    if(tabIndex<0){
      activeTabs.push(tabId);
      console.log('new tab');
    }
    var videoId = getURLParameter(changeInfo.url,'v');
    sendCommentstoTab(videoId, tabId);
  }else if(changeInfo.status && changeInfo.status==='complete' && tabIndex>-1){
    // refresh
    console.log('refresh');
    chrome.tabs.get(tabId,function(tab){
      var videoId = getURLParameter(tab.url,'v');
      sendCommentstoTab(videoId, tabId);
    });
  };
});
