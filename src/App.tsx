import { useEffect, useRef, useState } from 'react';
import { Menu, MessageSquare, Compass, PhoneCall } from 'lucide-react';
import { TabId } from './types';
import RevealLayer from './components/RevealLayer';
import InteractivePanel from './components/InteractivePanel';

// Asset URLs specified in guidelines
const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

export default function App() {
  const SPOTLIGHT_R = 260;

  // Track cursor coordinates with smoothing (lerp)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Modal / Tab States for the interactive panel
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>('about');

  // Trigger language indicator or Mongolian subtitle toggle
  const [langMongolian, setLangMongolian] = useState<boolean>(false);

  useEffect(() => {
    // Initial positions (center-ish screen so the spotlight is beautifully pre-rendered)
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2.2;
    mouse.current = { x: initX, y: initY };
    smooth.current = { x: initX, y: initY };
    setCursorPos({ x: initX, y: initY });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Eased motion tracking loop
    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Helper to open a specific tab in the interactive panel
  const openTab = (tab: TabId) => {
    setActiveTab(tab);
    setPanelOpen(true);
  };

  return (
    <div 
      className="min-h-screen bg-white tracking-[-0.02em] select-none text-white relative overflow-hidden" 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      
      {/* Fixed Navigation Header */}
      <nav 
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5"
      >
        {/* Brand Logo & Wordmark (Left) */}
        <div 
          onClick={() => openTab('about')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <svg 
            className="w-[26px] h-[26px] fill-[#ffffff] transition-transform duration-500 group-hover:rotate-180" 
            viewBox="0 0 256 256"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic tracking-tight hover:text-[#ff9f68] transition-colors">
            Khangal
          </span>
        </div>

        {/* Center Pill Navigation (Desktop Only) */}
        <div 
          id="center-pill"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5 items-center gap-1 shadow-lg shadow-black/10"
        >
          {[
            { id: 'course', label: 'Curriculum' },
            { id: 'geology', label: 'Math Lab' },
            { id: 'plans', label: 'Coding Suite' },
            { id: 'cinema', label: 'Live Sessions' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => openTab(item.id as TabId)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-white/20 hover:text-white ${
                panelOpen && activeTab === item.id 
                  ? 'bg-white text-gray-900 shadow' 
                  : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button & Language Switcher (Right) */}
        <div className="flex items-center gap-3">
          {/* Custom language indicator for bilingual users */}
          <button 
            onClick={() => setLangMongolian(!langMongolian)}
            className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            {langMongolian ? 'EN' : 'MGL'}
          </button>

          <button
            onClick={() => openTab('contact')}
            className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Contact
          </button>

          {/* Mobile hamburger menu (opens the panel by default to first tab) */}
          <button 
            onClick={() => openTab('about')}
            className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Full-Screen Section */}
      <section 
        id="hero-section"
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: '100dvh' }}
      >
        {/* Layer 1: Base Image (z-10) with Ken Burns zoom-out effect */}
        <div 
          id="base-background"
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Layer 2: Reveal Layer (z-30) containing secondary texture and spotlight masking */}
        <RevealLayer 
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          spotlightRadius={SPOTLIGHT_R}
        />

        {/* Subtle decorative grid/dots over backgrounds to give premium feel */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/40 z-35 pointer-events-none" />

        {/* Layer 3: Heading (z-50) */}
        <div 
          id="hero-heading-container"
          className="absolute top-[18%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50 select-none"
        >
          <h1 className="text-white leading-[0.95]">
            <span 
              className="block font-playfair italic font-normal text-6xl sm:text-7xl md:text-8xl hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Logic holds
            </span>
            <span 
              className="block font-normal text-6xl sm:text-7xl md:text-8xl -mt-2 hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of code
            </span>
          </h1>

          {/* Subtitle connecting Khangal's teaching role */}
          <p className="text-xs sm:text-sm tracking-widest text-[#ff9f68] uppercase font-semibold mt-4 sm:mt-6 bg-black/45 border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-md">
            {langMongolian 
              ? "Хангал • Математик болон Програмчлалын Багш" 
              : "Khangal • Mathematics & Computer Science Educator"
            }
          </p>
        </div>

        {/* Layer 4: Bottom-Left Paragraph (z-50) */}
        <div 
          id="bottom-left-card"
          className="hidden sm:block absolute bottom-14 left-14 max-w-[280px] z-50 bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-2xl hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-xs text-[#ff9f68] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Logical Strata
          </p>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            {langMongolian 
              ? "Би бол математик, инженерчлэлээр мэргэшсэн 25 настай багш юм. Хөрсний давхарга бүр манай гарагийн түүхийг хадгалдаг шиг, код бичих нь маш нарийн логик ба цаг хугацааны давхарга дээр бүтдэг гэдэгт би итгэдэг."
              : "I am a 25-year-old educator specializing in mathematics and engineering. Much like geological strata, I believe coding is built upon deep layers of structured logic and time."
            }
          </p>
        </div>

        {/* Layer 5: Bottom-Right Block (z-50) */}
        <div 
          id="bottom-right-card"
          className="absolute bottom-14 left-5 right-5 sm:left-auto sm:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-5 z-50 bg-black/45 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            {langMongolian 
              ? "Ангиас гадна би Avengers киноны ертөнцөөр аялах дуртай. Тэндээс дээд математик, Python кодчилолоор шийддэгтэй ижил нарийн логик тогтолцоог олж хардаг."
              : "Beyond the classroom, I'm immersed in the Avengers universe—finding the same complex patterns in grand narratives that I solve in advanced calculus and Python."
            }
          </p>
          
          <button 
            onClick={() => openTab('course')}
            className="w-full sm:w-auto text-center bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Start Teaching
          </button>
        </div>

        {/* Decorative Scroll Indicator (z-50) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white"></div>
          <span className="text-[10px] text-white uppercase tracking-[0.3em]">Scroll to Discover</span>
        </div>

        {/* Ambient indicator for mouse reveal feature */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-white/60 text-[11px] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f68] animate-ping" />
          Move cursor to peel back the layers & reveal secondary geology strata
        </div>

      </section>

      {/* Interactive Portal / Dashboard modal */}
      {panelOpen && (
        <InteractivePanel 
          activeTab={activeTab}
          onClose={() => setPanelOpen(false)}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      )}

    </div>
  );
}
