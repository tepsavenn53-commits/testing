import React from "react";
import { Student } from "../types";
import { SKILL_ACTIVITIES } from "../data";
import { Star } from "lucide-react";

interface SkillsTabProps {
  student: Student | null;
  allStudents: Student[];
  onActiveStudentChange: (id: string) => void;
  onUpdateSkillScore: (studentId: string, activityId: string, value: number) => void;
  getSkillLevel: (score: number) => { text: string; color: string };
}

export default function SkillsTab({
  student,
  allStudents,
  onActiveStudentChange,
  onUpdateSkillScore,
  getSkillLevel
}: SkillsTabProps) {
  if (!student) {
    return (
      <div className="bg-white p-6 text-center text-slate-400 font-bold border border-slate-200 rounded-xl">
        មិនទាន់មានសិស្សក្នុងប្រព័ន្ធឡើយ។
      </div>
    );
  }

  const getSkillTotalScore = (s: Student) => {
    let score = 0;
    Object.values(s.skills || {}).forEach((val) => {
      score += val || 0;
    });
    return score;
  };

  const sScore = getSkillTotalScore(student);
  const sLvl = getSkillLevel(sScore);

  return (
    <div id="content-skills" className="tab-content space-y-6 font-sans text-xs">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm md:text-base font-bold text-slate-800 flex items-center gap-1.5 font-muol">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500/10" />
              <span>
                វាយតម្លៃបំណិនសម្បទា (១៨ សកម្មភាព) សម្រាប់សិស្ស៖{" "}
                <span className="text-teal-700 font-bold font-sans">
                  {student.nameKh}
                </span>
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              វាយតម្លៃការអនុវត្តកម្មវិធីសិក្សាក្រៅម៉ោងសិក្សាទាំង ១៨ សកម្មភាព ដោយជ្រើសរើសពិន្ទុ៖ មិនមាន=0, តិចតួច-1, មធ្យម-2, បង្គួរ-3, ញឹកញាប់-4។
            </p>
          </div>
          {/* Student quick switcher */}
          <div className="flex items-center space-x-2 text-xs">
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
          {/* Skill total status bar */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-105 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">ពិន្ទុបំណិនសម្បទារួម</p>
              <h4 className="text-2xl md:text-3xl font-extrabold text-amber-900 mt-1 font-mono">
                {sScore} <span className="text-xs md:text-sm font-normal text-slate-500 font-sans">/ 72 ពិន្ទុ</span>
              </h4>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">កម្រិតវាយតម្លៃបច្ចុប្បន្ន</p>
              <span className={`inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-bold border ${sLvl.color}`}>
                {sLvl.text}
              </span>
            </div>
          </div>

          {/* Detailed tabular activities list */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 font-bold text-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left w-12 font-sans font-bold">ល.រ</th>
                    <th className="px-4 py-3 text-left font-sans font-bold">សកម្មភាពសិក្សា និងការអនុវត្តជាក់ស្តែង</th>
                    <th className="px-4 py-3 text-center w-24">មិនមាន (0)</th>
                    <th className="px-4 py-3 text-center w-24">តិចតួច (1)</th>
                    <th className="px-4 py-3 text-center w-24 font-bold">មធ្យម (2)</th>
                    <th className="px-4 py-3 text-center w-24">បង្គួរ (3)</th>
                    <th className="px-4 py-3 text-center w-24">ញឹកញាប់ (4)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 font-sans">
                  {SKILL_ACTIVITIES.map((activity, idx) => {
                    const studentScore = student.skills[activity.id] ?? 0;
                    return (
                      <tr key={activity.id} className="hover:bg-amber-50/20 transition-colors">
                        <td className="px-4 py-3 text-slate-400 font-mono font-bold align-middle">{idx + 1}</td>
                        <td className="px-4 py-3 text-slate-800 font-semibold align-middle truncate max-w-md">{activity.text}</td>
                        {[0, 1, 2, 3, 4].map((point) => (
                          <td key={point} className="px-4 py-3 text-center align-middle">
                            <input
                              type="radio"
                              name={`skill-${activity.id}-${student.id}`}
                              checked={studentScore === point}
                              onChange={() => onUpdateSkillScore(student.id, activity.id, point)}
                              className="h-4.5 w-4.5 bg-white text-amber-600 border-slate-300 focus:ring-amber-500 cursor-pointer justify-self-center"
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
