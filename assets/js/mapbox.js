mapboxgl.accessToken = 'pk.eyJ1IjoidmJveDIwIiwiYSI6ImNtaHhsZHBtZzAyajAyeHBvczR6enE4djMifQ.LaY8gFjNYcCTARDfTKFwug';

// Commercial Properties Coordinates
const commercialProperties = [
    {
        name: 'Uptown Plaza',
        address: '4500 N. 10th St, McAllen TX, 78504',
        coordinates: [-98.222248, 26.245463],
        category: 'Retail'
    },
    {
        name: 'La Placita',
        address: '2109 S. 10th St. McAllen TX, 78504',
        coordinates: [-98.232440, 26.183344],
        category: 'Retail'
    },
    {
        name: 'Lone Star Plaza',
        address: '1502-1512 S State Hwy 336, Edinburg, TX 78539',
        coordinates: [-98.213277, 26.299869],
        category: 'Retail'
    },
    {
        name: 'MAS Building',
        address: '1210 W. Expressway 83, Pharr, TX',
        coordinates: [-98.198257, 26.204023],
        category: 'Retail'
    },
    {
        name: 'Art Village on Main',
        address: '800 N. Main St McAllen, TX',
        coordinates: [-98.232319, 26.211729],
        category: 'Retail'
    },
    {
        name: 'Water Tower Centre',
        address: '4485 N 6th St, McAllen, TX 78504',
        coordinates: [-98.220066, 26.239895],
        category: 'Retail'
    },
    {
        name: 'Amistad Plaza',
        address: '505 Angelita Dr. Weslaco TX',
        coordinates: [-97.996335, 26.174736],
        category: 'Office & Medical'
    },
    {
        name: 'Harlingen MOB',
        address: '512 Victoria Ln, Harlingen, TX',
        coordinates: [-97.672108, 26.160628],
        category: 'Office & Medical'
    },
    {
        name: 'Brownsville MOB',
        address: '4770 N. Expressway 83, Brownsville, TX',
        coordinates: [-97.515253, 25.973932],
        category: 'Office & Medical'
    },
    {
        name: 'StarPoint Plaza',
        address: '1821 Sesame St. Harlingen, TX',
        coordinates: [-97.679391, 26.166588],
        category: 'Office & Medical'
    },
    {
        name: 'MidValley Professionals',
        address: '910 E 8th St, Weslaco, TX 78596',
        coordinates: [-97.981386, 26.151651],
        category: 'Office & Medical'
    }
];

// Residential Properties Coordinates
const residentialProperties = [
    {
        name: 'Villagio',
        address: 'N 10th St & Providence Ave, McAllen, TX 78504',
        coordinates: [-98.215915, 26.287056]
    },
    {
        name: 'Bougainvillea',
        address: 'S "M" St & El Rancho Rd, McAllen, TX',
        coordinates: [-98.210631, 26.169270]
    },
    {
        name: 'Del Lago',
        address: 'S "H" St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.216792, 26.162794]
    },
    {
        name: 'Lago Vista',
        address: 'S K Center St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.214135, 26.162425]
    },
    {
        name: 'Paseo Del Lago',
        address: 'S K Center St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.214076, 26.162496]
    },
    {
        name: 'The Village on Dove',
        address: '201 Dove Ave W, McAllen, TX 78504',
        coordinates: [-98.212797, 26.252259]
    },
    {
        name: 'Villas at Del Lago',
        address: 'S "H" St & Orangewood Dr, McAllen, TX',
        coordinates: [-98.210974, 26.162061]
    }
];

// Initialize Commercial Map
function initCommercialMap() {
    const mapContainer = document.getElementById('commercial-map');
    if (!mapContainer) return;

    // Ensure container has dimensions before initializing (fixes iPad white map issue)
    const ensureContainerReady = () => {
        const rect = mapContainer.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(mapContainer);
        
        // Check if container has dimensions
        if (rect.width === 0 || rect.height === 0) {
            // Try to force dimensions from computed styles
            const height = computedStyle.height;
            if (height && height !== '0px' && height !== 'auto') {
                mapContainer.style.height = height;
            } else {
                // Set explicit height based on screen size
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    mapContainer.style.height = '500px';
                } else if (window.innerWidth <= 768) {
                    mapContainer.style.height = '450px';
                } else {
                    mapContainer.style.height = '600px';
                }
            }
            return false; // Still need to wait for next frame
        }
        
        // Ensure container is visible
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            return false;
        }
        
        // Force explicit dimensions
        if (!mapContainer.style.height || mapContainer.style.height === '0px') {
            mapContainer.style.height = rect.height + 'px';
        }
        if (!mapContainer.style.width || mapContainer.style.width === '0px') {
            mapContainer.style.width = rect.width + 'px';
        }
        
        return true;
    };

    // Wait for container to be ready (especially important for iPad)
    let attempts = 0;
    const maxAttempts = 50; // Max 5 seconds at 100ms intervals
    const initMap = () => {
        attempts++;
        if (!ensureContainerReady()) {
            if (attempts < maxAttempts) {
                setTimeout(initMap, 100); // Check every 100ms
            }
            return;
        }

        // Calculate center point (average of all coordinates)
        const avgLng = commercialProperties.reduce((sum, prop) => sum + prop.coordinates[0], 0) / commercialProperties.length;
        const avgLat = commercialProperties.reduce((sum, prop) => sum + prop.coordinates[1], 0) / commercialProperties.length;

        // Adjust zoom based on screen size for better responsiveness
        let initialZoom = 10.5;
        if (window.innerWidth <= 480) {
            initialZoom = 9.5; // Zoom out more on small mobile
        } else if (window.innerWidth <= 768) {
            initialZoom = 10; // Slightly zoomed out on mobile
        } else if (window.innerWidth <= 1200) {
            initialZoom = 10.2; // Slightly zoomed out on tablet/iPad
        }

        const map = new mapboxgl.Map({
            container: 'commercial-map',
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [avgLng, avgLat],
            zoom: initialZoom,
            attributionControl: true
        });

        // Store map reference for resize handlers
        window.commercialMap = map;

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
            // Force resize multiple times to ensure tiles load (fixes iPad white map)
            setTimeout(() => {
                map.resize();
            }, 100);
            setTimeout(() => {
                map.resize();
            }, 300);
            setTimeout(() => {
                map.resize();
            }, 500);
            
            // Handle resize for iPad orientation changes
            let commercialResizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(commercialResizeTimeout);
                commercialResizeTimeout = setTimeout(() => {
                    if (map) {
                        map.resize(); // Resize map when window size changes (iPad orientation)
                    }
                }, 250);
            });
            
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

        // Also trigger resize on style load (additional iPad fix)
        map.on('style.load', () => {
            setTimeout(() => {
                map.resize();
            }, 100);
        });
        
        // Force resize after a short delay (iPad fix)
        setTimeout(() => {
            if (map) {
                map.resize();
            }
        }, 500);
    };

    // Start initialization
    initMap();
}

// Initialize Residential Map
function initResidentialMap() {
    const mapContainer = document.getElementById('residential-map');
    if (!mapContainer) return;

    // Ensure container has dimensions before initializing (fixes iPad white map issue)
    const ensureContainerReady = () => {
        const rect = mapContainer.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(mapContainer);
        
        // Check if container has dimensions
        if (rect.width === 0 || rect.height === 0) {
            // Try to force dimensions from computed styles
            const height = computedStyle.height;
            if (height && height !== '0px' && height !== 'auto') {
                mapContainer.style.height = height;
            } else {
                // Set explicit height based on screen size
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    mapContainer.style.height = '500px';
                } else if (window.innerWidth <= 768) {
                    mapContainer.style.height = '450px';
                } else {
                    mapContainer.style.height = '600px';
                }
            }
            return false; // Still need to wait for next frame
        }
        
        // Ensure container is visible
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            return false;
        }
        
        // Force explicit dimensions
        if (!mapContainer.style.height || mapContainer.style.height === '0px') {
            mapContainer.style.height = rect.height + 'px';
        }
        if (!mapContainer.style.width || mapContainer.style.width === '0px') {
            mapContainer.style.width = rect.width + 'px';
        }
        
        return true;
    };

    // Wait for container to be ready (especially important for iPad)
    let attempts = 0;
    const maxAttempts = 50; // Max 5 seconds at 100ms intervals
    const initMap = () => {
        attempts++;
        if (!ensureContainerReady()) {
            if (attempts < maxAttempts) {
                setTimeout(initMap, 100); // Check every 100ms
            }
            return;
        }

        // Calculate center point (average of all coordinates)
        const avgLng = residentialProperties.reduce((sum, prop) => sum + prop.coordinates[0], 0) / residentialProperties.length;
        const avgLat = residentialProperties.reduce((sum, prop) => sum + prop.coordinates[1], 0) / residentialProperties.length;

        // Reduced zoom to show wider area including Edinburg markers
        let initialZoom = 10.5;
        if (window.innerWidth <= 480) {
            initialZoom = 9.5; // Zoom out more on small mobile
        } else if (window.innerWidth <= 768) {
            initialZoom = 10; // Zoomed out on mobile
        } else if (window.innerWidth <= 1200) {
            initialZoom = 10.2; // Zoomed out on tablet/iPad
        }

        const map = new mapboxgl.Map({
            container: 'residential-map',
            style: 'mapbox://styles/mapbox/streets-v12', // Google Maps-like street style
            center: [avgLng, avgLat],
            zoom: initialZoom,
            attributionControl: true
        });

        // Store map reference for resize handlers
        window.residentialMap = map;

        // Add navigation controls (zoom in/out)
        map.addControl(new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: false
        }), 'top-right');

        // Add fullscreen control
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        // Store markers to calculate bounds
        const markers = [];

        // Wait for map to load
        map.on('load', () => {
            // Force resize multiple times to ensure tiles load (fixes iPad white map)
            setTimeout(() => {
                map.resize();
            }, 100);
            setTimeout(() => {
                map.resize();
            }, 300);
            setTimeout(() => {
                map.resize();
            }, 500);
        
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
            const marker = new mapboxgl.Marker(el)
                .setLngLat(property.coordinates)
                .setPopup(popup)
                .addTo(map);
            
            markers.push(marker);
        });

        // Fit map to show all markers with padding
        if (markers.length > 0) {
            const fitMapToBounds = () => {
                const bounds = new mapboxgl.LngLatBounds();
                residentialProperties.forEach(property => {
                    bounds.extend(property.coordinates);
                });
                
                // Adjust padding based on screen size
                let padding = {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50
                };
                
                if (window.innerWidth <= 480) {
                    padding = { top: 30, bottom: 30, left: 20, right: 20 };
                } else if (window.innerWidth <= 768) {
                    padding = { top: 40, bottom: 40, left: 30, right: 30 };
                }
                
                map.fitBounds(bounds, {
                    padding: padding,
                    maxZoom: 12, // Don't zoom in too much even if markers are close
                    duration: 0 // Instant fit
                });
            };
            
            // Initial fit
            fitMapToBounds();
            
            // Re-fit on window resize for responsive behavior (includes iPad orientation changes)
            let fitBoundsResizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(fitBoundsResizeTimeout);
                fitBoundsResizeTimeout = setTimeout(() => {
                    map.resize(); // Resize map first (fixes iPad rendering issues)
                    fitMapToBounds(); // Then fit bounds
                }, 250); // Debounce resize events
            });
        }

        // Also trigger resize on style load (additional iPad fix)
        map.on('style.load', () => {
            setTimeout(() => {
                map.resize();
            }, 100);
        });
    });

    // Also trigger resize on style load (additional iPad fix) - outside load event
    map.on('style.load', () => {
        setTimeout(() => {
            map.resize();
        }, 100);
    });
    
    // Force resize after a short delay (iPad fix)
    setTimeout(() => {
        if (map) {
            map.resize();
        }
    }, 500);
    };

    // Start initialization
    initMap();
}

// Initialize maps when everything is ready (use window.load for iPad compatibility)
function initializeMaps() {
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

    // Force map containers to have explicit dimensions (critical for iPad)
    const commercialMap = document.getElementById('commercial-map');
    const residentialMap = document.getElementById('residential-map');
    
    if (commercialMap) {
        const rect = commercialMap.getBoundingClientRect();
        if (rect.height === 0) {
            // Force height from computed styles or media query
            const computedHeight = window.getComputedStyle(commercialMap).height;
            if (computedHeight && computedHeight !== '0px') {
                commercialMap.style.height = computedHeight;
            } else {
                // Fallback: set based on screen size
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    commercialMap.style.height = '500px';
                } else if (window.innerWidth <= 768) {
                    commercialMap.style.height = '450px';
                } else {
                    commercialMap.style.height = '600px';
                }
            }
        }
        commercialMap.style.width = '100%';
        // Force hardware acceleration
        commercialMap.style.transform = 'translateZ(0)';
    }
    
    if (residentialMap) {
        const rect = residentialMap.getBoundingClientRect();
        if (rect.height === 0) {
            // Force height from computed styles or media query
            const computedHeight = window.getComputedStyle(residentialMap).height;
            if (computedHeight && computedHeight !== '0px') {
                residentialMap.style.height = computedHeight;
            } else {
                // Fallback: set based on screen size
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    residentialMap.style.height = '500px';
                } else if (window.innerWidth <= 768) {
                    residentialMap.style.height = '450px';
                } else {
                    residentialMap.style.height = '600px';
                }
            }
        }
        residentialMap.style.width = '100%';
        // Force hardware acceleration
        residentialMap.style.transform = 'translateZ(0)';
    }

    // Small delay to ensure styles are applied (critical for iPad)
    setTimeout(() => {
        // Initialize maps
        initCommercialMap();
        initResidentialMap();
    }, 100);
}

// Try multiple initialization points for maximum compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for window load as well for iPad
        if (document.readyState === 'complete') {
            initializeMaps();
        } else {
            window.addEventListener('load', initializeMaps);
        }
    });
} else {
    // DOM already loaded, wait for window load
    if (document.readyState === 'complete') {
        initializeMaps();
    } else {
        window.addEventListener('load', initializeMaps);
    }
}

