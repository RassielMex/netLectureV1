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

let books; //Store data from db
let booksByGrade; //Stores data filtered

/******************************Handlers**************************** */
$(".greeting-btn").on("click", function () {
  if (netflixSound) {
    netflixSound.play();
  }
  //Animate grades and container
  $(".greeting-container")
    .fadeOut(200, () => {
      $(".greeting-grades").css("display", "flex");
      $(".greeting-container h1").css("display", "block");
      $(".greeting-btn").css("display", "none");
    })
    .fadeIn(800);
});

$(document).on("click", ".grade", function (e) {
  //Get selected grade id
  const selectedYear = e.currentTarget.id;
  //Create cards before showing
  createCards(selectedYear);
  //Show nav. main and footer
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
      $("body").addClass("animateZoom"); //TODO: Improve this effect!!
    });
    //GEt id of current target clickec
    const { id } = e.currentTarget;
    //console.log(id);
    setTimeout(() => {
      $("main").fadeOut(500, () => {
        const { img, reseña, titulo } = booksByGrade[id]; //select book by id = index
        $(".cardDetail-banner").attr("src", img);
        $(".cardDetail h2").text(titulo);
        $(".details p").text(reseña);
        $(".details").fadeIn(800);
      });
    }, 1100);
  }
});

$(".backButton").on("click", function () {
  //Appears main and hide details
  $(".details").fadeOut(500, () => {
    $("main").fadeIn(800);
  });
});

netflixSound.addEventListener("ended", () => {
  $("body").removeClass("animateZoom");
});

/******************************Functions**************************** */

function createCards(selectedYear) {
  onValue(booksRef, (snapshot) => {
    books = snapshot.val();
    booksByGrade = books.filter((book) => book.grado === selectedYear);
    //console.log(booksByGrade);
    booksByGrade.forEach((book, index) => {
      //Create element Cards
      const img = $("<img/>").attr("src", book.img).attr("alt", index);
      const div = $("<div></div>").addClass("card").attr("id", index);
      let cardContainer;
      //Puts items according to data length divided into 3 sections
      if (index < booksByGrade.length / 3) {
        cardContainer = $("#section1 .card-container");
      } else if (index < (2 * booksByGrade.length) / 3) {
        cardContainer = $("#section2 .card-container");
      } else {
        cardContainer = $("#section3 .card-container");
      }
      //Appending
      div.append(img);
      cardContainer.append(div);
    });
  });
}
