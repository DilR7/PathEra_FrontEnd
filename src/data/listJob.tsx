import amazonLogo from "../assets/amazon__icon.png";
export interface JobCard {
  date: string;
  role: string;
  company: string;
  imageSrc: string;
  tags: string[];
  description: string;
  rate: string;
  postedDate: string;
  location: string;
}
export const LIST_JOBS: JobCard[] = [
  {
    date: "20 Aug, 2004",
    role: "Senior UI/UX Designer",
    imageSrc: amazonLogo,
    tags: ["Hybrid", "Part-time", "Intern"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$50",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
  {
    date: "20 Aug, 2004",
    role: "Software Engineer",
    imageSrc: amazonLogo,
    tags: ["Remote", "Part-time", "Entry-level"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$70",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
  {
    date: "20 Aug, 2004",
    role: "Product Manager",
    imageSrc: "https://i.ibb.co.com/s9fGTZR/image.png",
    tags: ["On-site", "Internship", "Director"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$60",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
  {
    date: "20 Aug, 2004",
    role: "Senior UI/UX Designer",
    imageSrc: amazonLogo,
    tags: ["Remote", "Full-time", "Director"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$50",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
  {
    date: "20 Aug, 2004",
    role: "Software Engineer",
    imageSrc: amazonLogo,
    tags: ["Hybrid", "Associate"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$70",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
  {
    date: "20 Aug, 2004",
    role: "Product Manager",
    imageSrc: amazonLogo,
    tags: ["Remote", "Contract", "Mid-Senior"],
    description:
      "Doing the right thing for investors is what we’re all about at Vanguard, and that in...",
    rate: "$60",
    postedDate: "12 days",
    location: "Jakarta",
    company: "Amazon",
  },
];
