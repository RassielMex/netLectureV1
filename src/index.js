import $ from "jquery";
import "./style.css";
import netflixSoundAsset from "../resources/sounds/Netflix-Intro-Sound.mp3";

//wiat unitl DOM is Ready an executes 1st time
$(calculatedTitleMargin);

//Handlers
$(window).on("resize", calculatedTitleMargin);

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

$(".card").on("click", function (e) {
  let netflixSound = new Audio(netflixSoundAsset);
  if (netflixSound) {
    netflixSound.play();
  }

  $("body").addClass("animateZoom");
  setTimeout(() => {
    $("body").removeClass("animateZoom");
  }, 2000);
});
