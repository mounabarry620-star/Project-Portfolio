"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Terminal, Code2, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 's1-01',
        title: 'S1.01 - Implémentation du Besoin Client',
        description: 'Analyse des besoins et modélisation de solutions pour un client. Création de cahiers des charges et maquettes interactives.',
        icon: <Users className="w-8 h-8 text-[#00ffcc] mb-4" strokeWidth={1.5} />,
        spanClasses: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1', // Large card
        techs: ['UML', 'Figma', 'Agile']
    },
    {
        id: 's1-02',
        title: 'S1.02 - Algorithmique et Programmation',
        description: 'Bases de l&apos;algorithmique et développement d&apos;applications simples en C++. Structures de contrôle et de données.',
        icon: <Code2 className="w-8 h-8 text-[#00ffcc] mb-4" strokeWidth={1.5} />,
        spanClasses: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-2 flex flex-col', // Tall card
        techs: ['C++', 'Algorithmie']
    },
    {
        id: 's1-03',
        title: 'S1.03 - Installation d&apos;un Poste de Travail',
        description: 'Configuration et déploiement de machines de développement. Gestion des OS et scripts d&apos;automatisation.',
        icon: <Terminal className="w-8 h-8 text-[#00ffcc] mb-4" strokeWidth={1.5} />,
        spanClasses: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1', // Normal card
        techs: ['Linux', 'Bash', 'Réseau']
    },
    {
        id: 's1-04',
        title: 'S1.04 - Création d&apos;une Base de Données',
        description: 'Modélisation relationnelle et création de schémas de base de données. Écriture de requêtes SQL complexes.',
        icon: <Database className="w-8 h-8 text-[#00ffcc] mb-4" strokeWidth={1.5} />,
        spanClasses: 'col-span-1 md:col-span-2 lg:col-span-1 row-span-1', // Normal card
        techs: ['SQL', 'PostgreSQL', 'MCD']
    }
];

export default function AcademicProjects() {
    const containerRef = useRef(null);

    useEffect(() => {
        const cards = containerRef.current.querySelectorAll('.bento-card');

        gsap.fromTo(cards,
            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1, // Délai entre chaque carte
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%", // Déclenche quand le top du conteneur atteint 80% du bas de l'écran
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10">
            <div className="max-w-6xl mx-auto">

                {/* En-tête de section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Projets <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ffcc] to-blue-500">Académiques</span>
                    </h2>
                    <p className="text-gray-400 font-light max-w-2xl text-lg">
                        Aperçu des Situations d&apos;Apprentissage et d&apos;Évaluation (SAE) réalisées durant la première année d&apos;études, formant le socle de mes compétences techniques.
                    </p>
                </div>

                {/* Grille Bento */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`
                bento-card group relative overflow-hidden rounded-3xl p-8 
                bg-neutral-900/40 backdrop-blur-sm border border-white/5
                transition-transform duration-500 hover:-translate-y-1
                ${project.spanClasses}
              `}
                        >
                            {/* Effet de lueur au survol (Glow) */}
                            <div className="absolute inset-0 bg-radial from-[#00ffcc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl"></div>

                            <div className="relative z-10 h-full flex flex-col">
                                {project.icon}

                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 font-light text-sm grow mb-6">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs font-['Space_Mono'] text-[#00ffcc] bg-[#00ffcc]/10 px-2 py-1 rounded-md border border-[#00ffcc]/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
