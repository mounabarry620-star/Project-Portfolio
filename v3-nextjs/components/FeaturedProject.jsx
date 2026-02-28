"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Composant Bouton Magnétique
const MagneticButton = ({ children, href }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Déplacement magnétique basé sur la position du curseur
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Force d'attraction (plus c'est élevé, plus ça bouge)
            const moveX = (clientX - centerX) * 0.3;
            const moveY = (clientY - centerY) * 0.3;

            gsap.to(button, {
                x: moveX,
                y: moveY,
                duration: 0.5,
                ease: 'power3.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)', // Rebond "boing" au retour
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            className={`
        relative inline-flex items-center gap-2 px-8 py-4 
        rounded-full font-semibold uppercase tracking-widest text-[#00ffcc]
        border border-[#00ffcc]/50 bg-black/50 backdrop-blur-md
        transition-colors duration-300 hover:bg-[#00ffcc]/10
        shadow-[0_0_15px_rgba(0,255,204,0.1),inset_0_0_15px_rgba(0,255,204,0.1)]
        hover:shadow-[0_0_30px_rgba(0,255,204,0.3),inset_0_0_20px_rgba(0,255,204,0.2)]
      `}
            style={{ willChange: 'transform' }}
        >
            <Github size={20} className="stroke-[1.5px]" />
            <span>{children}</span>
        </a>
    );
};

export default function FeaturedProject() {
    const sectionRef = useRef(null);
    const textContainerRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // 1. Animation d'entrée des textes (Stagger Fade-Up)
        const elements = textContainerRef.current.children;
        gsap.fromTo(elements,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%", // Déclenche à 75% du viewport
                    toggleActions: "play none none reverse"
                }
            }
        );

        // 2. Animation d'entrée du conteneur Image (Reveal depuis la droite)
        gsap.fromTo(imageContainerRef.current,
            { opacity: 0, scale: 0.9, x: 50 },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // 3. Effet d'Image Parallax
        gsap.fromTo(imageRef.current,
            { yPercent: -15 }, // Démarre un peu plus haut
            {
                yPercent: 15, // Finit un peu plus bas
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom", // Quand le haut de la section touche le bas de l'écran
                    end: "bottom top",   // Quand le bas de la section touche le haut de l'écran
                    scrub: true,         // Synchronisé avec le scroll
                }
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

                {/* Colonne de Gauche : Textes et UI (prend 5 colonnes sur grand écran) */}
                <div
                    ref={textContainerRef}
                    className="lg:col-span-5 flex flex-col items-start justify-center order-2 lg:order-1"
                >
                    {/* Sous-titre */}
                    <p className="text-[#00ffcc] font-medium tracking-widest uppercase mb-4 text-sm md:text-base drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">
                        1er Prix Hackathon DevArt 2026
                    </p>

                    {/* Titre Impactant */}
                    <h2 className="text-[12vw] lg:text-[6vw] font-black leading-[0.85] text-white uppercase mb-8">
                        HYPO<br className="hidden lg:block" />XIA
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-md">
                        Un défi technique immersif en C++ utilisant Raylib. Le projet HYPOXIA plonge le joueur dans un environnement où la survie dépend d&apos;algorithmes de gestion de ressources en temps réel.
                    </p>

                    {/* Badges Glassmorphism */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {['C++', 'Raylib', 'Game Design', 'Data Structs'].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-200 bg-white/5 border border-white/20 backdrop-blur-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Bouton Magnétique Github */}
                    <MagneticButton href="https://github.com/mounabarry620-star/Project-Portfolio">
                        Code Source
                    </MagneticButton>
                </div>

                {/* Colonne de Droite : Image Parallax (prend 7 colonnes sur grand écran) */}
                <div className="lg:col-span-7 order-1 lg:order-2 w-full">
                    <div
                        ref={imageContainerRef}
                        className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] rounded-4xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                    >
                        {/* L&apos;image elle-même, un peu plus grande pour permettre le parallax */}
                        <div
                            ref={imageRef}
                            className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
                        >
                            {/* Utilisation de next/image avec un placeholder dynamique ou l'image fournie du CV si souhaité */}
                            {/* Note: Remplacer par une vraie image screenshot HYPOXIA */}
                            <div className="w-full h-full bg-linear-to-br from-indigo-900/50 via-black to-[#00ffcc]/20 flex items-center justify-center border-2 border-dashed border-[#00ffcc]/30">
                                <span className="text-[#00ffcc] font-mono tracking-widest opacity-50 uppercase text-xs">Simulated Render Context</span>
                                {/* Si vous avez l'image : <Image src="/path-to-hypoxia.jpg" alt="Hypoxia Preview" fill className="object-cover" /> */}
                            </div>
                        </div>

                        {/* Overlay Glassmorphism subtil interne */}
                        <div className="absolute inset-0 bg-linear-to-tr from-black/60 to-transparent pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
