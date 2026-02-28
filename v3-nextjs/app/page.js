"use client";

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

// ─── PALETTE JAPANDI ─────────────────────────────────────────────
const PALETTE = {
    wall: '#F9F8F6',
    floor: '#EBE5DF',
    woodLight: '#D9C5B2', // Frêne clair / Chêne
    woodDark: '#8B7355',  // Noyer
    fabric_white: '#FAFAFA',
    fabric_sage: '#A9B3A7', // Vert sauge doux
    black: '#2C2B2A',
    canvas: '#EAE6E1',
    books: ['#CDBDA7', '#97A096', '#E2DCD3', '#8C7A6B']
};

// ─── COMPOSANTS 3D ───────────────────────────────────────────────

function InteractiveGroup({ position, rotation, name, label, activeSection, setSection, hovered, setHovered, children }) {
    const groupRef = useRef();
    const isHovered = hovered === name;
    const isActive = activeSection === name;

    useFrame((state, delta) => {
        // Lerp pour effet de "pop" au hover / scale quand actif
        const targetScale = isActive ? 1.05 : isHovered ? 1.02 : 1.0;
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Léger flottement si hovered
        if (isHovered && !isActive) {
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1] + 0.1, 0.1);
        } else {
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1], 0.1);
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                setSection(isActive ? null : name);
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(name);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                if (hovered === name) setHovered(null);
                document.body.style.cursor = 'auto';
            }}
        >
            {children}

            {/* Label 3D au-dessus de l'objet */}
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.25}
                color={isActive ? PALETTE.black : PALETTE.woodDark}
                anchorY="bottom"
                opacity={isHovered || isActive ? 1 : 0}
                transparent
            >
                {label}
            </Text>
        </group>
    );
}

// 🛏️ LE LIT (Section "About")
function Bed() {
    return (
        <group>
            {/* Cadre en bois */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 0.2, 3.2]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            {/* Tête de lit */}
            <mesh position={[0, 0.8, -1.5]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 1, 0.2]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            {/* Matelas */}
            <mesh position={[0, 0.5, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.3, 2.8]} />
                <meshStandardMaterial color={PALETTE.fabric_white} roughness={1} />
            </mesh>
            {/* Couverture (Sauge) */}
            <mesh position={[0, 0.52, 0.6]} castShadow receiveShadow>
                <boxGeometry args={[2.05, 0.31, 1.8]} />
                <meshStandardMaterial color={PALETTE.fabric_sage} roughness={0.8} />
            </mesh>
            {/* Oreillers */}
            <mesh position={[-0.5, 0.7, -1.1]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.15, 0.5]} />
                <meshStandardMaterial color={PALETTE.fabric_white} roughness={1} />
            </mesh>
            <mesh position={[0.5, 0.7, -1.1]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.15, 0.5]} />
                <meshStandardMaterial color={PALETTE.fabric_white} roughness={1} />
            </mesh>
        </group>
    );
}

// 💻 LE BUREAU (Section "Works")
function Desk() {
    return (
        <group>
            {/* Plateau */}
            <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 0.1, 1.2]} />
                <meshStandardMaterial color={PALETTE.woodDark} roughness={0.7} />
            </mesh>
            {/* Pieds */}
            <mesh position={[-1.1, 0.65, -0.4]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 1.3, 0.1]} />
                <meshStandardMaterial color={PALETTE.black} roughness={0.5} />
            </mesh>
            <mesh position={[1.1, 0.65, -0.4]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 1.3, 0.1]} />
                <meshStandardMaterial color={PALETTE.black} roughness={0.5} />
            </mesh>
            <mesh position={[-1.1, 0.65, 0.4]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 1.3, 0.1]} />
                <meshStandardMaterial color={PALETTE.black} roughness={0.5} />
            </mesh>
            <mesh position={[1.1, 0.65, 0.4]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 1.3, 0.1]} />
                <meshStandardMaterial color={PALETTE.black} roughness={0.5} />
            </mesh>
            {/* Ordinateur Modèle (Mac) */}
            <mesh position={[0, 1.5, -0.2]} rotation={[0.1, 0, 0]} castShadow>
                <boxGeometry args={[0.9, 0.6, 0.05]} />
                <meshStandardMaterial color={'#E0E0E0'} roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Base de l'ordi */}
            <mesh position={[0, 1.35, -0.3]} castShadow>
                <boxGeometry args={[0.3, 0.1, 0.2]} />
                <meshStandardMaterial color={'#D0D0D0'} roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Clavier / Souris */}
            <mesh position={[0, 1.36, 0.2]} castShadow>
                <boxGeometry args={[0.6, 0.02, 0.2]} />
                <meshStandardMaterial color={'#FFFFFF'} roughness={0.8} />
            </mesh>
            <mesh position={[0.5, 1.36, 0.2]} castShadow>
                <boxGeometry args={[0.1, 0.02, 0.15]} />
                <meshStandardMaterial color={'#FFFFFF'} roughness={0.8} />
            </mesh>
        </group>
    );
}

// 📚 LA BIBLIOTHÈQUE (Section "Skills")
function Bookshelf() {
    return (
        <group>
            {/* Structure */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 3, 0.5]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            {/* Intérieur creusé (illusion low-poly) */}
            <mesh position={[0, 1.5, 0.1]} receiveShadow>
                <boxGeometry args={[1.3, 2.8, 0.4]} />
                <meshStandardMaterial color={PALETTE.woodDark} roughness={0.9} />
            </mesh>
            {/* Etagères */}
            <mesh position={[0, 0.8, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[1.3, 0.05, 0.4]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.5, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[1.3, 0.05, 0.4]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            <mesh position={[0, 2.2, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[1.3, 0.05, 0.4]} />
                <meshStandardMaterial color={PALETTE.woodLight} roughness={0.9} />
            </mesh>
            {/* Quelques livres */}
            <mesh position={[-0.4, 1.0, 0.1]} castShadow>
                <boxGeometry args={[0.15, 0.35, 0.25]} />
                <meshStandardMaterial color={PALETTE.books[0]} />
            </mesh>
            <mesh position={[-0.2, 1.0, 0.1]} castShadow>
                <boxGeometry args={[0.1, 0.4, 0.25]} />
                <meshStandardMaterial color={PALETTE.books[1]} />
            </mesh>
            <mesh position={[0.3, 1.7, 0.1]} rotation={[0, 0, 0.2]} castShadow>
                <boxGeometry args={[0.1, 0.35, 0.25]} />
                <meshStandardMaterial color={PALETTE.books[2]} />
            </mesh>
        </group>
    );
}

// 🖼️ LE TABLEAU (Section "Vision")
function Painting() {
    return (
        <group>
            {/* Cadre */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.8, 2.2, 0.1]} />
                <meshStandardMaterial color={PALETTE.black} roughness={0.8} />
            </mesh>
            {/* Toile */}
            <mesh position={[0, 0, 0.06]}>
                <boxGeometry args={[1.6, 2.0, 0.02]} />
                <meshStandardMaterial color={PALETTE.canvas} roughness={1} />
            </mesh>
            {/* Art abstrait sur la toile */}
            <mesh position={[0, -0.3, 0.08]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color={PALETTE.woodDark} roughness={0.5} />
            </mesh>
            <mesh position={[0.2, 0.4, 0.08]}>
                <boxGeometry args={[0.5, 0.5, 0.02]} />
                <meshStandardMaterial color={PALETTE.fabric_sage} roughness={0.5} />
            </mesh>
        </group>
    );
}

// ─── LA SCÈNE COMPLÈTE ───────────────────────────────────────────
function RoomScene({ activeSection, setSection, hovered, setHovered }) {
    return (
        <group position={[0, -1, 0]}>
            {/* Mur Arrière */}
            <mesh position={[0, 2, -3]} receiveShadow>
                <boxGeometry args={[10, 6, 0.2]} />
                <meshStandardMaterial color={PALETTE.wall} />
            </mesh>
            {/* Mur Gauche */}
            <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[6, 6, 0.2]} />
                <meshStandardMaterial color={PALETTE.wall} />
            </mesh>

            {/* Les Objets Interactifs */}
            <InteractiveGroup
                name="about" label="ABOUT ME"
                position={[-2, 0, -1]} rotation={[0, 0.2, 0]}
                activeSection={activeSection} setSection={setSection} hovered={hovered} setHovered={setHovered}
            >
                <Bed />
            </InteractiveGroup>

            <InteractiveGroup
                name="works" label="PROJECTS"
                position={[2, 0, 0]} rotation={[0, -0.3, 0]}
                activeSection={activeSection} setSection={setSection} hovered={hovered} setHovered={setHovered}
            >
                <Desk />
            </InteractiveGroup>

            <InteractiveGroup
                name="skills" label="SKILLS"
                position={[-3, 0, 2]} rotation={[0, Math.PI / 2.5, 0]}
                activeSection={activeSection} setSection={setSection} hovered={hovered} setHovered={setHovered}
            >
                <Bookshelf />
            </InteractiveGroup>

            {/* Le tableau est accroché au mur arrière */}
            <InteractiveGroup
                name="vision" label="PHILOSOPHY"
                position={[0, 2.5, -2.8]} rotation={[0, 0, 0]}
                activeSection={activeSection} setSection={setSection} hovered={hovered} setHovered={setHovered}
            >
                <Painting />
            </InteractiveGroup>

            {/* Ombre douce au sol */}
            <ContactShadows resolution={1024} scale={20} blur={2.5} opacity={0.4} far={10} color={PALETTE.woodDark} />

            {/* Éclairage très doux et naturel type soleil levant */}
            <ambientLight intensity={1.5} color={'#fffdfa'} />
            <directionalLight
                position={[5, 8, 3]}
                intensity={1.2}
                color={'#ffe5cc'}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <Environment preset="city" />
        </group>
    );
}

// ─── PAGE PRINCIPALE & UI ────────────────────────────────────────
export default function Home() {
    const [activeSection, setActiveSection] = useState(null);
    const [hovered, setHovered] = useState(null);

    // Le contenu à afficher selon la section cliquée (Fusion Japandi x Alche)
    const sectionContent = {
        about: {
            title: "PARCOURS & VISION",
            subtitle: "DE LA MÉCANIQUE À L'INFORMATIQUE",
            content: (
                <div className="space-y-6 text-left">
                    <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
                        Après l&apos;obtention de mon baccalauréat scientifique SM avec mention Bien en Guinée (2023), j&apos;ai été orienté en génie mécanique à l&apos;université Gamal Abdel Nasser de Conakry.
                    </p>
                    <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
                        Déterminé à poursuivre ma véritable passion, j&apos;ai complété ma L1 et L2 en mécanique avant d&apos;intégrer le BUT Informatique à Aix-Marseille Université (site d&apos;Arles) en 2025.
                    </p>
                    <div className="pt-4 border-t border-neutral-200">
                        <h4 className="font-['Space_Mono'] text-xs text-neutral-800 tracking-widest uppercase mb-2">Objectif</h4>
                        <p className="font-sans text-sm text-neutral-600 font-medium tracking-wide">
                            Devenir ingénieur en IA. Expérience en entreprise, puis création d&apos;une start-up dédiée aux solutions d&apos;intelligence artificielle.
                        </p>
                    </div>
                </div>
            )
        },
        works: {
            title: "PROJETS RÉCENTS",
            subtitle: "DÉVELOPPEMENT & CRÉATION",
            content: (
                <div className="space-y-4 text-left w-full">
                    {/* Featured Project */}
                    <div className="group border-b border-neutral-200 pb-4 mb-4 hover:border-black transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-['Space_Mono'] text-xs text-neutral-500">2026</span>
                            <span className="font-['Space_Mono'] text-[10px] bg-neutral-100 px-2 py-1 rounded text-neutral-600 uppercase tracking-wider">C++ / 1er Prix</span>
                        </div>
                        <h3 className="font-serif text-xl text-neutral-900 group-hover:translate-x-2 transition-transform">HYPOXIA (Hackathon DevArt)</h3>
                    </div>
                    {/* Academic Projects (Alche style list) */}
                    <div className="group border-b border-neutral-100 pb-3 hover:border-neutral-400 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-['Space_Mono'] text-xs text-neutral-400 w-12">SAE 3</span>
                            <h4 className="font-serif text-base text-neutral-700 flex-1 group-hover:translate-x-2 transition-transform">Base de Données</h4>
                            <span className="font-['Space_Mono'] text-[10px] text-neutral-400">SQL</span>
                        </div>
                    </div>
                    <div className="group border-b border-neutral-100 pb-3 hover:border-neutral-400 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-['Space_Mono'] text-xs text-neutral-400 w-12">SAE 2</span>
                            <h4 className="font-serif text-base text-neutral-700 flex-1 group-hover:translate-x-2 transition-transform">Algorithmique</h4>
                            <span className="font-['Space_Mono'] text-[10px] text-neutral-400">C++</span>
                        </div>
                    </div>
                    <div className="group border-b border-neutral-100 pb-3 hover:border-neutral-400 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-['Space_Mono'] text-xs text-neutral-400 w-12">SAE 1</span>
                            <h4 className="font-serif text-base text-neutral-700 flex-1 group-hover:translate-x-2 transition-transform">Site Web</h4>
                            <span className="font-['Space_Mono'] text-[10px] text-neutral-400">HTML / CSS</span>
                        </div>
                    </div>
                </div>
            )
        },
        skills: {
            title: "COMPÉTENCES",
            subtitle: "TECH & SOFT SKILLS",
            content: (
                <div className="text-left w-full flex flex-col gap-6">
                    <div>
                        <h4 className="font-['Space_Mono'] text-xs text-neutral-800 tracking-widest uppercase mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {['C++', 'HTML', 'CSS', 'SQL', 'Bases de données', 'Algorithmique'].map(skill => (
                                <span key={skill} className="px-3 py-1.5 border border-neutral-200 rounded-full font-['Space_Mono'] text-xs text-neutral-700 bg-white/50 hover:bg-white hover:border-neutral-400 transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-['Space_Mono'] text-xs text-neutral-800 tracking-widest uppercase mb-3">Humaines</h4>
                        <div className="flex flex-col gap-3 font-sans text-sm text-neutral-600 font-medium">
                            <span className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full"></span> Adaptation et Persévérance
                            </span>
                            <span className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full"></span> Travail en Équipe
                            </span>
                            <span className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full"></span> Communication & Gestion de projet
                            </span>
                        </div>
                    </div>
                </div>
            )
        },
        vision: {
            title: "PHILOSOPHIE",
            subtitle: "(HUMAN) THINKER",
            content: (
                <div className="text-left space-y-4">
                    <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-900 border-l-2 border-neutral-300 pl-4 py-1 italic">
                        &quot;Architecturer des systèmes complexes, du Génie Mécanique à l&apos;Intelligence Artificielle.&quot;
                    </p>
                    <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed font-medium pt-2">
                        L&apos;élégance naît de la simplicité. Mon but est de mêler la rigueur scientifique héritée de la mécanique à l&apos;infinité créative du code pour forger l&apos;avenir.
                    </p>
                </div>
            )
        }
    };

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F9F8F6]">

            {/* ── SCÈNE 3D ── */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows camera={{ position: [0, 4, 8], fov: 40 }}>
                    <RoomScene
                        activeSection={activeSection}
                        setSection={setActiveSection}
                        hovered={hovered}
                        setHovered={setHovered}
                    />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2 - 0.1}
                        minAzimuthAngle={-Math.PI / 4}
                        maxAzimuthAngle={Math.PI / 4}
                        dampingFactor={0.05}
                    />
                </Canvas>
            </div>

            {/* ── UI JAPANDI x ALCHE ── */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">

                {/* LOGO & RESPONSABILITÉ */}
                <header className="flex justify-between items-start">
                    <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-neutral-900 drop-shadow-sm">
                        BARRY BAILO
                    </h1>
                    <div className="text-right hidden md:block">
                        <p className="font-['Space_Mono'] text-xs text-neutral-500 uppercase tracking-widest">BUT1 Informatique</p>
                        <p className="font-['Space_Mono'] text-xs text-neutral-400 uppercase tracking-widest mt-1">Aix-Marseille Université</p>
                    </div>
                </header>

                {/* CONTENU DYNAMIQUE (Glassmorphism) */}
                <footer className="w-full flex justify-center mb-4 md:mb-8 transition-all duration-500">
                    <div className={`
            bg-white/70 backdrop-blur-xl
            border border-neutral-200/50 
            shadow-[0_16px_40px_rgba(0,0,0,0.04)] 
            rounded-3xl 
            px-8 py-8 md:px-12 md:py-10
            max-w-2xl w-full text-center
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            pointer-events-auto
            ${activeSection ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-90 scale-95'}
          `}>
                        {activeSection ? (
                            <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full">
                                <p className="font-['Space_Mono'] text-[10px] text-neutral-500 tracking-widest uppercase mb-1">
                                    {sectionContent[activeSection].subtitle}
                                </p>
                                <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-8 tracking-tight">
                                    {sectionContent[activeSection].title}
                                </h2>

                                {/* Injection du JSX dynamique */}
                                <div className="flex-1 w-full flex items-center justify-center">
                                    {sectionContent[activeSection].content}
                                </div>

                                <button
                                    onClick={() => setActiveSection(null)}
                                    className="mt-8 mx-auto font-['Space_Mono'] text-[10px] text-neutral-500 tracking-widest uppercase hover:text-black transition-colors border-b border-transparent hover:border-black pb-1 inline-flex items-center gap-2"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    Fermer l&apos;exploration
                                </button>
                            </div>
                        ) : (
                            <div className="animate-in fade-in duration-500 py-4">
                                <p className="font-serif text-xl md:text-2xl text-neutral-800 tracking-wide mb-2 italic">
                                    {hovered ? `Explorer : ${hovered}` : "De la Mécanique à l'Informatique"}
                                </p>
                                <p className="font-['Space_Mono'] text-[11px] text-neutral-500 uppercase tracking-widest">
                                    {hovered ? "Cliquez pour ouvrir" : "Cliquez sur les éléments 3D"}
                                </p>
                            </div>
                        )}
                    </div>
                </footer>

            </div>

        </main>
    );
}
