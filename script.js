function openPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}
let currentIndex = 0;
const slides = document.querySelector('.carousel-inner');
const totalSlides = document.querySelectorAll('.slide').length;
/* 

Slider

*/
function showSlide(index) {
  if (index < 0) {
  currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
  currentIndex = 0;
  } else {
  currentIndex = index;
  }
  
  const translateValue = -currentIndex * 100 + '%';
  slides.style.transform = 'translateX(' + translateValue + ')';
  }
  
  function autoSlide() {
  setInterval(function () {
  showSlide(currentIndex + 1);
  }, 4500); // Change slide every 3 seconds
  }
  
  autoSlide();