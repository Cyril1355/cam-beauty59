document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Chargement du Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                initHeader(); // Active le menu après injection
            }
        });

    // 2. Chargement du Footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error("Erreur de chargement");
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error("Erreur footer : ", error));
});

// Fonction pour gérer le header après chargement
function initHeader() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        // On retire la classe active partout avant de commencer
        link.classList.remove('active');
        
        // On vérifie si le href du lien correspond à la page actuelle
        const href = link.getAttribute('href');
        if (href !== "#" && path.endsWith(href)) {
            link.classList.add('active');
            
            // Si le lien est dans un menu déroulant, on active aussi le parent
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('.dropdown-trigger').classList.add('active');
            }
        }
    });
}

//Gestion des modales dans le footer
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Fermeture au clic en dehors
window.addEventListener('click', function(event) {
    if (event.target.id === 'legal-modal') closeModal('legal-modal');
    if (event.target.id === 'rgpd-modal') closeModal('rgpd-modal');
});
// Sélection Prestations & Bouton Réservation
let selectedServiceUrl = "";

function selectService(url, element) {
    if (selectedServiceUrl === url) {
        element.style.borderColor = "#eae1de";
        element.style.background = "#ffffff";
        selectedServiceUrl = ""; 
    } else {
        document.querySelectorAll('.service-option').forEach(opt => {
            opt.style.borderColor = "#eae1de";
            opt.style.background = "#ffffff";
        });
        
        element.style.borderColor = "#b89689";
        element.style.background = "#fdfbfb";
        selectedServiceUrl = url; 
    }
    
    toggleBookingButton();
}

function toggleBookingButton() {
    const checkbox = document.getElementById('agree-policy');
    const btn = document.getElementById('booking-btn');
    
    if (checkbox.checked && selectedServiceUrl !== "") {
        btn.href = selectedServiceUrl;
        btn.style.backgroundColor = "#b89689"; 
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    } else {
        btn.href = "#";
        btn.style.backgroundColor = "#cbd5e1"; 
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.7";
    }
}
/* ==========================================================================
   FERMETURE DU MENU BURGER AU CLIC EN DEHORS
   ========================================================================== */
document.addEventListener('pointerdown', function(event) {
    const checkbox = document.querySelector('.menu-toggle-checkbox');
    const navMenu = document.querySelector('.nav-menu');
    const burgerLabel = document.querySelector('.menu-burger-label');

    if (checkbox && checkbox.checked) {
        // Si on clique en dehors du menu ET du bouton burger
        if (!navMenu.contains(event.target) && !burgerLabel.contains(event.target)) {
            checkbox.checked = false;
        }
    }
});
// Injection automatique du favicon sur toutes les pages
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/jpeg';
favicon.href = 'https://cyril1355.github.io/cam-beauty59/favicon.jpg'; 
document.head.appendChild(favicon);

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider-avis-final");
    const prevBtn = document.getElementById("prev-review-btn");
    const nextBtn = document.getElementById("next-review-btn");
    
    if (slider && prevBtn && nextBtn) {
        let index = 0;
        
        function getCardsPerView() {
            if (window.innerWidth < 768) return 1;    // Mobile : 1 avis
            if (window.innerWidth < 1024) return 2;   // Tablette : 2 avis
            return 3;                                 // PC : 3 avis
        }

        function updateSlider() {
            const card = document.querySelector(".final-review-card");
            if (!card) return;
            // Calcule la largeur exacte d'une carte + l'espace (gap) de 20px
            const cardWidth = card.getBoundingClientRect().width + 20; 
            slider.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        nextBtn.addEventListener("click", function () {
            const maxIndex = slider.children.length - getCardsPerView();
            if (index < maxIndex) {
                index++;
            } else {
                index = 0; // Revient au début
            }
            updateSlider();
        });

        prevBtn.addEventListener("click", function () {
            if (index > 0) {
                index--;
            } else {
                index = slider.children.length - getCardsPerView(); // Va à la fin
            }
            updateSlider();
        });

        // Réaligne le slider proprement si on redimensionne la fenêtre
        window.addEventListener("resize", function() {
            index = 0; // Reset pour éviter les décalages de calcul
            updateSlider();
        });
    }
});
