import React, { useState } from "react";
import { UserPlus, Plus } from "lucide-react";

interface NewStudentFormProps {
  onAddStudent: (student: { studentId: string; nameKh: string; gender: "ប្រុស" | "ស្រី" }) => void;
}

export default function NewStudentForm({ onAddStudent }: NewStudentFormProps) {
  const [studentId, setStudentId] = useState("");
  const [nameKh, setNameKh] = useState("");
  const [gender, setGender] = useState<"ប្រុស" | "ស្រី">("ប្រុស");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !nameKh.trim()) return;

    onAddStudent({
      studentId: studentId.trim(),
      nameKh: nameKh.trim(),
      gender
    });

    setStudentId("");
    setNameKh("");
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs font-sans">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <UserPlus className="w-5 h-5 text-teal-600" />
        <h3 className="font-bold text-slate-800 text-sm font-muol leading-relaxed">
          បញ្ចូលព័ត៌មានសិស្សថ្មី
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-semibold text-slate-600 mb-1">អត្តលេខសិស្ស (ID)*</label>
          <input
            type="text"
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="ST-2026-XXX"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono font-bold"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">ឈ្មោះខ្មែរ*</label>
            <input
              type="text"
              required
              value={nameKh}
              onChange={(e) => setNameKh(e.target.value)}
              placeholder="ឧ. សុខ ជា"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-slate-900"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">ភេទ</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "ប្រុស" | "ស្រី")}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold cursor-pointer"
            >
              <option value="ប្រុស">ប្រុស</option>
              <option value="ស្រី">ស្រី</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-md font-bold text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4" />
          <span>បន្ថែមសិស្សថ្មី</span>
        </button>
      </form>
    </div>
  );
}
