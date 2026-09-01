import React, { useState, useEffect } from 'react';
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
  Loader2,
  Server,
  QrCode,
  Smartphone,
  Building2,
  Zap,
  X
} from 'lucide-react';
import thinCatalog from './catalog_thin.json';
import richCatalog from './catalog_rich.json';

// Backend URL — set VITE_API_BASE in Vercel env vars for the store project
const API_BASE = import.meta.env.VITE_API_BASE || 'https://catalyst-880d.onrender.com';

export default function App() {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [storeStatus, setStoreStatus] = useState(null); // null = loading
  const [selectedProduct, setSelectedProduct] = useState(thinCatalog[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [viewJsonLd, setViewJsonLd] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [txnId, setTxnId] = useState('');


  // On load: ask the backend whether any fix has been approved/applied.
  // If backend is unreachable, fall back to the ?enhanced URL param (dev convenience).
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/store/status`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setStoreStatus(data);
          setIsEnhanced(data.is_any_patched);
          return;
        }
      } catch (_) {}
      // Fallback: read URL param if backend is unreachable (local dev)
      const params = new URLSearchParams(window.location.search);
      const urlEnhanced = params.get('enhanced') === 'true' || params.get('catalyst') === 'patched';
      setIsEnhanced(urlEnhanced);
      setStoreStatus({ is_any_patched: urlEnhanced, fallback: true });
    };
    fetchStatus();
    // Recheck every 30s so the page updates after Catalyst approval without manual refresh
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

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
            {/* Read-only status badge — controlled only by Catalyst dashboard approval */}
            {isEnhanced ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Catalyst Patched</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono font-bold">
                <span>Baseline</span>
              </div>
            )}

            {/* Link to Backend API */}
            <a
              href="https://catalyst-880d.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono font-bold border border-slate-700 transition-all"
              title="Open Live FastAPI Backend on Render"
            >
              <Server className="w-3 h-3" />
              <span>Backend API</span>
              <ExternalLink className="w-2.5 h-2.5 text-emerald-500/70" />
            </a>

            {/* Link to Catalyst Agent */}
            <a
              href="https://frontend-two-zeta-16.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
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

          <div className="text-[10px] font-mono text-slate-500 flex-shrink-0">
            {storeStatus?.fallback ? 'backend offline — url param mode' : storeStatus === null ? 'checking…' : `auto-synced with Catalyst DB`}
          </div>
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

      {/* 3. Razorpay Standard Checkout Modal (Authentic UI) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b121e] border border-slate-700/80 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative flex flex-col font-sans">
            
            {/* Razorpay Top Header */}
            <div className="p-5 bg-gradient-to-r from-[#072654] via-[#0c2340] to-[#0a192f] border-b border-slate-700/60 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-600/30">
                  R
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Razorpay Checkout</span>
                    <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded font-bold uppercase">
                      Test Mode
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    Apex Ridge Outdoors • Trusted Merchant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!paymentSuccess ? (
              <div className="p-6 space-y-4">
                
                {/* Order Summary Pill */}
                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{currentProduct.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">SKU: {currentProduct.product_id} • Qty: 1</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      ₹{currentProduct.price?.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Free express shipping</span>
                  </div>
                </div>

                {/* Select Payment Method Tabs */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Choose Payment Option
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>UPI QR</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>NetBanking</span>
                    </button>
                  </div>
                </div>

                {/* Payment Form Content based on tab */}
                {paymentMethod === 'upi' && (
                  <div className="p-3.5 rounded-2xl bg-[#070c14] border border-slate-800 space-y-2 text-center">
                    <div className="w-24 h-24 mx-auto rounded-xl bg-white p-2 flex items-center justify-center shadow-inner">
                      <QrCode className="w-20 h-20 text-slate-900" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-300">
                      Scan with any UPI App (GPay, PhonePe, Paytm, CRED)
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      VPA: <span className="text-emerald-400">apexridge@razorpay</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-3.5 rounded-2xl bg-[#070c14] border border-slate-800 space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Card Number (Test Visa):</span>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                        4111 2222 3333 4444
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Expiry:</span>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">12/28</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">CVV:</span>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">123</div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-3.5 rounded-2xl bg-[#070c14] border border-slate-800 space-y-2 text-xs font-mono">
                    <span className="text-[10px] text-slate-500 block">Select Popular Bank:</span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-center font-semibold">
                          {bank}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Payment CTA */}
                <button
                  onClick={() => {
                    const simId = 'pay_sim_' + Math.random().toString(36).substring(2, 9);
                    setTxnId(simId);
                    setPaymentSuccess(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{currentProduct.price?.toLocaleString('en-IN')} via Razorpay</span>
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-slate-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted • Powered by Razorpay Standard Checkout</span>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Check className="w-7 h-7" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-white">Payment Authorized & Captured</h4>
                  <p className="text-xs text-slate-300">
                    Amount: <strong className="text-emerald-400 font-mono">₹{currentProduct.price?.toLocaleString('en-IN')}</strong>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070c14] border border-slate-800 text-left font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Razorpay Payment ID:</span>
                    <strong className="text-blue-300">{txnId || 'pay_sim_880d9a'}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Payment Method:</span>
                    <span className="text-slate-200 uppercase">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Attribution Status:</span>
                    <span className="text-emerald-400 font-bold">Verified AI Referral ✓</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPaymentSuccess(false);
                    setIsCheckoutOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}


      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-[#040810] text-center text-xs text-slate-500 font-mono space-y-2">
        <div>Apex Ridge Outdoors • Connected to Catalyst AI Revenue Agent • Razorpay Buildathon</div>
        <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400">
          <a href="https://frontend-two-zeta-16.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white underline">
            Catalyst Dashboard
          </a>
          <span>•</span>
          <a href="https://catalyst-880d.onrender.com/docs" target="_blank" rel="noreferrer" className="hover:text-emerald-400 underline">
            Live FastAPI Backend Docs
          </a>
        </div>
      </footer>


    </div>
  );
}
