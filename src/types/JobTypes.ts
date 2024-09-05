export type JobType = {
  id: number;
  job_title: string;
  job_type: string;
  job_level: string;
  job_model: string;
  location: string;
  companyId: CompanyType;
  createdAt: string;
};

export type RecommendationType = JobType & {
  similarity: number;
  skill_score: number;
  title_score: number;
  degree_score: number;
  experience_score: number;
};

export type CompanyType = {
  id: number;
  company_name: string;
  company_image: string;
};

export type JobDetailType = {
  id: number;
  jobTitle: string;
  jobType: string;
  jobLevel: string;
  jobModel: string;
  location: string;
  minExperience: number;
  skillsRequired: string[];
  industry: string;
  degree: string;
  companyName: string;
  companyImage: string;
  isSaved: boolean;
  jobDescription: string;
  createdAt: string;
};
