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
    const slider = document.querySelector(".reviews-section .reviews-slider");
    const container = document.querySelector(".reviews-section .reviews-carousel-container");
    const prevBtn = document.getElementById("prev-review-btn");
    const nextBtn = document.getElementById("next-review-btn");
    
    if (!slider || !container) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Calcule dynamiquement le nombre de cartes visibles selon l'écran
    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;  // Mobile
        if (window.innerWidth <= 1024) return 2; // Tablette
        return 3;                                // Bureau
    }

    // Fonction principale de déplacement
    function moveSlider() {
        const cards = document.querySelectorAll(".reviews-section .review-card");
        if (cards.length === 0) return;

        const visibleCards = getVisibleCardsCount();
        const maxIndex = cards.length - visibleCards;

        // Boucle infinie si on dépasse le maximum
        if (currentIndex > maxIndex) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = maxIndex;
        }

        // Calcule la largeur d'une carte + le gap (20px)
        const cardWidth = cards[0].getBoundingClientRect().width + 20;
        
        // Applique la translation
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Gestionnaires de clics sur les flèches
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex++;
            moveSlider();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex--;
            moveSlider();
            resetAutoPlay();
        });
    }

    // Fonctions d'automatisation
    function startAutoPlay() {
        if (autoPlayTimer === null) {
            autoPlayTimer = setInterval(() => {
                currentIndex++;
                moveSlider();
            }, 4000); // Défilement toutes les 4000ms (4 secondes)
        }
    }

    function stopAutoPlay() {
        if (autoPlayTimer !== null) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Sécurité : recalcule les positions si on tourne l'écran ou redimensionne
    window.addEventListener("resize", moveSlider);

    // Arrêt du défilement au survol de la souris (confort de lecture)
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);

    // Lancement initial
    startAutoPlay();
});

document.querySelectorAll('.prestation-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Récupère l'URL TidyCal de la prestation cliquée
        const targetUrl = this.getAttribute('data-url');
        const bookingBtn = document.getElementById('booking-btn');
        
        // Applique cette URL au bouton de réservation
        if (targetUrl) {
            bookingBtn.setAttribute('href', targetUrl);
        }
    });
});

function toggleBookingButton() {
    const checkbox = document.getElementById('agree-policy');
    const button = document.getElementById('booking-btn');
    
    // Si la case n'est pas cochée, on empêche le clic
    if (!checkbox.checked) {
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.5';
    } else {
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
    }
}
