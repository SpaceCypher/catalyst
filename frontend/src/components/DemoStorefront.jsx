import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Star, 
  Check, 
  Lock, 
  CreditCard, 
  ExternalLink, 
  ChevronRight,
  HelpCircle,
  Code2,
  Info,
  Store,
  Layers
} from 'lucide-react';
import { fetchCatalog } from '../api/client';

export default function DemoStorefront({ activeDiff, onReturnToCatalyst }) {
  const [activeStore, setActiveStore] = useState('apex'); // 'apex' | 'competitor'
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [viewJsonLd, setViewJsonLd] = useState(false);

  const isApproved = activeDiff?.status === 'approved' || activeDiff?.status === 'applied';

  useEffect(() => {
    let catalogState = 'thin';
    if (activeStore === 'competitor') {
      catalogState = 'competitor';
    } else {
      catalogState = isApproved ? 'rich' : 'thin';
    }

    fetchCatalog(catalogState).then((data) => {
      setProducts(data.products || []);
      const defaultProduct = data.products?.[0];
      setSelectedProduct(defaultProduct);
    }).catch(console.error);
  }, [activeStore, isApproved]);

  const handleRazorpayPay = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsCheckoutOpen(false);
    }, 2200);
  };

  const isApex = activeStore === 'apex';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      
      {/* 1. Storefront Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a101d]/95 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-md ${
                isApex ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {isApex ? '▲' : '◆'}
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  {isApex ? 'Apex Outdoor' : 'SummitPro Gear (Competitor)'}
                </span>
                <span className={`text-[10px] font-mono border px-1.5 py-0.2 rounded ml-2 ${
                  isApex 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {isApex ? 'Connected Store' : 'Competitor Benchmark'}
                </span>
              </div>
            </div>

            {/* Storefront Switcher Tabs */}
            <div className="hidden sm:flex items-center space-x-1 bg-surface-dark p-1 rounded-xl border border-surface-border">
              <button
                onClick={() => setActiveStore('apex')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  isApex ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Apex Outdoor (Your Store)
              </button>
              <button
                onClick={() => setActiveStore('competitor')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  !isApex ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. SummitPro (Competitor)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Status indicator */}
            {isApex ? (
              <div className={`hidden md:flex px-3 py-1 rounded-full text-xs font-mono items-center space-x-1.5 border ${
                isApproved
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>State: <strong>{isApproved ? 'Catalyst Enhanced' : 'Original Basic'}</strong></span>
              </div>
            ) : (
              <div className="hidden md:flex px-3 py-1 rounded-full text-xs font-mono items-center space-x-1.5 border bg-rose-500/10 border-rose-500/30 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>AI Recommendation Share: <strong>55%</strong></span>
              </div>
            )}

            {/* Back to Catalyst Button */}
            <button
              onClick={onReturnToCatalyst}
              className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Catalyst Agent</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Store Layout */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* Banner highlighting Catalyst live state */}
        <div className={`p-4 rounded-2xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          !isApex
            ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            : isApproved 
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              {!isApex ? (
                <strong>Competitor Benchmark: SummitPro exposes 11 machine-readable technical attributes, 312 reviews, and full Schema.org JSON-LD. AI shopping engines pick this store in 55% of queries.</strong>
              ) : isApproved ? (
                <strong>Active: Catalyst patch deployed! This product page now exposes 11 verified attributes, Schema.org JSON-LD, and FAQs to AI search engines.</strong>
              ) : (
                <span>Baseline: This product page currently exposes only 5 basic attributes and no structured schema. AI shopping assistants recommend competitors 3.7× more often.</span>
              )}
            </span>
          </div>

          <button
            onClick={onReturnToCatalyst}
            className="text-xs font-bold underline font-mono flex-shrink-0 hover:text-white"
          >
            {isApproved ? 'View Incremental GMV in Catalyst →' : 'Launch Catalyst to Diagnose & Fix →'}
          </button>
        </div>

        {selectedProduct ? (
          /* Product Details Page */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left: Product Media Gallery */}
            <div className="space-y-4">
              <div className="bg-surface-card border border-surface-border rounded-3xl p-8 flex items-center justify-center min-h-[380px] relative overflow-hidden group">
                <div className="text-8xl select-none group-hover:scale-105 transition-transform duration-300">
                  {selectedProduct.category === 'Footwear' ? '🥾' : selectedProduct.category === 'Outdoor Gear' ? '🎒' : '🧥'}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-dark border border-surface-border text-xs font-mono text-slate-300">
                  SKU: {selectedProduct.product_id}
                </div>
                {isApex && isApproved && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Catalyst Enhanced</span>
                  </div>
                )}
                {!isApex && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1">
                    <span>AI Top Pick (55% Win Rate)</span>
                  </div>
                )}
              </div>

              {/* SKU Picker Pills */}
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <button
                    key={p.product_id}
                    onClick={() => setSelectedProduct(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      selectedProduct.product_id === p.product_id
                        ? isApex ? 'bg-emerald-600 border-emerald-400 text-white font-bold' : 'bg-rose-600 border-rose-400 text-white font-bold'
                        : 'bg-surface-card border-surface-border text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.name.split(' ')[0]} {p.category === 'Footwear' ? 'Boots' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Content & Specifications */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className={`text-xs font-semibold uppercase tracking-wider ${isApex ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedProduct.category}
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {selectedProduct.name}
                </h1>
                
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold">4.8</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-mono">{selectedProduct.review_count || 18} Verified Buyer Reviews</span>
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="flex items-baseline space-x-3 pb-4 border-b border-surface-border">
                <span className="text-3xl font-black text-white">₹{selectedProduct.price?.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-400 font-mono">Free express delivery across India</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Technical Specifications Grid */}
                <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border/60">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Technical Specifications
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {Object.keys(selectedProduct.attributes || {}).length} Machine-Readable Attributes
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                    {Object.entries(selectedProduct.attributes || {}).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-xl bg-surface-dark border border-surface-border/60">
                        <span className="text-slate-500 block text-[10px] uppercase">{k.replace('_', ' ')}:</span>
                        <strong className="text-slate-200 text-xs">{String(v)}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pre-purchase FAQs */}
                {selectedProduct.faqs && selectedProduct.faqs.length > 0 && (
                  <div className="bg-surface-card border border-surface-border rounded-2xl p-5 space-y-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-brand-blue" />
                      <span>Pre-Purchase FAQs (Machine-Readable)</span>
                    </span>

                    <div className="space-y-2 text-xs">
                      {selectedProduct.faqs.slice(0, 3).map((faq, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface-dark border border-surface-border/60 space-y-1">
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
                    <Code2 className="w-4 h-4 text-brand-blue" />
                    <span>Schema.org JSON-LD: <strong>{selectedProduct.has_structured_schema ? '✓ Valid (Product + Offers)' : '✗ Missing'}</strong></span>
                  </span>

                  <button
                    onClick={() => setViewJsonLd(!viewJsonLd)}
                    className="text-brand-blue hover:underline"
                  >
                    {viewJsonLd ? 'Hide JSON-LD' : 'View Code'}
                  </button>
                </div>

                {viewJsonLd && (
                  <div className="bg-[#03060a] p-4 rounded-xl border border-surface-border font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-48">
                    <pre>
                      {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": selectedProduct.name,
                        "price": selectedProduct.price,
                        "additionalProperty": Object.entries(selectedProduct.attributes || {}).map(([k, v]) => ({ name: k, value: v }))
                      }, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Razorpay Checkout Trigger */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className={`w-full py-4 rounded-2xl text-white text-base font-bold shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-98 ${
                    isApex ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Buy Now • Pay ₹{selectedProduct.price?.toLocaleString('en-IN')} with Razorpay</span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secured by Razorpay Payments • 100% Verified Merchant Checkout</span>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">Loading storefront products...</div>
        )}

      </main>

      {/* 3. Razorpay Dummy Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-card border border-surface-border rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  R
                </div>
                <span className="font-bold text-white text-sm">Razorpay Checkout</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{isApex ? 'Apex Outdoor' : 'SummitPro'}</span>
            </div>

            {!paymentSuccess ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-dark border border-surface-border flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">{selectedProduct.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Quantity: 1</div>
                  </div>
                  <div className="text-lg font-black text-emerald-400">
                    ₹{selectedProduct.price?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 bg-surface-dark rounded-xl border border-surface-border text-slate-300">
                    <span className="text-slate-500 block text-[10px]">Payment Method:</span>
                    <span>UPI / Cards / NetBanking / Razorpay Magic Checkout</span>
                  </div>
                </div>

                <button
                  onClick={handleRazorpayPay}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25"
                >
                  <Lock className="w-4 h-4" />
                  <span>Simulate Payment (₹{selectedProduct.price})</span>
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
      <footer className="border-t border-surface-border py-4 bg-[#040810] text-center text-xs text-slate-500 font-mono">
        Apex Outdoor & SummitPro Benchmark Stores • Connected to Catalyst AI Revenue Agent • Razorpay Buildathon
      </footer>

    </div>
  );
}
