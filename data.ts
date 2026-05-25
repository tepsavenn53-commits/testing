export interface ClassConfig {
  schoolName: string;
  className: string;
  academicYear: string;
}

export interface Student {
  id: string; // Internal random/timestamp ID
  studentId: string; // The school student ID (e.g., ST-1234)
  nameKh: string;
  nameEn?: string;
  gender: "ប្រុស" | "ស្រី";
  className?: string;
  aiComment?: string;
  behavior: {
    cleanliness: string[];
    politeness: string[];
    orderliness: string[];
    punctuality: string[];
    mindfulness: string[];
    [key: string]: string[];
  };
  skills: {
    [activityId: string]: number; // 0 to 4
  };
}

export interface BehaviorItem {
  id: string;
  text: string;
}

export interface BehaviorCategory {
  title: string;
  maxScore: number;
  items: BehaviorItem[];
}

export interface BehaviorCriteria {
  [categoryKey: string]: BehaviorCategory;
}

export interface SkillActivity {
  id: string;
  text: string;
}
