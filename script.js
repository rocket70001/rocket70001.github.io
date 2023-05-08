const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

 // Unsplash API
const count = 30;
const apiKey = 'nb-We1nhoq-Xx69tnNPLy-VTKWREc25sQUt6Q5y7ma8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        console.log('ready =', ready);
    }
}

// Helper function for Set Attributes on DOM Elements
function setAttributes(element, attributes) {
     for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
     }
}

// Create  Elements For Links & Photos, Add to DOM
function displyPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function For Each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displyPhotos(); 
    }catch(error){ 
        // Catch Error Here

    }
}

// Check to see if scrolling near bottom of page, need more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 
        && ready) {
            ready = false;
            getPhotos();
    }
});

// On Load
getPhotos();