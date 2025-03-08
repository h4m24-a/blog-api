let openHamburger = document.querySelector('#openHamburger');
let closeHamburger = document.querySelector('#closeHamburger');
let navList = document.querySelector('.nav');



// Open menu
openHamburger.addEventListener('click', () => {
  navList.style.display = "flex";
  closeHamburger.style.display = "block";
  openHamburger.style.display = "none";
});


// Close menu
closeHamburger.addEventListener('click', () => {
  navList.style.display = "none";
  closeHamburger.style.display = "none";
  openHamburger.style.display = "block";
});





// Function to remove the style attribute from .nav
function removeNavStyle() {
    navList.removeAttribute('style');
  }
  

  // If navbar is open and you resize below 768px, it hides the navbar.
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      removeNavStyle()
      openHamburger.style.display = "block";
      closeHamburger.style.display = "none";
    }
  });

  