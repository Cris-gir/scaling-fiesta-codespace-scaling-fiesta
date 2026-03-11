# Auto South Dealership Website

A fully functional dealership website with public inventory showcase and employee management portal for adding and managing vehicles.

## Features

### Public Website
- **Home Page**: Hero section with call-to-action
- **Inventory Display**: Browse all available vehicles with filtering
- **Search & Filter**: Search by make, model, year, and price range
- **Trust Building**: Why Choose Us section highlighting dealership strengths
- **Contact Form**: Customer inquiry form
- **Responsive Design**: Mobile-friendly layout

### Employee Portal
- **Secure Login**: Demo credentials (username: `admin`, password: `Autosouth1`)
- **Add Vehicles**: Form to add new vehicles to inventory
- **Drag & Drop Images**: Easy image upload with visual previews
- **Edit Vehicles**: Modify existing vehicle details and images
- **Delete Vehicles**: Remove vehicles from inventory
- **Real-time Updates**: All changes immediately reflected on the public site

## Project Structure

```
dealership-website/
├── index.html          # Main public website
├── employee.html       # Employee portal
├── app.js             # Main site JavaScript
├── employee.js        # Employee portal JavaScript
├── styles.css         # All styling
└── README.md          # This file
```

## Getting Started

### 1. Open the Project
- Open the `/workspaces/dealership-website/` folder in VS Code
- Alternatively, you can:
  - Right-click `index.html` → "Open with Live Server" (if you have the Live Server extension)
  - Use Python's built-in server: `python -m http.server 8000`
  - Use Node.js HTTP server: `npx http-server`

### 2. View the Website
- Open `index.html` in a web browser
- You'll see the dealership homepage with sample vehicles

### 3. Access Employee Portal
- Click the "Employee Portal" button in the top navigation
- Log in with demo credentials:
  - **Username**: `admin`
  - **Password**: `Autosouth1`

## Usage Guide

### For Customers
1. **Browse Inventory**: Click "Inventory" to see all available vehicles
2. **Search**: Use the search box to find specific makes/models
3. **Filter by Price**: Use the dropdown to filter vehicles by price range
4. **Contact**: Fill out the contact form to request more information

### For Employees
1. **Login**: Enter demo credentials to access the portal
2. **Add Vehicle**:
   - Fill in vehicle details (make, model, year, price, mileage, color)
   - Add a description of the vehicle
   - Drag and drop images or click to upload photos
   - Click "Add Vehicle"
3. **Edit Vehicle**:
   - Click "Edit" on any vehicle card
   - Make changes to any field
   - Add or remove images
   - Click "Save Changes"
4. **Delete Vehicle**: Click "Delete" to remove a vehicle from inventory

## Features Explained

### Drag & Drop Image Upload
- Drag image files directly onto the upload area
- Or click the area to open a file picker
- Images appear as previews before submission
- Click the "×" button to remove individual images
- Supports multiple images per vehicle

### Data Storage
- All data is stored in browser's **localStorage**
- Data persists between page refreshes
- Data is cleared when you clear browser cache/cookies
- Each browser/device has its own separate database

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Touch-friendly buttons and navigation
- Adapts layout for smaller screens

## Color Scheme

- **Primary Color**: Orange (#ff6b35) - Action buttons
- **Secondary Color**: Dark Blue (#004e89) - Headers, text
- **Accent Color**: Gold (#f7931e) - Highlights
- **Background**: Light gray (#f8f9fa)

## Customization

### Change Dealership Info
Edit the contact information in `index.html`:
- Address: Line 156
- Phone: Line 157
- Email: Line 158
- Hours: Line 159

### Modify Colors
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #004e89;
    --accent-color: #f7931e;
    /* ... more variables ... */
}
```

### Add More Demo Vehicles
Edit the `sampleVehicles` array in `app.js` to add more sample vehicles.

### Change Login Credentials
Edit the `DEMO_CREDENTIALS` in `employee.js`:
```javascript
const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'Autosouth1'
};
```

## Troubleshooting

### Images Not Uploading
- Make sure files are image formats (JPG, PNG, GIF, etc.)
- Check browser console (F12) for error messages

### Data Not Saving
- Check if browser allows localStorage
- Try different browser if issues persist
- Clear browser cache and reload

### Login Not Working
- Verify credentials are correct: admin / Autosouth1
- Check browser console for errors
- Make sure cookies/session storage is enabled

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support

## Future Enhancements

Potential features to add:
- Backend database integration (Firebase, MongoDB, etc.)
- User authentication system
- Vehicle ratings/reviews
- Virtual tours/360° images
- Financing calculator
- Trade-in evaluation
- Appointment scheduling
- Customer dashboard

## License

Created for educational purposes.

## Support

For issues or questions, check the browser console (F12) for error messages.
