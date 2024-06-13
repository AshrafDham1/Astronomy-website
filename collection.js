const preloader= document.getElementById("preloader");
window.addEventListener("load",fullyLoaded);
function fullyLoaded(){
    preloader.style.display="none"
}
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    toggle.addEventListener("click", () => {
        nav.classList.toggle("show-menu");
        toggle.classList.toggle("show-icon");
    });
};
showMenu("nav-toggle", "nav-menu");

// Function to show all saved content
const showAllContent = () => {
    const allcol = document.querySelectorAll(".col-container");
    allcol.forEach(function (element) {
        element.style.display = "block";
    });
};

// Function to hide all content except for the specified category
const hideExcept = (category) => {
    const allcol = document.querySelectorAll(".col-container");
    allcol.forEach(function (elements) {
        elements.style.display = "none";
    });

    const categoryCol = document.querySelectorAll(`.${category}`);
    categoryCol.forEach(function (element) {
        element.style.display = "block";
    });
};

const allBtn = document.getElementById("AllBtn");
allBtn.addEventListener("click", showAllContent);

const IOTDBtn = document.getElementById("IOTDBtn");
IOTDBtn.addEventListener("click", () => hideExcept("IOTD"));

const EPICBtn = document.getElementById("EPICBtn");
EPICBtn.addEventListener("click", () => hideExcept("EPIC"));

const MarsBtn = document.getElementById("MarsBtn");
MarsBtn.addEventListener("click", () => hideExcept("Mars"));

// Function to remove content
const removeContent = (container, id) => {
    container.remove();
    let marsData = JSON.parse(localStorage.getItem("data"));
    marsData = marsData.filter((photo) => photo.id !== id);
    localStorage.setItem("data", JSON.stringify(marsData));
};

// Function to create and append saved content for EPIC
const appendEPICContent = () => {
    const EPICimgUrl = JSON.parse(localStorage.getItem("savedEpicImg"));
    const EPICcaption = JSON.parse(localStorage.getItem("savedEpicCaption"));

    if (EPICimgUrl && EPICcaption) {
        const EPICsavedContent = document.getElementById("allSavedContent");
        const EPICsavedImg = document.createElement("img");
        EPICsavedImg.src = EPICimgUrl;
        EPICsavedImg.style.width = "100%";

        const EPICsavedCaption = document.createElement("p");
        EPICsavedCaption.textContent = EPICcaption;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removebtn");
        removeBtn.innerHTML = `
            <span class="removespan">REMOVE</span>
            <svg class="removesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-1.41-1.41L12 11.17 6.41 5.59 5 7l6 6-6 6 1.41 1.41L12 12.83l5.59 5.59L19 19l-6-6z" />
            </svg>
        `;
        removeBtn.addEventListener("click", () =>
            removeContent(EpicContainer, "EPIC")
        );

        const EpicContainer = document.createElement("div");
        EpicContainer.classList.add("col-container");
        EpicContainer.classList.add("EPIC");
        EpicContainer.append(EPICsavedImg, EPICsavedCaption, removeBtn);

        EPICsavedContent.append(EpicContainer);
    } else {
        console.log("No saved EPIC content found.");
    }
};

// Function to create and append saved content for IOTD
const appendIOTDContent = () => {
    const IOTDimgUrl = JSON.parse(localStorage.getItem("savedIOTDImg"));
    const IOTDexplanation = JSON.parse(
        localStorage.getItem("savedIOTDExplanation")
    );

    console.log("IOTD Image URL:", IOTDimgUrl);
    console.log("IOTD Explanation:", IOTDexplanation);

    if (IOTDimgUrl && IOTDexplanation) {
        const IOTDsavedContent = document.getElementById("allSavedContent");

        const IOTDsavedImg = document.createElement("img");
        IOTDsavedImg.src = IOTDimgUrl;
        IOTDsavedImg.style.width = "100%";

        const IOTDContainer = document.createElement("div");
        IOTDContainer.classList.add("col-container");
        IOTDContainer.classList.add("IOTD");

        const IOTDsavedExplanation = document.createElement("p");

        const words = IOTDexplanation.split(" ");

        let truncatedExplanation;

        if (words.length > 40) {
            truncatedExplanation = words.slice(0, 40).join(" ");
            IOTDsavedExplanation.textContent = truncatedExplanation + "...";

            var readMoreLink = document.createElement("a");
            readMoreLink.href = "#";
            readMoreLink.textContent = "Show More";
            readMoreLink.addEventListener("click", (event) => {
                event.preventDefault();
                IOTDsavedExplanation.textContent = IOTDexplanation;
                readMoreLink.style.display = "none";
                showLessBtn.style.display = "inline";
            });

            IOTDContainer.append(IOTDsavedImg, IOTDsavedExplanation, readMoreLink);
        } else {
            IOTDsavedExplanation.textContent = IOTDexplanation + "...";
            IOTDContainer.append(IOTDsavedImg, IOTDsavedExplanation);
        }

        const showLessBtn = document.createElement("a");
        showLessBtn.href = "#";
        showLessBtn.textContent = "Show Less";
        showLessBtn.style.display = "none";
        showLessBtn.addEventListener("click", (event) => {
            event.preventDefault();
            IOTDsavedExplanation.textContent = truncatedExplanation + "...";
            readMoreLink.style.display = "inline";
            showLessBtn.style.display = "none";
        });

        const readMoreContainer = document.createElement("div");
        readMoreContainer.style.marginBottom = "15px";
        readMoreContainer.classList.add("read-more-container");
        readMoreContainer.append(readMoreLink, showLessBtn);

        IOTDContainer.append(IOTDsavedImg, IOTDsavedExplanation, readMoreContainer);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removebtn");
        removeBtn.innerHTML = `
            <span class="removespan">REMOVE</span>
            <svg class="removesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-1.41-1.41L12 11.17 6.41 5.59 5 7l6 6-6 6 1.41 1.41L12 12.83l5.59 5.59L19 19l-6-6z" />
            </svg>
        `;
        removeBtn.addEventListener("click", () =>
            removeContent(IOTDContainer, "IOTD")
        );

        IOTDContainer.append(removeBtn);

        IOTDsavedContent.append(IOTDContainer);
    } else {
        console.log("No saved IOTD content found.");
    }
};

// Function to create and append saved content for Mars
const appendMarsContent = () => {
    const MarsSavedContent = document.getElementById("allSavedContent");

    const marsData = JSON.parse(localStorage.getItem("data"));

    if (marsData && marsData.length > 0) {
        marsData.forEach((photo) => {
            const marsContainer = document.createElement("div");
            marsContainer.classList.add("col-container");
            marsContainer.classList.add("Mars");
            const marsImg = document.createElement("img");
            marsImg.src = photo.img_src;
            marsImg.style.width = "100%";
            const marsInfo = document.createElement("p");
            marsInfo.textContent = `Earth Date: ${photo.earth_date}, Rover: ${photo.rover.name}`;
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("removebtn");
            removeBtn.innerHTML = `
                <span class="removespan">REMOVE</span>
                <svg class="removesvg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-1.41-1.41L12 11.17 6.41 5.59 5 7l6 6-6 6 1.41 1.41L12 12.83l5.59 5.59L19 19l-6-6z" />
                </svg>
            `;
            removeBtn.addEventListener("click", () =>
                removeContent(marsContainer, photo.id)
            );
            marsContainer.appendChild(marsImg);
            marsContainer.appendChild(marsInfo);
            marsContainer.appendChild(removeBtn);
            marsContainer.style.marginBottom = "15px";
            MarsSavedContent.appendChild(marsContainer);
        });
    } else {
        console.log("No Mars photos found in local storage.");
    }
};

// Call functions to append saved content when the page loads
document.addEventListener("DOMContentLoaded", () => {
    appendEPICContent();
    appendIOTDContent();
    appendMarsContent();
    showAllContent(); // Show all content by default when the page loads
});
