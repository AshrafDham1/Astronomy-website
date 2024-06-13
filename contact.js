document.getElementById("emailForm").addEventListener("submit", handleSubmit);
const preloader= document.getElementById("preloader");
window.addEventListener("load",fullyLoaded);
function fullyLoaded(){
    preloader.style.display="none"
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
function handleSubmit(event) {
    event.preventDefault(); 

    
    var params = {
        from_name: document.getElementById("contactName").value,
        email_id: document.getElementById("contactEmail").value,
        message: document.getElementById("ContactText").value,
    };
    emailjs.send("service_e4gnfc7", "template_isc598q", params).then(function () {
        alert("Email sent successfully");
    });
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("ContactText").value = "";

}