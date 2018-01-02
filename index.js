const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      q: `${searchTerm} in:title`,
      key: 'AIzaSyAk8CIXBEs322dPhEHOWUOzqW1QUcqRhWI',
      maxResults: 15
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}


function renderResult(result) {
  return `
    <div class='thumbnail-div'>
        <h4><a href='https://youtu.be/${result.id.videoId}' target='_blank'>${result.snippet.title}</a></h4>
        <p><a aria-label='image-and-link' href='https://youtu.be/${result.id.videoId}' target='_blank'><img aria-label='thumbnail-image' src='${result.snippet.thumbnails.default.url}' alt=''></a></p>
        <p>For more, check out <a href='https://www.youtube.com/channel/${result.snippet.channelId}' target='_blank'>${result.snippet.channelTitle}</a>.</p>
    </div>
  `;
}

function displayThumbnail(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayThumbnail);
  });
}

$(watchSubmit);
