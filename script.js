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
favicon.type = 'image/png';
favicon.href = 'https://cyril1355.github.io/cam-beauty59/favicon.jpg'; 
document.head.appendChild(favicon);

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('agree-policy');
    const bookingBtn = document.getElementById('booking-btn');
    const prestationLinks = document.querySelectorAll('.prestation-link[data-url]');

    function updateBookingSelection() {
        if (!bookingBtn) return;
        const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');
        const selectedAddon = document.querySelector('.prestation-link.selected.addon');
        
        const activeSelection = selectedAddon || selectedMain;
        
        if (activeSelection) {
            let targetUrl = activeSelection.getAttribute('data-url');
            bookingBtn.setAttribute('href', targetUrl);
        } else {
            bookingBtn.setAttribute('href', '#');
        }
    }

    prestationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const titleText = this.querySelector('.item-title')?.textContent.toLowerCase() || '';
            
            // Identification précise des éléments
            const isOngleCasseMoins1 = titleText.includes('ongle cassé -1 semaine');
            const isOngleCassePlus1 = titleText.includes('ongle cassé + 1 semaine') || titleText.includes('ongle cassé +1 semaine');
            const isOngleCasse = isOngleCasseMoins1 || isOngleCassePlus1;

            const isPackSourcils = titleText.includes('pack sourcils') || titleText.includes('création de la ligne');
            const isRemplissageGel = titleText.includes('remplissage gel');
            
            const isRemplissage3SemainesCils = titleText.includes('remplissage 3 semaines') && !titleText.includes('+');
            const isRemplissagePlus3SemainesCils = titleText.includes('remplissage  + 3 semaines') || titleText.includes('remplissage + 3 semaines');
            const isRemplissageCils = isRemplissage3SemainesCils || isRemplissagePlus3SemainesCils;
            
            const isRemplissage = isRemplissageGel || isRemplissageCils;
            
            // Un add-on classique (French, Baby, Effets, Strass, Dépose, Teinture)
            const isClassicAddon = titleText.includes('french') || titleText.includes('baby') || titleText.includes('effects') || titleText.includes('strass') || titleText.includes('dépose') || titleText.includes('teinture');
            
            const isAddon = isClassicAddon || isOngleCasse || isPackSourcils || isRemplissage;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                if (isAddon) {
                    const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');

                    // RÈGLE : Interdiction de sélectionner plusieurs add-ons classiques en simultané (ex: French et Baby boomers)
                    if (isClassicAddon) {
                        document.querySelectorAll('.prestation-link.selected.addon').forEach(addon => {
                            const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            if (aTitle.includes('french') || aTitle.includes('baby') || aTitle.includes('effects') || aTitle.includes('strass') || aTitle.includes('dépose') || aTitle.includes('teinture')) {
                                addon.classList.remove('selected');
                            }
                        });
                    }

                    // RÈGLE : Interdiction de sélectionner les deux remplissages 3 semaines (cils) en simultané
                    if (isRemplissageCils) {
                        document.querySelectorAll('.prestation-link.selected.addon').forEach(addon => {
                            const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            if (aTitle.includes('remplissage 3 semaines') || aTitle.includes('remplissage + 3 semaines')) {
                                addon.classList.remove('selected');
                            }
                        });
                    }

                    // RÈGLE : Interdiction de sélectionner les deux options d'ongles cassés en même temps
                    if (isOngleCasse) {
                        document.querySelectorAll('.prestation-link.selected.addon').forEach(addon => {
                            const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            if (aTitle.includes('ongle cassé')) {
                                addon.classList.remove('selected');
                            }
                        });
                    }

                    // RÈGLE : Interdiction de sélectionner un remplissage en même temps que le pack sourcils
                    if (isRemplissage && isPackSourcils) {
                        return; 
                    }

                    // RÈGLE : Interdiction de sélectionner un autre élément (prestation ou add-on) quand le pack sourcils est déjà sélectionné
                    const activePackSourcils = Array.from(document.querySelectorAll('.prestation-link.addon')).some(l => {
                        const lTitle = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                        return l.classList.contains('selected') && (lTitle.includes('pack sourcils') || lTitle.includes('création de la ligne'));
                    });
                    if (activePackSourcils && !isPackSourcils) {
                        return;
                    }

                    // RÈGLE : Si on sélectionne le pack sourcils, il devient exclusif et désactive tout le reste
                    if (isPackSourcils) {
                        document.querySelectorAll('.prestation-link').forEach(l => l.classList.remove('selected'));
                    }

                    // RÈGLE : Interdiction de sélectionner les ongles cassés en même temps que le remplissage gel
                    if (isOngleCasse) {
                        const activeGel = Array.from(document.querySelectorAll('.prestation-link.addon')).some(l => {
                            const lTitle = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            return l.classList.contains('selected') && lTitle.includes('remplissage gel');
                        });
                        if (activeGel) return;
                    }
                    if (isRemplissageGel) {
                        const activeCasse = Array.from(document.querySelectorAll('.prestation-link.addon')).some(l => {
                            const lTitle = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            return l.classList.contains('selected') && lTitle.includes('ongle cassé');
                        });
                        if (activeCasse) return;
                    }

                    // Les ongles cassés et le pack sourcils peuvent être sélectionnés sans prestation principale, mais pas les autres add-ons/remplissages
                    if (!selectedMain && !isOngleCasse && !isPackSourcils) {
                        return; 
                    }

                    this.classList.add('selected');
                } else {
                    // Si on clique sur une prestation principale, on vérifie d'abord si le pack sourcils exclusif est actif (auquel cas on bloque, ou on nettoie selon le besoin)
                    // Ici, si une prestation principale est choisie, on nettoie le pack sourcils et les autres prestations principales
                    document.querySelectorAll('.prestation-link.addon').forEach(l => {
                        const lTitle = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                        if (lTitle.includes('pack sourcils') || lTitle.includes('création de la ligne')) {
                            l.classList.remove('selected');
                        }
                    });

                    document.querySelectorAll('.prestation-link:not(.addon)').forEach(l => l.classList.remove('selected'));
                    this.classList.add('selected');
                }
            }

            updateBookingSelection();
        });
    });

    window.toggleBookingButton = function() {
        if (!checkbox || !bookingBtn) return;
        const currentSelected = document.querySelector('.prestation-link.selected');

        if (checkbox.checked) {
            bookingBtn.classList.add('active');
            if (currentSelected) {
                updateBookingSelection();
            }
        } else {
            bookingBtn.classList.remove('active');
            bookingBtn.setAttribute('href', '#');
        }
    };

    toggleBookingButton();
    
    if (checkbox) {
        checkbox.addEventListener('change', toggleBookingButton);
    }
});
