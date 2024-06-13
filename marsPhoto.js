let page = 1;
const apiKey = "BSDANFvQr9Z3EhgJx3agY9U8ENTOZEaxCOpE3od7";
let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`;
let fetchedData = [];
let localStorData = JSON.parse(localStorage.getItem("data")) || [];
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");

const getNasaPictures = () => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            fetchedData = data;
            createAndAppendCards(fetchedData.photos);
        })
        .catch((error) => console.log(error));
};

const addToFavoriteListener = (element) => {
    const saveButton = element.querySelector(".savebtn");
    saveButton.addEventListener("click", (e) => {
        const cardElement = e.target.closest(".card");
        localStorData.push({
            img_src: cardElement.querySelector("a").getAttribute("href"),
            earth_date: cardElement.querySelector("strong").innerText,
            rover: {
                name: cardElement.querySelector("span").innerText.slice(6),
            },
            id: cardElement.querySelector(".card-body").id,
        });
        localStorage.setItem("data", JSON.stringify(localStorData));
        saveConfirmed.classList.remove("hidden");
        setTimeout(() => {
            saveConfirmed.classList.add("hidden");
        }, 1000);
    });
};

const createAndAppendCards = (array) => {
    imagesContainer.innerText = "";
    array.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <a href=${item.img_src} title="View Full Image" target="_blank">
                <img src=${item.img_src
            } alt="NASA Picture of the Day" class="card-img-top" style="width: 100%;" />
            </a>
            <div class="card-body" id="id${Math.random()
                .toString(16)
                .slice(2)}">
                <h5 class="card-title"></h5>
                <span class="clickable addFav hidden">Add to Favorites</span>
                <span class="clickable rmFav hidden">Remove</span>
                <p class="card-text"></p>
                <small class="text-muted">
                    <strong>${item.earth_date}</strong>
                    <span>Rover: ${item.rover.name}</span>
                </small>
                <button class="savebtn" id="saveMars">
                    <span class="savespan">Add to collection</span>
                    <svg class="savesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </button>
            </div>
        `;
        addToFavoriteListener(card);
        imagesContainer.append(card);
    });
};
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId)
  
    toggle.addEventListener('click', () => {
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu')
  
      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon')
    })
  }
  showMenu('nav-toggle', 'nav-menu')
getNasaPictures();

const preloader= document.getElementById("preloader");
window.addEventListener("load",fullyLoaded);
function fullyLoaded(){
    preloader.style.display="none"
}