const gallery = document.querySelector("#gallery");

// making an array of objects containing all the information of all the different figures
// we are assigning all the variables that are different for every figure like its image, title, description, data-index="...", and data-status="...".
let figuresObjs = [
  {
    img: "images/flowers-pink-large.jpg",
    title: "Market in Münster",
    description: `Market in Münster, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=62071586" target="_blank">photo link</a>`,
    dataIndex: 0,
    dataStatus: "active",
  },{
    img: "images/flowers-purple-large.jpg",
    title: "Sentmaring Park",
    description: `Sentmaring Park, Münster, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=48576226" target="_blank">photo link</a>`,
    dataIndex: 1,
    dataStatus: "unknown",
  },
  {
    img: "images/flowers-red-large.jpg",
    title: "Poppies in cornfield",
    description: `Poppies in cornfield, Dülmen, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=40957238" target="_blank">photo link</a>`,
    dataIndex: 2,
    dataStatus: "unknown",
  },
  {
    img: "images/flowers-white-large.jpg",
    title: "Daffodils in Sentmaring park",
    description: `Daffodils in Sentmaring park, Münster, North Rhine-Westfalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=48211466" target="_blank">photo link</a>`,
    dataIndex: 3,
    dataStatus: "unknown",
  },
  {
    img: "images/flowers-yellow-large.jpg",
    title: "Sunflowers in the hamlet Dernekamp",
    description: `Sunflowers in the hamlet Dernekamp, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=61514522" target="_blank">photo link</a>`,
    dataIndex: 4,
    dataStatus: "unknown",
  },
];

// creating a function that will return a sort of blue print for the figure element that
// takes an argument of figure which basically points(refers) to the object in the array
// containing all the required information
function createFigureHtml(figure) {
  return `
    <figure class="figure" data-index="${figure.dataIndex}" data-status="${figure.dataStatus}">
      <div class="image">
        <img src="${figure.img}" alt="" width="1200" height="800" class="mainImage" />
      </div>
      <div class="description">
        <p>${figure.description}</p>
      </div>
      <div class="title">
        <figcaption class="title">${figure.title}</figcaption>
      </div>
      <div class="buttons">
        <i class="fa-solid fa-arrow-left left-button" type="button"></i>
        <i class="fa-solid fa-arrow-right right-button" type="button"></i>
      </div>
    </figure>
  `;
}

// using map function to go through all the objects in the array and call createFigureHtml
// function on them (for each figure object) and then join them to make it a single string
let figuresHtml = figuresObjs.map((figure) => createFigureHtml(figure)).join('');
gallery.innerHTML = figuresHtml;

// declaring other variables
// we need to add them here instead of adding them at the top because they will be null
// as the html elements would not have been created there
let activeIndex = 0;
const leftButton = document.querySelectorAll(".left-button");
const rightButton = document.querySelectorAll(".right-button");
const figures = document.querySelectorAll(".figure");
const allImagesSection = document.querySelector(".allImages");

// list of all small images names for ul li images
let imagesURLs = [
  "flowers-pink-small.jpg",
  "flowers-purple-small.jpg",
  "flowers-red-small.jpg",
  "flowers-white-small.jpg",
  "flowers-yellow-small.jpg",
];

// creating the ul element
let ulElement = document.createElement("ul");
// adding it to the DOM
allImagesSection.appendChild(ulElement);
// creating a string that uses map to go through all the images in the array and use that
// image name string to create a li element containing image element with the image name
// string from the array
let liElements = imagesURLs.map(url => `<li><img src="images/${url}" alt=""/></li>`).join('');
// adding the string inside the ul element (as HTML) 
ulElement.innerHTML = liElements;

// now since we have the ul li img elements in the DOM, we will be able to select them
let images = document.querySelectorAll(".allImages > ul > li > img");

// creating a function to add css class "gray" to all the images in the ul li and removing
// the css class from a single image which is actively displayed on the screen 
function addGrayClass(arr, index) {
  arr.forEach((element) => {
    element.classList.add("gray");
  });

  arr[index].classList.remove("gray");
}

// calling the function to take initial effect of adding gray class to all images except
// the first one
addGrayClass(images, 0);

// ul li images
images.forEach((ele, index) => { // index => nextIndex
  ele.addEventListener("click", () => {
    if (index !== activeIndex) { // on clicking an image, obviously the index will be different if not clicking on the same image
      // selecting the current figure using the data-index="..."; and selecting the
      // next figure using the clicked image's index data-index="...";
      const currentFiguer = document.querySelector(`[data-index="${activeIndex}"]`);
      nextFigure = document.querySelector(`[data-index="${index}"]`);
      // see Notes below for more information about data-status="..." values

      // changing (adding) data-status="after/before" and data-status="becoming-active-from-before/becoming-active-from-after"
      // respective (according) to the next index (clicked index)
      currentFiguer.dataset.status = index > activeIndex ? "after" : "before";
      nextFigure.dataset.status = index > activeIndex ? "becoming-active-from-before" : "becoming-active-from-after";

      // setting a very short delay before we add the data-status="active" for the smooth effect
      setTimeout(() => {
        nextFigure.dataset.status = "active";
        // changing the next index to the active index so that current index do not keep
        // pointing to the same index each and every time
        activeIndex = index;
      });

      // adding the gray class to all the ul li images except new current image (next index / clicked index) 
      addGrayClass(images, index);
    }
  });
});

// for all the left button we are adding the event listener to change the image using
// setActiveFigure function
leftButton.forEach((ele) => {
  ele.addEventListener("click", () => {
    // the math logic explained in the Notes below
    const nextIndex = (activeIndex - 1 + figures.length) % figures.length;
    // passing the next index to the function
    setActiveFigure(nextIndex);
  });
});

// for all the right button we are adding the event listener to change the image using
// setActiveFigure function
rightButton.forEach((ele) => {
  ele.addEventListener("click", () => {
    // the math logic explained in the Notes below
    const nextIndex = (activeIndex + 1) % figures.length;
    // passing the next index to the function
    setActiveFigure(nextIndex);
  });
});

// this function utilizes the next index from the buttons click events and toggling the
// data-status values accordingly
function setActiveFigure(nextIndex) {
  // selecting the current figure using the data-index="..."; and selecting the
  // next figure using the next index parameter index data-index="...";
  const currentFiguer = document.querySelector(`[data-index="${activeIndex}"]`);
        nextFigure = document.querySelector(`[data-index="${nextIndex}"]`);

  // checking if the next index is greater then the active index and adding the data-status
  // active/before values respectively to the current active figure
  currentFiguer.dataset.status = nextIndex > activeIndex ? "after" : "before";
  // then adding the data-status becoming-active-from-before/becoming-active-from-after
  // accordingly
  nextFigure.dataset.status = nextIndex > activeIndex ? "becoming-active-from-before" : "becoming-active-from-after";

  // setting a very little delay before adding data-status="active" for the smooth effect
  setTimeout(() => {
    nextFigure.dataset.status = "active";
    // changing the next index to the active index so that current index do not keep
    // pointing to the same index each and every time
    activeIndex = nextIndex;
  });

  // adding the gray class to all the ul li images except new current image (next index) 
  addGrayClass(images, nextIndex);
}

// Notes
/*
* for more information about the data-status="..." see lines 49 to 76 in gallery.css

* In Left Buttons:
(activeIndex - 1 + figures.length) % figures.length
Let's assume activeIndex is 0 and figures.length is 5 (just for the sake of this example).

Step 1: Subtract 1 from activeIndex => 0 - 1 = -1

Step 2: Add figures.length to the result from step 1 => -1 + 5 = 4

Step 3: Take the modulus (%) of the result from step 2 with figures.length => 4 % 5 = 4

So, in this case, (activeIndex - 1 + figures.length) % figures.length will evaluate to 4.

The purpose of this expression is to calculate the index of the previous figure in a circular manner. It ensures that the resulting index is always within the range of the figures array, even when the activeIndex is at the beginning (0 index).

* In Right Buttons:
(activeIndex + 1) % figures.length
Let's assume activeIndex is 3 and figures.length is 5 (again, just for the example).

Step 1: Add 1 to activeIndex => 3 + 1 = 4

Step 2: Take the modulus (%) of the result from step 1 with figures.length => 4 % 5 = 4

So, in this case, (activeIndex + 1) % figures.length will also evaluate to 4.

Similarly to the previous expression, this one calculates the index of the next figure in a circular manner. It ensures that the resulting index is always within the range of the figures array, even when the activeIndex is at the end (last index).

By using these expressions, you can cycle through the figures array seamlessly, regardless of the current activeIndex, making it easier to implement the functionality of navigating between figures in a loop.
*/