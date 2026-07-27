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
// Gestion globale et propre du menu mobile et du bouton de réservation
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('.menu-toggle-checkbox');
    const burgerLabel = document.querySelector('.menu-burger-label');
    const navMenu = document.querySelector('.nav-menu');

    // Fermer le menu si on clique en dehors
    document.addEventListener('pointerdown', (event) => {
        if (checkbox && checkbox.checked) {
            if (navMenu && burgerLabel && !navMenu.contains(event.target) && !burgerLabel.contains(event.target)) {
                checkbox.checked = false;
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Synchroniser l'état du body avec la checkbox du burger
    if (burgerLabel) {
        burgerLabel.addEventListener('click', () => {
            setTimeout(() => {
                if (checkbox && checkbox.checked) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            }, 10);
        });
    }

    // Assurer le clic direct et la fermeture immédiate sur le bouton Prendre RDV du menu (toutes pages confondues)
    const bookingButtonsInMenu = document.querySelectorAll(
    '.nav-menu .btn-primary, .nav-menu .btn-booking'
);
    
    bookingButtonsInMenu.forEach(btn => {
btn.addEventListener('pointerdown', () => {
    if (checkbox) {
        checkbox.checked = false;
    }
    document.body.classList.remove('menu-open');
});
    });
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

    if (!selectedMain) {
        bookingBtn.setAttribute('href', '#');
        return;
    }

    // Lien par défaut de la prestation principale
    let targetUrl = selectedMain.dataset.url;

    if (selectedAddon) {

        const mainTitle = selectedMain.querySelector('.item-title').textContent.toLowerCase().trim();
        const addonTitle = selectedAddon.querySelector('.item-title').textContent.toLowerCase().trim();

        // ===== SEMI PERMANENT =====
        if (mainTitle.includes("semi permanent")) {

            if (addonTitle.includes("french")) {
                targetUrl = "https://tidycal.com/votre-compte/semi-permanent-french";
            }

            else if (addonTitle.includes("baby")) {
                targetUrl = "https://tidycal.com/votre-compte/semi-permanent-baby";
            }

            else if (addonTitle.includes("effects")) {
                targetUrl = "TON_LIEN_EFFECTS";
            }

            else if (addonTitle.includes("strass")) {
                targetUrl = "TON_LIEN_STRASS";
            }
        }

        // ===== GAINAGE =====
        else if (mainTitle.includes("gainage")) {

            if (addonTitle.includes("french")) {
                targetUrl = "TON_LIEN_GAINAGE_FRENCH";
            }

            else if (addonTitle.includes("baby")) {
                targetUrl = "TON_LIEN_GAINAGE_BABY";
            }
        }

        // ===== RALLONGEMENT =====
        else if (mainTitle.includes("rallongement")) {

            if (addonTitle.includes("french")) {
                targetUrl = "TON_LIEN_RALLONGEMENT_FRENCH";
            }

            else if (addonTitle.includes("baby")) {
                targetUrl = "TON_LIEN_RALLONGEMENT_BABY";
            }
        }
    }

    bookingBtn.setAttribute('href', targetUrl);
}

    prestationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const titleText = this.querySelector('.item-title')?.textContent.toLowerCase() || '';
            
            // Identification précise des éléments
            const isOngleCasseMoins1 = titleText.includes('ongle cassé - 1 semaine') || titleText.includes('ongle cassé -1 semaine');
            const isOngleCassePlus1 = titleText.includes('ongle cassé + 1 semaine') || titleText.includes('ongle cassé +1 semaine');
            const isOngleCasse = isOngleCasseMoins1 || isOngleCassePlus1;

            const isPackSourcils = titleText.includes('pack sourcils') || titleText.includes('création de la ligne');
            const isRemplissageGel = titleText.includes('remplissage gel');
            
            // Distinction rigoureuse entre les deux remplissages cils
            const isRemplissageSimple = (titleText.includes('remplissage 3 semaines') || titleText.includes('remplissage  3 semaines')) && !titleText.includes('+');
            const isRemplissagePlus = titleText.includes('remplissage + 3 semaines') || titleText.includes('remplissage  + 3 semaines');
            const isRemplissageCils = isRemplissageSimple || isRemplissagePlus;
            
            const isClassicAddon = titleText.includes('french') || titleText.includes('baby') || titleText.includes('effects') || titleText.includes('strass');
            const isTeintureOuDepose = titleText.includes('teinture') || titleText.includes('dépose');
            
            const isExclusiveOption = isClassicAddon || isRemplissageCils;
            
            const isAddon = isExclusiveOption || isTeintureOuDepose || isOngleCasse || isPackSourcils || isRemplissageGel;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                // RÈGLE : Si le Pack Sourcils est actif, interdiction de sélectionner un remplissage ou une option de style
                const activePackSourcils = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                    const t = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                    return t.includes('pack sourcils') || t.includes('création de la ligne');
                });

                if (activePackSourcils && (isRemplissageCils || isClassicAddon)) {
                    return;
                }

                // RÈGLE : Pack Sourcils exclusif global
                if (isPackSourcils) {
                    document.querySelectorAll('.prestation-link').forEach(l => l.classList.remove('selected'));
                    this.classList.add('selected');
                    updateBookingSelection();
                    return;
                }

                // RÈGLE : Ongles cassés exclusifs globaux
                if (isOngleCasse) {
                    document.querySelectorAll('.prestation-link').forEach(l => l.classList.remove('selected'));
                    this.classList.add('selected');
                    updateBookingSelection();
                    return;
                }

                // RÈGLE : Teinture ou Dépose exclusives globales
                if (isTeintureOuDepose) {
                    document.querySelectorAll('.prestation-link').forEach(l => l.classList.remove('selected'));
                    this.classList.add('selected');
                    updateBookingSelection();
                    return;
                }

                // RÈGLE : Gestion croisée et exclusive entre les deux remplissages 3 semaines
                if (isRemplissageCils) {
                    const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');
                    if (!selectedMain) {
                        return; 
                    }
                    
                    // Désélectionner impérativement TOUT autre remplissage cils existant
                    document.querySelectorAll('.prestation-link.selected').forEach(addon => {
                        const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                        const isOtherSimple = (aTitle.includes('remplissage 3 semaines') || aTitle.includes('remplissage  3 semaines')) && !aTitle.includes('+');
                        const isOtherPlus = aTitle.includes('remplissage + 3 semaines') || aTitle.includes('remplissage  + 3 semaines');
                        
                        if (isOtherSimple || isOtherPlus) {
                            addon.classList.remove('selected');
                        }
                    });

                    this.classList.add('selected');
                    updateBookingSelection();
                    return;
                }

                if (isAddon) {
                    const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');

                    if (isClassicAddon) {
                        document.querySelectorAll('.prestation-link.selected').forEach(addon => {
                            const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                            if (aTitle.includes('french') || aTitle.includes('baby') || aTitle.includes('effects') || aTitle.includes('strass')) {
                                addon.classList.remove('selected');
                            }
                        });
                    }

                    if (isRemplissageGel) {
                        const activeCasse = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                            return l.querySelector('.item-title')?.textContent.toLowerCase().includes('ongle cassé');
                        });
                        if (activeCasse) return;
                    }

                    if (!selectedMain) {
                        return; 
                    }

                    this.classList.add('selected');
                } else {
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
