
/* =========================================
   VASANTHI BRIDAL MAKEOVER
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // TYPE THE HERO BRAND TITLE
    const heroTitle = document.querySelector(".typing-title");

    if (heroTitle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const titleText = heroTitle.textContent.trim();
        let characterIndex = 0;

        heroTitle.textContent = "";
        heroTitle.classList.add("is-typing");

        function typeNextCharacter() {
            heroTitle.textContent += titleText.charAt(characterIndex);
            characterIndex += 1;

            if (characterIndex < titleText.length) {
                window.setTimeout(typeNextCharacter, 100);
            } else {
                heroTitle.classList.remove("is-typing");
            }
        }

        typeNextCharacter();
    }


    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    // MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu after clicking a navigation link
        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }


    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // CURRENT YEAR IN FOOTER
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});