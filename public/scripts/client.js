const renderTweets = function(tweets) {
  let allTweets = [];
  for (const tweet of tweets){
    // calls createTweetElement for each tweet
    const newTweet = createTweetElement(tweet);  
    // takes return value and appends it to the tweets container
    allTweets.push(newTweet);
  }
  $(".tweet-container").append(allTweets);
};

const createTweetElement = function(tweet) {
  const $markup = ` 
  <article class="tweet-articles">
    <header class="tweet-header">
      <div class="header-img-name">
        <div class="header-img">
          <img src="${tweet.user.avatars}"> 
        </div>
        <div class="header-name">
          <h3>${tweet.user.name}</h3>
        </div>
      </div>
      <div class="header-handle">
        <h3>${tweet.user.handle}</h3>
      </div>
    </header>
    <p class="tweet-paragraph"> 
      ${$("<div>").text(tweet.content.text).html()}
    </p>
    <footer class="tweet-footer"> 
      <div class="footer-pics">
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </div>
      <div class="footer-time">
        <p>${moment(tweet.created_at).fromNow()}</p>
      </div>
    </footer>
  </article>
  `;
  return $markup;
};

const loadTweets = function() {
  $.ajax({
    url: "http://localhost:8080/tweets", 
    method: "GET", 
    dataType: 'json'
  })
  .then(res => {
  const reverseData = res.reverse();  
  renderTweets(reverseData);
  });
};

const hideErrors = function() {
  $(".alert-over").slideUp();
  $(".alert-empty").slideUp();
}

$(document).ready(function() {
  loadTweets();
  $("form").on("submit", (event) => {
    event.preventDefault();
    hideErrors();
    const tweetContent = $("#tweet-text").val()
    if (tweetContent.trim().length > 0) {
      if (tweetContent.trim().length > 140) {
        $(".alert-over").slideDown();
        setTimeout(hideErrors, 3000);
      } else {
        $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
        data: $("form").serialize()
        })
        .then(() => {
          $(".tweet-container").empty();
          loadTweets();
        })
        $("form").trigger("reset");
      }
    } else {
      $(".alert-empty").slideDown();
      setTimeout(hideErrors, 3000);
    }
    return false;
  });
});