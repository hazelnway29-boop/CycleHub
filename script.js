const bikeShops = [
  {
    name: "Weston Bicycle Works",
    address: "143 Locking Road, Weston-super-Mare, BS23 3ER",
    description: "A community enterprise selling quality refurbished bikes and welcome bike donations.",
    website: "https://www.wbw.org.uk/",
    phone: "01934 629989",
    services: ["Secondhand bikes","Bike servicing","Donate a bike"],
    region: "North Somerset",
    lat: 51.346, 
    lng: -2.974,
    image: "images/p3.png" 
  },
  {
    name: "Avon Valley Cyclery",
    address: "Brunel Square, Bath, BA1 1SX",
    description: "An independent bike shop in the centre of the Georgian city of Bath, established for over 30 years.",
    website: "http://www.avonvalleycyclery.co.uk/",
    phone: "01225 442 442",
    services: ["New bikes","Bike servicing"],
    region: "Bath",
    lat: 51.381,
    lng: -2.360,
    image: "images/p4.png" 
  },
  {
    name: "Total Fitness Bath",
    address: "3 Saracen Street, Bath, BA1 5BR",
    description: "Road, mountain biking, leisure riding, commuting or kids bikes.",
    website: "http://www.totalfitnessbath.co.uk/",
    phone: "01225 444164",
    services: ["New bikes","Bike servicing","E-Bikes"],
    region: "Bath",
    lat: 51.381,
    lng: -2.361,
    image: "images/p5.jpg" 
  },
  {
    name: "Blackboy Hill Cycles",
    address: "180 Whiteladies Road, Clifton, Bristol, BS8 2XU",
    description: "Local family run bike shop form over 40yrs",
    website: "https://black-boy-cycles.co.uk/",
    phone: "0117 973 1420",
    services: ["New bikes","Bike servicing"],
    region: "Bristol",
    lat: 51.459,
    lng: -2.618,
    image: "images/p6.jpg" 
  },
  
  
  {
    name: "Evans Cycles Bristol",
    address: "Lewins Mead, Bristol, BS1 2PY",
    description: "Whether you are new to cycling or a seasoned veteran, you are sure to find everything you need at this Bristol store, along with great service and expertise.",
    website: "http://www.evanscycles.com/store/bristol",
    phone: "0343 909 3926",
    services: ["New bikes","Bike servicing","E-Bikes"],
    region: "Bristol",
    lat: 51.456,  // approximate coordinate
    lng: -2.595,
    image: "images/p9.jpg" 
  },
  {
  name: "Bike Style",
  address: "25b Alexandra Road, Clevedon, BS21 7QH",
  description: "Clevedon's friendly local bike shop, North Somerset. Independent bike shop run by riders, we live and breathe biking.",
  website: "http://www.bike-style.co.uk/",
  phone: "01275 876 572",
  services: ["New bikes","Bike servicing"],
  region: "North Somerset",
  lat: 51.444,
  lng: -2.860,
  image: "images/p10.jpg" 
},
   {
    name: "Cycle The City",
    address: "No1 Harbourside , 1 Canon's Road, Bristol, BS1 5UH",
    description: "Cycle the City has a range of high quality, Bristol-built bicycles for hire and guided tours in Bristol City centre.",
    website: "http://www.cyclethecity.co.uk",
    phone: "0117 427 1072",
    services: ["Bike hire","Bike tours"],
    region: "Bristol",
    lat: 51.452,   // approximate
    lng: -2.601,
    image: "images/p11.jpg" 
  },
  
  {
    name: "Bath Narrowboats",
    address: "Bath Narrowboats, Sydney Wharf, Bathwick Hill, Bath, BA2 4EL",
    description: "A range of quality bikes and accessories for hire. A delivery service is also available. Half day or full day cycling in or around Bath.",
    website: "http://www.bath-narrowboats.co.uk",
    phone: "01225 447276",
    services: ["Bike hire"],
    region: "Bath",
    lat: 51.381,   // approximate
    lng: -2.359,
    image: "images/p13.jpg" 
  },
  
  {
    name: "Gary Harris Cycles",
    address: "Common Mead Lane, Hambrook, South Gloucestershire, BS16 1QQ",
    description: "An independent local bike shop in Bristol that specialises in repairs to all bikes including electric bikes.",
    website: "https://garyharriscycles.com/",
    phone: "07816 515082",
    services: ["New bikes","Bike servicing","E-Bikes"],
    region: "South Gloucestershire",
    lat: 51.528,  // approximate
    lng: -2.516,
    image: "images/p16.png" 
  },
  

  
];

// Initialize Leaflet map
const map = L.map('map').setView([51.4545, -2.5879], 11); // Center on Bristol

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];

// Function to display shops on map and in cards
function displayShops(shops) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const shopCards = document.getElementById('shop-cards');
  shopCards.innerHTML = '';

  shops.forEach(shop => {
    // Add map marker
    const marker = L.marker([shop.lat, shop.lng]).addTo(map)
      .bindPopup(`<b>${shop.name}</b><br>${shop.address}<br>${shop.phone}<br><a href="${shop.website}" target="_blank">Website</a>`);
    markers.push(marker);

    // Add shop card
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <img src="${shop.image || 'images/default_bike_shop.jpg'}" alt="${shop.name}" class="shop-image"/>
      <h3>${shop.name}</h3>
      <p><strong>Address:</strong> ${shop.address}</p>
      <p><strong>Phone:</strong> ${shop.phone}</p>
      <p><strong>Services:</strong> ${shop.services.join(', ')}</p>
      <p>${shop.description}</p>
      <p><a href="${shop.website}" target="_blank">Visit Website</a></p>
    `;
    shopCards.appendChild(card);
  });
}


// Initial display
displayShops(bikeShops);

// Search and filter functionality

document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('service-filter').addEventListener('change', applyFilters);
document.getElementById('region-filter').addEventListener('change', applyFilters);

function applyFilters() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const serviceFilter = document.getElementById('service-filter').value.toLowerCase();
  const regionFilter = document.getElementById('region-filter').value;

  const filtered = bikeShops.filter(shop => {
    const combinedText = (shop.name + " " + shop.description).toLowerCase();
    const matchesSearch = combinedText.includes(searchTerm);

    const matchesService = serviceFilter === 'all' || shop.services.some(service => service.toLowerCase() === serviceFilter);

    const matchesRegion = regionFilter === 'all' || shop.region === regionFilter;

    return matchesSearch && matchesService && matchesRegion;
  });

  displayShops(filtered);
}




document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value || "★★★★★";

  const newReview = document.createElement("div");
  newReview.classList.add("reviews-item");
  newReview.innerHTML = `
    <div class="reviews-header">
      <h3 class="reviews-name">${name}</h3>
      <div class="reviews-stars-display">${rating}</div>
    </div>
    <p class="reviews-message">${message}</p>
  `;

  const reviewList = document.getElementById("reviews-list");
  reviewList.insertBefore(newReview, reviewList.firstChild); // add new review on top

  document.getElementById("reviewForm").reset();
  alert("Thank you for your review!");
});



