import $ from "jquery";
import "./style.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import netflixSoundAsset from "../resources/sounds/Netflix-Intro-Sound.mp3";

/******************************Variables**************************** */
const netflixSound = new Audio(netflixSoundAsset);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA3r1H1OIgguVGNI3WQXOW_hYaUaK6Vjc",
  authDomain: "js-netlecture.firebaseapp.com",
  databaseURL: "https://js-netlecture-default-rtdb.firebaseio.com",
  projectId: "js-netlecture",
  storageBucket: "js-netlecture.appspot.com",
  messagingSenderId: "85035158086",
  appId: "1:85035158086:web:1bab0c77f6f418cd3c9847",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getDatabase(app);
//Get specific ref database path to "/" where books is stored
const booksRef = ref(db, "libros");

/******************************Handlers**************************** */
$(".greeting-btn").on("click", function () {
  $(".greeting-container")
    .fadeOut(200, () => {
      $(".greeting-grades").css("display", "flex");
      $(".greeting-btn").css("display", "none");
    })
    .fadeIn(800);
});

$(document).on("click", ".grade", function () {
  createCards();
  $(".greeting-container").fadeOut(500, () => {
    $("nav").fadeOut(300).css("display", "flex").fadeIn(800);
    $("main").fadeIn(1000);
    $("footer").fadeIn(800);
  });
});

$(document).on("click", ".card", function (e) {
  if (netflixSound) {
    netflixSound.play().then(() => {
      //Animate body zoom out
      $("body").addClass("animateZoom");
    });

    setTimeout(() => {
      $("main").fadeOut(500, () => {
        $(".details").fadeIn(800);
      });
    }, 1100);
  }
});

netflixSound.addEventListener("ended", () => {
  $("body").removeClass("animateZoom");
});

/******************************Functions**************************** */

function createCards() {
  onValue(booksRef, (snapshot) => {
    const books = snapshot.val();
    books.forEach((book, index) => {
      //Create Cards
      const img = $("<img/>").attr("src", book.img).attr("alt", index);
      const div = $("<div></div>").addClass("card").attr("id", index);
      const cardContainer = $("#section1 .card-container");

      div.append(img);
      cardContainer.append(div);
    });
  });
}
