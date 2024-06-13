const preloader= document.getElementById("preloader");
window.addEventListener("load",fullyLoaded);
function fullyLoaded(){
        preloader.style.display = "none";
  
}
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
document.addEventListener("DOMContentLoaded", () => {
    const articlesContainer = document.getElementById("articlesContainer");

    fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=13")
        .then(response => response.json())
        .then(data => {
            data.slice(1).forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("article");
                articleElement.style.minHeight = "700px";
                const titleElement = document.createElement("h3");
                titleElement.textContent = article.title;
                articleElement.appendChild(titleElement);

                const imgElement = document.createElement("img");
                imgElement.style.height ="500px"
                imgElement.classList.add("articleIMG");
                imgElement.src = article.imageUrl;
                imgElement.alt = article.title;
                articleElement.appendChild(imgElement);

                const summaryElement = document.createElement("p");
                summaryElement.classList.add("summary");
                summaryElement.textContent = article.summary;
                articleElement.appendChild(summaryElement);

                articlesContainer.appendChild(articleElement);

                // Check if the summary is longer than two lines
                if (summaryElement.scrollHeight > summaryElement.clientHeight) {
                    const readMoreElement = document.createElement("span");
                    readMoreElement.textContent = "... Read more";
                    readMoreElement.classList.add("read-more");
                    readMoreElement.onclick = () => {
                        summaryElement.classList.toggle("expanded");
                        readMoreElement.textContent = summaryElement.classList.contains("expanded") ? " Show less" : "... Read more";
                    };
                    articleElement.appendChild(readMoreElement);
                }

                const linkElement = document.createElement("a");
                linkElement.style.display = "block";
                linkElement.href = article.url;
                linkElement.textContent = "View full article";
                linkElement.target = "_blank";
                linkElement.classList.add("view-full-article");
                articleElement.appendChild(linkElement);
            });
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
            articlesContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
        });
});



document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollFraction = scrollPosition / maxScroll;

    const shuttle = document.querySelector('.space-shuttle-container');

    // Calculate new positions
    const translateX = scrollFraction * window.innerWidth;
    const translateY = scrollFraction * -window.innerHeight;
    
    // Calculate rotation
    const rotation = scrollFraction * 60; // Rotate up to 30 degrees

    shuttle.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
  });


  
