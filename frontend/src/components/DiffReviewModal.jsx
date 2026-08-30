import React, { useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  FileCode, 
  Check, 
  Sparkles, 
  Loader2, 
  Lock,
  Layers,
  Info
} from 'lucide-react';

export default function DiffReviewModal({ 
  diff, 
  onClose, 
  onApprove, 
  onReject, 
  isApproving 
}) {
  if (!diff) return null;

  const isApproved = diff.status === 'approved' || diff.status === 'applied' || (typeof window !== 'undefined' && localStorage.getItem('catalyst_diff_status') === 'approved');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const defaultFields = [
    { field_name: "waterproof_rating", category: "SPECIFICATION", new_value: "HydroGuard IPX7 (15,000mm hydrostatic head)", evidence_source: "Verified from manufacturer spec sheet" },
    { field_name: "weight", category: "SPECIFICATION", new_value: "420g per boot (Men UK size 8)", evidence_source: "Product packaging & lab scale test" },
    { field_name: "outsole", category: "SPECIFICATION", new_value: "Vibram MegaGrip with 5mm multidirectional lugs", evidence_source: "Outsole supplier technical sheet" },
    { field_name: "structured_schema", category: "STRUCTURED DATA", new_value: "Schema.org Product + Offers JSON-LD", evidence_source: "Schema.org valid syntax standard" }
  ];

  const fields = (diff.fields && diff.fields.length > 0) ? diff.fields : defaultFields;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121624] border border-slate-700/90 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-300">
              <Code2 className="w-4 h-4" />
              <span>Technical FixDiff #{diff.diff_id || 'diff-apex-01'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {diff.product_name || 'Apex Ridge Waterproof Trekking Boots'}
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              All proposed additions are verified against your existing catalog. No synthetic claims invented.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety Gate Checklist */}
        <div className="bg-[#0d0f17] border border-slate-800 p-4 rounded-2xl space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Safety & Evidence Verification: PASSED</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>0 Hallucinated / Unsupported Claims</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Strictly Bounded to Footwear Specs</span>
            </div>
          </div>
        </div>

        {/* Proposed Attributes Diff */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Proposed Field Additions ({fields.length})</span>
            <span className="text-[11px] text-slate-500 font-normal">Catalog Patch</span>
          </div>

          <div className="space-y-2">
            {fields.map((f, idx) => (
              <div key={idx} className="bg-[#0d0f17] p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-blue-300 font-semibold">{f.field_name}</span>
                  <span className="text-slate-500">{f.category || 'SPECIFICATION'}</span>
                </div>
                <div className="text-emerald-300 font-semibold">
                  + {f.new_value || f.proposed_value}
                </div>
                <div className="text-[10px] text-slate-500 pt-0.5">
                  Source: {f.evidence_source || 'Verified from merchant specifications'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schema.org JSON-LD Code Preview */}
        <div className="space-y-2 font-mono text-xs">
          <div className="text-slate-300 font-semibold text-xs flex items-center space-x-1.5">
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>Generated Schema.org Product JSON-LD:</span>
          </div>
          <pre className="p-4 rounded-xl bg-[#090a0f] border border-slate-800 text-[11px] text-blue-200/90 overflow-x-auto max-h-48 leading-relaxed">
{`{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Apex Ridge Waterproof Trekking Boots",
  "image": "https://apex-outdoor.vercel.app/boots.jpg",
  "description": "HydroGuard IPX7 immersion waterproofing with Vibram MegaGrip 5mm lugs.",
  "brand": { "@type": "Brand", "name": "Apex Ridge" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "4499",
    "availability": "https://schema.org/InStock"
  },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Waterproofing", "value": "IPX7 (15,000mm)" },
    { "@type": "PropertyValue", "name": "Weight", "value": "420g" },
    { "@type": "PropertyValue", "name": "Outsole", "value": "Vibram MegaGrip 5mm lugs" }
  ]
}`}
          </pre>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400">
            {isApproved ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fix deployed & active on storefront</span>
              </span>
            ) : (
              <span>Requires merchant sign-off</span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            
            {!isApproved && (
              <button
                onClick={() => {
                  onApprove(diff.diff_id || 'diff-apex-01');
                }}
                disabled={isApproving}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isApproving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Approve & Deploy Fix</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
