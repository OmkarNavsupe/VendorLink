# VendorLink | CEP Project Presentation & Code Walkthrough 🎓
> **Community Engagement Project (CEP)**  
> **Topic**: Hyper-Local Directory for Small-Scale Neighborhood Businesses (Wagholi Field Survey)  
> **Student Author**: Omkar Navsupe & Team  

---

## 📌 1. Project Overview & Social Objective
VendorLink was designed as a Community Engagement Project (CEP) to provide **zero-cost digital visibility** to small, informal neighborhood businesses that lack presence on large delivery or aggregator apps:
* **Target Vendors**: Kirana & chakki flour stores, two-wheeler garages, 24/7 chemists, cloth alteration tailors, home tiffin messes, and electricians.
* **Core Philosophy**: Zero commission, zero middleman fees, direct neighbor-to-vendor communication via WhatsApp and phone calls.
* **Field Survey Focus**: **Wagholi, Pune** (Nagar Road, Bakori Road, BAIF Road, JSPM College Campus & Wagheshwar Temple areas).

---

## 📂 2. Project Architecture & File Hierarchy

```
CEP Project/
├── index.html              # Main HTML5 Interface & Semantic App Structure
├── css/
│   └── styles.css          # Design System, Glassmorphic Tokens, Responsive Grid
├── js/
│   ├── data.js             # [MAIN DATA FILE] Coordinates, Wagholi Surveyed Vendors, Categories
│   └── app.js              # [CONTROLLER] State Machine, Filtering, Leaflet Map API, LocalStorage
├── vercel.json             # Vercel Production Cloud Deployment Config
├── package.json            # Project Metadata
├── README.md               # GitHub Public Documentation
└── PROJECT_WALKTHROUGH.md  # Teacher Presentation Guide (This Document)
```

---

## 🔍 3. The Main File Changed for Wagholi Location

The primary file where all data, coordinates, and survey entries were added is:
📁 **[`js/data.js`](js/data.js)**

### A. Geolocation Coordinates (`LOCALITY_COORDINATES`)
```javascript
// js/data.js (Lines 18-26)
const LOCALITY_COORDINATES = {
  'Wagholi, Pune': { lat: 18.5793, lng: 73.9814, zoom: 15 }, // Surveyed Area
  'Kothrud, Pune': { lat: 18.5074, lng: 73.8077, zoom: 15 },
  'Viman Nagar, Pune': { lat: 18.5679, lng: 73.9143, zoom: 15 },
  'Kharadi, Pune': { lat: 18.5514, lng: 73.9348, zoom: 15 },
  'Hadapsar, Pune': { lat: 18.5089, lng: 73.9259, zoom: 15 },
  // ...
};
```

### B. Wagholi Field Survey Vendors Added (`INITIAL_VENDORS`)
Seven surveyed businesses were added spanning every category:
1. **Grocery**: `v-501` — *Kanifnath Super Market & Kirana Store* (Wagholi Chowk)
2. **Mechanic**: `v-502` — *Omkar Auto & Bike Mechanic Garage* (Opp. JSPM College Gate)
3. **Medical**: `v-503` — *Shree Samarth 24/7 Medical & Chemist* (Bakori Road)
4. **Textiles**: `v-504` — *Mauli Handloom & Saree Matching Center* (Kesnand Road)
5. **Clothing**: `v-505` — *Sai Collections & Master Tailors* (BAIF Road)
6. **Home Food**: `v-506` — *Shivraj Gavran Misal & Student Tiffin Mess* (JSPM BSIOTR Campus)
7. **Services**: `v-507` — *Wagholi Electrician, Plumbing & Key Clinic* (Wagheshwar Chowk)

### C. Wagholi Notice Board Posts (`INITIAL_BOARD_POSTS`)
* `b-501`: Student tiffin admission update near JSPM & Raisoni Wagholi campus.
* `b-502`: 24/7 emergency medicine home delivery alert for Bakori & Nagar Road.

---

## 🔄 4. Supporting Files Modified

### File 2: [`index.html`](index.html)
Added **`📍 Wagholi, Pune (Surveyed Area)`** as the default selected option in both:
1. **Top Navbar Locality Selector** (`#localitySelect`):
   ```html
   <optgroup label="📍 Pune">
     <option value="Wagholi, Pune" selected>📍 Wagholi, Pune (Surveyed Area)</option>
     <option value="Kothrud, Pune">📍 Kothrud, Pune</option>
     ...
   </optgroup>
   ```
2. **"List Business" Onboarding Form** (`#vLocality`):
   ```html
   <select id="vLocality" required>
     <option value="Wagholi, Pune" selected>Wagholi, Pune (Surveyed Area)</option>
     ...
   </select>
   ```

### File 3: [`js/app.js`](js/app.js)
Configured the initial application state to load Wagholi on launch:
```javascript
// js/app.js (Line 12)
currentLocality: localStorage.getItem('vl_locality') || 'Wagholi, Pune',
```

---

## 🎤 5. Step-by-Step Script to Explain to Your Teacher

When presenting this project to your teacher in VS Code:

### Step 1: Explain the Problem Statement & Survey
> *"In our CEP field survey in Wagholi, we noticed small vendors—like the bike garage near JSPM or the Bakori road chemist—don't have budget for expensive listing platforms. We built VendorLink to connect local students and residents directly to them."*

### Step 2: Show the Code Architecture (`index.html` + `js/app.js` + `js/data.js`)
* Open **`index.html`** in VS Code: Show the clean semantic structure (Category Cards, Leaflet Map container, Community Board, and Add Business modal).
* Open **`js/data.js`**: Point to lines 18–40 and explain how GPS coordinates map directly onto OpenStreetMap pins using Leaflet.js.
* Open **`js/app.js`**: Explain the State Management object (`state = { currentLocality, selectedCategory, ... }`) and how selecting "Grocery" or "Mechanic" dynamically filters only shops in that area.

### Step 3: Demonstrate the Live Working Site
Run the terminal command in VS Code:
```bash
python3 -m http.server 8080
```
Open **`http://localhost:8080`** in the browser to demonstrate:
1. **Wagholi, Pune** loaded with 7 local shops.
2. Clicking **"Medical"** or **"Mechanic"** instantly filters registered Wagholi shops.
3. Clicking **"Neighborhood Map"** renders live OpenStreetMap pins centered on Wagholi coordinates (`18.5793, 73.9814`).
4. Clicking **"Chat on WhatsApp"** directly opens vendor WhatsApp without any middleman fee.
5. Showing the **GitHub Repository** and **Vercel deployment**.
