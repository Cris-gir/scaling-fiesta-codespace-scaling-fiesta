// Sample vehicle data (stored in localStorage)
const sampleVehicles = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2015,
        price: 9500,
        mileage: 190000,
        color: 'White',
        description: 'Fuel-efficient sedan with excellent reliability. Well-maintained and clean interior.',
        images: []
    },
    {
        id: 2,
        make: 'Ford',
        model: 'F-150',
        year: 2019,
        price: 24000,
        mileage: 136000,
        color: 'Gray',
        description: 'Powerful pickup truck perfect for work or leisure. Towing package included.',
        images: []
    },
    {
        id: 3,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        price: 13000,
        mileage: 184000,
        color: 'Blue',
        description: 'Sporty compact car with modern features and excellent fuel economy.',
        images: []
    },
    {
        id: 4,
        make: 'Nissan',
        model: 'Pathfinder',
        year: 2016,
        price: 10000,
        mileage: 142468,
        color: 'Red',
        description: 'Spacious SUV with comfortable seating for the whole family. Great for road trips.',
        images: []
    }, 
    {
        id: 5,
        make: 'Chevrolet',
        model: 'Tahoe LT',
        year: 2015,
        price: 20000,
        mileage: 165000,
        color: 'Silver',
        description: 'Reliable SUV suitable for families. All-wheel drive capability.',
        images: []
    },
    {
        id: 6,
        make: 'GMC',
        model: 'Sierra 1500',
        year: 2018,
        price: 22000,
        mileage: 185121,
        color: 'Black',
        description: 'Durable pickup truck with a powerful engine. Great for hauling and towing.',
        images: []
    },
    {
        id:7,
        make: 'Ford',
        model: 'Explorer Limited',
        year: 2017,
        price: 14000,
        mileage: 146282,
        color: 'White',
        description: 'Spacious SUV with advanced safety feautres and comfortable interior. Perfect for family adventures.',
        images: []
    },
];

// Initialize vehicles from localStorage or use sample data
function initializeVehicles() {
    if (!localStorage.getItem('vehicles')) {
        localStorage.setItem('vehicles', JSON.stringify(sampleVehicles));
    }
}

// Get all vehicles
function getVehicles() {
    return JSON.parse(localStorage.getItem('vehicles')) || [];
}

// Display vehicles on the main page
function displayVehicles(vehicles = null) {
    const vehicleList = document.getElementById('vehicleList');
    if (!vehicleList) return;

    vehicleList.innerHTML = '';
    const vehiclesToShow = vehicles || getVehicles();

    if (vehiclesToShow.length === 0) {
        vehicleList.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No vehicles available.</p>';
        return;
    }

    vehiclesToShow.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        
        const imageHtml = vehicle.images && vehicle.images.length > 0
            ? `<img src="${vehicle.images[0]}" alt="${vehicle.make} ${vehicle.model}">`
            : '🚗';
        
            const hasSpecial = Number.isFinite(vehicle.specialprice) && vehicle.specialprice > 0;
            const priceMarkup = hasSpecial
            ? `<div class="vehicle-price"><span class="original-price">$${vehicle.price.toLocaleString()}</span><span class="special-badge">Special</span><span class="special-price">$${vehicle.specialprice.toLocaleString()}</span></div>`
            : `<div class="vehicle-price">$${vehicle.price.toLocaleString()}</div>`;

        vehicleCard.innerHTML = `
            <div class="vehicle-image">${imageHtml}</div>
            <div class="vehicle-info">
                <div class="vehicle-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</div>
                <div class="vehicle-meta">
                    <div class="vehicle-meta-item"><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</div>
                    <div class="vehicle-meta-item"><strong>Color:</strong> ${vehicle.color}</div>
                </div>
                ${priceMarkup}
                <div class="vehicle-description">${vehicle.description}</div>
            </div>
        `;
        vehicleList.appendChild(vehicleCard);
    });
}

// Search and filter functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const filterPrice = document.getElementById('filterPrice');

    if (!searchInput || !filterPrice) return;

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const priceFilter = filterPrice.value;
        
        let filtered = getVehicles().filter(vehicle => {
            const matchesSearch = 
                vehicle.make.toLowerCase().includes(searchTerm) ||
                vehicle.model.toLowerCase().includes(searchTerm) ||
                vehicle.year.toString().includes(searchTerm);
            
            let matchesPrice = true;
            if (priceFilter === 'under-10000') matchesPrice = vehicle.price < 10000;
            else if (priceFilter === '10000-25000') matchesPrice = vehicle.price >= 10000 && vehicle.price <= 25000;
            else if (priceFilter === '25000-50000') matchesPrice = vehicle.price >= 25000 && vehicle.price <= 50000;
            else if (priceFilter === 'above-50000') matchesPrice = vehicle.price > 50000;

            return matchesSearch && matchesPrice;
        });

        displayVehicles(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    filterPrice.addEventListener('change', applyFilters);
}

// Contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString()
        };

        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize page on load
window.addEventListener('DOMContentLoaded', () => {
    initializeVehicles();
    displayVehicles();
    setupSearch();
    setupContactForm();
});
