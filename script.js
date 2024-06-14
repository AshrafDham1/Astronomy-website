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

function scrollDown() {
  window.scrollBy({
      top: window.innerHeight + 100,
      behavior: 'smooth'
  });
}

const preloader= document.getElementById("preloader");
window.addEventListener("load",fullyLoaded);
function fullyLoaded(){
    preloader.style.display="none"
}


function updateTextBasedOnWidth() {
  const heroText = document.getElementById('heroText');
  const smallText = "Discover the wonders of the universe with us. Dive deep into the realms of space and astronomy, where you'll find detailed information on celestial bodies, the latest astronomical discoveries, and insights into the mysteries of the cosmos.";
  const fullText = "Discover the wonders of the universe with us. Dive deep into the realms of space and astronomy, where you'll find detailed information on celestial bodies, the latest astronomical discoveries, and insights into the mysteries of the cosmos. From stunning images of distant galaxies to the science behind black holes and exoplanets, embark on a journey through the stars and expand your understanding of the universe.";

  if (window.innerWidth <= 900) {
      heroText.textContent = smallText;
  } else {
      heroText.textContent = fullText;
  }
}

// Initial call to set the text based on the current window size
updateTextBasedOnWidth();

// Add an event listener to update the text when the window is resized
window.addEventListener('resize', updateTextBasedOnWidth);
// Use od API

let IOTD = { //IOTD=image of the day
  apiKey: "symXGybo5TrvSXm4ZsjtsYXnEPJoEwAgRIVupfx9",
  fetchIOTD: function () {
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`)
          .then(response => response.json())
          .then(Alldata => {
              console.log(Alldata);
              this.displayIOTD(Alldata);
          })
  },
  displayIOTD: function (data) {
    const IOTDresult = document.getElementById('IOTDresult');
    const IOTDtitle =  data.title;
    const IOTDmediaUrl = data.url;
    const IOTDmediaType = data.media_type; // Check the media type (image or video)
    const IOTDdate = data.date;
    const IOTDcopyright = data.copyright;
    const IOTDexplanation = data.explanation;

    // Create the media element based on the media type
    let mediaElement;
    if (IOTDmediaType === 'image') {
      mediaElement = `<img src="${IOTDmediaUrl}" id="IOTDimg">`;
    } else if (IOTDmediaType === 'video') {
      mediaElement = `
      <iframe width="560" height="315" src="${IOTDmediaUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      mediaElement = '<p>Unsupported media type</p>';
    }

    // Display the content
    IOTDresult.innerHTML = `
    <div id="IOTDinfo">    
      <h2 class="IOTDheader" id="IOTDtitle">${IOTDtitle}</h2>
      <p class="IOTDp">${IOTDexplanation}</p>
      <p class="IOTDp" id="IOTDdate">${IOTDdate}</p>
      ${IOTDcopyright ? `<p class="IOTDp" id="copyright">${IOTDcopyright}</p>` : ''}
      <button class="savebtn" id="saveIOTD">
        <span class="savespan">Add to collection</span>
        <svg class="savesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      </button>
    </div>
    ${mediaElement}`; // Insert the media element
    
    saveIOTD()

  },

//              <iframe width="1200" class="IOTDvd" height="315" src="${IOTDimg}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



  }



IOTD.fetchIOTD();
// IOTD.displayIOTD()

function saveIOTD(){
  const saveIOTDButton = document.getElementById("saveIOTD");
  saveIOTDButton.addEventListener("click", () => {
    console.log("clicked");

    // Retrieve image URL and explanation
    const imageContainer = document.getElementById('IOTDimg');
    const IOTDimgUrl = imageContainer.src;

    const IOTDexplanation = document.querySelector('.IOTDp').innerText;

    console.log(IOTDimgUrl);
    console.log(IOTDexplanation);

    // Save to localStorage
    localStorage.setItem("savedIOTDImg", JSON.stringify(IOTDimgUrl));
    localStorage.setItem("savedIOTDExplanation", JSON.stringify(IOTDexplanation));
  });
}











let year, month, day;  // Declare variables in the outer scope

function processDate() {
  const dateInput = document.getElementById('dateInput').value;

  if (dateInput) {
    [year, month, day] = dateInput.split('-');

    console.log('Year:', year);
    console.log('Month:', month);
    console.log('Day:', day);

    epicCall.fetchEpic(year, month, day);  // Call the fetchEpic function here
  } else {
    console.log('No date selected');
  }
}

const epicCall = {
  apiKey: "BSDANFvQr9Z3EhgJx3agY9U8ENTOZEaxCOpE3od7",
  fetchEpic: function (year, month, day) {
    fetch(`https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?api_key=${this.apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.displayEpic(data, year, month, day);  // Pass date to displayEpic
      })
      .catch(error => {
        console.error('Error fetching EPIC data:', error);
      });
  },
  displayEpic: function (data, year, month, day) {  // Accept date parameters
    const identifier = data[0].identifier;
    const caption = data[0].caption;
    console.log("identifier:", identifier);
    this.fetchEpicImg(year, month, day, identifier);
    this.displayCaption(caption );

  },
  fetchEpicImg: function (year, month, day, identifier) {
    const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/epic_1b_${identifier}.jpg`;
    this.displayEpicImg(imgUrl);
  },
  displayEpicImg: function (imgUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imgUrl}" alt="EPIC Image" class="epicImg">`;
  },
  displayCaption: function (caption) {
    const captionContainer = document.getElementById('captionContainer');
    captionContainer.innerHTML = `<p class="caption">${caption}</p>`;
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerHTML = `<button class="savebtn" id="saveEPIC">
    <span class="savespan">Add to collection</span>
  <svg class="savesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        </button>`
    saveEpic()
  },

};
function saveEpic(){
  const saveEPIC = document.getElementById("saveEPIC")
  saveEPIC.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");

    // Retrieve image URL and caption from the DOM elements
    const imageContainer = document.getElementById('imageContainer');
    const imgUrl = imageContainer.querySelector('img').src;

    const captionContainer = document.getElementById('captionContainer');
    const caption = captionContainer.innerText;

    console.log(imgUrl);
    console.log(caption);

    // Save to localStorage
    localStorage.setItem("savedEpicImg", JSON.stringify(imgUrl));
    localStorage.setItem("savedEpicCaption", JSON.stringify(caption));
  });
}





(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
  };
  window.requestAnimationFrame = requestAnimationFrame;
})();

var background = document.getElementById("bgCanvas"),
  bgCtx = background.getContext("2d"),
  width = window.innerWidth,
  height = document.body.offsetHeight;

if (height < 400) height = 400;

background.width = width;
background.height = height;

function ShootingStar() {
  this.reset();
}

ShootingStar.prototype.reset = function() {
  this.x = Math.random() * width*2;
  this.y = 0;
  this.len = (Math.random() * 80) + 10;
  this.speed = (Math.random() * 10) + 6;
  this.size = Math.random() * (2 - 0.5) + Math.random() * (2 - 1); // Random size between 0.1 and 0.5
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

ShootingStar.prototype.update = function() {
  if (this.active) {
      this.x -= this.speed;
      this.y += this.speed;
      if (this.x < 0 || this.y >= height) {
          this.reset();
      } else {
          bgCtx.lineWidth = this.size;
          bgCtx.beginPath();
          bgCtx.moveTo(this.x, this.y);
          bgCtx.lineTo(this.x + this.len, this.y - this.len);
          bgCtx.stroke();
      }
  } else {
      if (this.waitTime < new Date().getTime()) {
          this.active = true;
      }
  }
}

var entities = [];

var numberOfMeteors = 15; 

for (var i = 0; i < numberOfMeteors; i++) {
  entities.push(new ShootingStar());
}

function animate() {
  bgCtx.clearRect(0, 0, width, height);
  bgCtx.fillStyle = 'transparent';
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  var entLen = entities.length;

  while (entLen--) {
      entities[entLen].update();
  }

  requestAnimationFrame(animate);
}

animate();

