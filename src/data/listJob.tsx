import amazonLogo from "../assets/amazon__icon.png";
export interface JobCard {
  date: string;
  company: string;
  role: string;
  imageSrc: string;
  tags: string[];
  description: string;
  rate: string;
  postedDate: string;
}
export const LIST_JOBS: JobCard[] = [
  {
    date: "20 Aug, 2004",
    company: "Amazon",
    role: "Senior UI/UX Designer",
    imageSrc: amazonLogo,
    tags: ["Hybrid", "Part-time", "Internship"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$50",
    postedDate: "12 days",
  },
  {
    date: "20 Aug, 2004",
    company: "Google",
    role: "Software Engineer",
    imageSrc: amazonLogo,
    tags: ["Remote", "Part-time", "Entry-level"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$70",
    postedDate: "12 days",
  },
  {
    date: "20 Aug, 2004",
    company: "Facebook",
    role: "Product Manager",
    imageSrc: amazonLogo,
    tags: ["On-site", "Internship", "Director"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$60",
    postedDate: "12 days",
  },
  {
    date: "20 Aug, 2004",
    company: "Amazon",
    role: "Senior UI/UX Designer",
    imageSrc: amazonLogo,
    tags: ["Remote", "Full-time", "Director"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$50",
    postedDate: "12 days",
  },
  {
    date: "20 Aug, 2004",
    company: "Google",
    role: "Software Engineer",
    imageSrc: amazonLogo,
    tags: ["Hybrid", "Associate"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$70",
    postedDate: "12 days",
  },
  {
    date: "20 Aug, 2004",
    company: "Facebook",
    role: "Product Manager",
    imageSrc: amazonLogo,
    tags: ["Remote", "Contract", "Mid-Senior"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$60",
    postedDate: "12 days",
  },
];
