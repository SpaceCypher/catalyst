import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Check, 
  Lock, 
  CreditCard, 
  ExternalLink, 
  HelpCircle,
  Code2,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import thinCatalog from './catalog_thin.json';
import richCatalog from './catalog_rich.json';

export default function App() {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(thinCatalog[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [viewJsonLd, setViewJsonLd] = useState(false);

  const products = isEnhanced ? richCatalog : thinCatalog;
  const currentProduct = products.find(p => p.product_id === selectedProduct?.product_id) || products[0];

  const handleRazorpayPay = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsCheckoutOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      
      {/* 1. Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0a101d]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-emerald-600/30">
              ▲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">Apex Ridge Outdoors</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Sample Merchant Store
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Official Trekking & Expedition Store</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Catalyst Lifecycle Switcher */}
            <div className="flex items-center bg-slate-900/90 border border-slate-700 p-1 rounded-xl">
              <button
                onClick={() => setIsEnhanced(false)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  !isEnhanced ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Baseline (Control)
              </button>
              <button
                onClick={() => setIsEnhanced(true)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                  isEnhanced ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>2. Catalyst Patched</span>
              </button>
            </div>

            {/* Link to Catalyst Agent */}
            <a
              href="https://frontend-two-zeta-16.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>Launch Catalyst Agent</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. Main Storefront Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* State Banner */}
        <div className={`p-4 rounded-2xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isEnhanced 
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              {isEnhanced ? (
                <strong>Active: Catalyst patch deployed! This product page now exposes 11 verified attributes, Schema.org JSON-LD, and FAQs to AI search engines.</strong>
              ) : (
                <span>Baseline (Control): This product page currently exposes only 5 basic attributes and no structured schema. AI shopping engines recommend competitors 3.7× more often.</span>
              )}
            </span>
          </div>

          <button
            onClick={() => setIsEnhanced(!isEnhanced)}
            className="text-xs font-bold underline font-mono flex-shrink-0 hover:text-white"
          >
            {isEnhanced ? 'Switch to Baseline (Before) ←' : 'Switch to Catalyst Patched (After) →'}
          </button>
        </div>

        {/* Product Page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Media & Catalog Selector */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex items-center justify-center min-h-[380px] relative overflow-hidden group">
              <div className="text-9xl select-none group-hover:scale-105 transition-transform duration-300">
                {currentProduct.category === 'Footwear' ? '🥾' : currentProduct.category === 'Outdoor Gear' ? '🎒' : '🧥'}
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                SKU: {currentProduct.product_id}
              </div>
              {isEnhanced && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Catalyst Verified</span>
                </div>
              )}
            </div>

            {/* SKU Picker Pills */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Catalog SKUs (Select to inspect):</span>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <button
                    key={p.product_id}
                    onClick={() => setSelectedProduct(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      currentProduct.product_id === p.product_id
                        ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.name.split(' ')[0]} {p.category === 'Footwear' ? 'Boots' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Content & Specs */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {currentProduct.category}
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {currentProduct.name}
              </h1>
              
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold">4.7</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-mono">{currentProduct.review_count || 18} Verified Buyer Reviews</span>
              </div>
            </div>

            {/* Price & Shipping */}
            <div className="flex items-baseline space-x-3 pb-4 border-b border-slate-800">
              <span className="text-3xl font-black text-white">₹{currentProduct.price?.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">In Stock • Free express delivery</span>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Technical Specifications
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {Object.keys(currentProduct.attributes || {}).length} Machine-Readable Attributes
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  {Object.entries(currentProduct.attributes || {}).map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 block text-[10px] uppercase">{k.replace('_', ' ')}:</span>
                      <strong className="text-slate-200 text-xs">{String(v)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-purchase FAQs (Visible if treatment enhanced) */}
              {currentProduct.faqs && currentProduct.faqs.length > 0 && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span>Pre-Purchase Technical FAQs</span>
                  </span>

                  <div className="space-y-2 text-xs">
                    {currentProduct.faqs.slice(0, 3).map((faq, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="font-bold text-slate-200">Q: {faq.question}</div>
                        <div className="text-slate-400 leading-relaxed">A: {faq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schema.org Inspector Pill */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Schema.org JSON-LD: <strong>{currentProduct.has_structured_schema ? '✓ Valid (Product + Offers)' : '✗ Missing'}</strong></span>
                </span>

                <button
                  onClick={() => setViewJsonLd(!viewJsonLd)}
                  className="text-emerald-400 hover:underline"
                >
                  {viewJsonLd ? 'Hide JSON-LD' : 'View Code'}
                </button>
              </div>

              {viewJsonLd && (
                <div className="bg-[#03060a] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-48">
                  <pre>
                    {JSON.stringify({
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": currentProduct.name,
                      "price": currentProduct.price,
                      "additionalProperty": Object.entries(currentProduct.attributes || {}).map(([k, v]) => ({ name: k, value: v }))
                    }, null, 2)}
                  </pre>
                </div>
              )}

              {/* Razorpay Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-base font-bold shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Buy Now • Pay ₹{currentProduct.price?.toLocaleString('en-IN')} with Razorpay</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>Secured by Razorpay Payments • 100% Verified Merchant Checkout</span>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* 3. Razorpay Dummy Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  R
                </div>
                <span className="font-bold text-white text-sm">Razorpay Checkout</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Apex Ridge Outdoors</span>
            </div>

            {!paymentSuccess ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">{currentProduct.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Quantity: 1</div>
                  </div>
                  <div className="text-lg font-black text-emerald-400">
                    ₹{currentProduct.price?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px]">Payment Method:</span>
                    <span>UPI / Cards / NetBanking / Razorpay Magic Checkout</span>
                  </div>
                </div>

                <button
                  onClick={handleRazorpayPay}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25"
                >
                  <Lock className="w-4 h-4" />
                  <span>Simulate Payment (₹{currentProduct.price})</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-extrabold text-white">Payment Successful!</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Razorpay Payment ID: pay_sim_{Math.random().toString(36).substring(7)}
                </p>
                <div className="text-[11px] text-emerald-400 font-mono">
                  Session recorded & attributed deterministically
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-[#040810] text-center text-xs text-slate-500 font-mono">
        Apex Ridge Outdoors • Connected to Catalyst AI Revenue Agent • Razorpay Buildathon
      </footer>

    </div>
  );
}
