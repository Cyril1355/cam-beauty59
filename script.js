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

    const checkbox = document.getElementById('menu-toggle');
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
            const isTeintureSourcils = titleText.includes('teinture sourcils');
            const isTeintureOuDepose =(titleText.includes('teinture') && !isTeintureSourcils) || titleText.includes('dépose');
            
            const isExclusiveOption = isClassicAddon || isRemplissageCils;
            
            const isAddon =
    isClassicAddon ||
    isRemplissageCils ||
    isRemplissageGel ||
    isTeintureSourcils;

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

    const mainTitle = selectedMain.querySelector('.item-title').textContent.toLowerCase();

    const autorise =
        mainTitle.includes("extension cil à cil") ||
        mainTitle.includes("extension mixte") ||
        mainTitle.includes("extension volume russe");

    if (!autorise) {
        return;
    }

    document.querySelectorAll('.prestation-link.selected').forEach(addon => {

        const aTitle = addon.querySelector('.item-title')?.textContent.toLowerCase() || '';

        const isOtherSimple =
            (aTitle.includes('remplissage 3 semaines') ||
             aTitle.includes('remplissage  3 semaines'))
            && !aTitle.includes('+');

        const isOtherPlus =
            aTitle.includes('remplissage + 3 semaines') ||
            aTitle.includes('remplissage  + 3 semaines');

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

    if (!selectedMain) {
        return;
    }

    const mainTitle = selectedMain
        .querySelector('.item-title')
        .textContent
        .toLowerCase()
        .trim();

    // ===== Teinture sourcils =====
    if (isTeintureSourcils) {

        if (!mainTitle.includes("rehaussement de cils")) {
            return;
        }

        this.classList.add('selected');
        updateBookingSelection();
        return;
    }
    });
});

    // ===== French / Baby / Effects / Strass =====
    if (isClassicAddon) {

        document.querySelectorAll('.prestation-link.selected.addon').forEach(addon => {

            const t = addon.querySelector('.item-title')?.textContent.toLowerCase() || "";

            if (
                t.includes("french") ||
                t.includes("baby") ||
                t.includes("effects") ||
                t.includes("strass")
            ) {
                addon.classList.remove("selected");
            }

        });

    }

    // ===== Remplissage gel =====
    if (isRemplissageGel) {

        const activeCasse = Array.from(document.querySelectorAll('.prestation-link.selected')).some(l => {
            return l.querySelector('.item-title')?.textContent.toLowerCase().includes('ongle cassé');
        });

        if (activeCasse) return;
    }

    this.classList.add("selected");
    updateBookingSelection();
    return;
}

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
