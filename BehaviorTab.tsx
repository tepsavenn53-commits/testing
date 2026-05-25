import React from "react";
import { ClassConfig } from "../types";
import { Settings, Cloud } from "lucide-react";

interface ClassConfigCardProps {
  classConfig: ClassConfig;
  googleSheetUrl: string;
  onConfigChange: (config: ClassConfig) => void;
  onGoogleSheetUrlChange: (url: string) => void;
}

export default function ClassConfigCard({
  classConfig,
  googleSheetUrl,
  onConfigChange,
  onGoogleSheetUrlChange
}: ClassConfigCardProps) {
  const grades = [
    "ថ្នាក់ទី ១",
    "ថ្នាក់ទី ២",
    "ថ្នាក់ទី ៣",
    "ថ្នាក់ទី ៤",
    "ថ្នាក់ទី ៥",
    "ថ្នាក់ទី ៦"
  ];
  const divisions = ["ក", "ខ", "គ", "ឃ"];

  // Helper to find current grade & division from custom name (e.g. "ថ្នាក់ទី ៦ ក")
  const currentGrade = grades.find(g => classConfig.className.includes(g)) || "ថ្នាក់ទី ៦";
  const currentDivision = divisions.find(d => classConfig.className.endsWith(d) || classConfig.className.includes(d)) || "ក";

  const handleGradeChange = (gradeVal: string) => {
    onConfigChange({
      ...classConfig,
      className: `${gradeVal} ${currentDivision}`
    });
  };

  const handleDivisionChange = (divVal: string) => {
    onConfigChange({
      ...classConfig,
      className: `${currentGrade} ${divVal}`
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs font-sans">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <Settings className="w-5 h-5 text-teal-600" />
        <h3 className="font-bold text-slate-800 text-sm font-muol leading-relaxed">
          ព័ត៌មានរួមនៃថ្នាក់សិក្សា
        </h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block font-semibold text-slate-600 mb-1">ឈ្មោះសាលារៀន</label>
          <input
            type="text"
            value={classConfig.schoolName}
            onChange={(e) => onConfigChange({ ...classConfig, schoolName: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">កម្រិតថ្នាក់</label>
            <select
              value={currentGrade}
              onChange={(e) => handleGradeChange(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-900 cursor-pointer"
            >
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">កម្រិត / ក្រុម</label>
            <select
              value={currentDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-teal-700 cursor-pointer"
            >
              {divisions.map((d) => (
                <option key={d} value={d}>ថ្នាក់ {d}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block font-semibold text-slate-600 mb-1">ឆ្នាំសិក្សា</label>
          <input
            type="text"
            value={classConfig.academicYear}
            onChange={(e) => onConfigChange({ ...classConfig, academicYear: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
          />
        </div>

        {/* Sync Sheet Web URL integration */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block font-semibold text-blue-800 mb-1 flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" /> Google Sheet Web App URL
          </label>
          <input
            type="password"
            value={googleSheetUrl}
            onChange={(e) => onGoogleSheetUrlChange(e.target.value)}
            placeholder="Paste Apps Script Web App URL ទីនេះ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/20 font-mono"
          />
          <p className="text-[9px] text-slate-400 mt-1">
            សូមអនុវត្តតាមសៀវភៅណែនាំដើម្បីបង្កើត URL រក្សាទុកទិន្នន័យ។
          </p>
        </div>
      </div>
    </div>
  );
}
