import React from "react";
import { Student, ClassConfig } from "../types";
import { BEHAVIOR_CRITERIA, SKILL_ACTIVITIES } from "../data";
import { Sparkles, Printer, Download } from "lucide-react";

interface ReportCardProps {
  student: Student | null;
  classConfig: ClassConfig;
  onTriggerAiComment: (studentId: string) => void;
  getBehaviorLevel: (score: number) => { text: string; color: string };
  getSkillLevel: (score: number) => { text: string; color: string };
}

export default function ReportCard({
  student,
  classConfig,
  onTriggerAiComment,
  getBehaviorLevel,
  getSkillLevel
}: ReportCardProps) {
  if (!student) {
    return (
      <div className="py-12 text-center text-slate-400 font-bold">
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

  const getSkillTotalScore = (s: Student) => {
    let score = 0;
    Object.values(s.skills || {}).forEach((val) => {
      score += val || 0;
    });
    return score;
  };

  const bScore = getBehaviorTotalScore(student);
  const bLvl = getBehaviorLevel(bScore);
  const sScore = getSkillTotalScore(student);
  const sLvl = getSkillLevel(sScore);

  return (
    <div 
      id="report-print-preview" 
      className="bg-white p-6 md:p-12 border border-slate-300 shadow-lg max-w-4xl mx-auto rounded-none print:shadow-none print:border-none print:p-0 print-card font-sans text-xs text-slate-900"
    >
      {/* Kingdom Header */}
      <div className="flex flex-col items-center text-center space-y-1 print:space-y-0.5 relative">
        <h3 className="text-sm md:text-base font-muol print:text-[13px]">ព្រះរាជាណាចក្រកម្ពុជា</h3>
        <h4 className="text-xs md:text-sm font-muol print:text-[11px]">ជាតិ សាសនា ព្រះមហាក្សត្រ</h4>
        <div className="flex justify-center py-1 print:py-0.5 w-full">
          <span className="inline-block w-24 h-0.5 bg-slate-950 relative">
            <span className="absolute -top-1.5 left-10 text-[8px] font-mono">♦♦♦</span>
          </span>
        </div>
        <div className="pt-2 print:pt-1 text-left text-xs space-y-1 font-bold w-full print:text-[10px] print:space-y-0.5">
          <p><strong>សាលារៀន៖</strong> {classConfig.schoolName}</p>
          <p><strong>ថ្នាក់សិក្សា៖</strong> {student.className || classConfig.className}</p>
          <p><strong>ឆ្នាំសិក្សា៖</strong> {classConfig.academicYear}</p>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center my-4 print:my-2 space-y-1">
        <h2 className="text-base md:text-lg font-muol text-slate-900 print:text-[12px]">សន្លឹកវាយតម្លៃការសិក្សា និងការអភិវឌ្ឍគុណវុឌ្ឍិសិស្ស</h2>
        <p className="text-xs text-slate-500 italic print:text-[9px]">ផ្នែកចរិយាសម្បទា និងបំណិនសម្បទា</p>
      </div>

      {/* Student Personal Info */}
      <div className="grid grid-cols-2 gap-4 border border-slate-950 p-4 print:p-2.5 rounded text-xs print:text-[10px] font-bold">
        <div className="space-y-1.5">
          <p><strong className="inline-block w-24">អត្តលេខសិស្ស៖</strong> {student.studentId}</p>
          <p><strong className="inline-block w-24">ឈ្មោះសិស្ស (ខ្មែរ)៖</strong> <span className="font-bold text-sm text-slate-900 print:text-xs">{student.nameKh}</span></p>
          {student.nameEn && (
            <p><strong className="inline-block w-24">ឈ្មោះ (ឡាតាំង)៖</strong> <span className="font-mono text-xs">{student.nameEn}</span></p>
          )}
        </div>
        <div className="space-y-1.5">
          <p><strong className="inline-block w-20">ភេទ៖</strong> {student.gender}</p>
        </div>
      </div>

      {/* Section 1: Behavior */}
      <div className="mt-6 print:mt-3 print-avoid-break">
        <h3 className="text-sm border-b border-rose-950 pb-1.5 mb-3 print:mb-1 font-muol text-slate-900 print:text-[11px]">១. ការវាយតម្លៃចរិយាសម្បទា (៥ សកម្មភាព)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 print:grid-cols-5 font-bold">
          {Object.keys(BEHAVIOR_CRITERIA).map((catKey) => {
            const cat = BEHAVIOR_CRITERIA[catKey];
            const score = getCategoryScoreByStudent(catKey, student);
            return (
              <div key={catKey} className="border border-slate-300 p-2.5 rounded text-center bg-white shadow-xs">
                <p className="text-[10px] font-bold text-teal-800 truncate" title={cat.title}>{cat.title.split(' ')[0]}</p>
                <p className="text-lg font-bold text-slate-900 mt-1 font-mono">{score}/{cat.maxScore}</p>
                <p className="text-[8px] text-slate-400 mt-0.5 print:hidden">• អនុវត្តបាន</p>
              </div>
            );
          })}
        </div>
        <div className="mt-3 print:mt-1.5 bg-slate-50 p-2.5 print:p-1 border border-slate-200 rounded flex justify-between items-center text-xs print:text-[9.5px] font-bold">
          <p>ពិន្ទុចរិយាសម្បទាសរុប៖ <strong className="font-mono">{bScore} / 60 ពិន្ទុ</strong></p>
          <p>កម្រិតវាយតម្លៃ៖ <span className="text-teal-700">{bLvl.text}</span></p>
        </div>
      </div>

      {/* Section 2: Extracurricular Skills */}
      <div className="mt-6 print:mt-3 print-avoid-break">
        <h3 className="text-sm border-b border-rose-950 pb-1.5 mb-3 print:mb-1 font-muol text-slate-900 print:text-[11px]">២. ការវាយតម្លៃបំណិនសម្បទា (កម្មវិធីសិក្សាក្រៅម៉ោង)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 print:gap-y-0.5 text-xs print:text-[9px] max-h-90 sm:max-h-none overflow-y-auto print:grid-cols-2 print:overflow-visible pr-1">
          {SKILL_ACTIVITIES.map((act, index) => {
            const score = student.skills[act.id] ?? 0;
            let ratingText = `មិនមាន (0)`;
            if (score === 1) ratingText = `តិចតួច (1)`;
            if (score === 2) ratingText = `មធ្យម (2)`;
            if (score === 3) ratingText = `បង្គួរ (3)`;
            if (score === 4) ratingText = `ញឹកញាប់ (4)`;
            return (
              <div key={act.id} className="flex justify-between items-center border-b border-slate-100 py-1 bg-white">
                <span className="text-slate-700 font-medium truncate max-w-xs">{index + 1}. {act.text}</span>
                <span className="font-bold text-slate-900 whitespace-nowrap font-mono">{ratingText}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 print:mt-1.5 bg-slate-50 p-2.5 print:p-1 border border-slate-200 rounded flex justify-between items-center text-xs print:text-[9.5px] font-bold justify-self-stretch select-none">
          <p>ពិន្ទុបំណិនសម្បទាសរុប៖ <strong className="font-mono">{sScore} / 72 ពិន្ទុ</strong></p>
          <p>កម្រិតវាយតម្លៃ៖ <span className="text-amber-700">{sLvl.text}</span></p>
        </div>
      </div>

      {/* Signature and Conclusions card */}
      <div className="mt-6 print:mt-3 border border-slate-950 p-4 print:p-2.5 rounded text-xs print:text-[10px] space-y-2 print-avoid-break">
        <div className="flex justify-between items-center font-bold">
          <h4 className="font-bold text-sm print:text-[11px] underline font-muol text-slate-900 leading-relaxed">សេចក្តីសន្និដ្ឋានរួមរបស់លោកគ្រូ/អ្នកគ្រូបង្រៀនថ្នាក់៖</h4>
          {student.aiComment && (
            <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 print:hidden select-none">
              <Sparkles className="w-2.5 h-2.5 font-bold" />បង្កើតដោយ AI (Gemini)
            </span>
          )}
        </div>
        <div className="min-h-16 print:min-h-[48px] leading-relaxed border-b border-dashed border-slate-400 pb-2">
          {student.aiComment ? (
            <div className="whitespace-pre-wrap text-slate-800 text-xs leading-relaxed">{student.aiComment}</div>
          ) : (
            <p className="text-slate-600 italic leading-relaxed">
              ផ្អែកលើលទ្ធផល៖ សិស្ស {student.nameKh} ទទួលបានពិន្ទុចរិយាសម្បទា "{bScore}/60" ({bLvl.text}) និងបំណិនសម្បទា "{sScore}/72" ({sLvl.text})។ សិស្សមានឥរិយាបថល្អ និងចូលរួមយ៉ាងសកម្មក្នុងការអភិវឌ្ឍខ្លួន។ (លោកគ្រូអ្នកគ្រូអាចចុចប៊ុងតុង "បង្កើតមតិយោបល់ដោយ AI" ពណ៌ស្វាយ ដើម្បីបញ្ជាបញ្ញាសិប្បនិម្មិតឱ្យជួយបង្កើតសេចក្តីសំន្និដ្ឋានបានយ៉ាងសំបូរបែប)
            </p>
          )}
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-10 print:mt-4 grid grid-cols-2 gap-12 text-center text-xs print:text-[10px] print-avoid-break">
        <div>
          <p className="italic font-bold">បានឃើញ និងឯកភាព</p>
          <h5 className="font-bold mt-1 font-muol text-slate-900 leading-relaxed">នាយកសាលារៀន</h5>
          <div className="h-10 print:h-6"></div>
          <p className="font-bold">..............................................</p>
        </div>
        <div>
          <p className="italic">ថ្ងៃទី....... ខែ....... ឆ្នាំ ២០២...</p>
          <h5 className="font-bold mt-1 font-muol text-slate-900 leading-relaxed">លោកគ្រូ/អ្នកគ្រូបង្រៀនថ្នាក់</h5>
          <div className="h-10 print:h-6"></div>
          <p className="font-bold">..............................................</p>
        </div>
      </div>
    </div>
  );
}
