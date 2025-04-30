// DOM Elements
const sidebar = document.querySelector('.sidebar');
const mobileToggle = document.querySelector('.mobile-toggle');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const hamburgerClose = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const htmlBody = document.querySelector('body');

// Function to toggle sidebar on mobile
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    
    // Prevent scrolling when sidebar is open
    if (sidebar.classList.contains('active')) {
        htmlBody.style.overflow = 'hidden';
        mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        htmlBody.style.overflow = 'auto';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Event listeners for mobile toggle
mobileToggle.addEventListener('click', toggleSidebar);
hamburgerClose.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Close sidebar when clicking a link on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
});

// Toggle active state on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Skip for social links
        if (this.classList.contains('social-link')) return;
        
        // Remove active class from all links
        navLinks.forEach(link => {
            if (!link.classList.contains('social-link')) {
                link.classList.remove('active');
            }
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Save active link to localStorage
        localStorage.setItem('activeNavLink', this.getAttribute('href'));
    });
});

// Optional: Toggle collapsed sidebar state with keyboard shortcut
document.addEventListener('keydown', function(e) {
    // Alt + S to toggle collapsed state
    if (e.altKey && e.key === 's' && window.innerWidth > 992) {
        sidebar.classList.toggle('collapsed');
        
        // Save state to localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
});

// Optional: Add a collapse button (uncomment if you want this feature)
/*
const collapseBtn = document.createElement('div');
collapseBtn.className = 'collapse-btn';
collapseBtn.innerHTML = '<i class="fas fa-angle-left"></i>';
sidebar.appendChild(collapseBtn);

collapseBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    
    // Toggle icon direction
    if (sidebar.classList.contains('collapsed')) {
        this.innerHTML = '<i class="fas fa-angle-right"></i>';
    } else {
        this.innerHTML = '<i class="fas fa-angle-left"></i>';
    }
    
    // Save state to localStorage
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
});
*/

// Restore sidebar state from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    // Restore active link
    const activeLink = localStorage.getItem('activeNavLink');
    if (activeLink) {
        const link = document.querySelector(`.nav-link[href="${activeLink}"]`);
        if (link && !link.classList.contains('social-link')) {
            navLinks.forEach(l => {
                if (!l.classList.contains('social-link')) l.classList.remove('active');
            });
            link.classList.add('active');
        }
    }
    
    // Restore sidebar collapsed state
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed && window.innerWidth > 992) {
        sidebar.classList.add('collapsed');
        // If you're using the collapse button, uncomment this:
        // document.querySelector('.collapse-btn').innerHTML = '<i class="fas fa-angle-right"></i>';
    }
});

// Mock XRP price update (replace with actual API call if needed)
function updateXRPPrice() {
    // Random price between $0.50 and $1.50
    const randomPrice = (Math.random() + 0.5).toFixed(2);
    document.getElementById('xrp-price').textContent = randomPrice;
    
    // Update every 30 seconds
    setTimeout(updateXRPPrice, 30000);
}

// Initial price update
updateXRPPrice();

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        // Reset mobile view when back to desktop
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            htmlBody.style.overflow = 'auto';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Image Loading/Error Handling (Optional)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute
        img.setAttribute('loading', 'lazy');
        
        // Add error handling
        img.addEventListener('error', function() {
            // If image fails to load, replace with a fallback or just display nothing
            this.style.display = 'none';
            
            // Optional: Add a fallback element
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = '<i class="fas fa-image"></i>';
            this.parentNode.appendChild(fallback);
        });
    });
});

// You could add image sliders or other interactive elements with JavaScript here

/* 
// Example: Image slider/rotator for partners
function rotatePartners() {
    const partners = document.querySelectorAll('.partner');
    const firstPartner = partners[0];
    
    // Simple animation
    firstPartner.style.opacity = 0;
    
    setTimeout(() => {
        const container = document.querySelector('.partners-container');
        container.appendChild(firstPartner);
        firstPartner.style.opacity = 1;
    }, 500);
}

// Rotate every 5 seconds
// setInterval(rotatePartners, 5000);
*/


console.log("Script loaded");

    async function fetchXrpPrice() {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/xrp');
        const data = await response.json();
        const price = parseFloat(data?.data?.priceUsd);
        console.log("Fetched XRP Price:", price);

        if (!isNaN(price)) {
          document.getElementById('xrp-price').textContent = price.toFixed(4);
        } else {
          document.getElementById('xrp-price').textContent = 'N/A';
        }
      } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById('xrp-price').textContent = 'Error';
      }
    }

    fetchXrpPrice();