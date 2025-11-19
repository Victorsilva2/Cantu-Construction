mapboxgl.accessToken = 'pk.eyJ1IjoidmJveDIwIiwiYSI6ImNtaHhsZHBtZzAyajAyeHBvczR6enE4djMifQ.LaY8gFjNYcCTARDfTKFwug';

// Commercial Properties Coordinates
const commercialProperties = [
    {
        name: 'Uptown Plaza',
        address: '4500 N. 10th St, McAllen TX, 78504',
        coordinates: [-98.2306, 26.2408],
        category: 'Retail'
    },
    {
        name: 'La Placita',
        address: '2109 S. 10th St. McAllen TX, 78504',
        coordinates: [-98.2306, 26.1905],
        category: 'Retail'
    },
    {
        name: 'Lone Star Plaza',
        address: '1502-1512 S State Hwy 336, Edinburg, TX 78539',
        coordinates: [-98.1631, 26.3017],
        category: 'Retail'
    },
    {
        name: 'MAS Building',
        address: '1210 W. Expressway 83, Pharr, TX',
        coordinates: [-98.1850, 26.1944],
        category: 'Retail'
    },
    {
        name: 'Art Village on Main',
        address: '800 N. Main St McAllen, TX',
        coordinates: [-98.2300, 26.2100],
        category: 'Retail'
    },
    {
        name: 'Water Tower Centre',
        address: '612 W. Nolana Ave, McAllen, TX 78504',
        coordinates: [-98.2400, 26.2200],
        category: 'Retail'
    },
    {
        name: 'Amistad Plaza',
        address: '505 Angelita Dr. Weslaco TX',
        coordinates: [-97.9900, 26.1600],
        category: 'Office & Medical'
    },
    {
        name: 'Harlingen MOB',
        address: '5512 Victoria Ln, Harlingen, TX',
        coordinates: [-97.6961, 26.1906],
        category: 'Office & Medical'
    },
    {
        name: 'Brownsville MOB',
        address: '4770 N. Expressway 83, Brownsville, TX',
        coordinates: [-97.4844, 25.9014],
        category: 'Office & Medical'
    },
    {
        name: 'StarPoint Plaza',
        address: '1821 Sesame St. Harlingen, TX',
        coordinates: [-97.6961, 26.2000],
        category: 'Office & Medical'
    },
    {
        name: 'MidValley Professionals',
        address: '901 E. 8th St Weslaco, TX',
        coordinates: [-97.9900, 26.1600],
        category: 'Office & Medical'
    }
];

// Residential Properties Coordinates
const residentialProperties = [
    {
        name: 'Villagio',
        address: 'N 10th St & Providence Ave, McAllen, TX 78504',
        coordinates: [-98.2306, 26.2408]
    },
    {
        name: 'Bougainvillea',
        address: 'S "M" St & El Rancho Rd, McAllen, TX',
        coordinates: [-98.2200, 26.1900]
    },
    {
        name: 'Del Lago',
        address: 'S "H" St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.2200, 26.2000]
    },
    {
        name: 'Lago Vista',
        address: 'S K Center St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.2200, 26.2000]
    },
    {
        name: 'Paseo Del Lago',
        address: 'S K Center St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.2200, 26.2000]
    },
    {
        name: 'The Village on Dove',
        address: '221 Canary, McAllen, TX 78504',
        coordinates: [-98.2300, 26.2300]
    }
];

// Initialize Commercial Map
function initCommercialMap() {
    const mapContainer = document.getElementById('commercial-map');
    if (!mapContainer) return;

    // Calculate center point (average of all coordinates)
    const avgLng = commercialProperties.reduce((sum, prop) => sum + prop.coordinates[0], 0) / commercialProperties.length;
    const avgLat = commercialProperties.reduce((sum, prop) => sum + prop.coordinates[1], 0) / commercialProperties.length;

    // Adjust zoom based on screen size for better responsiveness
    let initialZoom = 10.5;
    if (window.innerWidth <= 480) {
        initialZoom = 9.5; // Zoom out more on small mobile
    } else if (window.innerWidth <= 768) {
        initialZoom = 10; // Slightly zoomed out on mobile
    } else if (window.innerWidth <= 1024) {
        initialZoom = 10.2; // Slightly zoomed out on tablet
    }

    const map = new mapboxgl.Map({
        container: 'commercial-map',
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: [avgLng, avgLat],
        zoom: initialZoom,
        attributionControl: true
    });

    // navigation controls (zoom in/out)
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false
    }), 'top-right');

    // fullscreen control
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Wait for map to load
    map.on('load', () => {
        //  markers for each property
        commercialProperties.forEach(property => {
            // pin marker
            const el = document.createElement('div');
            el.className = 'map-marker-pin';
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.cursor = 'pointer';
            el.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'50\' viewBox=\'0 0 40 50\'%3E%3Cpath d=\'M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z\' fill=\'%23000080\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'8\' fill=\'white\'/%3E%3C/svg%3E")';
            el.style.backgroundSize = 'contain';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundPosition = 'center';
            el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
            el.title = property.name;

            // popup
            const popup = new mapboxgl.Popup({ 
                offset: [0, -20],
                closeButton: true,
                closeOnClick: false,
                className: 'custom-popup'
            })
                .setHTML(`
                    <div style="padding: 12px 16px; min-width: 200px;">
                        <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; font-weight: 700; color: #000080; line-height: 1.3;">${property.name}</h4>
                        <p style="margin: 0 0 10px 0; font-size: 0.9rem; color: #666; line-height: 1.4;">${property.address}</p>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}" 
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 6px; color: #4285F4; font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">
                            <i class="fas fa-directions" style="font-size: 0.85rem;"></i>
                            Directions
                        </a>
                    </div>
                `);

            // Add marker to map
            new mapboxgl.Marker(el)
                .setLngLat(property.coordinates)
                .setPopup(popup)
                .addTo(map);
        });
    });
}

// Initialize Residential Map
function initResidentialMap() {
    const mapContainer = document.getElementById('residential-map');
    if (!mapContainer) return;

    // Calculate center point (average of all coordinates)
    const avgLng = residentialProperties.reduce((sum, prop) => sum + prop.coordinates[0], 0) / residentialProperties.length;
    const avgLat = residentialProperties.reduce((sum, prop) => sum + prop.coordinates[1], 0) / residentialProperties.length;

    // Adjust zoom based on screen size for better responsiveness
    let initialZoom = 12.5;
    if (window.innerWidth <= 480) {
        initialZoom = 11.5; // Zoom out more on small mobile
    } else if (window.innerWidth <= 768) {
        initialZoom = 12; // Slightly zoomed out on mobile
    } else if (window.innerWidth <= 1024) {
        initialZoom = 12.2; // Slightly zoomed out on tablet
    }

    const map = new mapboxgl.Map({
        container: 'residential-map',
        style: 'mapbox://styles/mapbox/streets-v12', // Google Maps-like street style
        center: [avgLng, avgLat],
        zoom: initialZoom,
        attributionControl: true
    });

    // Add navigation controls (zoom in/out)
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false
    }), 'top-right');

    // Add fullscreen control
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Wait for map to load
    map.on('load', () => {
        // Add markers for each property
        residentialProperties.forEach(property => {
            // Create a Google Maps-like pin marker
            const el = document.createElement('div');
            el.className = 'map-marker-pin';
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.cursor = 'pointer';
            el.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'50\' viewBox=\'0 0 40 50\'%3E%3Cpath d=\'M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z\' fill=\'%23000080\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'8\' fill=\'white\'/%3E%3C/svg%3E")';
            el.style.backgroundSize = 'contain';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundPosition = 'center';
            el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
            el.title = property.name;

            // Create Google Maps-like popup
            const popup = new mapboxgl.Popup({ 
                offset: [0, -20],
                closeButton: true,
                closeOnClick: false,
                className: 'custom-popup'
            })
                .setHTML(`
                    <div style="padding: 12px 16px; min-width: 200px;">
                        <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; font-weight: 700; color: #000080; line-height: 1.3;">${property.name}</h4>
                        <p style="margin: 0 0 10px 0; font-size: 0.9rem; color: #666; line-height: 1.4;">${property.address}</p>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}" 
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 6px; color: #4285F4; font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: color 0.2s;">
                            <i class="fas fa-directions" style="font-size: 0.85rem;"></i>
                            Directions
                        </a>
                    </div>
                `);

            // Add marker to map
            new mapboxgl.Marker(el)
                .setLngLat(property.coordinates)
                .setPopup(popup)
                .addTo(map);
        });
    });
}

// Initialize maps when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if Mapbox access token is set
    if (mapboxgl.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN') {
        console.warn('Mapbox access token not set! Please update mapboxgl.accessToken in assets/js/mapbox.js');
        // Show a message to the user
        const commercialMap = document.getElementById('commercial-map');
        const residentialMap = document.getElementById('residential-map');
        
        if (commercialMap) {
            commercialMap.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; padding: 20px; text-align: center;"><p>Map will load once Mapbox access token is configured.</p></div>';
        }
        if (residentialMap) {
            residentialMap.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; padding: 20px; text-align: center;"><p>Map will load once Mapbox access token is configured.</p></div>';
        }
        return;
    }

    // Initialize maps
    initCommercialMap();
    initResidentialMap();
});

