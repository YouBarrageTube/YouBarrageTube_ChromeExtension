console.log('hi');

$('body').text('not bad!');

$.get('http://www.youbarragetube.com/v1/comments',
  {videoId:'-uLsM9vp3dw'},
  function(data){
    console.log(data);
  },
  "json"
)



chrome.runtime.sendMessage({content: 'hi'});