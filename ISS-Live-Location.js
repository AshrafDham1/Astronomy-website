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
const mymap = L.map('map').setView([0, 0], 2);
const issIcon = L.icon({
    iconUrl: './assests/pngwing.com.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(mymap);
const api_url_position = 'https://api.wheretheiss.at/v1/satellites/25544';
const api_url_tle = 'https://api.wheretheiss.at/v1/satellites/25544/tles';
let marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
let flag = true;
function getISS() {
    fetch(api_url_position)
        .then(response => response.json())
        .then(data => {
            const { latitude, longitude } = data;
            marker.setLatLng([latitude, longitude]);
            if (flag) {
                mymap.setView([latitude, longitude], 2);
                flag = false;
            }
            document.querySelector('#lat').textContent = latitude.toFixed(2);
            document.querySelector('#lon').textContent = longitude.toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching ISS data:', error);
        });
}
function updateLocalTime() {
    const now = new Date();
    const localTimeString = now.toLocaleString();
    document.getElementById('localTime').textContent = `Local Time: ${localTimeString}`;
}
function getISSTrajectory() {
    fetch(api_url_tle)
        .then(response => response.json())
        .then(data => {
            const { line1, line2 } = data;
            const satrec = satellite.twoline2satrec(line1, line2);
            const now = new Date();
            const positions = [];
            for (let i = 0; i <= 90; i += 1) {
                const time = new Date(now.getTime() + i * 60000);
                const positionAndVelocity = satellite.propagate(satrec, time);
                const gmst = satellite.gstime(time);
                const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
                const longitude = satellite.degreesLong(positionGd.longitude);
                const latitude = satellite.degreesLat(positionGd.latitude);

                positions.push([latitude, longitude]);
            }
            mymap.eachLayer((layer) => {
                if (layer instanceof L.Polyline && !layer._icon) {
                    mymap.removeLayer(layer);
                }
            });
            const segments = [];
            let segment = [];
            positions.forEach((pos, index) => {
                if (index > 0) {
                    const prevPos = positions[index - 1];
                    if (Math.abs(pos[1] - prevPos[1]) > 180) {
                        segments.push(segment);
                        segment = [];
                    }
                }
                segment.push(pos);
            });

            if (segment.length > 0) {
                segments.push(segment);
            }
            segments.forEach(seg => {
                L.polyline(seg, { color: 'red' }).addTo(mymap);
            });
        })
        .catch(error => {
            console.error('Error fetching ISS TLE data:', error);
        });
}

setInterval(getISS, 1000);
setInterval(updateLocalTime, 1000);
setInterval(getISSTrajectory, 60000);
updateLocalTime();
getISSTrajectory();




import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new GLTFLoader();

loader.load(
  '/assests/ISS_stationary.gltf',
  function (gltf) {
    const object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background

// Set the renderer's size to take 75% of the window's height
const rendererHeight = window.innerHeight * 0.75; // Set to 75% of the window height
const aspectRatio = window.innerWidth / window.innerHeight;
const rendererWidth = aspectRatio * rendererHeight;
renderer.setSize(rendererWidth, rendererHeight);

// Add the renderer to the DOM
const container3D = document.getElementById("container3D");
container3D.appendChild(renderer.domElement);

// Set up OrbitControls to allow user navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true; // Enable auto rotation
controls.enableZoom = true; // Enable zooming
controls.enablePan = false; // Disable panning

// Set the initial position of the camera
camera.position.set(0, 0, 80); // Adjust the position for initial zoom

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // Top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update(); // Update controls
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const rendererHeight = window.innerHeight * 0.5; // Set to 75% of the window height
  const rendererWidth = aspectRatio * rendererHeight;
  renderer.setSize(rendererWidth, rendererHeight);
});

// Start the 3D rendering
animate();
