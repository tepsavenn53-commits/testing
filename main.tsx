import React, { useState, useEffect } from "react";
import { Student } from "../types";
import { BEHAVIOR_CRITERIA } from "../data";
import { Sparkles, Settings, Info, Loader2, ClipboardCheck, BookOpen, Trash2, Award } from "lucide-react";

interface AiHelperTabProps {
  student: Student | null;
  allStudents: Student[];
  geminiApiKey: string;
  onGeminiApiKeyChange: (key: string) => void;
  onActiveStudentChange: (id: string) => void;
  onTriggerGenerateReport: (studentId: string, customApiKey?: string) => Promise<string | null>;
  onCommentChange: (studentId: string, comment: string) => void;
}

export default function AiHelperTab({
  student,
  allStudents,
  geminiApiKey,
  onGeminiApiKeyChange,
  onActiveStudentChange,
  onTriggerGenerateReport,
  onCommentChange
}: AiHelperTabProps) {
  const [localApiKey, setLocalApiKey] = useState(geminiApiKey);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setCommentText(student?.aiComment || "");
  }, [student]);

  if (!student) {
    return (
      <div className="bg-white p-6 text-center text-slate-400 font-bold border border-slate-200 rounded-xl">
        មិនទាន់មានសិស្សក្នុងប្រព័ន្ធឡើយ។
      </div>
    );
  }

  // Calculate scores
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
  const sScore = getSkillTotalScore(student);

  const handleApiKeyChange = (val: string) => {
    setLocalApiKey(val);
    onGeminiApiKeyChange(val);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorText("");
    try {
      const generated = await onTriggerGenerateReport(student.id, localApiKey);
      if (generated) {
        setCommentText(generated);
      }
    } catch (err: any) {
      setErrorText(err.message || "Failed to contact Gemini API. Please verify key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  const partsPromptSample = `[តួនាទី (Role)]៖ ខ្ញុំជាគ្រូបង្រៀនថ្នាក់បឋមសិក្សាសាលាបឋមសិក្សា ម៉ឹង សំផន។
[គោលបំណង (Purpose)]៖ ខ្ញុំចង់សរសេរការវាយតម្លៃចុងឆ្នាំ ផ្ដល់មតិយោបល់ស្ថាបនា និងដំបូន្មានអប់រំសម្រាប់សិស្សម្នាក់។
[អ្នកអាន (Audience)]៖ អាណាព្យាបាលសិស្ស និងសាមីខ្លួនសិស្សផ្ទាល់។
[កិច្ចការ (To-do)]៖ បង្កើតការវាយតម្លៃលម្អិតសម្រាប់សិស្សឈ្មោះ «${student.nameKh}» ភេទ «${student.gender}» ដែលមានលទ្ធផលដូចខាងក្រោម៖
- ចរិយាសម្បទា (ការអនុវត្ត ៥ សកម្មភាព)៖ ទទួលបានពិន្ទុ ${bScore}/60
- បំណិនសម្បទា (ការអនុវត្តកម្មវិធីក្រៅម៉ោងសិក្សា)៖ ទទួលបានពិន្ទុ ${sScore}/72
[ស្ទីល (Style)]៖ សូមសរសេរជាភាសាខ្មែរផ្លូវការ បែបអប់រំ និងលើកទឹកចិត្ត ដោយគូសបញ្ជាក់ពីចំណុចខ្លាំងរបស់សិស្ស និងចំណុចគួរកែលម្អបន្ថែម។`;

  return (
    <div id="content-ai-helper" className="tab-content space-y-6 font-sans text-xs">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base font-muol">
                ប្រអប់វិភាគ និងសរសេរមតិដោយ ✨ Gemini AI
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-bold">
                វិភាគពិន្ទុសិស្សស្វ័យប្រវត្តិ រួចបង្កើតជាមតិវាយតម្លៃលម្អិត និងផែនការអប់រំសម្រាប់អាណាព្យាបាលសិស្ស។
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600">ជ្រើសរើសសិស្ស៖</span>
            <select
              value={student.id}
              onChange={(e) => onActiveStudentChange(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold cursor-pointer"
            >
              {allStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameKh} ({s.gender})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* API Key box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-1.5 text-teal-800 font-muol font-bold text-xs">
                <Settings className="w-4 h-4" />
                ការកំណត់ API Key
              </div>
              <p className="text-[10px] text-slate-500">
                Gemini API Key ត្រូវបានផ្ដល់ជូនដោយឥតគិតថ្លៃតាមរយៈ Google AI Studio។ ប្រសិនបើបានកំណត់ក្នុង {"Settings > Secrets"} របស់គំរោងហើយ លោកគ្រូអាចទុកវាទទេបាន។
              </p>
              <input
                type="password"
                value={localApiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="បញ្ចូល Gemini API Key ទីនេះ..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Assessment specs summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-teal-800 font-muol uppercase font-bold text-xs">
                <Info className="w-4 h-4" />
                ទិន្នន័យវាយតម្លៃបច្ចុប្បន្ន
              </div>
              <div className="space-y-2 text-slate-700 font-bold">
                <p>• សិស្ស៖ <span className="text-slate-900">{student.nameKh}</span> ({student.gender})</p>
                <p>• ចរិយាសម្បទា (៥)៖ <span className="text-slate-900">{bScore}/60 ពិន្ទុ</span></p>
                <p>• បំណិនសម្បទា៖ <span className="text-slate-900">{sScore}/72 ពិន្ទុ</span></p>
              </div>
              {errorText && (
                <div className="p-2 text-[10px] text-red-700 bg-red-50 border border-red-200 rounded leading-relaxed">
                  {errorText}
                </div>
              )}
              <div className="pt-2 border-t border-slate-200">
                <button
                  disabled={loading}
                  onClick={handleGenerate}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-400 text-white rounded-lg font-bold shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      <span>កំពុងវិភាគ...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" />
                      <span>✨ បញ្ជា Gemini ឱ្យសរសេរមតិ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* AI Response Textbox Panel */}
          <div className="lg:col-span-8 space-y-3 font-bold">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 font-muol text-xs">
                <Award className="w-4 h-4 text-amber-500" />
                <span>លទ្ធផលវាយតម្លៃរួមដោយ ✨ Gemini AI</span>
              </h4>
              <button
                onClick={() => {
                  setCommentText("");
                  onCommentChange(student.id, "");
                }}
                className="text-rose-600 hover:text-rose-500 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> លុបមតិ AI
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={12}
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  onCommentChange(student.id, e.target.value);
                }}
                className="w-full text-xs p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-bold font-sans"
                placeholder="មតិយោបល់ AI នឹងបង្ហាញនៅទីនេះបន្ទាប់ពីលោកគ្រូអ្នកគ្រូចុចប៊ុងតុងបញ្ជា..."
              />
              {loading && (
                <div className="absolute inset-0 bg-slate-950/70 rounded-xl flex flex-col items-center justify-center text-white space-y-3">
                  <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
                  <span className="text-xs font-bold animate-pulse">
                    Gemini កំពុងវិភាគពិន្ទុ និងសរសេរមតិយោបល់ស្អាតៗ...
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => handleCopyText(partsPromptSample, "ចម្លង PARTS prompt រួចរាល់!")}
                className="py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg shadow font-bold flex items-center justify-center cursor-pointer"
              >
                <span>ចម្លង Prompt គំរូ PARTS (Copy)</span>
              </button>
              <button
                onClick={() => {
                  if (!commentText.trim()) {
                    alert("មិនទាន់មានមតិយោបល់ AI ដើម្បីចម្លងទ!");
                    return;
                  }
                  handleCopyText(commentText, "ចម្លងមតិយោបល់ AI រួចរាល់!");
                }}
                className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg shadow-md font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>ចម្លងមតិ AI ផ្ទាល់</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PARTS description card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-slate-800 text-sm font-muol">
            ឯកសារជំនួយស្មារតីស្តីពីការសរសេរ Prompt បច្ចេកវិទ្យា (PARTS)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 leading-relaxed font-bold">
          <div className="bg-slate-50 p-3 rounded-lg">
            <span className="font-bold text-teal-700 block mb-1">P - Purpose</span>
            <p className="text-slate-600">គោលបំណងច្បាស់លាស់ ដូចជាការបង្កើតមតិវាយតម្លៃសម្រាប់សន្លឹកពិន្ទុ និងសៀវភៅតាមដានសិស្ស។</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <span className="font-bold text-teal-700 block mb-1">A - Audience</span>
            <p className="text-slate-600">កំណត់អ្នកអាន ដូចជាអាណាព្យាលសិស្ស និងសិស្សផ្ទាល់ខ្លួនឯង ដើម្បីរក្សាភាសាសមរម្យ។</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <span className="font-bold text-teal-700 block mb-1">R - Role</span>
            <p className="text-slate-600">កំណត់តួនាទីជាលោកគ្រូអ្នកគ្រូបង្រៀតថ្នាក់ដែលស្រឡាញ់ និងយកចិត្តទុកដាក់លើសិស្ស។</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <span className="font-bold text-teal-700 block mb-1">T - To-do</span>
            <p className="text-slate-600">បញ្ជាក់ការងារដែលត្រូវធ្វើ ដូចជាការវិភាគពិន្ទុសិស្ស និងផ្តល់ដំបូន្មានជាក់ស្តែង។</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg">
            <span className="font-bold text-teal-700 block mb-1">S - Style</span>
            <p className="text-slate-600">កំណត់ស្ទីលបែបលើកទឹកចិត្ត អប់រំ និងប្រើប្រាស់ពាក្យខ្មែរផ្លូវការប្រកបដោយសីលធម៌វិជ្ជាជីវៈ។</p>
          </div>
        </div>
      </div>
    </div>
  );
}
