/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
 
// declaring variables 
const navbar__list = document.getElementById("navbar__list");
const sections = document.querySelectorAll("[data-nav]");

// creating the navigation bar 
function makeNavBar () {
  sections.forEach(_section => {
    const navElement = document.createElement("li");
    navbar__list.appendChild(navElement);
    const link = document.createElement("a");
    link.setAttribute('class', 'menu__link');
    link.innerText = _section.dataset.nav;
    link.href = "#"+_section.id;
    navElement.appendChild(link); 
  }); 
}

// checking if the section is in viewport
function sectionView(_section) {
  let position = _section.getBoundingClientRect();
  let midScreen = window.innerHeight / 2;
  return position.top < midScreen && position.bottom > midScreen;
}

// add the class active to section when it is near to the top of viewport
function callActiveOn() {
  for (let _section of sections) {
    const sectionId = _section.getAttribute('id');
// if it is in the viewport it will add the active class
    if (sectionView(_section)) {
        _section.classList.add("your-active-class");
       document.querySelector(`[href='#${sectionId}']`).classList.add('active')
// if it isn't in the viewport it will remove the active class
    } else {
      document.querySelector(`[href='#${sectionId}']`).classList.remove('active')
        _section.classList.remove("your-active-class");
    }
  }
}

// checking the elements in the viewport every time the viewer scrolls
window.addEventListener("scroll", () => {
  callActiveOn();
});

// smooth scroll to specific section when the nav bar links are clicked
function smoothScroll(event) {
  let goTo = document.querySelectorAll('.menu__link');
  goTo.forEach(link=>{
  link.addEventListener('click', (event) => {
  event.preventDefault();
  const sectionLink= event.target;
  const hrefElement= document.querySelector(sectionLink.getAttribute('href'));
  scrollBy({
    top: hrefElement.getBoundingClientRect().top,
    behavior: 'smooth',
})
  })
 })
}

//form submition and message to the user
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name=document.getElementById('username').value
  const email=document.getElementById('email').value
  const message=document.createElement('p')
  message.textContent= `Thank you ${name} for submiting!`
  form.appendChild(message);
})

document.addEventListener('DOMContentLoaded', (event)=> {
  event.preventDefault();
  makeNavBar ()
})

document.addEventListener('click', (event)=> {
  smoothScroll(event)
})