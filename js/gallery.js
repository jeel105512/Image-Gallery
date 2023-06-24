// making(adding) the figures dynamically
// ----------------------------------------------------------------------------------------
const gallery = document.querySelector("#gallery");

let figuresObjs = [
  {
    img: "images/flowers-pink-large.jpg",
    title: "Market in Münster",
    description: `Market in Münster, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0, <a href="https://commons.wikimedia.org/w/index.php?curid=62071586" target="_blank">photo link</a>`,
    dataIndex: 0,
    dataStatus: "active",
  },
  {
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

let figuresHtml = "";
figuresObjs.forEach((ele) => {
  figuresHtml += `
  <figure class="figure" data-index="${ele.dataIndex}" data-status="${ele.dataStatus}">
  <div class="image">
  <img src="${ele.img}" alt="" width="1200" height="800" class="mainImage" />
  </div>
  <div class="description">
  <p>
  ${ele.description}
  </p>
  </div>
  <div class="title">
  <figcaption class="title">${ele.title}</figcaption>
  </div>
  <div class="buttons">
  <i class="fa-solid fa-arrow-left left-button" type="button"></i>
  <i class="fa-solid fa-arrow-right right-button" type="button"></i>
  </div>
  </figure>
  `;
});

gallery.innerHTML = figuresHtml;
// ----------------------------------------------------------------------------------------

let activeIndex = 0;
const leftButton = document.querySelectorAll(".left-button");
const rightButton = document.querySelectorAll(".right-button");
const figures = document.querySelectorAll(".figure");
const allImagesSection = document.querySelector(".allImages");

// for making the ul li of images dynamic
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

    if (index < activeIndex) {
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
