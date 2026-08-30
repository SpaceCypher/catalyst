import React, { useState, useEffect } from 'react';
import { Database, Package, FileCode, CheckCircle2, XCircle, Search, Layers, RefreshCw } from 'lucide-react';
import { fetchCatalog } from '../api/client';

export default function CatalogSettingsPanel() {
  const [catalogState, setCatalogState] = useState('thin');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts(catalogState);
  }, [catalogState]);

  const loadProducts = async (state) => {
    setLoading(true);
    try {
      const data = await fetchCatalog(state);
      setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card border border-surface-border p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
            <span>DATA & CATALOG ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Synthetic Catalog & Simulation Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Inspect raw catalog states (Control Thin, Treatment Rich, and Competitor) and verify attribute completeness across all 12 merchant SKUs.
          </p>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex items-center space-x-1.5 bg-surface-dark p-1.5 rounded-xl border border-surface-border">
          <button
            onClick={() => setCatalogState('thin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              catalogState === 'thin' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Control (Thin)
          </button>
          <button
            onClick={() => setCatalogState('rich')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              catalogState === 'rich' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Treatment (Rich)
          </button>
          <button
            onClick={() => setCatalogState('competitor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              catalogState === 'competitor' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Competitors
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-brand-blue" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {catalogState.toUpperCase()} Catalog State ({products.length} Products)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {catalogState === 'thin' ? 'Baseline Starting State' : catalogState === 'rich' ? 'Catalyst Approved State' : 'Benchmark Benchmark State'}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            Loading catalog data...
          </div>
        ) : (
          <div className="mt-4 divide-y divide-surface-border/60">
            {products.map(p => (
              <div key={p.product_id} className="py-4 space-y-2">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-brand-blue font-bold">{p.product_id}</span>
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-surface-dark text-slate-300 border border-surface-border">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-white">₹{p.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Attributes list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.attributes?.map((attr, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-dark border border-surface-border text-slate-300">
                      {attr}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 pt-1">
                  <span>Reviews: <strong className="text-slate-200">{p.review_count}</strong> (detail: {p.review_detail_score})</span>
                  <span>•</span>
                  <span>FAQs: <strong className="text-slate-200">{p.faq_count}</strong></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span>Schema.org:</span>
                    {p.has_structured_schema ? (
                      <span className="text-emerald-400 font-bold">Present ✓</span>
                    ) : (
                      <span className="text-rose-400 font-bold">Missing ✗</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
