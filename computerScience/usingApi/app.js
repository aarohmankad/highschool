document.getElementById('text-input').addEventListener('keypress', function(event) {
  if (event.which !== 13) {
    return false;
  }

  var tagString = document.getElementById('text-input').value;

  console.log('calling searchFlickrByTags');
  document.querySelector('.images').innerHTML = searchFlickrByTags(tagString) || 'Search not done';
});

function searchFlickrByTags (tagString) {
  var
    request = new XMLHttpRequest(),
    apiUrl = 'https://api.flickr.com/services/rest/?api_key=d5fda30419ed5d39efb5552fc413d0e0&method=flickr.photos.search&tags=' + encodeURIComponent(tagString) + '&format=json&nojsoncallback=1';

  request.open('GET', apiUrl, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      formatAndLoadImages(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('We reached our target server, but it returned an error');
    }
  };

  request.onerror = function(err) {
    // There was a connection error of some sort
    console.log('There was an error with flickr', err.text);
  };

  request.send();
};

function formatAndLoadImages (data) {
  var photos = data.photos.photo;
  console.log(photos);

  document.querySelector('.images').innerHTML = '';
    
  for(var i = 0; i < photos.length; i++) {
    var imageUrl = 'http://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg'
  
    var imageElement = document.createElement('img');
    imageElement.src = imageUrl;


    document.querySelector('.images').appendChild(imageElement);
  }
}