import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Info,
  Code2,
  FileCode
} from 'lucide-react';
import thinCatalog from '../data/seed/merchant_catalog_thin.json';
import richCatalog from '../data/seed/merchant_catalog_rich.json';

export default function StorefrontView({ activeDiff, onOpenStorefront }) {
  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';
  const [activeCatalogMode, setActiveCatalogMode] = useState(isApproved ? 'treatment' : 'control');
  const [selectedSku, setSelectedSku] = useState('merch-boot-01');

  const catalog = activeCatalogMode === 'treatment' ? richCatalog : thinCatalog;
  const currentProduct = catalog.find(p => p.product_id === selectedSku) || catalog[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
      {/* Store Header Card */}
      <div className="rounded-3xl bg-[#121624]/95 border border-slate-700/80 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Connected Storefront</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">
            Apex Ridge Outdoors
          </h1>
          <p className="text-xs text-slate-300 font-mono">
            URL: <a href="https://apex-outdoor.vercel.app" target="_blank" rel="noreferrer" className="text-blue-300 underline">https://apex-outdoor.vercel.app</a> • 12 Active SKUs
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenStorefront}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span>Open live storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Catalog State Switcher Banner */}
      <div className="rounded-2xl bg-[#0d0f17] border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-white">Storefront Catalog State</div>
            <div className="text-xs text-slate-400">
              {isApproved 
                ? 'Fix has been approved. The connected store exposes enhanced machine-readable attributes.'
                : 'Fix is pending approval. Storefront is currently running in Baseline Control mode.'}
            </div>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveCatalogMode('control')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCatalogMode === 'control' 
                  ? 'bg-slate-800 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Control (Baseline)
            </button>
            <button
              onClick={() => setActiveCatalogMode('treatment')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center space-x-1 ${
                activeCatalogMode === 'treatment' 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>2. Catalyst Treatment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Left SKU list */}
        <div className="bg-[#121624]/90 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <div className="text-xs font-semibold text-white px-2 py-1 font-mono uppercase tracking-wider text-[11px] text-slate-400">
            Catalog Products ({catalog.length})
          </div>
          <div className="space-y-1">
            {catalog.slice(0, 6).map((item) => (
              <button
                key={item.product_id}
                onClick={() => setSelectedSku(item.product_id)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                  selectedSku === item.product_id
                    ? 'bg-slate-800 text-blue-200 border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className="truncate pr-2">{item.title}</div>
                {item.product_id === 'merch-boot-01' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Fix target
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Product Spec inspector */}
        <div className="md:col-span-2 bg-[#121624]/90 border border-slate-700/60 rounded-2xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{currentProduct.product_id}</span>
              <h2 className="text-xl font-display font-bold text-white mt-0.5">{currentProduct.title}</h2>
              <div className="text-sm font-mono text-emerald-400 mt-1">₹{currentProduct.price?.toLocaleString()}</div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                activeCatalogMode === 'treatment'
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                {activeCatalogMode === 'treatment' ? '11 Verified Specs' : '5 Basic Specs'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1 text-xs">
            <div className="text-slate-400 font-semibold font-mono">Product Description</div>
            <div className="text-slate-300 font-sans leading-relaxed bg-[#0d0f17] p-3 rounded-xl border border-slate-800">
              {currentProduct.description}
            </div>
          </div>

          {/* Attributes Matrix */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-400 font-semibold font-mono">Machine-Readable Attributes</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              {Object.entries(currentProduct.attributes || {}).map(([key, val]) => (
                <div key={key} className="bg-[#0d0f17] p-2.5 rounded-xl border border-slate-800 flex justify-between gap-2">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-slate-200 font-semibold truncate">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schema.org Status */}
          <div className="pt-1 text-xs font-mono text-slate-400 flex items-center justify-between border-t border-slate-800">
            <span>Structured Data (JSON-LD):</span>
            <span className={activeCatalogMode === 'treatment' ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
              {activeCatalogMode === 'treatment' ? '✓ Valid Product & Offer Schema' : '✕ None (Thin Spec)'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
