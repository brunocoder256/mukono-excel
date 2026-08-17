/* =========================================================
   MUKONO EXCEL HIGH SCHOOL
   VANILLA JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 700);

    });


    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const closeMenu =
        document.getElementById("closeMenu");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    function openMenu() {

        mobileMenu.classList.add("open");

        document.body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (closeMenu) {

        closeMenu.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.getElementById("siteHeader");


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(".hero-slide");

    const dots =
        document.querySelectorAll(".hero-dots button");

    const currentSlide =
        document.getElementById("currentSlide");


    let activeSlide = 0;

    let sliderTimer;


    function showSlide(index) {

        activeSlide = index;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === activeSlide
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === activeSlide
            );

        });


        if (currentSlide) {

            currentSlide.textContent =
                String(activeSlide + 1)
                    .padStart(2, "0");

        }

    }


    function nextSlide() {

        showSlide(
            (activeSlide + 1) % slides.length
        );

    }


    function startSlider() {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(
            nextSlide,
            6500
        );

    }


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

                startSlider();

            }
        );

    });


    startSlider();


    /* =====================================================
       PAUSE HERO WHEN TAB IS HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                clearInterval(sliderTimer);

            } else {

                startSlider();

            }

        }
    );


    /* =====================================================
       SWIPE HERO ON MOBILE
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    let touchStartX = 0;

    let touchEndX = 0;


    hero.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                showSlide(
                    (activeSlide + 1) %
                    slides.length
                );

            } else {

                showSlide(
                    (activeSlide - 1 + slides.length) %
                    slides.length
                );

            }


            startSlider();

        },
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".about-main-image img, .life-image-large img"
        );


    function parallax() {

        const viewportHeight =
            window.innerHeight;


        parallaxImages.forEach((image) => {

            const rect =
                image.getBoundingClientRect();

            const center =
                rect.top + rect.height / 2;

            const distance =
                center - viewportHeight / 2;


            if (
                rect.bottom > 0 &&
                rect.top < viewportHeight
            ) {

                const movement =
                    distance * -0.025;

                image.style.transform =
                    `scale(1.04) translateY(${movement}px)`;

            }

        });

    }


    window.addEventListener(
        "scroll",
        parallax,
        { passive: true }
    );


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       IMAGE CARD TILT
       Desktop only
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".facility-card, .academic-main"
        );


    if (window.matchMedia(
        "(hover: hover)"
    ).matches) {

        tiltCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y / rect.height) - 0.5) * -2;


                    const rotateY =
                        ((x / rect.width) - 0.5) * 2;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         scale(1.01)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       KEYBOARD HERO CONTROL
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowRight"
            ) {

                showSlide(
                    (activeSlide + 1) %
                    slides.length
                );

                startSlider();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showSlide(
                    (activeSlide - 1 + slides.length) %
                    slides.length
                );

                startSlider();

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a:not(.nav-button)"
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


});