# VendorLink 🏪
> **Hyper-Local Neighborhood Business Directory & Community Hub**

VendorLink is an open-source, hyper-local web directory designed to empower micro-businesses—kirana stores, tailors, local artisans, repair technicians, home cooks, medical chemists, and textile merchants.

---

## 🌟 Key Features

* **📍 Hyper-Local Discovery**: Browse small businesses across Pune (*Kothrud, Viman Nagar, FC Road, Aundh, Baner, Wakad, Hinjewadi, Camp*), Mumbai (*Bandra, Juhu, Dadar, Andheri*), Bengaluru (*Indiranagar, Koramangala, Jayanagar, Whitefield*), and Delhi.
* **🏷️ Categorized Sections**:
  * 🛒 **Grocery**: Kiranas, fresh chakki flour, cold-pressed oils & staples.
  * 🛠️ **Mechanic**: Bike servicing, car mechanics, puncture repair & appliances.
  * 💊 **Medical**: 24/7 chemists, prescription drugs & first aid.
  * 🧵 **Textiles**: Saree matching, aster linings, cotton materials & handlooms.
  * 👗 **Clothing**: Boutiques, readymade ethnic wear & alterations.
  * 🍲 **Home Food**: Dabba services, tiffins & bakeries.
  * 🎨 **Artisans**: Pottery, brassware & handcrafted goods.
  * 💈 **Services**: Locksmiths, cobblers & electricians.
* **🗺️ Interactive Map API**: Powered by Leaflet.js & OpenStreetMap with custom map markers, popup profiles, and direct WhatsApp actions.
* **📢 Community Notice Board**: Live feed of fresh arrivals, daily tiffin menus, discounts, and vendor notices.
* **💬 Direct Contact**: Zero commission fees, zero middleman. Neighbors connect directly with vendors via WhatsApp or phone.
* **🌙 Dark / Light Mode**: Modern UI with high-contrast themes.

---

## 🚀 Quick Start

1. Clone or download this repository:
   ```bash
   git clone <your-repo-url>
   cd "CEP Project"
   ```

2. Run a local server:
   ```bash
   python3 -m http.server 8080
   ```

3. Open in your browser:
   * **Localhost**: [http://localhost:8080](http://localhost:8080)
   * Or simply double-click `index.html` to open directly.

---

## 📂 Project Structure

```
├── index.html         # Main web application entry point
├── css/
│   └── styles.css     # Responsive design system & themes
├── js/
│   ├── app.js         # Core application logic & Leaflet map integration
│   └── data.js        # Initial vendors, categories, and locality coordinates
├── package.json       # Metadata & project configuration
├── .gitignore         # Ignored files
└── README.md          # Project documentation
```

---

## 📄 License
MIT License. Built for thriving local neighborhoods.
