// Declare an array of image filenames
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Declare an object for alt text
const altTexts = {
    'pic1.jpg': 'Closeup of a blue human eye',
    'pic2.jpg': 'A red apple on a tree',
    'pic3.jpg': 'A beautiful mountain landscape',
    'pic4.jpg': 'A calm beach at sunset',
    'pic5.jpg': 'A bustling city street at night'
};

// Get references to elements
const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

// Loop through the array of images and generate thumbnails
images.forEach(image => {
    // Create an <img> element for each thumbnail
    const newImg = document.createElement('img');
    newImg.src = `images/${image}`;
    newImg.alt = altTexts[image];
    
    // Append the image to the thumb-bar
    thumbBar.appendChild(newImg);

    // Add click event listener to each thumbnail
    newImg.addEventListener('click', () => {
        displayedImg.src = `images/${image}`;
        displayedImg.alt = altTexts[image];
    });
});

// Add click event listener to the darken/lighten button
btn.addEventListener('click', () => {
    if (btn.classList.contains('dark')) {
        // If the button is "dark", change to "light"
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
        // If the button is "light", change back to "dark"
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
});
