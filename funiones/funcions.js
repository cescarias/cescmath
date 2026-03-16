import React, { useState, useEffect } from 'react';
import { LineChart, Calculator, Table, Info, ZoomIn, ZoomOut, RefreshCw, Plus, Trash2, Eye, EyeOff, Sigma, FunctionSquare, ArrowRightLeft, Settings, Split, X } from 'lucide-react';

// --- UTILITIES: MATH PARSING & NUMERICAL METHODS ---

const preprocessInput = (input) => {
  if (!input) return '0';
  let expr = input.toLowerCase().replace(/\s+/g, '');
  
  // Replace standard math notation
  expr = expr.replace(/\^/g, '**');
  expr = expr.replace(/sin/g, 'Math.sin');
  expr = expr.replace(/cos/g, 'Math.cos');
  expr = expr.replace(/tan/g, 'Math.tan');
  expr = expr.replace(/log/g, 'Math.log10');
  expr = expr.replace(/ln/g, 'Math.log');
  expr = expr.replace(/sqrt/g, 'Math.sqrt');
  expr = expr.replace(/abs/g, 'Math.abs');
  expr = expr.replace(/pi/g, 'Math.PI');
  expr = expr.replace(/e/g, 'Math.E');
  
  // Handle implicit multiplication
  expr = expr.replace(/([0-9])([a-z(])/g, '$1*$2');
  expr = expr.replace(/\)([\w(])/g, ')*$1');
  
  return expr;
};

const evaluateFunction = (expr, x) => {
  try {
    // eslint-disable-next-line no-new-func
    const f = new Function('x', `return ${expr};`);
    const y = f(x);
    if (!isFinite(y) || isNaN(y)) return null;
    return y;
  } catch (e) {
    return null;
  }
};

const calculateDerivativeAt = (expr, x) => {
  const h = 0.0001;
  const y1 = evaluateFunction(expr, x - h);
  const y2 = evaluateFunction(expr, x + h);
  if (y1 === null || y2 === null) return null;
  return (y2 - y1) / (2 * h);
};

const calculateIntegral = (expr, a, b) => {
  const n = 100;
  const h = (b - a) / n;
  let sum = 0.5 * (evaluateFunction(expr, a) + evaluateFunction(expr, b));
  
  for (let i = 1; i < n; i++) {
    const val = evaluateFunction(expr, a + i * h);
    if (val !== null) sum += val;
  }
  return sum * h;
};

const compilePiecewise = (pieces) => {
  // Build a nested ternary string: (cond1) ? (expr1) : (cond2) ? (expr2) : null
  let compiled = pieces.map(p => {
    const safeCond = p.condition.replace(/=/g, '==').replace(/<==/g, '<=').replace(/>==/g, '>=').replace(/====/g, '=='); // Basic safety for JS syntax
    const safeExpr = preprocessInput(p.expr);
    return `(${safeCond}) ? (${safeExpr})`;
  }).join(' : ');
  
  return compiled + ' : null';
};

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

// --- COMPONENTS ---

export default function App() {
  const [functions, setFunctions] = useState([
    { 
      id: 1, 
      type: 'custom', 
      expr: 'x^2 - 4', 
      parsed: 'x**2 - 4', 
      visible: true, 
      color: COLORS[0],
      // New Piecewise Structure: Array of segments
      pieces: [
        { id: 'p1', condition: 'x < 0', type: 'linear', expr: 'x + 1' },
        { id: 'p2', condition: 'x >= 0', type: 'quadratic', expr: 'x^2 - 2' }
      ]
    }
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [xRange, setXRange] = useState([-10, 10]);
  const [yRange, setYRange] = useState([-10, 10]);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('analisi');
  const [calcInputs, setCalcInputs] = useState({ limitX: 0, derivX: 1, integA: 0, integB: 2 });
  const [hoverPoint, setHoverPoint] = useState(null);
  
  const width = 600;
  const height = 400;

  // -- LOGIC --

  const updateFunctionExpr = (id, newExpr) => {
    setFunctions(functions.map(f => {
      if (f.id !== id) return f;
      let parsed = f.parsed;
      try { parsed = preprocessInput(newExpr); } catch (e) {}
      return { ...f, expr: newExpr, parsed };
    }));
  };

  const updateFunctionType = (id, newType) => {
    setFunctions(functions.map(f => {
      if (f.id !== id) return f;
      
      let newExpr = f.expr;
      let newParsed = f.parsed;

      // When switching TO piecewise, compile the current pieces
      if (newType === 'piecewise') {
        newParsed = compilePiecewise(f.pieces);
        newExpr = '(Definit a trossos)';
      } 
      // When switching FROM piecewise or others, set templates
      else {
        if (newType === 'linear') newExpr = '2x + 1';
        else if (newType === 'quadratic') newExpr = 'x^2 - 4';
        else if (newType === 'trig') newExpr = 'sin(x)';
        else newExpr = 'x'; // custom default
        
        try { newParsed = preprocessInput(newExpr); } catch (e) {}
      }

      return { ...f, type: newType, expr: newExpr, parsed: newParsed };
    }));
  };

  // --- PIECEWISE LOGIC ---

  const addPiece = (funcId) => {
    setFunctions(functions.map(f => {
      if (f.id !== funcId) return f;
      const newPieces = [...f.pieces, { 
        id: Math.random().toString(36).substr(2, 9), 
        condition: 'x > 5', 
        type: 'custom', 
        expr: '5' 
      }];
      return { ...f, pieces: newPieces, parsed: compilePiecewise(newPieces) };
    }));
  };

  const removePiece = (funcId, pieceId) => {
    setFunctions(functions.map(f => {
      if (f.id !== funcId) return f;
      if (f.pieces.length <= 1) return f; // Keep at least one
      const newPieces = f.pieces.filter(p => p.id !== pieceId);
      return { ...f, pieces: newPieces, parsed: compilePiecewise(newPieces) };
    }));
  };

  const updatePiece = (funcId, pieceId, field, value) => {
    setFunctions(functions.map(f => {
      if (f.id !== funcId) return f;
      const newPieces = f.pieces.map(p => {
        if (p.id !== pieceId) return p;
        
        // Handle type change template logic within a piece
        if (field === 'type') {
          let tmpl = p.expr;
          if (value === 'linear') tmpl = 'x';
          else if (value === 'quadratic') tmpl = 'x^2';
          else if (value === 'trig') tmpl = 'sin(x)';
          return { ...p, type: value, expr: tmpl };
        }
        
        return { ...p, [field]: value };
      });
      return { ...f, pieces: newPieces, parsed: compilePiecewise(newPieces) };
    }));
  };

  // --- GENERAL APP LOGIC ---

  const addFunction = () => {
    if (functions.length >= 5) return;
    const newId = Math.max(...functions.map(f => f.id)) + 1;
    setFunctions([...functions, { 
      id: newId, 
      type: 'custom',
      expr: 'x', 
      parsed: 'x', 
      visible: true, 
      color: COLORS[functions.length % COLORS.length],
      pieces: [
        { id: 'p1', condition: 'x < 0', type: 'linear', expr: '-x' },
        { id: 'p2', condition: 'x >= 0', type: 'linear', expr: 'x' }
      ]
    }]);
    setSelectedId(newId);
  };

  const removeFunction = (id) => {
    if (functions.length === 1) return;
    const newFuncs = functions.filter(f => f.id !== id);
    setFunctions(newFuncs);
    if (selectedId === id) setSelectedId(newFuncs[0].id);
  };

  const toggleVisibility = (id) => {
    setFunctions(functions.map(f => f.id === id ? { ...f, visible: !f.visible } : f));
  };

  // Analyze Logic
  useEffect(() => {
    const activeFunc = functions.find(f => f.id === selectedId);
    if (!activeFunc) return;

    const features = { roots: [], yIntercept: null, symmetry: 'Cap' };

    // Y-Intercept
    const yInt = evaluateFunction(activeFunc.parsed, 0);
    if (yInt !== null) features.yIntercept = yInt;

    // Roots Scanning
    const scanStart = -50, scanEnd = 50, scanStep = 0.1;
    let prevY = evaluateFunction(activeFunc.parsed, scanStart);

    for (let x = scanStart; x <= scanEnd; x += scanStep) {
      const currY = evaluateFunction(activeFunc.parsed, x);
      if (currY === null || prevY === null) { prevY = currY; continue; }
      
      if (Math.sign(currY) !== Math.sign(prevY)) {
        const rootX = x - (scanStep * currY) / (currY - prevY);
        if (Math.abs(rootX) < 0.0001) features.roots.push(0);
        else features.roots.push(parseFloat(rootX.toFixed(2)));
      }
      prevY = currY;
    }
    features.roots = [...new Set(features.roots)];

    // Symmetry
    const val1 = evaluateFunction(activeFunc.parsed, 2);
    const valNeg1 = evaluateFunction(activeFunc.parsed, -2);
    if (Math.abs(val1 - valNeg1) < 0.001) features.symmetry = 'Parell (Simetria eix Y)';
    else if (Math.abs(val1 + valNeg1) < 0.001) features.symmetry = 'Senar (Simetria origen)';

    setAnalysis(features);
  }, [functions, selectedId]);

  // Graph Helpers
  const toSvgX = (x) => ((x - xRange[0]) / (xRange[1] - xRange[0])) * width;
  const toSvgY = (y) => height - ((y - yRange[0]) / (yRange[1] - yRange[0])) * height;

  const generatePath = (parsedExpr) => {
    let d = '';
    const step = (xRange[1] - xRange[0]) / width;
    let moving = false;

    for (let x = xRange[0]; x <= xRange[1]; x += step) {
      const y = evaluateFunction(parsedExpr, x);
      if (y === null || !isFinite(y) || Math.abs(y) > yRange[1] * 20) {
        moving = false;
        continue;
      }
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      const clampedSy = Math.max(-500, Math.min(height + 500, sy));
      if (!moving) { d += `M ${sx} ${clampedSy}`; moving = true; } 
      else { d += ` L ${sx} ${clampedSy}`; }
    }
    return d;
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const dataX = xRange[0] + (mouseX / width) * (xRange[1] - xRange[0]);
    const activeFunc = functions.find(f => f.id === selectedId);
    const dataY = activeFunc ? evaluateFunction(activeFunc.parsed, dataX) : null;
    setHoverPoint({ x: dataX, y: dataY, svgX: mouseX, svgY: toSvgY(dataY) });
  };

  const handleZoom = (factor) => {
    const xSpan = xRange[1] - xRange[0];
    const ySpan = yRange[1] - yRange[0];
    setXRange([xRange[0] + (xSpan * (1-factor))/2, xRange[1] - (xSpan * (1-factor))/2]);
    setYRange([yRange[0] + (ySpan * (1-factor))/2, yRange[1] - (ySpan * (1-factor))/2]);
  };

  const calcResults = (() => {
    const f = functions.find(func => func.id === selectedId);
    if (!f) return null;
    const limitLeft = evaluateFunction(f.parsed, parseFloat(calcInputs.limitX) - 0.0001);
    const limitRight = evaluateFunction(f.parsed, parseFloat(calcInputs.limitX) + 0.0001);
    const exact = evaluateFunction(f.parsed, calcInputs.limitX);
    const derivative = calculateDerivativeAt(f.parsed, parseFloat(calcInputs.derivX));
    const integral = calculateIntegral(f.parsed, parseFloat(calcInputs.integA), parseFloat(calcInputs.integB));
    return { limitLeft, limitRight, exact, derivative, integral };
  })();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-2 md:p-6">
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-indigo-200 shadow-md">
            <FunctionSquare className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Laboratori de Funcions</h1>
            <p className="text-slate-500 text-sm">Visualització i Càlcul Interactiu</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Functions List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Funcions</span>
              <button onClick={addFunction} disabled={functions.length >= 5} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors disabled:opacity-50">
                <Plus size={18} />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100">
              {functions.map((func) => (
                <div 
                  key={func.id} 
                  className={`p-3 transition-colors cursor-pointer ${selectedId === func.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                  onClick={() => setSelectedId(func.id)}
                >
                  {/* Title & Controls */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: func.color }}></div>
                    <span className="text-xs font-bold text-slate-700 flex-1">f_{func.id}(x)</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleVisibility(func.id); }} className="text-slate-400 hover:text-slate-600">
                      {func.visible ? <Eye size={14}/> : <EyeOff size={14}/>}
                    </button>
                    {functions.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); removeFunction(func.id); }} className="text-slate-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Main Type Selector */}
                  <div className="mb-2">
                    <select 
                      value={func.type}
                      onChange={(e) => updateFunctionType(func.id, e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded px-2 py-1 text-slate-600 bg-white focus:border-indigo-500 outline-none"
                    >
                      <option value="custom">Lliure (Manual)</option>
                      <option value="linear">Lineal (mx + n)</option>
                      <option value="quadratic">Quadràtica (ax² + c)</option>
                      <option value="piecewise">A Trossos (Per Intervals)</option>
                      <option value="trig">Trigonomètrica</option>
                    </select>
                  </div>

                  {/* Advanced Piecewise Editor */}
                  {func.type === 'piecewise' ? (
                    <div className="bg-slate-100 p-2 rounded border border-slate-200 space-y-3">
                      <div className="text-[10px] uppercase font-bold text-slate-400 flex justify-between items-center">
                        Segments
                        <button onClick={(e) => { e.stopPropagation(); addPiece(func.id); }} className="text-indigo-600 hover:text-indigo-800 bg-white px-1.5 py-0.5 rounded shadow-sm">
                          + Afegir
                        </button>
                      </div>
                      
                      {func.pieces.map((piece, idx) => (
                        <div key={piece.id} className="bg-white p-2 rounded shadow-sm border border-slate-200 text-xs relative group">
                          
                          {/* Remove Button */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); removePiece(func.id, piece.id); }}
                            className="absolute top-1 right-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>

                          {/* Condition (Environment) */}
                          <div className="mb-2">
                             <label className="block text-[10px] font-bold text-slate-400 mb-0.5 uppercase">Entorn / Condició</label>
                             <div className="flex items-center gap-1 bg-slate-50 px-1 rounded border border-slate-100">
                               <span className="font-mono text-slate-400">Si</span>
                               <input 
                                 value={piece.condition}
                                 onChange={(e) => updatePiece(func.id, piece.id, 'condition', e.target.value)}
                                 className="flex-1 bg-transparent py-1 font-mono text-blue-600 outline-none placeholder-slate-300"
                                 placeholder="x < 0"
                               />
                             </div>
                          </div>

                          {/* Function Type & Expression */}
                          <div className="grid grid-cols-3 gap-1">
                             <div className="col-span-1">
                               <select 
                                 value={piece.type}
                                 onChange={(e) => updatePiece(func.id, piece.id, 'type', e.target.value)}
                                 className="w-full text-[10px] p-1 border rounded bg-slate-50"
                               >
                                 <option value="custom">Lliure</option>
                                 <option value="linear">Lineal</option>
                                 <option value="quadratic">Quad</option>
                                 <option value="trig">Trig</option>
                               </select>
                             </div>
                             <div className="col-span-2">
                               <input 
                                 value={piece.expr}
                                 onChange={(e) => updatePiece(func.id, piece.id, 'expr', e.target.value)}
                                 className="w-full p-1 border rounded font-mono bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none"
                                 placeholder="expressió"
                               />
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={func.expr}
                      onChange={(e) => updateFunctionExpr(func.id, e.target.value)}
                      className={`w-full bg-transparent border-b border-dashed border-slate-300 focus:border-indigo-500 outline-none font-mono text-sm py-1 ${selectedId === func.id ? 'text-indigo-900' : 'text-slate-600'}`}
                      placeholder={func.type === 'custom' ? "ex: x^2 - 4" : ""}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Graph */}
        <div className="lg:col-span-6">
          <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-200 relative group h-[500px] flex flex-col">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 bg-white/90 backdrop-blur p-1.5 rounded-lg shadow-sm border border-slate-200">
              <button onClick={() => handleZoom(0.8)} className="p-2 hover:bg-indigo-50 text-slate-600 rounded-md"><ZoomIn size={18} /></button>
              <button onClick={() => handleZoom(1.25)} className="p-2 hover:bg-indigo-50 text-slate-600 rounded-md"><ZoomOut size={18} /></button>
              <button onClick={() => { setXRange([-10, 10]); setYRange([-10, 10]); }} className="p-2 hover:bg-indigo-50 text-slate-600 rounded-md"><RefreshCw size={18} /></button>
            </div>

            <div className="relative flex-1 rounded-lg overflow-hidden cursor-crosshair bg-white"
                 onMouseMove={handleMouseMove}
                 onMouseLeave={() => setHoverPoint(null)}
            >
              <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full block">
                <pattern id="grid" width={width/10} height={height/10} patternUnits="userSpaceOnUse">
                  <path d={`M ${width/10} 0 L 0 0 0 ${height/10}`} fill="none" stroke="#f1f5f9" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {toSvgY(0) >= 0 && toSvgY(0) <= height && <line x1="0" y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="#64748b" strokeWidth="2" />}
                {toSvgX(0) >= 0 && toSvgX(0) <= width && <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={height} stroke="#64748b" strokeWidth="2" />}

                {functions.map(f => f.visible && (
                  <path 
                    key={f.id} 
                    d={generatePath(f.parsed)} 
                    fill="none" 
                    stroke={f.color} 
                    strokeWidth={selectedId === f.id ? 3 : 1.5} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    opacity={selectedId === f.id ? 1 : 0.6}
                  />
                ))}

                {activeTab === 'calcul' && calcResults?.derivative !== null && functions.find(f => f.id === selectedId) && (
                  (() => {
                    const x0 = parseFloat(calcInputs.derivX);
                    const y0 = evaluateFunction(functions.find(f => f.id === selectedId).parsed, x0);
                    const m = calcResults.derivative;
                    if (y0 !== null && m !== null) {
                      const xA = x0 - 2;
                      const yA = m * (xA - x0) + y0;
                      const xB = x0 + 2;
                      const yB = m * (xB - x0) + y0;
                      return (
                        <g>
                          <line x1={toSvgX(xA)} y1={toSvgY(yA)} x2={toSvgX(xB)} y2={toSvgY(yB)} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                          <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="4" fill="#ef4444" />
                        </g>
                      );
                    }
                  })()
                )}

                {activeTab === 'calcul' && (
                   (() => {
                     const f = functions.find(fn => fn.id === selectedId);
                     const a = parseFloat(calcInputs.integA);
                     const b = parseFloat(calcInputs.integB);
                     if (f && !isNaN(a) && !isNaN(b)) {
                       let dArea = `M ${toSvgX(a)} ${toSvgY(0)}`;
                       const step = (b-a)/40;
                       for(let x=a; x<=b; x+=step) {
                         const y = evaluateFunction(f.parsed, x);
                         if(y !== null) dArea += ` L ${toSvgX(x)} ${toSvgY(y)}`;
                       }
                       dArea += ` L ${toSvgX(b)} ${toSvgY(0)} Z`;
                       return <path d={dArea} fill={f.color} fillOpacity="0.2" stroke="none" />
                     }
                   })()
                )}

                {hoverPoint && hoverPoint.y !== null && (
                  <circle cx={hoverPoint.svgX} cy={hoverPoint.svgY} r="5" fill="white" stroke="#334155" strokeWidth="2" />
                )}
              </svg>

              {hoverPoint && (
                <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-xs px-2 py-1 rounded font-mono pointer-events-none">
                  x: {hoverPoint.x.toFixed(2)}, y: {hoverPoint.y?.toFixed(2)}
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 px-2 py-1 font-mono bg-white rounded-b-lg">
              <span>{xRange[0].toFixed(1)}</span>
              <span>{xRange[1].toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Analysis & Tools */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="flex border-b border-slate-200">
              <button onClick={() => setActiveTab('analisi')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'analisi' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}>Anàlisi</button>
              <button onClick={() => setActiveTab('calcul')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'calcul' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}>Càlcul</button>
              <button onClick={() => setActiveTab('taula')} className={`flex-1 py-3 text-xs font-bold uppercase ${activeTab === 'taula' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}>Taula</button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
              
              {activeTab === 'analisi' && analysis && (
                <div className="space-y-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                     <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                       <Info size={16}/> Propietats Globals
                     </h4>
                     <p className="text-slate-600 mb-1"><span className="font-semibold">Simetria:</span> {analysis.symmetry}</p>
                     <p className="text-slate-600"><span className="font-semibold">Tall Eix Y:</span> {analysis.yIntercept !== null ? `(0, ${analysis.yIntercept.toFixed(2)})` : 'No existeix'}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 mb-2">Arrels (f(x)=0)</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.roots.length > 0 ? analysis.roots.map((r, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-xs">{r}</span>
                      )) : <span className="text-slate-400 italic">Cap en aquest interval</span>}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calcul' && (
                <div className="space-y-6 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                      <ArrowRightLeft size={16}/> Límits
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">x →</span>
                      <input 
                        type="number" 
                        value={calcInputs.limitX} 
                        onChange={(e) => setCalcInputs({...calcInputs, limitX: e.target.value})}
                        className="border rounded px-2 py-1 w-16 text-center font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded">
                      <div>Esq: <span className="font-mono font-bold">{calcResults?.limitLeft?.toFixed(4)}</span></div>
                      <div>Dre: <span className="font-mono font-bold">{calcResults?.limitRight?.toFixed(4)}</span></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                      <FunctionSquare size={16}/> Derivada
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">f'(a) a =</span>
                      <input 
                        type="number" 
                        value={calcInputs.derivX} 
                        onChange={(e) => setCalcInputs({...calcInputs, derivX: e.target.value})}
                        className="border rounded px-2 py-1 w-16 text-center font-mono"
                      />
                    </div>
                    <div className="bg-red-50 text-red-800 p-2 rounded text-center">
                      f'({calcInputs.derivX}) ≈ <span className="font-bold font-mono text-lg">{calcResults?.derivative?.toFixed(4)}</span>
                      <p className="text-[10px] opacity-75 mt-1">Veure recta tangent en gràfica (vermell)</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                      <Sigma size={16}/> Integral Definida
                    </h4>
                    <div className="flex items-center gap-2 justify-center font-mono text-xs">
                      ∫
                      <input 
                        type="number" 
                        value={calcInputs.integA}
                        onChange={(e) => setCalcInputs({...calcInputs, integA: e.target.value})}
                        className="border rounded px-1 py-1 w-12 text-center mx-1"
                      />
                      fins
                      <input 
                        type="number" 
                        value={calcInputs.integB}
                        onChange={(e) => setCalcInputs({...calcInputs, integB: e.target.value})}
                        className="border rounded px-1 py-1 w-12 text-center mx-1"
                      />
                    </div>
                    <div className="bg-indigo-50 text-indigo-800 p-2 rounded text-center">
                      Àrea ≈ <span className="font-bold font-mono text-lg">{calcResults?.integral?.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'taula' && (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                    <tr><th className="px-2 py-1">x</th><th className="px-2 py-1">f(x)</th></tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(x => (
                      <tr key={x} className="border-b border-slate-50">
                        <td className="px-2 py-1 font-bold text-slate-600">{x}</td>
                        <td className="px-2 py-1 text-indigo-600">
                           {evaluateFunction(functions.find(f => f.id === selectedId)?.parsed, x)?.toFixed(4) ?? '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}