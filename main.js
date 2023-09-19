
let section = document.querySelector('section');

const openFullContainer = 
document.querySelector('.openFullContainer');

const closeContainerBtn = document.querySelector('#closeContainerBtn')

const randomizeBtn = document.getElementById('randomize');

let allImages ;
let timeout ;

import config from "/config.js";


const API_KEY = config.apiKey
;
const API_URL = `https://api.unsplash.com/photos/random/?count=30&client_id=${API_KEY}`


async function loadImages() {
  
  try {
  const data = await fetch(API_URL);
  const results = await data.json();
  displayImages(results)
  } catch (e) {
    alert('Something went wrong :/')
  }
  
};

loadImages();

function displayImages(images)
{
    
    section.innerHTML = ''
    images.forEach(image => {
    
    section.innerHTML += `
    <img src=${image.urls.regular } />
    `
     });
     
     allImages = document.querySelectorAll('section img'); 
    openImageInFull(allImages);
    getImages(allImages);
    
}




function openImageInFull(images)
{
  
  images.forEach(image => {
    
    let currentImgSrc = image.src
    
    image.addEventListener('click',openContainer);
  })
  
}
 
 function openContainer(event)
 {
   const currentImgSrc = event.target.src 
      //console.log('Touch start started');
     timeout = setTimeout(() => {
       
       openFullContainer.classList.add('visible','animate__animated', 'animate__bounceIn');
     
     const img = openFullContainer.querySelector('img');
     
     img.setAttribute('src',currentImgSrc);
     
     },300);
   
     
 }
 
 function closeContainer()
 {
   clearTimeout(timeout);
   openFullContainer.classList.remove('visible','animate__animated', 'animate__bounceIn');
   
 }
 
 
 closeContainerBtn.onclick = closeContainer
 
 randomizeBtn.addEventListener('click',function() {
     loadImages();
   window.scrollTo( {
     top : 0,
     behavior: 'smooth'
   });
 });
 
 

window.addEventListener('scroll', function() {
  // Get the current scroll position
  const scrollTop = window.scrollY;
  
  // Get the height of the entire document
  const documentHeight = document.documentElement.scrollHeight;
  
  // Get the height of the viewport
  const viewportHeight = window.innerHeight;
  
  // Calculate the distance between the bottom of the document and the current scroll position
  const distanceToBottom = documentHeight - (scrollTop + viewportHeight);
  
  // Define a threshold (e.g., 100 pixels) for when you consider the user to have reached the bottom
  const threshold = 100;
  
  // Check if the user has reached the bottom
  if (distanceToBottom <= threshold) {
    // The user has reached the bottom of the page
     randomizeBtn.classList.add('active')
    // You can now trigger any actions you want when the user reaches the bottom
  }else {
   randomizeBtn.classList.remove('active')
  }
});

const options = {
  root : null, 
  rootMargin : '-20% 0px 0px 0px',
  threshold : 0.5
}

function getImages(images){
  
  images.forEach((image) => {
    observer.observe(image)
  })
  
}


const observer = new IntersectionObserver(callback, options);

function callback(entries){
  
  entries.forEach((entry) => {
    
    if (entry.isIntersecting){
      entry.target.classList.add('animate__animated', 'animate__backInUp');
     // animate__bounceIn
      
    }
    
  })
  
}


