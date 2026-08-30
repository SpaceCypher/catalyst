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
  FileCode,
  Tag,
  Star
} from 'lucide-react';
import thinCatalog from '../data/seed/merchant_catalog_thin.json';
import richCatalog from '../data/seed/merchant_catalog_rich.json';

export default function StorefrontView({ activeDiff, onOpenStorefront }) {
  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied' || (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');
  const [activeCatalogMode, setActiveCatalogMode] = useState(isApproved ? 'treatment' : 'control');
  const [selectedSku, setSelectedSku] = useState('merch-boot-01');

  React.useEffect(() => {
    setActiveCatalogMode(isApproved ? 'treatment' : 'control');
  }, [isApproved]);

  const catalog = activeCatalogMode === 'treatment' ? richCatalog : thinCatalog;
  const currentProduct = catalog.find(p => p.product_id === selectedSku) || catalog[0] || {};

  const productName = currentProduct.name || currentProduct.title || 'Product';
  const rawAttributes = currentProduct.attributes || [];

  // Parse attributes whether array of strings or object
  const parsedAttributes = Array.isArray(rawAttributes)
    ? rawAttributes.map(attr => {
        if (typeof attr === 'string' && attr.includes(':')) {
          const parts = attr.split(':');
          return { key: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return { key: 'Spec', value: String(attr) };
      })
    : Object.entries(rawAttributes).map(([k, v]) => ({ key: k, value: String(v) }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 my-4">
      
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
            Store URL: <a href="https://apex-outdoor.vercel.app" target="_blank" rel="noreferrer" className="text-blue-300 underline font-medium">https://apex-outdoor.vercel.app</a> • 12 Active Catalog SKUs
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenStorefront}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span>Open live store</span>
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
                ? 'Fix has been approved. The live connected storefront serves enhanced machine-readable attributes.'
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
        
        {/* Left SKU list (12 products) */}
        <div className="bg-[#121624]/90 border border-slate-700/60 rounded-2xl p-4 space-y-2 max-h-[600px] overflow-y-auto">
          <div className="text-xs font-semibold text-white px-2 py-1 font-mono uppercase tracking-wider text-[11px] text-slate-400">
            Catalog Products ({catalog.length})
          </div>
          <div className="space-y-1.5">
            {catalog.map((item) => {
              const name = item.name || item.title || item.product_id;
              const isSelected = selectedSku === item.product_id;

              return (
                <button
                  key={item.product_id}
                  onClick={() => setSelectedSku(item.product_id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-mono transition-all cursor-pointer flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-slate-800 text-blue-200 border border-slate-700 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-white font-sans text-xs font-medium">{name}</span>
                    {item.product_id === 'merch-boot-01' && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 flex-shrink-0 font-mono">
                        Fix target
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{item.product_id}</span>
                    <span className="text-emerald-400">₹{item.price?.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Product Spec inspector */}
        <div className="md:col-span-2 bg-[#121624]/90 border border-slate-700/60 rounded-2xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {currentProduct.product_id}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentProduct.category || 'Outdoors'}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold text-white mt-1">
                {productName}
              </h2>
              <div className="text-lg font-mono font-bold text-emerald-400">
                ₹{currentProduct.price?.toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-mono px-3 py-1.5 rounded-full border inline-block ${
                activeCatalogMode === 'treatment'
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60 font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                {parsedAttributes.length} Machine-Readable Specs
              </span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#0d0f17] p-3 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[11px]">Customer Reviews</div>
              <div className="text-white font-semibold text-sm mt-0.5">{currentProduct.review_count || 18} Verified</div>
            </div>
            <div className="bg-[#0d0f17] p-3 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[11px]">Pre-Purchase FAQs</div>
              <div className="text-white font-semibold text-sm mt-0.5">{currentProduct.faq_count || 3} Questions</div>
            </div>
            <div className="bg-[#0d0f17] p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-slate-500 text-[11px]">Schema.org JSON-LD</div>
              <div className={`font-semibold text-sm mt-0.5 ${currentProduct.has_structured_schema ? 'text-emerald-400' : 'text-slate-500'}`}>
                {currentProduct.has_structured_schema ? '✓ Present' : '✕ Missing'}
              </div>
            </div>
          </div>

          {/* Attributes Matrix */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-300 font-semibold font-mono flex items-center justify-between">
              <span>Machine-Readable Attributes ({parsedAttributes.length})</span>
              <span className="text-[11px] text-slate-500">Crawled by AI Shopping Engines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {parsedAttributes.map((attr, idx) => (
                <div key={idx} className="bg-[#0d0f17] p-3 rounded-xl border border-slate-800/80 flex flex-col space-y-0.5">
                  <span className="text-blue-300 text-[11px] font-semibold">{attr.key}:</span>
                  <span className="text-slate-200 text-xs break-words">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
