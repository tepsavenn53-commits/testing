import React from "react";
import { Student } from "../types";
import { BEHAVIOR_CRITERIA } from "../data";
import { Award } from "lucide-react";

interface BehaviorTabProps {
  student: Student | null;
  allStudents: Student[];
  onActiveStudentChange: (id: string) => void;
  onToggleBehaviorItem: (studentId: string, category: string, itemId: string) => void;
  getBehaviorLevel: (score: number) => { text: string; color: string };
}

export default function BehaviorTab({
  student,
  allStudents,
  onActiveStudentChange,
  onToggleBehaviorItem,
  getBehaviorLevel
}: BehaviorTabProps) {
  if (!student) {
    return (
      <div className="bg-white p-6 text-center text-slate-400 font-bold border border-slate-200 rounded-xl">
        មិនទាន់មានសិស្សក្នុងប្រព័ន្ធឡើយ។
      </div>
    );
  }

  // Calculate scores
  const getCategoryScoreByStudent = (catKey: string, s: Student) => {
    return s.behavior[catKey]?.length || 0;
  };

  const getBehaviorTotalScore = (s: Student) => {
    let score = 0;
    Object.keys(BEHAVIOR_CRITERIA).forEach((key) => {
      score += s.behavior[key]?.length || 0;
    });
    return score;
  };

  const bScore = getBehaviorTotalScore(student);
  const bLvl = getBehaviorLevel(bScore);

  return (
    <div id="content-behavior" className="tab-content space-y-6 font-sans text-xs">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm md:text-base font-bold text-slate-800 flex items-center gap-1.5 font-muol">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>
                វាយតម្លៃចរិយាសម្បទា (៥ សកម្មភាព) សម្រាប់សិស្ស៖{" "}
                <span className="text-teal-700 font-bold font-sans">
                  {student.nameKh}
                </span>
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              សូមគូសធីក (✓) លើសកម្មភាព ឬអាកប្បកិរិយាដែលសិស្សបានអនុវត្តល្អ។ ប្រព័ន្ធនឹងគណនាពិន្ទុដោយស្វ័យប្រវត្តិតាមការណែនាំរបស់ក្រសួង។
            </p>
          </div>
          {/* Quick select dropdown */}
          <div className="flex items-center space-x-2 text-xs font-sans">
            <span className="font-bold text-slate-600">ជ្រើសរើសសិស្ស៖</span>
            <select
              value={student.id}
              onChange={(e) => onActiveStudentChange(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold cursor-pointer"
            >
              {allStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameKh} ({s.gender})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Overall score status bar */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">ពិន្ទុចរិយាសម្បទារួម</p>
              <h4 className="text-2xl md:text-3xl font-extrabold text-teal-900 mt-1 font-mono">
                {bScore} <span className="text-xs md:text-sm font-normal text-slate-500 font-bold">/ 60 ពិន្ទុ</span>
              </h4>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">កម្រិតវាយតម្លៃបច្ចុប្បន្ន</p>
              <span className={`inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-bold border ${bLvl.color}`}>
                {bLvl.text}
              </span>
            </div>
          </div>

          {/* Behavior checklists columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.keys(BEHAVIOR_CRITERIA).map((categoryKey) => {
              const category = BEHAVIOR_CRITERIA[categoryKey];
              const checkedList = student.behavior[categoryKey] || [];
              const checkedCount = checkedList.length;

              return (
                <div key={categoryKey} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-xs md:text-sm font-muol leading-relaxed">
                      {category.title}
                    </h4>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                      {checkedCount} / {category.maxScore} ពិន្ទុ
                    </span>
                  </div>
                  <div className="p-4 space-y-2.5 max-h-80 overflow-y-auto scrollbar-thin">
                    {category.items.map((item) => {
                      const isChecked = checkedList.includes(item.id);
                      const bgClass = isChecked ? "bg-emerald-50/50" : "";
                      const textClass = isChecked ? "text-slate-900 font-bold" : "text-slate-600";

                      return (
                        <label
                          key={item.id}
                          className={`flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-50 ${bgClass}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onToggleBehaviorItem(student.id, categoryKey, item.id)}
                            className="mt-0.5 h-4 w-4 bg-white text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span className={`text-xs select-none ${textClass}`}>{item.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
