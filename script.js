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

    // Gestion du lien actif
    navLinks.forEach(link => {

        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (
            href !== "#" &&
            path.endsWith(href) &&
            !link.classList.contains("btn-primary") &&
            !link.classList.contains("btn-cta")
        ) {

            link.classList.add("active");

            const parentDropdown = link.closest('.dropdown');

            if (parentDropdown) {
                parentDropdown
                    .querySelector('.dropdown-trigger')
                    .classList.add('active');
            }
        }
    });


    // ===== MENU DÉROULANT MOBILE =====

    if (window.innerWidth <= 1024) {

        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {

            trigger.addEventListener('click', function(e) {

                e.preventDefault();

                const dropdown = this.parentElement;

                document.querySelectorAll('.dropdown').forEach(item => {

                    if (item !== dropdown) {
                        item.classList.remove('open');
                    }

                });

                dropdown.classList.toggle('open');

            });

        });


        // Fermer les sous-menus après clic sur un lien
        document.querySelectorAll('.dropdown-menu a').forEach(link => {

            link.addEventListener('click', () => {

                document.querySelectorAll('.dropdown').forEach(item => {
                    item.classList.remove('open');
                });

            });

        });

    }


    // ===== BURGER : FERMETURE AU CLIC EXTERIEUR =====

    const checkbox = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle-checkbox');
    const burgerLabel = document.querySelector('.menu-burger-label');
    const navMenu = document.querySelector('.nav-menu');


    if (checkbox && burgerLabel && navMenu) {


        document.addEventListener('pointerdown', function(event) {

            const clicDansMenu = navMenu.contains(event.target);
            const clicBurger = burgerLabel.contains(event.target);


            if (!clicDansMenu && !clicBurger && checkbox.checked) {

                checkbox.checked = false;

                document.body.classList.remove('menu-open');


                // Ferme aussi les menus déroulants
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });

            }

        });


        // Fermeture après clic sur un lien normal
        navMenu.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {

            link.addEventListener('click', () => {

                checkbox.checked = false;

                document.body.classList.remove('menu-open');

            });

        });


        // Gestion de la classe body
        burgerLabel.addEventListener('click', () => {

            setTimeout(() => {

                if (checkbox.checked) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }

            }, 10);

        });

    }

}
// ================================
// MODALES FOOTER
// ================================

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


// Fermeture en cliquant en dehors de la fenêtre
window.addEventListener('click', function(event) {

    if (event.target.id === 'legal-modal') {
        closeModal('legal-modal');
    }

    if (event.target.id === 'rgpd-modal') {
        closeModal('rgpd-modal');
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('agree-policy');
    const bookingBtn = document.getElementById('booking-btn');
    const prestationLinks = document.querySelectorAll('.prestation-link[data-url]');

function updateBookingSelection() {
    if (!bookingBtn) return;

    const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');
    
    // Récupère tous les addons sélectionnés
    const selectedAddons = Array.from(document.querySelectorAll('.prestation-link.selected.addon'));
    const addonTitles = selectedAddons.map(l => l.querySelector('.item-title')?.textContent.toLowerCase().trim() || '');

    if (!selectedMain) {
        bookingBtn.setAttribute('href', '#');
        return;
    }

    let targetUrl = selectedMain.dataset.url;
    const mainTitle = selectedMain.querySelector('.item-title')?.textContent.toLowerCase().trim();

// ===== SEMI PERMANENT PEDICURE =====
    if (mainTitle.includes("semi permanent couleur unie + pédicure")) {
        const hasRemplissage = addonTitles.some(t => t.includes("remplissage gel"));
        const hasFrench = addonTitles.some(t => t.includes("french"));
        const hasBaby = addonTitles.some(t => t.includes("baby"));
        const hasEffects = addonTitles.some(t => t.includes("effects"));
        const hasStrass = addonTitles.some(t => t.includes("strass"));

        // Combinaison : Semi-permanent + pédicure + Remplissage Gel + French
        if (hasRemplissage && hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-remplissage-french";
        }
        else if (hasRemplissage && hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-remplissage-baby-boomer";
        }
        else if (hasRemplissage && hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-remplissage-effect";
        }
        else if (hasRemplissage && hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-remplissage-strass";
        }
        else if (hasRemplissage) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-remplissage";
        }
        else if (hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-french";
        }
        else if (hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-baby-boomer";
        }
        else if (hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-effect";
        }
        else if (hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-strass";
        }
    }
    // ===== SEMI PERMANENT COULEUR UNIE =====
    else if (mainTitle.includes("semi permanent couleur unie")) {
        const hasRemplissage = addonTitles.some(t => t.includes("remplissage gel"));
        const hasFrench = addonTitles.some(t => t.includes("french"));
        const hasBaby = addonTitles.some(t => t.includes("baby"));
        const hasEffects = addonTitles.some(t => t.includes("effects"));
        const hasStrass = addonTitles.some(t => t.includes("strass"));

        if (hasRemplissage && hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-remplissage-french";
        }
        else if (hasRemplissage && hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-remplissage-baby-boomer";
        }
        else if (hasRemplissage && hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-remplissage-effect";
        }
        else if (hasRemplissage && hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-remplissage-strass";
        }
        else if (hasRemplissage) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-remplissage";
        }
        else if (hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-french";
        }
        else if (hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-baby-boomer";
        }
        else if (hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-effect";
        }
        else if (hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/semi-permanent-couleur-unie-pedicure-strass";
        }
    }
    // ===== GAINAGE =====
    if (mainTitle.includes("gainage ongles naturels")) {
        const hasRemplissage = addonTitles.some(t => t.includes("remplissage gel"));
        const hasFrench = addonTitles.some(t => t.includes("french"));
        const hasBaby = addonTitles.some(t => t.includes("baby"));
        const hasEffects = addonTitles.some(t => t.includes("effects"));
        const hasStrass = addonTitles.some(t => t.includes("strass"));

        // Combinaison : Semi-permanent + Remplissage Gel + French
        if (hasRemplissage && hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-remplissage-french";
        }
        // Combinaison : Semi-permanent + Remplissage Gel + Baby Boomer
        else if (hasRemplissage && hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-remplissage-baby-boomer";
        }
        else if (hasRemplissage && hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-remplissage-effect";
        }
        else if (hasRemplissage && hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-remplissage-strass";
        }
        // Remplissage seul
        else if (hasRemplissage) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-remplissage";
        }
        // French seule
        else if (hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-french";
        }
        // Baby Boomer seul
        else if (hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-baby-boomer";
        }
        else if (hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-effect";
        }
        else if (hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/gainage-strass";
        }
    }
        // ===== RALLONGEMENT GEL S-M =====
    if (mainTitle.includes("rallongement gel S-M")) {
        const hasRemplissage = addonTitles.some(t => t.includes("remplissage gel"));
        const hasFrench = addonTitles.some(t => t.includes("french"));
        const hasBaby = addonTitles.some(t => t.includes("baby"));
        const hasEffects = addonTitles.some(t => t.includes("effects"));
        const hasStrass = addonTitles.some(t => t.includes("strass"));

        // Combinaison : Semi-permanent + Remplissage Gel + French
        if (hasRemplissage && hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-remplissage-french";
        }
        // Combinaison : Semi-permanent + Remplissage Gel + Baby Boomer
        else if (hasRemplissage && hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-remplissage-baby-boomer";
        }
        else if (hasRemplissage && hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-remplissage-effects";
        }
        else if (hasRemplissage && hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-remplissage-strass";
        }
        // Remplissage seul
        else if (hasRemplissage) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-remplissage";
        }
        // French seule
        else if (hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-french";
        }
        // Baby Boomer seul
        else if (hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-baby-boomer";
        }
        else if (hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-effect";
        }
        else if (hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-s-m-strass";
        }
    }
            // ===== RALLONGEMENT GEL L-Xl =====
    if (mainTitle.includes("rallongement gel L-XL")) {
        const hasRemplissage = addonTitles.some(t => t.includes("remplissage gel"));
        const hasFrench = addonTitles.some(t => t.includes("french"));
        const hasBaby = addonTitles.some(t => t.includes("baby"));
        const hasEffects = addonTitles.some(t => t.includes("effects"));
        const hasStrass = addonTitles.some(t => t.includes("strass"));

        // Combinaison : Semi-permanent + Remplissage Gel + French
        if (hasRemplissage && hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-remplissage-french";
        }
        // Combinaison : Semi-permanent + Remplissage Gel + Baby Boomer
        else if (hasRemplissage && hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-remplissage-baby-boomer";
        }
        else if (hasRemplissage && hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-remplissage-effects";
        }
        else if (hasRemplissage && hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-remplissage-strass";
        }
        // Remplissage seul
        else if (hasRemplissage) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-remplissage";
        }
        // French seule
        else if (hasFrench) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-french";
        }
        // Baby Boomer seul
        else if (hasBaby) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-baby-boomer";
        }
        else if (hasEffects) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-effect";
        }
        else if (hasStrass) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rallongement-gel-l-xl-strass";
        }
    }
     // ===== Remplissage cils =====
    if (mainTitle.includes("extension cil à cil")) {
        const hasRemplissage1 = addonTitles.some(t => t.includes("remplissage 3 semaines"));
        const hasRemplissage2 = addonTitles.some(t => t.includes("remplissage + 3 semaines"));

        if (hasRemplissage1) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/cil-a-cil-remplissage-3-semaines";
        }
        else if (hasRemplissage2) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/cil-a-cil-remplissage1-3-semaines";
        }
    }
    if (mainTitle.includes("extension mixte")) {
        const hasRemplissage1 = addonTitles.some(t => t.includes("remplissage 3 semaines"));
        const hasRemplissage2 = addonTitles.some(t => t.includes("remplissage + 3 semaines"));

        if (hasRemplissage1) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/mixte-remplissage-3-semaines";
        }
        else if (hasRemplissage2) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/mixte-remplissage1-3-semaines";
        }
    }
    if (mainTitle.includes("extension volume russe")) {
        const hasRemplissage1 = addonTitles.some(t => t.includes("remplissage 3 semaines"));
        const hasRemplissage2 = addonTitles.some(t => t.includes("remplissage + 3 semaines"));

        if (hasRemplissage1) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/volume-russe-remplissage-3-semaines";
        }
        else if (hasRemplissage2) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/volume-russe-remplissage1-3-semaines";
        }
    }
    // ===== teinture sourcils =====
    if (mainTitle.includes("rehaussement de cils")) {
        const hasTeinture = addonTitles.some(t => t.includes("teinture sourcils"));

        if (hasTeinture) {
            targetUrl = "https://tidycal.com/camillebrejnakowski/rehaussement-cils-teinture";
        }
    }
    

    bookingBtn.setAttribute('href', targetUrl);
}

prestationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const titleText = this.querySelector('.item-title')?.textContent.toLowerCase() || '';
            
            const isOngleCasseMoins1 = titleText.includes('ongle cassé - 1 semaine') || titleText.includes('ongle cassé -1 semaine');
            const isOngleCassePlus1 = titleText.includes('ongle cassé + 1 semaine') || titleText.includes('ongle cassé +1 semaine');
            const isOngleCasse = isOngleCasseMoins1 || isOngleCassePlus1;

            const isPackSourcils = titleText.includes('pack sourcils') || titleText.includes('création de la ligne');
            const isRemplissageGel = titleText.includes('remplissage gel');
            
            const isRemplissageSimple = (titleText.includes('remplissage 3 semaines') || titleText.includes('remplissage  3 semaines')) && !titleText.includes('+');
            const isRemplissagePlus = titleText.includes('remplissage + 3 semaines') || titleText.includes('remplissage  + 3 semaines');
            const isRemplissageCils = isRemplissageSimple || isRemplissagePlus;
            
            const isClassicAddon = titleText.includes('french') || titleText.includes('baby') || titleText.includes('effects') || titleText.includes('strass');
            const isDeposeSeule = titleText.includes('dépose') && !titleText.includes('teinture');
            
            const isTeintureSourcils = titleText.includes('teinture sourcils');
            const isRehaussementCils = titleText.includes('rehaussement');

            // RÈGLE : Teinture sourcils uniquement si rehaussement des cils est actif
            if (isTeintureSourcils) {
                const rehaussementActif = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                    return l.querySelector('.item-title')?.textContent.toLowerCase().includes('rehaussement');
                });
                if (!rehaussementActif) {
                    return; 
                }
            }

            // RÈGLE : Remplissage 3 semaines / + 3 semaines uniquement si une extension de cils est active
            if (isRemplissageCils) {
                const extensionActive = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                    const t = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                    return t.includes('extension cil à cil') || t.includes('extension mixte') || t.includes('extension volume russe');
                });
                if (!extensionActive) {
                    return;
                }
            }

            const isExclusiveOption = isClassicAddon || isRemplissageCils;
            const isAddon = isExclusiveOption || isTeintureSourcils || isDeposeSeule || isOngleCasse || isPackSourcils || isRemplissageGel;

            if (this.classList.contains('selected')) {
                if (isRehaussementCils) {
                    document.querySelectorAll('.prestation-link.selected').forEach(l => {
                        if (l.querySelector('.item-title')?.textContent.toLowerCase().includes('teinture sourcils')) {
                            l.classList.remove('selected');
                        }
                    });
                }
                this.classList.remove('selected');
            } else {
                const activePackSourcils = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                    const t = l.querySelector('.item-title')?.textContent.toLowerCase() || '';
                    return t.includes('pack sourcils') || t.includes('création de la ligne');
                });

                if (activePackSourcils && (isRemplissageCils || isClassicAddon)) {
                    return;
                }

                if (isPackSourcils || isOngleCasse || isDeposeSeule) {
                    document.querySelectorAll('.prestation-link').forEach(l => l.classList.remove('selected'));
                    this.classList.add('selected');
                    updateBookingSelection();
                    return;
                }

                if (isRemplissageCils) {
                    const selectedMain = document.querySelector('.prestation-link.selected:not(.addon)');
                    if (!selectedMain) return;
                    
                    document.querySelectorAll('.prestation-link.selected').forEach(addon => {
                        const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';
                        if (aTitle.includes('remplissage 3 semaines')) {
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

                    if (isTeintureSourcils) {
                        const rehaussementActif = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
                            return l.querySelector('.item-title')?.textContent.toLowerCase().includes('rehaussement');
                        });
                        if (rehaussementActif) {
                            this.classList.add('selected');
                            updateBookingSelection();
                            return;
                        } else {
                            return;
                        }
                    }

                    if (!selectedMain) return;

                    this.classList.add('selected');
                } else {
                    document.querySelectorAll('.prestation-link:not(.addon)').forEach(l => l.classList.remove('selected'));
                    
                    if (!isRehaussementCils) {
                        document.querySelectorAll('.prestation-link.selected').forEach(l => {
                            if (l.querySelector('.item-title')?.textContent.toLowerCase().includes('teinture sourcils')) {
                                l.classList.remove('selected');
                            }
                        });
                    }

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

/* =====================================================================
   CARROUSEL AVIS CLIENTS
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".reviews-slider");
    const prevBtn = document.getElementById("prev-review-btn");
    const nextBtn = document.getElementById("next-review-btn");
    const cards = document.querySelectorAll(".review-card");

    if (!slider || !prevBtn || !nextBtn || cards.length === 0) {
        return;
    }

    let currentIndex = 0;

    function getStep() {
        const card = cards[0];
        const style = window.getComputedStyle(slider);
        const gap = parseInt(style.gap) || 0;

        return card.offsetWidth + gap;
    }

    function moveSlider() {
        slider.style.transform = `translateX(-${currentIndex * getStep()}px)`;
    }


    nextBtn.addEventListener("click", function () {

        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = cards.length - visibleCards;

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        moveSlider();
    });


    prevBtn.addEventListener("click", function () {

        const visibleCards = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = cards.length - visibleCards;

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }

        moveSlider();
    });


    window.addEventListener("resize", function () {
        currentIndex = 0;
        moveSlider();
    });

});
