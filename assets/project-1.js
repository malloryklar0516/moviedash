//API FUNCTIONALITY
//upon starting page, function runs thru OMDB API, and populates selected info for popular selected movies.
//function continues with the Youtube API. Where it grabs trailers for each movie and displays below movie info.

//USER INTERACTIONS/LOCAL STORAGE
//On.Click of movie title, movie is added to local storage/users must see list on the left hand side
//upon clicking the movie title on the side bar, the screen scrolls back to that trailer and movie info.

function startApp() {
  var requestURLBarbie = "https://www.omdbapi.com/?t=barbie&apikey=5ee7c193"; //title, rating, genre, runtime
  $.ajax({
    url: requestURLBarbie,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(".barbie-title").text(response.Title);
    $(".barbie-rating").text("Rated: " + response.Rated);
    $(".barbie-runtime").text("Runtime: " + response.Runtime);
    $(".barbie-genre").text("Genre: " + response.Genre);
    var seeList = JSON.parse(localStorage.getItem("seeList")) || [];
    var barbieTitle = response.Title;
    var barbieClicked = false;

    //uses barbie click variable to see if barbie is already on must see list.
    //if it is, does not add to local storage/list again
    $(".barbie-title").on("click", function () {
      if (!barbieClicked) {
        seeList.unshift(barbieTitle);
        localStorage.setItem("seeList", JSON.stringify(seeList));
        $(".movie-list").append(
          "<li class='bar'>" + localStorage.getItem("barbie-title") + "</li>"
        );
        barbieClicked = true;
      }

      $(".bar").on("click", function () {
        //   // Calculate the position of the movie on the page
        var moviePosition = $(".barbie-title").offset().top;
        window.scrollTo(0, moviePosition);
      });
    });
    var requestURLOpp =
      "https://www.omdbapi.com/?t=oppenheimer&apikey=5ee7c193"; //title, rating, genre, runtime
    $.ajax({
      url: requestURLOpp,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $(".opp-title").text(response.Title);
      $(".opp-rating").text("Rated: " + response.Rated);
      $(".opp-runtime").text("Runtime: " + response.Runtime);
      $(".opp-genre").text("Genre: " + response.Genre);

      var oppTitle = response.Title;
      var oppClicked = false;

      //uses Opp click variable to see if Opp is already on must see list.
      //if it is, does not add to local storage/list again
      $(".opp-title").on("click", function () {
        if (!oppClicked) {
          seeList.unshift(oppTitle);
          localStorage.setItem("seeList", JSON.stringify(seeList));
          $(".movie-list").append(
            "<li class='opp'>" + localStorage.getItem("opp-title") + "</li>"
          );
          oppClicked = true;
        }

        $(".opp").on("click", function () {
          // offset uses the click to scroll to correct part of page. set to footer of movie so that it displays trailer when clicked.
          var moviePosition = $(".barbie-footer").offset().top;

          window.scrollTo(0, moviePosition);
        });
      });
      var blueBeetleURL =
        "https://www.omdbapi.com/?t=blue+beetle&apikey=5ee7c193";
      $.ajax({
        url: blueBeetleURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $(".bb-title").text(response.Title);
        $(".bb-rating").text("Rated: " + response.Rated);
        $(".bb-runtime").text("Runtime: " + response.Runtime);
        $(".bb-genre").text("Genre: " + response.Genre);

        var bbTitle = response.Title;
        var bbClicked = false;

        //uses BB click variable to see if BB is already on must see list.
        //if it is, does not add to local storage/list again
        $(".bb-title").on("click", function () {
          if (!bbClicked) {
            seeList.unshift(bbTitle);
            localStorage.setItem("seeList", JSON.stringify(seeList));
            $(".movie-list").append(
              "<li class='bb'>" + localStorage.getItem("bb-title") + "</li>"
            );
            bbClicked = true;
          }

          $(".bb").on("click", function () {
            // offset uses the click to scroll to correct part of page. set to footer of movie so that it displays trailer when clicked.
            var moviePosition = $(".bb-footer").offset().top;

            window.scrollTo(0, moviePosition);
          });
        });
      });
    });
  });
}

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var barbiePlayer;
var oppPlayer;
function onYouTubeIframeAPIReady() {
  barbiePlayer = new YT.Player("barbie-player", {
    height: "280",
    width: "490",
    videoId: "pBk4NYhWNMM",
    playerVars: {
      playsinline: 1,
      autoplay: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  oppPlayer = new YT.Player("opp-player", {
    height: "280",
    width: "490",
    videoId: "bK6ldnjE3Y0",
    playerVars: {
      playsinline: 1,
      autoplay: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  bbPlayer = new YT.Player("bb-player", {
    height: "280",
    width: "490",
    videoId: "vS3_72Gb-bI",
    playerVars: { playsinline: 1, autoplay: 0 },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange },
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
startApp();
onYouTubeIframeAPIReady();
