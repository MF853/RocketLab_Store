import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 shadow-lg border-t border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center justify-center bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <img
              src="https://static.wixstatic.com/media/17abf2_d761be71b6264685adf250c96d2adbda~mv2.png/v1/fill/w_214,h_74,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Rocket%20Lab-03.png"
              alt="Rocket Lab Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="flex items-center justify-center bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <img
              src="https://static.wixstatic.com/media/17abf2_8e48d1e50fc249a29eb1a2dfde7d9fc6~mv2.png/v1/fill/w_144,h_48,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logos%20rocket%20lab-05.png"
              alt="Rocket Lab Secondary Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Rocket Lab.</p>
        </div>
      </div>
    </footer>
  );
}; 