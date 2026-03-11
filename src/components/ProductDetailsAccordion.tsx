"use client";

import { useState } from "react";
import { ChevronDown, Factory } from "lucide-react";

interface Props {
    produto: any;
    label: string;
    appsLabel: string;
    customLabel: string;
}

export default function ProductDetailsAccordion({ produto, label, appsLabel, customLabel }: Props) {
    const [showDetails, setShowDetails] = useState(false);

    if (!produto.technicalDetails) return null;

    return (
        <div className="border-t border-slate-200 pt-6">
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow-sm border border-slate-100 font-bold text-slate-900 hover:text-blue-600 transition-all"
            >
                <span className="flex items-center gap-2">
                    <Factory size={20} className="text-blue-600" /> {label}
                </span>
                <ChevronDown className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
            </button>

            {showDetails && (
                <div className="mt-4 p-6 bg-white rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-600 leading-relaxed mb-6">
                        {produto.technicalDetails.content}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-widest">{appsLabel}</h4>
                            <ul className="space-y-2">
                                {produto.applications?.map((app: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-500">• {app}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-widest">{customLabel}</h4>
                            <ul className="space-y-2">
                                {produto.technicalDetails.extras?.map((ex: string, i: number) => (
                                    <li key={i} className="text-sm text-slate-500">• {ex}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}