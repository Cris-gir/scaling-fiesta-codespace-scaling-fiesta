// Employee Portal JavaScript with Image Upload Functionality

// Demo credentials
const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'Autosouth1'
};

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('employeeLoggedIn') === 'true';
}

// Handle login
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
            sessionStorage.setItem('employeeLoggedIn', 'true');
            showDashboard();
        } else{
            alert("Incorrect username or password");
        }
    });
}

// Show dashboard after login
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    displayEmployeeInventory();
}

// Logout
function logout() {
    sessionStorage.removeItem('employeeLoggedIn');
    location.reload();
}

// Setup drag and drop for image upload
function setupDragAndDrop(dropZoneId, inputId, previewContainerId) {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewContainerId);

    if (!dropZone || !fileInput) return;

    // Click to select files
    dropZone.addEventListener('click', () => fileInput.click());

    // Drag and drop events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files, previewContainerId, inputId);
    });

    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files, previewContainerId, inputId);
    });
}

// Handle file selection and preview
function handleFiles(files, previewContainerId, inputId) {
    const previewContainer = document.getElementById(previewContainerId);

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'image-preview';

            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="image-remove">×</button>
            `;

            preview.querySelector('.image-remove').addEventListener('click', () => {
                preview.remove();
            });

            previewContainer.appendChild(preview);
        };

        reader.readAsDataURL(file);
    });
}

preview.querySelector('.image-remove').addEventListener('click', () => {
    preview.remove();
});
                previewContainer.appendChild(preview);
            };
            fileReader.readAsDataURL(file);
        }
    });
    
    // Update file input
}

// Get next vehicle ID
function getNextVehicleId() {
    const vehicles = getVehicles();
    return vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
}

// Add new vehicle
function setupAddVehicleForm() {
    const vehicleForm = document.getElementById('vehicleForm');
    if (!vehicleForm) return;

    setupDragAndDrop('dropZone', 'imageInput', 'imagePreview');

    vehicleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newVehicle = {
            id: getNextVehicleId(),
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            year: parseInt(document.getElementById('year').value),
            price: parseInt(document.getElementById('price').value),
            mileage: parseInt(document.getElementById('mileage').value),
            color: document.getElementById('color').value,
            description: document.getElementById('description').value,
            images: getImageArrayFromPreviews('imagePreview')
        };

        const vehicles = getVehicles();
        vehicles.push(newVehicle);
        localStorage.setItem('vehicles', JSON.stringify(vehicles));

        alert('Vehicle added successfully!');
        vehicleForm.reset();
        document.getElementById('imagePreview').innerHTML = '';
        displayEmployeeInventory();
    });
}

// Get images from preview container
function getImageArrayFromPreviews(containerId) {
    const container = document.getElementById(containerId);
    const images = [];
    
    container.querySelectorAll('img').forEach(img => {
        images.push(img.src);
    });
    
    return images;
}

// Get vehicles from localStorage
function getVehicles() {
    return JSON.parse(localStorage.getItem('vehicles')) || [];
}

// Display employee inventory with edit/delete options
function displayEmployeeInventory() {
    const inventoryContainer = document.getElementById('employeeInventory');
    if (!inventoryContainer) return;

    inventoryContainer.innerHTML = '';
    const vehicles = getVehicles();

    if (vehicles.length === 0) {
        inventoryContainer.innerHTML = '<p style="grid-column: 1 / -1;">No vehicles in inventory.</p>';
        return;
    }

    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-management-card';
        
        const imageHtml = vehicle.images && vehicle.images.length > 0
            ? `<img src="${vehicle.images[0]}" alt="${vehicle.make} ${vehicle.model}">`
            : '🚗';

        vehicleCard.innerHTML = `
            <div class="vehicle-thumb">${imageHtml}</div>
            <div class="vehicle-manage-info">
                <div class="vehicle-manage-info-item">
                    <label>Vehicle</label>
                    <strong>${vehicle.year} ${vehicle.make} ${vehicle.model}</strong>
                </div>
                <div class="vehicle-manage-info-item">
                    <label>Price</label>
                    <strong>$${vehicle.price.toLocaleString()}</strong>
                </div>
                <div class="vehicle-manage-info-item">
                    <label>Mileage</label>
                    <strong>${vehicle.mileage.toLocaleString()} mi</strong>
                </div>
            </div>
            <div class="vehicle-manage-actions">
                <button class="btn btn-edit" onclick="editVehicle(${vehicle.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteVehicle(${vehicle.id})">Delete</button>
            </div>
        `;
        inventoryContainer.appendChild(vehicleCard);
    });
}

// Edit vehicle
function editVehicle(vehicleId) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id === vehicleId);
    
    if (!vehicle) return;

    // Populate form
    document.getElementById('editId').value = vehicle.id;
    document.getElementById('editMake').value = vehicle.make;
    document.getElementById('editModel').value = vehicle.model;
    document.getElementById('editYear').value = vehicle.year;
    document.getElementById('editPrice').value = vehicle.price;
    document.getElementById('editMileage').value = vehicle.mileage;
    document.getElementById('editColor').value = vehicle.color;
    document.getElementById('editDescription').value = vehicle.description;

    // Display existing images
    const editImagePreview = document.getElementById('editImagePreview');
    editImagePreview.innerHTML = '';
    if (vehicle.images && vehicle.images.length > 0) {
        vehicle.images.forEach(image => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${image}" alt="Vehicle image">
                <button type="button" class="image-remove" onclick="this.parentElement.remove()">×</button>
            `;
            editImagePreview.appendChild(preview);
        });
    }

    // Show modal
    document.getElementById('editModal').style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Setup edit form
function setupEditForm() {
    const editForm = document.getElementById('editForm');
    if (!editForm) return;

    setupDragAndDrop('editDropZone', 'editImageInput', 'editImagePreview');

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const vehicleId = parseInt(document.getElementById('editId').value);
        const vehicles = getVehicles();
        const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);

        if (vehicleIndex !== -1) {
            vehicles[vehicleIndex] = {
                id: vehicleId,
                make: document.getElementById('editMake').value,
                model: document.getElementById('editModel').value,
                year: parseInt(document.getElementById('editYear').value),
                price: parseInt(document.getElementById('editPrice').value),
                mileage: parseInt(document.getElementById('editMileage').value),
                color: document.getElementById('editColor').value,
                description: document.getElementById('editDescription').value,
                images: getImageArrayFromPreviews('editImagePreview')
            };

            localStorage.setItem('vehicles', JSON.stringify(vehicles));
            alert('Vehicle updated successfully!');
            closeModal();
            displayEmployeeInventory();
        }
    });
}

// Delete vehicle
function deleteVehicle(vehicleId) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        const vehicles = getVehicles();
        const filtered = vehicles.filter(v => v.id !== vehicleId);
        localStorage.setItem('vehicles', JSON.stringify(filtered));
        displayEmployeeInventory();
        alert('Vehicle deleted successfully!');
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    setupLoginForm();

    if (isLoggedIn()) {
        showDashboard();
        displayEmployeeInventory();
    }

    setupAddVehicleForm();
    setupEditForm();
});
