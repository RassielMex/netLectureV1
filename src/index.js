import $ from "jquery";
import "./style.css";
import netflixSoundAsset from "../resources/sounds/Netflix-Intro-Sound.mp3";

/******************************Variables**************************** */
const netflixSound = new Audio(netflixSoundAsset);
const apiKey = "722c597120c8176fc5d215e6f7f836fe";
const year = new Date().getFullYear;
const request = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&year=${year}&page=1&sort_by=popularity.desc&language=es&include_adult=false`;
const imgBaseUrl = "http://image.tmdb.org/t/p/w500";

//wait unitl DOM is Ready an executes
$(calculatedTitleMargin);
$(getData);

/******************************Handlers**************************** */

$(window).on("resize", calculatedTitleMargin);

$(".card").on("click", function (e) {
  if (netflixSound) {
    netflixSound.play().then(() => {
      //Animate body zoom out
      $("body").addClass("animateZoom");
    });

    setTimeout(() => {
      $("main").hide();
      $(".details").fadeIn();
      //Get Id and create fragment
      //let id = e.currentTarget.id;
      //const cardFragment = document.createDocumentFragment();
    }, 1000);
  }
});

netflixSound.addEventListener("ended", () => {
  $("body").removeClass("animateZoom");
});

/******************************Functions**************************** */

//Calculates margin for title to be exactly at the beggining of content
function calculatedTitleMargin() {
  let cardContainerWidth = parseInt($(".card-container").css("width"));
  let cardWidth = parseInt($(".card").css("width"));
  const gap = 0.2 * 16;

  let maxCards = Math.floor(cardContainerWidth / cardWidth);
  let content = cardWidth * maxCards + (maxCards - 1) * gap;
  let calculatedMargin = Math.floor((cardContainerWidth - content) / 2);
  // console.log(content);
  // console.log(calculatedMargin);
  $(".section-title").css("marginLeft", calculatedMargin);
}

function getData() {
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      const { results } = data;
      results.forEach((result) => {
        const { backdrop_path, overview, title, vote_average, id } = result;
        //Create card elements
        const img = $("<img/>")
          .attr("src", imgBaseUrl + backdrop_path)
          .attr("alt", id);
        const div = $("<div></div>").addClass("card").attr("id", id);
        const cardContainer = $("#section1 .card-container");

        div.append(img);
        cardContainer.append(div);
      });
    });
}
