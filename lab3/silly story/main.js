/*
Name : Heny Prajapati
File : mail.ja
Date : 1st April
Description : js file for silly_genetaro
*/

// Get references to elements
const customName = document.getElementById('customname');
const randomize = document.getElementById('randomize');
const story = document.getElementById('story');

// Arrays of possible story elements
const insertX = ['a giant robot', 'a friendly dragon', 'a mischievous squirrel'];
const insertY = ['danced on the moon', 'built a flying car', 'discovered a hidden treasure'];
const insertZ = ['without breaking a sweat', 'while singing a funny song', 'with a huge grin'];

// The story text with placeholders
const storyText = 'One fine day, :insertx: :inserty: :insertz:. And Bob couldn’t believe their eyes!';

// Function to pick random item from an array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Function to generate the random story
function result() {
  let newStory = storyText;

  // Random values from the arrays
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Replace the placeholders with random items
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Replace the default name if a custom name is entered
  if (customName.value) {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Display the story in the <p> tag
  story.textContent = newStory;
  story.style.visibility = 'visible';
}

// Add event listener to the button
randomize.addEventListener('click', result);
