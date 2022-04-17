import $ from "jquery";
import "./style.css";
import netflixSoundAsset from "../resources/sounds/Netflix-Intro-Sound.mp3";

/******************************Variables**************************** */
const netflixSound = new Audio(netflixSoundAsset);

//wiat unitl DOM is Ready an executes 1st time
$(calculatedTitleMargin);

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
