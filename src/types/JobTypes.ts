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

export type CompanyType = {
  id: number;
  company_name: string;
  company_image: string;
};
