// 1. Initialiser Lenis (Smooth Scrolling)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe d'easing fluide (premium)
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Boucle requestAnimationFrame pour Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Intégrer le ticker de GSAP avec Lenis pour une synchronisation parfaite des animations
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 2. Animations GSAP au chargement de la page
window.addEventListener("load", () => {
    // Désactiver le scroll pendant le chargement initial pour une meilleure immersion
    lenis.stop();

    const tl = gsap.timeline({
        onComplete: () => {
            // Réactiver le scroll une fois l'intro terminée
            lenis.start();
        }
    });

    // Étape 1 : Disparition du texte du loader
    tl.to(".loader-text", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.4 // Petit temps d'attente pour que l'utilisateur lise "INITIALIZING..."
    })
        // Étape 2 : Le loader (fond noir) glisse vers le haut
        .to(".loader", {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut"
        })
        // Étape 3 : Fade-in du Glassmorphism Panel
        .fromTo(".glass-panel",
            { opacity: 0, backdropFilter: "blur(0px)", scale: 0.95 },
            {
                opacity: 1,
                backdropFilter: "blur(12px)",
                scale: 1,
                duration: 1.2,
                ease: "power2.out"
            },
            "-=0.4" // Commence un peu avant la fin de l'animation du loader
        )
        // Étape 4 : Révélation dramatique du titre "BARRY BAILO" (Stagger)
        .to(".reveal-text", {
            y: "0%",
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.15 // Animations successives pour chaque ligne
        }, "-=0.8") // Se superpose avec l'apparition du panel
        // Étape 5 : Fade-in du sous-titre
        .fromTo(".hero-subtitle",
            { opacity: 0, y: 20, filter: "blur(5px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out"
            },
            "-=1.0"
        );

    // Bonus : Animation d'apparition au scroll pour les sections suivantes (Optionnel si vous gardez les spacers)
    const fadeUps = document.querySelectorAll('.fade-up, .fade-up-delay');
    if (fadeUps.length > 0) {
        fadeUps.forEach((element) => {
            gsap.fromTo(element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%", // Déclenche quand l'élément atteint 85% du bas de la fenêtre
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Animation ScrollTrigger : Projet Mis en Évidence (HYPOXIA)
    gsap.fromTo(".featured-project",
        { opacity: 0, scale: 0.95, y: 30 },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".projects",
                start: "top 60%", /* Déclenche un peu avant pour plus de fluidité */
                toggleActions: "play none none reverse"
            }
        }
    );

    // Animation ScrollTrigger : Grille de projets académiques (Fade-up Staggered)
    gsap.to(".grid-card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // Apparition en cascade
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%", // Déclenche quand le haut de la grille atteint 80% de l'écran bas
            toggleActions: "play none none reverse"
        }
    });

});
