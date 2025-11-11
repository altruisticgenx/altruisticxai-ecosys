import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Feather,
  X,
  ChevronRight,
  Quote,
  Zap,
  Send
} from 'lucide-react';

// --- Mock Data ---
// "FIX": This data is now based on real-world examples and categories
// found in searches for corporate jargon, political spin, and NLP datasets.
const DECEPTIVE_SOURCES = [
  {
    id: 1,
    type: "Corporate Jargon",
    content: "We are currently right-sizing our resource allocation to optimize for future synergy.",
    author: "CEO @ TechCorp",
    source: "Internal Memo",
    sourceURL: "memo.techcorp[.]com"
  },
  {
    id: 2,
    type: "Political Spin (Non-Denial Denial)",
    content: "We are not going to get into a tit-for-tat debate about specific allegations that have been floating around.",
    author: "Campaign Spokesperson",
    source: "Press Conference",
    sourceURL: "C-SPAN"
  },
  {
    id: 3,
    type: "Influencer Hype",
    content: "You guys need this. It literally cures everything. I'm obsessed. #magic #ad",
    author: "wellness_guru_101",
    source: "Social Post",
    sourceURL: "instagram[.]com"
  },
  {
    id: 4,
    type: "Corporate Spin (The 'Non-Apology')",
    content: "We are sorry if anyone was offended by the remarks that were made.",
    author: "Corporate Comms",
    source: "Public Statement",
    sourceURL: "twitter[.]com"
  },
  {
    id: 5,
    type: "Political Spin (Cherry-Picking)",
    content: "Under my leadership, we saw a 20% increase in productivity in the tech sector.",
    author: "Mayor's Office",
    source: "Campaign Speech",
    sourceURL: "localnews[.]com"
  },
  {
    id: 6,
    type: "LinkedIn 'Hustle' Post",
    content: "They sleep 8 hours. I sleep 4. They party on Friday. I close deals. We are not the same. #grindset",
    author: "Finance Bro",
    source: "LinkedIn Post",
    sourceURL: "linkedin[.]com"
  },
  {
    id: 7,
    type: "Vaguebooking / Guilt-Trip",
    content: "It's amazing who your 'friends' are when you really need them. Some people just don't care.",
    author: "Acquaintance",
    source: "Facebook Post",
    sourceURL: "facebook[.]com"
  },
  {
    id: 8,
    type: "Burying Bad News",
    content: "Also in today's news, we are announcing minor adjustments to our forward-looking revenue projections for Q4.",
    author: "CFO @ Public Co.",
    source: "Press Release (8:00 PM Friday)",
    sourceURL: "bizwire[.]com"
  },
  {
    id: 9,
    type: "Loaded Language",
    content: "This radical, job-killing proposal will destroy the fabric of our community.",
    author: "Political Action Committee",
    source: "Mailed Flyer",
    sourceURL: "N/A"
  },
  {
    id: 10,
    type: "PR 'Astroturfing'",
    content: "As a real mom, I'm just so glad that @MegaCorp finally released a soda that's healthy for my kids!",
    author: "User_8812_Mom",
    source: "Reddit Comment",
    sourceURL: "reddit[.]com/r/parenting"
  },
  {
    id: 11,
    type: "Euphemism (HR)",
    content: "We are offering you an opportunity to transition to a new role outside the company.",
    author: "HR Manager",
    source: "Separation Email",
    sourceURL: "N/A"
  },
  {
    id: 12,
    type: "Misleading Statistic",
    content: "Our new snack has 50% LESS fat! (Compared to a leading ice cream brand)",
    author: "Food Brand",
    source: "Product Packaging",
    sourceURL: "N/A"
  },
  {
    id: 13,
    type: "Tech 'Solutionism'",
    content: "Our new blockchain-powered, AI-driven platform will fundamentally disrupt the nature of human connection.",
    author: "Startup Founder",
    source: "Pitch Deck",
    sourceURL: "techcrunch[.]com"
  },
  {
    id: 14,
    type: "Dark Pattern (Web)",
    content: "[ ] Yes! Sign me up for weekly deals. [ ] No, I don't like saving money.",
    author: "E-commerce Site",
    source: "Checkout Modal",
    sourceURL: "buy-stuff[.]com"
  },
  {
    id: 15,
    type: "Corporate 'Greenwashing'",
    content: "Our 'Eco-Friendly' bottle is made with 10% recycled materials.",
    author: "Water Brand",
    source: "Press Release",
    sourceURL: "pr-newswire[.]com"
  }
];

const HONESTY_PROFILES = [
  { id: 'p1', name: 'The Realist', icon: '⚖️', desc: 'Strip the emotion. State the fact.' },
  { id: 'p2', name: 'The Empath', icon: '❤️', desc: 'Find the human need hidden in the noise.' },
  { id: 'p3', name: 'The Skeptic', icon: '🧐', desc: 'Question the premise. Reveal the motive.' },
];

export default function RipplesPage() {
  const [activeTab, setActiveTab] = useState('manifesto');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-amber-100">
      {/* Minimal Header */}
      <header className="fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-sm z-20 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('manifesto')}
            className="cursor-pointer group flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Ripples</span>
          </div>
          
          <nav className="flex items-center space-x-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <NavBtn id="manifesto" label="Truth" active={activeTab} set={setActiveTab} />
            <NavBtn id="foundry" label="People" active={activeTab} set={setActiveTab} />
            <NavBtn id="game" label="Practice" active={activeTab} set={setActiveTab} />
          </nav>
        </div>
      </header>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {activeTab === 'manifesto' && <ManifestoSection toFoundry={() => setActiveTab('foundry')} />}
          {activeTab === 'foundry' && <FoundrySection toGame={() => setActiveTab('game')} />}
          {activeTab === 'game' && <IntentoolGame />}
        </div>
      </main>
    </div>
  );
}

// --- Shared Components ---

function NavBtn({ id, label, active, set }: { id: string; label: string; active: string; set: (id: string) => void }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => set(id)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-slate-900 text-white shadow-md' 
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
}

// --- SECTION 1: MANIFESTO (Typography Focused) ---
function ManifestoSection({ toFoundry }: { toFoundry: () => void }) {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-6">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-200 pb-2 inline-block">The Inversion</span>
        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] text-slate-900">
          Build the <span className="italic text-blue-600">Truth</span>,<br/>
          not the App.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl">
          Most startups hide until they launch. We build in the open.
          We don't recruit resumes; we recruit aligned minds.
          We don't build AI to persuade; we build it to reveal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="font-serif text-2xl mb-3">The Foundry</h3>
          <p className="text-slate-500 leading-relaxed">
            We find our first 100 collaborators using a "Binary Filter." No resumes. Just deep, structural alignment of values.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-amber-200 transition-colors group">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
            <Brain size={24} />
          </div>
          <h3 className="font-serif text-2xl mb-3">The Intentool</h3>
          <p className="text-slate-500 leading-relaxed">
            We turn "Self-Work" into a game. By manually translating lies into truth, we create the dataset that trains the AI.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={toFoundry}
          className="group flex items-center space-x-3 text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors"
        >
          <span>Begin the Search</span>
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// --- SECTION 2: FOUNDRY (Mad Libs / Sentence Completion) ---
function FoundrySection({ toGame }: { toGame: () => void }) {
  const [inputs, setInputs] = useState({ a: '', b: '', c: '', d: '' });
  const [finding, setFinding] = useState(false);
  const [match, setMatch] = useState<boolean | null>(null);

  const handleFind = () => {
    if(Object.values(inputs).some(v => !v)) return;
    setFinding(true);
    setTimeout(() => {
      setFinding(false);
      setMatch(true);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">The Foundry</span>
        <h2 className="text-4xl font-serif mt-2 mb-4">Align your Mind.</h2>
        <p className="text-slate-600">Complete the statement below to find collaborators who share your structural binaries.</p>
      </div>

      {!match ? (
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
          <div className="text-2xl md:text-3xl font-serif leading-relaxed text-slate-400">
            "I believe that a healthy system prioritizes 
            <input 
              type="text" 
              placeholder="concept A" 
              className="mx-2 w-48 bg-transparent border-b-2 border-slate-200 text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none text-center transition-colors"
              value={inputs.a}
              onChange={e => setInputs({...inputs, a: e.target.value})}
            />
            over
            <input 
              type="text" 
              placeholder="concept B" 
              className="mx-2 w-48 bg-transparent border-b-2 border-slate-200 text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none text-center transition-colors"
              value={inputs.b}
              onChange={e => setInputs({...inputs, b: e.target.value})}
            />.
            <br className="hidden md:block my-4" />
            I work best when the goal is 
            <input 
              type="text" 
              placeholder="outcome X" 
              className="mx-2 w-48 bg-transparent border-b-2 border-slate-200 text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none text-center transition-colors"
              value={inputs.c}
              onChange={e => setInputs({...inputs, c: e.target.value})}
            />
            rather than
            <input 
              type="text" 
              placeholder="outcome Y" 
              className="mx-2 w-48 bg-transparent border-b-2 border-slate-200 text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none text-center transition-colors"
              value={inputs.d}
              onChange={e => setInputs({...inputs, d: e.target.value})}
            />."
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleFind}
              disabled={finding}
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
            >
              {finding ? <RefreshCw className="animate-spin" /> : <Feather size={20} />}
              <span>{finding ? "Resonating..." : "Broadcast Signal"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 p-8 rounded-3xl border border-green-100 animate-in zoom-in-95">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-serif text-2xl text-green-900">Resonance Found</h3>
          </div>
          <p className="text-lg text-green-800 mb-2">
            "I also prioritize <strong>{inputs.a}</strong>. I've been looking for a team that values <strong>{inputs.c}</strong>."
          </p>
          <p className="text-green-600 text-sm uppercase font-bold tracking-wide mt-4 mb-8">
            — Sarah K., System Architect
          </p>
          <button 
            onClick={toGame}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Start Building Together</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// --- SECTION 3: INTENTOOL GAME (Vertical Flow) ---
function IntentoolGame() {
  const [currentSource, setCurrentSource] = useState(DECEPTIVE_SOURCES[0]);
  const [profile, setProfile] = useState<typeof HONESTY_PROFILES[0] | null>(null);
  const [translation, setTranslation] = useState('');
  const [complete, setComplete] = useState(false);

  // --- NEW CHAT UI & AI LOGIC STATE ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFindingSource, setIsFindingSource] = useState(false);
  
  // Replaces single aiFeedback string with a full chat history
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; parts: Array<{ text: string }> }>>([]); 
  const [chatInput, setChatInput] = useState(''); // For the follow-up chat input
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  const next = () => {
    // Pick a random new source, making sure it's not the same as the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * DECEPTIVE_SOURCES.length);
    } while (DECEPTIVE_SOURCES[newIndex].id === currentSource.id && DECEPTIVE_SOURCES.length > 1);
    
    setCurrentSource(DECEPTIVE_SOURCES[newIndex]);
    setTranslation('');
    setComplete(false);
    setProfile(null);
    setChatHistory([]); // Clear chat history
    setChatInput('');
  };

  /**
   * --- NEW FEATURE (Data-Embedded, Real-Time) ---
   * Uses Gemini with Google Search Grounding to find a real, live example of deceptive text.
   */
  const findRealTimeExample = async () => {
    setIsFindingSource(true);
    setProfile(null);
    setTranslation('');
    setChatHistory([]);
    setChatInput('');

    const userQuery = "Find a real, recent example of corporate jargon, political spin, or marketing hype from the web. Provide the text, who said it, and the source.";

    const apiKey = ""; // Leave as-is
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "googleSearch": {} }], // Enable Google Search
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const result = await response.json();
      const candidate = result.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        
        // Try to parse the text or use it directly
        let newSource = {
          id: new Date().getTime(),
          type: "Real-Time Example",
          content: text,
          author: "Real-Time Source",
          source: "Web",
          sourceURL: "N/A"
        };

        // Extract source from grounding metadata if possible
        if (groundingMetadata?.groundingAttributions?.[0]?.web) {
          const webSource = groundingMetadata.groundingAttributions[0].web;
          newSource.author = webSource.title || "Web Source";
          newSource.sourceURL = webSource.uri || "N/A";
          try {
            newSource.source = new URL(webSource.uri).hostname;
          } catch {
            newSource.source = "Web";
          }
        }

        // A simple attempt to parse content and author from the AI's response
        if (text.includes('"')) {
          newSource.content = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"'));
          // Very simple author parse
          if (text.includes("said by")) {
            newSource.author = text.split("said by")[1].split('.')[0].trim();
          }
        }
        
        setCurrentSource(newSource);

      } else {
        throw new Error("Could not find a real-time example.");
      }

    } catch (error) {
      console.error("Gemini grounding call failed:", error);
      // Fallback to a mock in case of error
      setCurrentSource({
        id: new Date().getTime(),
        type: "API Error",
        content: "Could not fetch a real-time example. Here is a placeholder.",
        author: "System",
        source: "Error",
        sourceURL: "N/A"
      });
    } finally {
      setIsFindingSource(false);
    }
  };


  /**
   * --- UPDATED GEMINI API FEATURE (Chat UI) ---
   * Manages a conversational chat with the "Honesty Coach."
   */
  const handleChatWithCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    let userMessage = '';

    // Determine if this is the FIRST or a FOLLOW-UP message
    if (chatHistory.length === 0) {
      // First message is the user's translation
      if (!translation) return; // Don't start chat without a translation
      userMessage = `
        Here is my translation for the source: "${currentSource.content}"
        I'm using the '${profile?.name}' lens.
        My translation is: "${translation}"
        
        Please give me feedback.
      `;
      // Add translation to chat as the user's first turn
      setChatHistory([
        { role: "user", parts: [{ text: `My Translation: "${translation}"` }] }
      ]);
    } else {
      // Follow-up message is from the chat input
      if (!chatInput) return;
      userMessage = chatInput;
      // Add user's new message to chat
      setChatHistory(prev => [...prev, { role: "user", parts: [{ text: chatInput }] }]);
      setChatInput('');
    }

    setIsAnalyzing(true);

    const systemPrompt = "You are an 'Honesty Coach' for a platform called Ripples. Your goal is to help users refine their ability to communicate with pure honesty and clarity. You are not a judge, but a supportive collaborator. Keep your responses concise (2-3 sentences) and conversational. Your user is in a chat interface, so you can ask questions back.";

    const apiKey = ""; // Leave as-is
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    // Construct the full conversation history for the API
    const apiHistory = [
      // Add the initial context for the AI
      { role: "user", parts: [{ text: `
          DECEPTIVE SOURCE: "${currentSource.content}"
          MY LENS: "${profile?.name} (${profile?.desc})"
        `}]},
      { role: "model", parts: [{ text: "Understood. I'm ready to review your translation." }]},
      // Add the messages from the chat UI
      ...chatHistory,
      // Add the new user message we're sending
      { role: "user", parts: [{ text: userMessage }] }
    ];
    
    // Create the payload
    const payload = {
      contents: apiHistory,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        const aiResponse = candidate.content.parts[0].text;
        // Add AI response to chat
        setChatHistory(prev => [...prev, { role: "model", parts: [{ text: aiResponse }] }]);
      } else {
        throw new Error("Invalid response structure from API.");
      }

    } catch (error) {
      console.error("Gemini API call failed:", error);
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text: "Sorry, I'm having trouble connecting right now." }] }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (complete) {
    return (
      <div className="text-center py-20 space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full mx-auto flex items-center justify-center">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-serif text-slate-900">Clarity Achieved.</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          You've just added a verified data point to the Intentool. 
          You are teaching the AI what honesty looks like.
        </p>
        <button onClick={next} className="text-slate-900 font-bold underline decoration-2 decoration-blue-300 hover:decoration-blue-600 underline-offset-4">
          Analyze Next Source
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">The Practice</span>
          <h2 className="text-3xl font-serif mt-1">Filter the Noise.</h2>
        </div>
        {/* --- NEW REAL-TIME BUTTON --- */}
        <button
          onClick={findRealTimeExample}
          disabled={isFindingSource}
          className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
        >
          {isFindingSource ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
          <span>{isFindingSource ? "Searching..." : "⚡ Find Real-Time Example"}</span>
        </button>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* 1. THE NOISE (Source) */}
        <div className="relative bg-slate-100 rounded-3xl p-8 border border-slate-200 z-0">
          <div className="flex justify-between items-center mb-4 opacity-50">
            <span className="text-xs font-bold uppercase tracking-wider">Input Signal (Noise)</span>
            <span className="text-xs bg-slate-200 px-2 py-1 rounded">{currentSource.type}</span>
          </div>
          <p className="text-xl font-serif text-slate-600 leading-relaxed italic">
            "{currentSource.content}"
          </p>
          {/* NEW ADDITION: Author and Source */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-sm text-slate-500 flex flex-col md:flex-row justify-between">
            <div>
              <span className="font-bold text-slate-600">Author: </span>
              {currentSource.author}
            </div>
            <div className="text-left md:text-right mt-1 md:mt-0">
              <span className="font-bold text-slate-600">Source: </span>
              <a href="#" className="underline decoration-dotted" onClick={e => e.preventDefault()}>
                {currentSource.sourceURL || currentSource.source}
              </a>
            </div>
          </div>
          {/* END NEW ADDITION */}
        </div>

        {/* Connection Line */}
        <div className="h-12 w-0.5 bg-slate-200 mx-auto my-2"></div>

        {/* 2. THE LENS (Profile Selector) */}
        <div className="relative z-10 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 mx-auto max-w-lg">
          <div className="grid grid-cols-3 gap-2">
            {HONESTY_PROFILES.map(p => (
              <button
                key={p.id}
                onClick={() => setProfile(p)}
                className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center text-center ${
                  profile?.id === p.id 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'hover:bg-slate-50 text-slate-500'
                }`}
              >
                <span className="text-2xl mb-2">{p.icon}</span>
                <span className="text-xs font-bold tracking-wide">{p.name}</span>
              </button>
            ))}
          </div>
          {profile && (
             <div className="text-center text-xs text-slate-400 py-2 border-t border-slate-100 mt-2 animate-in fade-in">
               Directive: {profile.desc}
             </div>
          )}
        </div>

        {/* Connection Line */}
        <div className={`h-12 w-0.5 mx-auto my-2 transition-colors duration-500 ${profile ? 'bg-blue-400' : 'bg-slate-200'}`}></div>

        {/* 3. THE SIGNAL (Translation Input) */}
        <div className={`transition-all duration-500 ${profile ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Output Signal (Truth)</span>
            </div>
            <textarea 
              value={translation}
              onChange={e => {
                setTranslation(e.target.value);
                if (chatHistory.length > 0) setChatHistory([]); // Clear chat if translation changes
              }}
              placeholder={profile ? `Translate using the lens of ${profile.name}...` : "Select a lens above to begin..."}
              disabled={!profile}
              className="w-full bg-transparent text-xl text-slate-900 placeholder-slate-300 focus:outline-none resize-none font-serif leading-relaxed"
              rows={3}
            />
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* --- UPDATED GEMINI BUTTON (Starts Chat) --- */}
              <button 
                onClick={handleChatWithCoach}
                disabled={!translation || isAnalyzing || chatHistory.length > 0}
                className="w-full md:w-auto flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 md:order-1"
                title={chatHistory.length > 0 ? "Coach is already active below" : "Get feedback on your translation"}
              >
                <Sparkles size={16} />
                <span>{chatHistory.length > 0 ? "Coach Active" : "✨ Get Feedback"}</span>
              </button>
              
              <button 
                onClick={() => setComplete(true)}
                disabled={!translation || !profile || isAnalyzing}
                className="w-full md:w-auto bg-slate-900 text-white pl-6 pr-4 py-3 rounded-full font-bold text-sm flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 md:order-2"
              >
                <span>Verify Signal</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* --- NEW CHAT UI --- */}
            {chatHistory.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
                {/* Chat History */}
                <div className="max-h-48 overflow-y-auto space-y-4 pr-2">
                  {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {msg.parts[0].text}
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="flex justify-start">
                      <div className="p-3 rounded-2xl bg-slate-100 text-slate-500 text-sm">
                        <RefreshCw className="animate-spin h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                {/* Chat Input Form */}
                <form onSubmit={handleChatWithCoach} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a follow-up..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled={isAnalyzing}
                  />
                  <button
                    type="submit"
                    disabled={isAnalyzing || !chatInput}
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors hover:bg-blue-700 disabled:bg-slate-300"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
