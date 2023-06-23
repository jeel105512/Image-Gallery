let activeIndex = 0;
const leftButton = document.querySelectorAll(".left-button");
const rightButton = document.querySelectorAll(".right-button");
const figures = document.querySelectorAll(".figure");
const allImagesSection = document.querySelector(".allImages");

// for making the ul of images dynamic
// -------------------------------------------------------------------------------------------------------------
let imagesURLs = [
  "flowers-pink-small.jpg",
  "flowers-purple-small.jpg",
  "flowers-red-small.jpg",
  "flowers-white-small.jpg",
  "flowers-yellow-small.jpg",
];

let ulElement = document.createElement("ul");
allImagesSection.appendChild(ulElement);
let liElements = "";
imagesURLs.forEach((ele) => {
  liElements += `<li>
                    <img src="images/${ele}" alt=""/>
                 </li>`;
});
ulElement.innerHTML = liElements;
// we need to declare this array(NodeList) here as it will be empty before we add the ul li elements to the HTML
let images = document.querySelectorAll(".allImages > ul > li > img");
// -------------------------------------------------------------------------------------------------------------

function addGrayClass(arr, index) {
  arr.forEach((element) => {
    element.classList.add("gray");
  });

  arr[index].classList.remove("gray");
}

addGrayClass(images, 0);

images.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    console.log(index, activeIndex, ele);
    if (index > activeIndex) {
      const currentFiguer = document.querySelector(
        `[data-index="${activeIndex}"]`
      );
      nextFigure = document.querySelector(`[data-index="${index}"]`);

      //active group becomes after
      currentFiguer.dataset.status = "after";

      //next group becomes active
      nextFigure.dataset.status = "becoming-active-from-before";
      // set a very small delay
      setTimeout(() => {
        nextFigure.dataset.status = "active";
        activeIndex = index;
      });
      addGrayClass(images, index);
    }

    if(index < activeIndex){
        const currentFiguer = document.querySelector(
            `[data-index="${activeIndex}"]`
          );
          nextFigure = document.querySelector(`[data-index="${index}"]`);
      
          //active group becomes after
          currentFiguer.dataset.status = "before";
      
          //next group becomes active
          nextFigure.dataset.status = "becoming-active-from-after";
          setTimeout(() => {
            nextFigure.dataset.status = "active";
            activeIndex = index;
          });
      
          addGrayClass(images, index); 
    }
  });
});

leftButton.forEach((ele) => {
  ele.addEventListener("click", () => {
    //increment the index
    const nextIndex =
      activeIndex - 1 >= 0 ? activeIndex - 1 : figures.length - 1;

    const currentFiguer = document.querySelector(
      `[data-index="${activeIndex}"]`
    );
    nextFigure = document.querySelector(`[data-index="${nextIndex}"]`);

    //active group becomes after
    currentFiguer.dataset.status = "before";

    //next group becomes active
    nextFigure.dataset.status = "becoming-active-from-after";
    setTimeout(() => {
      nextFigure.dataset.status = "active";
      activeIndex = nextIndex;
    });

    addGrayClass(images, nextIndex);

    // console.log(activeIndex, nextIndex);
  });
});

rightButton.forEach((ele) => {
  ele.addEventListener("click", () => {
    //increment the index
    const nextIndex =
      activeIndex + 1 <= figures.length - 1 ? activeIndex + 1 : 0;

    const currentFiguer = document.querySelector(
      `[data-index="${activeIndex}"]`
    );
    nextFigure = document.querySelector(`[data-index="${nextIndex}"]`);

    //active group becomes after
    currentFiguer.dataset.status = "after";

    //next group becomes active
    nextFigure.dataset.status = "becoming-active-from-before";
    // set a very small delay
    setTimeout(() => {
      nextFigure.dataset.status = "active";
      activeIndex = nextIndex;
    });
    addGrayClass(images, nextIndex);
    // console.log(activeIndex, nextIndex);
  });
});
