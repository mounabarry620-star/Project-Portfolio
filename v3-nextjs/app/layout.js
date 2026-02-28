import './globals.css';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
    title: 'BARRY BAILO | Engineering The Future',
    description: 'De la Mécanique à l\'Informatique. Portfolio interactif 3D.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            {/* 
              Japandi aesthetic: soft beige background (#F9F8F6), very clean.
              We removed the "dark" class and all former dark-mode components 
              (Preloader, Navbar, ScrollIndicator, GlobalCanvas) 
              to let the Spline scene and minimalist UI breathe. 
            */}
            <body className={`${spaceGrotesk.className} antialiased overflow-hidden bg-[#F9F8F6]`}>
                {children}
            </body>
        </html>
    );
}

