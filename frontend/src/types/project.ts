export interface EnvironmentSpec {
  os: string;
  ide: string;
  docker: string;
}

export interface TechStackAndAISpec {
  core_stack: string[];
  ai_division_of_labor: string;
}

export interface InterviewQuestionSpec {
  question: string;
  technical_defense: string;
}

/**
 * Ana Sayfa (Vitrin) için hafifletilmiş kart modeli
 * Backend karşılığı: ProjectCardResponse
 */
export interface ProjectCard {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  domains: string[];
  difficulty: string;
}

export interface CatalogFilters {
  domains: string[];
  difficulties: string[];
  total_count: number;
}

/**
 * Detay Sayfası (/projects/[slug]) için 9 sütunlu tam mimari model
 * Backend karşılığı: ProjectDetailResponse
 */
export interface ProjectDetail extends ProjectCard {
  target_audience: string;
  why_build: string;
  environment: EnvironmentSpec;
  tech_stack_and_ai: TechStackAndAISpec;
  prerequisites: string[];
  anti_patterns: string[];
  genesis_prompt: string;
  definition_of_done: string[];
  interview_questions: InterviewQuestionSpec[];
  created_at: string;
  updated_at: string;
}