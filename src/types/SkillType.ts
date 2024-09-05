export type SkillType = {
  id: number;
  skill_name: string;
};

export type RawSkillMatches = {
  id: number;
  skill_matches: string;
};

export type SkillMatchesType = {
  matched_skill: string;
  user_skill: string;
  similarity: number;
};
