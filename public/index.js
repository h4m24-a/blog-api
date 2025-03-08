let openHamburger = document.querySelector('#openHamburger');
let closeHamburger = document.querySelector('#closeHamburger');
let navList = document.querySelector('.nav');


// Function to Toggle Navigation Visibility
const hamburgerEvent = (navigation, close, open) => {
    navList.style.display = navigation;
    closeHamburger.style.display = close;
    openHamburger.style.display = open;
};
                                                          //  nav       X       ☰ 
openHamburger.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));   // nav set to flex, display X close button, hide open icon.

closeHamburger.addEventListener('click', () => hamburgerEvent("none", "none", "block"));  // nav set to none, hide X close button, display open button





// Function to remove the style attribute from .nav
function removeNavStyle() {
    navList.removeAttribute('style');
  }
  
  // Ensures that when the page first loads, the .nav menu doesn't have any leftover styles from previous interactions.
  removeNavStyle();
  

  // If navbar is open and you resize below 768px, it hides the navbar.
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      removeNavStyle()
      openHamburger.style.display = "block";
      closeHamburger.style.display = "none";
    }
  });

  



/*
It takes three parameters:
navigation: Controls the display style of .nav.
close: Controls the display of the close button.
open: Controls the display of the open button.
*/