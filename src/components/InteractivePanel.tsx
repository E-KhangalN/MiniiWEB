import { useState, useEffect } from 'react';
import { TabId, Course, MovieQuote } from '../types';
import { 
  X, Calculator, Code2, Film, User2, Compass, 
  RotateCcw, Sparkles, Trophy, BookOpen, Layers, Play 
} from 'lucide-react';

interface InteractivePanelProps {
  activeTab: TabId;
  onClose: () => void;
  onTabChange: (tab: TabId) => void;
}

const COURSES: Course[] = [
  {
    id: 'm1',
    title: 'Advanced Calculus & Analytical Geometry',
    category: 'Math',
    level: 'High School & Olympiad',
    description: 'Peeling back the continuous curves that shape physical space and engineering structures.',
    topics: ['Limits & Derivatives', 'Vector Analysis', '3D Coordinates', 'Differential Equations']
  },
  {
    id: 'm2',
    title: 'Discrete Mathematics & Boolean Logic',
    category: 'Math',
    level: 'Foundational',
    description: 'The mathematical bedrock of computation, algorithms, and digital circuits.',
    topics: ['Set Theory', 'Graph Algorithms', 'Combinatorics', 'Truth Tables & Proofs']
  },
  {
    id: 'c1',
    title: 'Modern Web Engineering & React Frameworks',
    category: 'Code',
    level: 'Beginner to Intermediate',
    description: 'Building beautiful high-performance interfaces from scratch using TypeScript and React.',
    topics: ['React Hooks', 'State Engines', 'Tailwind Layouts', 'Asynchronous API Proxies']
  },
  {
    id: 'c2',
    title: 'Data Structures & Algorithmic Excellence',
    category: 'Code',
    level: 'Competitive / Advanced',
    description: 'Optimizing computation speed and memory usage through classic tree, graph, and queue paradigms.',
    topics: ['Big-O Optimization', 'Recursion & Dynamic Programming', 'Binary Search Trees', 'Sort Routines']
  }
];

const AVENGERS_QUOTES: MovieQuote[] = [
  {
    quote: "Part of the journey is the end.",
    character: "Tony Stark",
    movie: "Avengers: Endgame"
  },
  {
    quote: "I can do this all day.",
    character: "Steve Rogers",
    movie: "Captain America: Civil War"
  },
  {
    quote: "In my defense, it's a very powerful spell.",
    character: "Doctor Strange",
    movie: "Avengers: Infinity War"
  },
  {
    quote: "The hardest choices require the strongest wills.",
    character: "Thanos",
    movie: "Avengers: Infinity War"
  },
  {
    quote: "Compromise where you can. Where you can't, don't.",
    character: "Sharon Carter",
    movie: "Captain America: Civil War"
  }
];

// Interactive matching between Avengers and Teacher's disciplines
const HERO_ROLES = [
  {
    hero: "Iron Man (Tony Stark)",
    power: "Infinite Tech & Coding",
    description: "The ultimate developer. He writes, compiles, and deploys high-fidelity clean code into cybernetic nanotech armor on the fly.",
    affinity: "Coding / Systems Architecture",
    quote: "I am Iron Man."
  },
  {
    hero: "Doctor Strange",
    power: "Multidimensional Geometry",
    description: "Spells are mathematical matrices. He maps geometric fractals, temporal loops, and complex matrices to manipulate reality.",
    affinity: "Calculus & Linear Algebra",
    quote: "There was no other way."
  },
  {
    hero: "Captain America",
    power: "Immutable Architecture",
    description: "Unbreakable principles and strict logic. He leads with robust interfaces, solid standards, and clean state containment.",
    affinity: "Design Patterns & SOLID Principles",
    quote: "Avengers! Assemble."
  },
  {
    hero: "Bruce Banner (Hulk)",
    power: "Multi-threaded Processing",
    description: "Normally calm, but when memory overflow or heavy computational threads spawn, he accelerates to raw brute-force computing power.",
    affinity: "Dynamic Thread Optimization",
    quote: "That's my secret, Cap: I'm always angry."
  }
];

export default function InteractivePanel({ activeTab, onClose, onTabChange }: InteractivePanelProps) {
  // Math Graph state
  const [amplitude, setAmplitude] = useState<number>(30);
  const [frequency, setFrequency] = useState<number>(0.05);
  const [phase, setPhase] = useState<number>(0);
  
  // Cinema state
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const [isAssembled, setIsAssembled] = useState<boolean>(false);

  // Animation trigger for quote
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const rotateQuote = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % AVENGERS_QUOTES.length);
      setIsChanging(false);
    }, 200);
  };

  // Math graph path generator
  const generateSinePath = () => {
    let points = [];
    for (let x = 0; x <= 300; x += 2) {
      const y = 80 + Math.sin(x * frequency + phase) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Animate the math graph slightly in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="interactive-panel-overlay"
      className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300"
    >
      <div 
        id="interactive-panel-card"
        className="w-full max-w-4xl bg-[#111115]/90 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[75vh] shadow-2xl text-white hero-anim hero-reveal"
      >
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-5 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#e8702a] flex items-center justify-center font-bold font-playfair italic text-white shadow-md shadow-[#e8702a]/20">
                K
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-wide">KHANGAL</h3>
                <p className="text-[10px] text-white/40 tracking-wider uppercase">Math & Code Educator</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'about', label: 'About Khangal', icon: User2, sub: 'Хувийн танилцуулга' },
                { id: 'course', label: 'Courses & Curriculum', icon: BookOpen, sub: 'Хөтөлбөрүүд' },
                { id: 'geology', label: 'Math Coordinate Lab', icon: Calculator, sub: 'Математик лаб' },
                { id: 'cinema', label: 'Cinema & Avengers', icon: Film, sub: 'Дуртай кино' },
                { id: 'plans', label: 'Learning Paths', icon: Layers, sub: 'Сурах төлөвлөгөө' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id as TabId)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 group relative ${
                      isActive 
                        ? 'bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/15' 
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`} />
                    <div className="leading-tight">
                      <p className="text-xs font-semibold">{item.label}</p>
                      <p className={`text-[9px] ${isActive ? 'text-white/75' : 'text-white/30'}`}>{item.sub}</p>
                    </div>
                    {isActive && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e8702a]" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-white/70">Daily Logic Quote</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed italic">
                "Equations are the layers of math that describe the universe's ultimate code."
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-transparent to-black/30">
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {activeTab === 'about' && 'About Me / Танилцуулга'}
                {activeTab === 'course' && 'Curriculum / Заадаг Хичээлүүд'}
                {activeTab === 'geology' && 'Interactive Math Coordinate Lab'}
                {activeTab === 'cinema' && 'Cinema Lounge & Avengers Universe'}
                {activeTab === 'plans' && 'Curriculum Roadmaps / Төлөвлөгөө'}
                {activeTab === 'contact' && 'Get In Touch'}
              </h2>
              <p className="text-xs text-white/40">
                {activeTab === 'about' && 'A deep dive into Khangal\'s career and hobbies'}
                {activeTab === 'course' && 'Mathematics & Computer Science tracks'}
                {activeTab === 'geology' && 'Interact with sine waves and spatial coordinates'}
                {activeTab === 'cinema' && 'Why Avengers serves as the perfect logic metaphor'}
                {activeTab === 'plans' && 'Structured learning milestone structures'}
                {activeTab === 'contact' && 'Drop me a message to start learning together'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center group"
            >
              <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Tab Panes */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
            
            {/* ABOUT ME TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#e8702a]/10 to-transparent border border-[#e8702a]/20 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#e8702a] to-[#ff9f68] flex items-center justify-center font-playfair italic text-white text-3xl font-bold tracking-tighter shrink-0 shadow-lg shadow-[#e8702a]/20">
                    Х
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold">Хангал / Khangal</h3>
                    <p className="text-sm text-white/70 mt-1">
                      25 настай | Математик болон Кодны Багш (25 Years Old | Math & Coding Teacher)
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                      <span className="bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-[11px] text-white/80 font-medium">#Mathematics</span>
                      <span className="bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-[11px] text-white/80 font-medium">#Programming</span>
                      <span className="bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-[11px] text-white/80 font-medium">#MCU_Fan</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h4 className="text-xs uppercase text-white/40 tracking-wider font-bold">Мэргэжил (Profession)</h4>
                    <p className="text-sm text-white/90 leading-relaxed font-semibold">
                      Математикийн багш болон Програмчлалын багш
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Би онолын математикийн гоо үзэсгэлэнг практик програмчлалын чадвартай хослуулж, залуу сурагчдад логик сэтгэлгээний гайхамшгийг заадаг.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h4 className="text-xs uppercase text-white/40 tracking-wider font-bold">Хобби & Сонирхол (Hobby)</h4>
                    <p className="text-sm text-white/90 leading-relaxed font-semibold">
                      Кино үзэх (Дуртай кино: Avengers)
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Чөлөөт цагаараа кино урлаг сонирхдог. Марвелын Avengers цувралын логик уялдаа холбоо, тооцоолол, технологийн санаануудаас эрч хүч авдаг.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#e8702a]" />
                    <h4 className="text-xs uppercase tracking-wider font-bold text-white/80">Мэргэжлийн Философи (My Philosophy)</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed italic">
                    "Суралцах гэдэг нь яг л газрын давхарга тогтохтой адил. Математикийн суурь дээр кодны давхаргыг үүсгэж, ухамсрыг хөгжүүлснээр бид ертөнцийн логик бүтцийг ойлгоно. Миний зорилго бол хүүхэд бүрт энэхүү логик ертөнцийн түлхүүрийг гардуулах юм."
                  </p>
                </div>
              </div>
            )}

            {/* COURSES TAB */}
            {activeTab === 'course' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COURSES.map((course) => (
                    <div 
                      key={course.id}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] hover:border-[#e8702a]/30 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            course.category === 'Math' 
                              ? 'bg-[#e8702a]/20 text-[#ff9f68] border border-[#e8702a]/30' 
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {course.category}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">{course.level}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#ff9f68] transition-colors">{course.title}</h4>
                        <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{course.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-[10px] font-bold text-white/40 uppercase mb-1.5">Syllabus Highlights:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.topics.map((t, i) => (
                            <span key={i} className="bg-white/5 text-[10px] text-white/80 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MATHEMATICS GRAPH TAB */}
            {activeTab === 'geology' && (
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-xs uppercase text-white/40 tracking-wider font-bold mb-3">Math Function Generator (Амплитуд, давтамжийн тохируулга)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    {/* Graph Output */}
                    <div className="bg-black/60 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center">
                      <svg className="w-full h-40 max-w-[320px]" viewBox="0 0 300 160">
                        {/* Grid lines */}
                        <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="150" y1="0" x2="150" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                        
                        {/* Sine wave */}
                        <path 
                          d={generateSinePath()} 
                          fill="none" 
                          stroke="#e8702a" 
                          strokeWidth="2.5" 
                          className="transition-all"
                        />
                        
                        {/* Labels */}
                        <text x="10" y="20" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">f(x) = A sin(Bx + θ)</text>
                        <text x="250" y="75" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">x-axis</text>
                        <text x="155" y="15" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">y-axis</text>
                      </svg>
                      <div className="text-center mt-2 font-mono text-[11px] text-white/60">
                        A (Amplitude): <span className="text-[#e8702a] font-bold">{amplitude}px</span> | B (Frequency): <span className="text-[#e8702a] font-bold">{frequency.toFixed(3)}</span>
                      </div>
                    </div>

                    {/* Interactive Sliders */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold text-white/80">Amplitude (A) / Хэлбэлзэл</span>
                          <span className="font-mono text-[#e8702a]">{amplitude}</span>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="70" 
                          value={amplitude} 
                          onChange={(e) => setAmplitude(Number(e.target.value))}
                          className="w-full accent-[#e8702a] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold text-white/80">Frequency (B) / Давтамж</span>
                          <span className="font-mono text-[#e8702a]">{frequency.toFixed(3)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.01" 
                          max="0.15" 
                          step="0.005"
                          value={frequency} 
                          onChange={(e) => setFrequency(Number(e.target.value))}
                          className="w-full accent-[#e8702a] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="pt-2 border-t border-white/5 flex gap-2">
                        <button 
                          onClick={() => {
                            setAmplitude(30);
                            setFrequency(0.05);
                          }}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" /> Reset Values
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs uppercase text-indigo-300 font-bold tracking-wide">Mathematics in Code</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Did you know? Trigonometry and matrix transformations are the core equations running in the background of this web app's cursor spotlight mask. Every coordinate transformation is computed through vectors, bridging math and code seamlessly!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CINEMA & AVENGERS TAB */}
            {activeTab === 'cinema' && (
              <div className="space-y-6">
                
                {/* Quote Slider */}
                <div className="bg-gradient-to-r from-red-950/10 to-transparent border border-red-500/20 p-5 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-2 right-3 font-mono text-[9px] uppercase tracking-wider text-red-500/60 font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-red-500" /> Avengers Archives
                  </div>
                  <div className="space-y-3 min-h-[90px]">
                    <p className={`text-sm sm:text-base italic leading-relaxed text-white/90 transition-all duration-200 ${isChanging ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                      "{AVENGERS_QUOTES[currentQuoteIndex].quote}"
                    </p>
                    <div className={`transition-all duration-200 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
                      <p className="text-xs font-bold text-red-400">{AVENGERS_QUOTES[currentQuoteIndex].character}</p>
                      <p className="text-[10px] text-white/40">{AVENGERS_QUOTES[currentQuoteIndex].movie}</p>
                    </div>
                  </div>
                  <button 
                    onClick={rotateQuote}
                    className="mt-4 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-[11px] font-semibold text-red-400 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" /> Next Favorite Quote
                  </button>
                </div>

                {/* Hero Power Analyzer */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <h4 className="text-xs uppercase text-white/40 tracking-wider font-bold">Avengers as logic paradigms / Холбоос санаа</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {HERO_ROLES.map((role, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedHeroIndex(idx)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedHeroIndex === idx 
                            ? 'bg-[#e8702a]/10 border-[#e8702a] text-white' 
                            : 'bg-black/30 border-white/5 text-white/60 hover:bg-white/5'
                        }`}
                      >
                        <p className="text-xs font-bold truncate">{role.hero.split(' ')[0]}</p>
                        <p className="text-[10px] text-white/40 mt-0.5 truncate">{role.affinity.split(' ')[0]}</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 font-mono uppercase">Discipline Affinity</span>
                      <span className="text-[10px] bg-[#e8702a]/20 text-[#ff9f68] px-2 py-0.5 rounded font-bold">{HERO_ROLES[selectedHeroIndex].affinity}</span>
                    </div>
                    <h5 className="font-bold text-sm text-[#ff9f68]">{HERO_ROLES[selectedHeroIndex].hero}</h5>
                    <p className="text-xs text-white/70 leading-relaxed">{HERO_ROLES[selectedHeroIndex].description}</p>
                    <p className="text-xs text-white/40 italic mt-1 font-serif">"{HERO_ROLES[selectedHeroIndex].quote}"</p>
                  </div>
                </div>

              </div>
            )}

            {/* CURRICULUM ROADMAP PLANS */}
            {activeTab === 'plans' && (
              <div className="space-y-6">
                <div className="relative border-l-2 border-dashed border-[#e8702a]/30 ml-3 space-y-6 pb-2">
                  {[
                    {
                      step: '01',
                      title: 'Mathematical Foundation',
                      desc: 'Master algebraic functions, coordinate systems, and logical operators. This is where analytical brainpower is born.',
                      target: 'Ages 12-16 / High School Foundations'
                    },
                    {
                      step: '02',
                      title: 'Introduction to Algorithms',
                      desc: 'Translate math concepts into variables, conditionals, arrays, and loops using Python or TypeScript.',
                      target: 'Beginner Coding Track'
                    },
                    {
                      step: '03',
                      title: 'Component Architecture & Frontend Dev',
                      desc: 'Craft reactive systems. Build full UI structures, manipulate the browser DOM, and apply styles with CSS framework stacks.',
                      target: 'React and Tailwind Mastery'
                    },
                    {
                      step: '04',
                      title: 'Full-Stack Integration',
                      desc: 'Incorporate APIs, data persistent caches, and cloud operations. This is the ultimate stage of building software layers.',
                      target: 'Full Stack Deployment Expert'
                    }
                  ].map((p, i) => (
                    <div key={i} className="relative pl-6">
                      <span className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-[#111115] border-2 border-[#e8702a] flex items-center justify-center text-[10px] font-bold text-white">
                        {p.step}
                      </span>
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-semibold text-xs sm:text-sm text-white">{p.title}</h5>
                          <span className="text-[10px] text-white/40 font-mono">{p.target}</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT ME */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Баярлалаа! Таны мэдээллийг хүлээн авлаа. (Message sent successfully!)');
                    onClose();
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Таны Нэр (Your Name)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Нэрээ оруулна уу" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#e8702a] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Холбоо барих (Email / Phone)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Email эсвэл Утас" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#e8702a] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Таны Хүсэлт (Your Message)</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Математик, код сурах эсвэл киноны талаар ярилцах уу? Хүсэлтээ энд бичнэ үү..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#e8702a] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-[#e8702a] hover:bg-[#d2611f] text-white rounded-lg text-xs font-semibold transition-all hover:scale-[1.01]"
                  >
                    Илгээх (Send Message)
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-[11px] text-white/40 font-mono">
              Designed for Khangal (25) • Mathematics & Computer Science
            </span>
            <div className="flex gap-4">
              <a href="mailto:ehangal6255@gmail.com" className="text-[11px] text-[#ff9f68] hover:underline">
                ehangal6255@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
