<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratori de Combinatòria 1r Batxillerat</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- KaTeX for Math Rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    
    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body { background-color: #f8fafc; font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* Card Highlight Animation */
        .card-highlight { 
            border-color: #4f46e5; 
            background-color: #eef2ff; 
            transform: scale(1.02); 
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05);
            z-index: 10;
        }
        .card-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .katex { font-size: 1.1em; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // --- ICONS ---
        const Icon = ({ path, size = 24, className = "" }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d={path} />
            </svg>
        );

        const icons = {
            calc: "M16 16h.01 M12 16h.01 M8 16h.01 M16 12h.01 M12 12h.01 M8 12h.01 M16 8h.01 M12 8h.01 M8 8h.01 M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
            tree: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z M10 9l2-2 2 2 M12 7v10",
            book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
            reset: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5",
            check: "M20 6L9 17l-5-5"
        };

        // --- COMPONENTS ---
        const Latex = ({ children, block = false }) => {
            const containerRef = useRef(null);
            useEffect(() => {
                if (window.katex && containerRef.current) {
                    try {
                        let content = "";
                        if (typeof children === 'string') content = children;
                        else if (Array.isArray(children)) content = children.join('');
                        else content = String(children);
                        
                        window.katex.render(content, containerRef.current, { throwOnError: false, displayMode: block });
                    } catch (e) { containerRef.current.innerText = String(children); }
                }
            }, [children, block]);
            return <span ref={containerRef} />;
        };

        // --- MATH LOGIC ---
        const factorial = n => {
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let res = 1;
            for (let i = 2; i <= n; i++) res *= i;
            return res;
        };
        const combinations = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
        const variations = (n, k) => factorial(n) / factorial(n - k);
        const permutations = (n) => factorial(n);

        // --- MAIN APP COMPONENT ---
        const App = () => {
            const [view, setView] = useState('lab'); // 'lab' or 'theory'
            
            // Calculator State
            const [n, setN] = useState(5);
            const [r, setR] = useState(3);
            // FIX: Initialize with default values to prevent undefined access on first render
            const [res, setRes] = useState({ v: 0, vr: 0, p: 0, c: 0, cr: 0 });

            // Decision Tree State
            const [qOrder, setQOrder] = useState(null); // true/false
            const [qAll, setQAll] = useState(null); // true/false
            const [qRep, setQRep] = useState(null); // true/false

            // Calculate effects
            useEffect(() => {
                const N = parseInt(n) || 0;
                const R = parseInt(r) || 0;
                
                let v = 0, vr = 0, p = 0, c = 0, cr = 0;
                
                if (N >= R && R >= 0) v = variations(N, R);
                if (N >= 0 && R >= 0) vr = Math.pow(N, R);
                if (N >= 0) p = permutations(N);
                if (N >= R && R >= 0) c = combinations(N, R);
                if (N >= 0 && R >= 0) cr = combinations(N + R - 1, R);

                setRes({ v, vr, p, c, cr });
            }, [n, r]);

            // Determine Highlight
            const getHighlight = () => {
                if (qOrder === null) return null; // No path started
                
                if (qOrder === true) {
                    // Importa l'ordre -> Variacions o Permutacions
                    if (qAll === null) return null; // Waiting for Q2
                    
                    if (qAll === true) {
                        // Tots els elements -> Permutacions
                        // Normally n=r implied, but we look at logic
                        return qRep === true ? 'pr' : (qRep === false ? 'p' : null);
                    } else {
                        // No tots els elements -> Variacions
                        return qRep === true ? 'vr' : (qRep === false ? 'v' : null);
                    }
                } else {
                    // No importa l'ordre -> Combinacions
                    // (Q2 'All' is skipped/irrelevant in standard HS flow for Combinations usually, or assumed No)
                    return qRep === true ? 'cr' : (qRep === false ? 'c' : null);
                }
            };

            const hl = getHighlight();

            const resetTree = () => {
                setQOrder(null);
                setQAll(null);
                setQRep(null);
            };

            return (
                <div className="min-h-screen flex flex-col">
                    {/* HEADER */}
                    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                                    <Icon path={icons.tree} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Laboratori de Combinatòria</h1>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Matemàtiques 1r Batxillerat</p>
                                </div>
                            </div>
                            
                            <nav className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                                <button 
                                    onClick={() => setView('lab')} 
                                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${view === 'lab' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Icon path={icons.calc} size={18} /> Calculadora
                                </button>
                                <button 
                                    onClick={() => setView('theory')} 
                                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${view === 'theory' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Icon path={icons.book} size={18} /> Teoria
                                </button>
                            </nav>
                        </div>
                    </header>

                    {/* MAIN CONTENT */}
                    <main className="flex-1 max-w-6xl mx-auto w-full p-6 animate-[fadeIn_0.5s_ease-out]">
                        
                        {view === 'lab' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                                
                                {/* LEFT: INPUT & DECISION TREE */}
                                <div className="lg:col-span-4 flex flex-col gap-6">
                                    
                                    {/* INPUT CARD */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-slate-700 uppercase text-sm tracking-wider">Paràmetres</h3>
                                            <div className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">n ≥ r</div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Total (n)</label>
                                                <input type="number" min="0" value={n} onChange={e=>setN(e.target.value)} className="w-full p-3 border-2 border-slate-100 rounded-xl font-mono text-xl text-center focus:border-indigo-500 focus:ring-0 outline-none transition-colors text-slate-700" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Grup (r)</label>
                                                <input type="number" min="0" value={r} onChange={e=>setR(e.target.value)} className="w-full p-3 border-2 border-slate-100 rounded-xl font-mono text-xl text-center focus:border-indigo-500 focus:ring-0 outline-none transition-colors text-slate-700" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* DECISION TREE CARD */}
                                    <div className="bg-gradient-to-b from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="font-bold text-indigo-900 uppercase text-sm tracking-wider flex items-center gap-2">
                                                <Icon path={icons.tree} size={18} /> Guia de Decisió
                                            </h3>
                                            <button onClick={resetTree} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Reiniciar">
                                                <Icon path={icons.reset} size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-6 flex-1">
                                            {/* Q1 */}
                                            <div className="transition-all duration-300">
                                                <p className="font-semibold text-slate-700 mb-3 text-sm">1. Importa l'ordre dels elements?</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button onClick={()=>setQOrder(true)} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qOrder===true ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>SÍ</button>
                                                    <button onClick={()=>{setQOrder(false); setQAll(null);}} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qOrder===false ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>NO</button>
                                                </div>
                                            </div>

                                            {/* Q2 (Only if Order Matters) */}
                                            <div className={`transition-all duration-500 overflow-hidden ${qOrder===true ? 'max-h-40 opacity-100' : 'max-h-0 opacity-50'}`}>
                                                <div className="pt-4 border-t border-indigo-100">
                                                    <p className="font-semibold text-slate-700 mb-3 text-sm">2. Intervenen tots els elements? (n=r)</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button onClick={()=>setQAll(true)} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qAll===true ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>SÍ</button>
                                                        <button onClick={()=>setQAll(false)} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qAll===false ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>NO</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Q3 (Visible if Q1 is No, or Q2 is answered) */}
                                            <div className={`transition-all duration-500 overflow-hidden ${(qOrder===false || (qOrder===true && qAll!==null)) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-50'}`}>
                                                <div className="pt-4 border-t border-indigo-100">
                                                    <p className="font-semibold text-slate-700 mb-3 text-sm">3. Es poden repetir elements?</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button onClick={()=>setQRep(true)} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qRep===true ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>SÍ</button>
                                                        <button onClick={()=>setQRep(false)} className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${qRep===false ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}>NO</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Result Feedback */}
                                            <div className={`transition-all duration-500 ${hl ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                 {hl && (
                                                     <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg text-center font-bold text-sm border border-indigo-200 flex items-center justify-center gap-2">
                                                        <Icon path={icons.check} size={16} />
                                                        Has de fer servir: {hl.toUpperCase()}
                                                     </div>
                                                 )}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: CARDS GRID */}
                                <div className="lg:col-span-8 overflow-y-auto custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                        
                                        {/* V */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='v' ? 'card-highlight' : ''}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Variacions</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='v'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>Sí Ordre, No Rep</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`V_{n,r} = \\frac{n!}{(n-r)!}`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-center font-bold text-indigo-700 text-xl tracking-tight">
                                                <Latex>{`V_{${n},${r}} = ${res.v ? res.v.toLocaleString() : 0}`}</Latex>
                                            </div>
                                        </div>

                                        {/* VR */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='vr' ? 'card-highlight' : ''}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Variacions amb Rep.</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='vr'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>Sí Ordre, Sí Rep</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`VR_{n,r} = n^r`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-center font-bold text-indigo-700 text-xl tracking-tight">
                                                <Latex>{`VR_{${n},${r}} = ${res.vr ? res.vr.toLocaleString() : 0}`}</Latex>
                                            </div>
                                        </div>

                                        {/* P */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='p' ? 'card-highlight' : ''}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Permutacions</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='p'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>Sí Ordre, No Rep, n=r</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`P_n = n!`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-center font-bold text-indigo-700 text-xl tracking-tight">
                                                <Latex>{`P_{${n}} = ${res.p ? res.p.toLocaleString() : 0}`}</Latex>
                                            </div>
                                        </div>

                                        {/* PR */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='pr' ? 'card-highlight' : 'opacity-60'}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Permutacions amb Rep.</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='pr'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>Sí Ordre, Sí Rep, n=r</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`PR_n^{a,b...} = \\frac{n!}{a!b!...}`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center text-sm text-slate-400 italic">
                                                Calculadora específica no disponible (requereix subgrups a,b,c...)
                                            </div>
                                        </div>

                                        {/* C */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='c' ? 'card-highlight' : ''}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Combinacions</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='c'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>No Ordre, No Rep</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`C_{n,r} = \\binom{n}{r}`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-center font-bold text-indigo-700 text-xl tracking-tight">
                                                <Latex>{`C_{${n},${r}} = ${res.c ? res.c.toLocaleString() : 0}`}</Latex>
                                            </div>
                                        </div>

                                        {/* CR */}
                                        <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm card-transition ${hl==='cr' ? 'card-highlight' : ''}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-slate-800 text-lg">Combinacions amb Rep.</h4>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${hl==='cr'?'bg-indigo-600 text-white':'bg-slate-100 text-slate-400'}`}>No Ordre, Sí Rep</span>
                                            </div>
                                            <div className="text-slate-500 text-sm mb-4"><Latex>{`CR_{n,r} = \\binom{n+r-1}{r}`}</Latex></div>
                                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl font-mono text-center font-bold text-indigo-700 text-xl tracking-tight">
                                                <Latex>{`CR_{${n},${r}} = ${res.cr ? res.cr.toLocaleString() : 0}`}</Latex>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    {/* Factorial Expansion */}
                                    <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 text-sm flex flex-col md:flex-row justify-between items-center text-slate-600 font-mono gap-2">
                                        <span className="font-bold">Detall Factorial:</span>
                                        <span className="text-center md:text-right overflow-hidden text-ellipsis whitespace-nowrap w-full">
                                            <Latex>{`n! = ${n}! = ${res.p ? res.p.toLocaleString() : 0}`}</Latex>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {view === 'theory' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-y-auto custom-scrollbar pb-20">
                                
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-indigo-900 border-b pb-3 mb-4 uppercase tracking-wider text-sm">Conceptes Bàsics</h3>
                                    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                                        <p><strong>Combinatòria:</strong> Part de les matemàtiques que estudia les diverses formes de realitzar agrupacions amb els elements d'un conjunt, formant-ne i calculant-ne el nombre.</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>Població (n):</strong> Conjunt total d'elements que tenim.</li>
                                            <li><strong>Mostra (r):</strong> Subconjunt o grup que formem.</li>
                                            <li><strong>Ordre:</strong> Si en canviar l'ordre dels elements obtenim un grup diferent (Ex: 123 vs 321).</li>
                                            <li><strong>Repetició:</strong> Si un element pot aparèixer més d'una vegada al grup.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-indigo-900 border-b pb-3 mb-4 uppercase tracking-wider text-sm">Fórmules Principals</h3>
                                    <div className="space-y-5 text-sm">
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Variacions ordinàries</div>
                                            <div className="text-slate-600 mb-2 text-xs">Importa l'ordre, no es repeteixen, $n > r$.</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`V_{n,r} = \\frac{n!}{(n-r)!}`}</Latex></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Variacions amb repetició</div>
                                            <div className="text-slate-600 mb-2 text-xs">Importa l'ordre, es repeteixen.</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`VR_{n,r} = n^r`}</Latex></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-indigo-900 border-b pb-3 mb-4 uppercase tracking-wider text-sm">Permutacions (Cas n=r)</h3>
                                    <div className="space-y-5 text-sm">
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Permutacions ordinàries</div>
                                            <div className="text-slate-600 mb-2 text-xs">Importa l'ordre, intervenen tots els elements.</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`P_n = n!`}</Latex></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Permutacions amb repetició</div>
                                            <div className="text-slate-600 mb-2 text-xs">Elements idèntics es repeteixen $a, b, c...$ vegades ($a+b+...=n$).</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`PR_n^{a,b,c} = \\frac{n!}{a! \\cdot b! \\cdot c!}`}</Latex></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <h3 className="font-bold text-indigo-900 border-b pb-3 mb-4 uppercase tracking-wider text-sm">Combinacions (No importa l'ordre)</h3>
                                    <div className="space-y-5 text-sm">
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Combinacions ordinàries</div>
                                            <div className="text-slate-600 mb-2 text-xs">No importa l'ordre, no es repeteixen.</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`C_{n,r} = \\binom{n}{r} = \\frac{V_{n,r}}{P_r}`}</Latex></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 mb-1">Combinacions amb repetició</div>
                                            <div className="text-slate-600 mb-2 text-xs">No importa l'ordre, es poden repetir.</div>
                                            <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center"><Latex block>{`CR_{n,r} = \\binom{n+r-1}{r}`}</Latex></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                        
                    </main>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>