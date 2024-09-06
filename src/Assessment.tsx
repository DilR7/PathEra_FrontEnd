import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import MainLayout from "./layout/MainLayout";
import axios from "axios";
import { BASE_URL, FLASK_URL } from "./config/settings";
import { SkillType } from "./types/SkillType";
import useSmoothScroll from "./hooks/useSmoothScroll";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import LoadingIcon from "./components/LoadingIcon";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { Button } from "./components/ui/button";

const Assessment: React.FC = () => {
  useSmoothScroll();
  const [user] = useUser();
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValueJobTitles, setInputValueJobTitles] = useState<string>("");
  const [inputValueSkills, setInputValueSkills] = useState<string>("");
  const [degree, setDegree] = useState<string>("No Degree");
  const [suggestionsSkills, setSuggestionsSkills] = useState<SkillType[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);
  const [errorJobTitle, setErrorJobTitle] = useState<string | null>(null);
  const [errorSkills, setErrorSkills] = useState<string | null>(null);
  const [, setAbortController] = useState<AbortController | null>(null);
  const navigate = useNavigate();

  const handleInputChangeJobTitles = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueJobTitles(e.target.value);
  };

  const handleInputChangeSkills = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueSkills(value);
    if (value.length >= 1) {
      const filteredSuggestions = skills.filter((skill) =>
        skill.skill_name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestionsSkills(filteredSuggestions);
    } else {
      setSuggestionsSkills([]);
    }
  };

  const handleAddJobTitle = () => {
    if (errorJobTitle) {
      setErrorJobTitle(null);
    }
    if (inputValueJobTitles.trim() !== "" && inputValueJobTitles.length > 2) {
      setSelectedJobTitles((prev) => [...prev, inputValueJobTitles]);
      setInputValueJobTitles("");
    }
  };

  const handleAddSkill = (skill: string) => {
    if (errorSkills) {
      setErrorSkills(null);
    }
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
      setInputValueSkills("");
      setSuggestionsSkills([]);
    }
  };

  const handleRemoveTitleJobTitles = (title: string) => {
    setSelectedJobTitles(
      selectedJobTitles.filter((jobTitle) => jobTitle !== title)
    );
  };

  const handleRemoveTitleSkills = (skill: string) => {
    setSelectedSkills(
      selectedSkills.filter((skillTitle) => skillTitle !== skill)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorJobTitle(null);
    setErrorSkills(null);

    const controller = new AbortController();
    setAbortController(controller);
    if (selectedJobTitles.length === 0) {
      setErrorJobTitle("Please add at least one job title.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionComplete(false);
    try {
      console.log(degree);
      const response = await axios.post(
        `${FLASK_URL}/recommend`,
        {
          user_id: user?.id,
          job_title: selectedJobTitles.join(","),
          years_of_experience: experience,
          skills: selectedSkills.join(","),
          degree,
        },
        {
          signal: controller.signal,
        }
      );
      const matches = response.data.result.slice(0, 15);
      localStorage.setItem("recommendations", JSON.stringify(matches));
      localStorage.setItem(
        "skill_matches",
        JSON.stringify(response.data.skill_matches.slice(0, 15))
      );
      sessionStorage.setItem("animate", "true");
      setSubmissionComplete(true);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Submission canceled");
      } else {
        console.error("Submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    navigate("/recommendations");
  };

  return (
    <MainLayout>
      <div className="px-4 md:px-24 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-primary text-white px-4 md:px-16 py-8 rounded-lg w-full mt-12"
        >
          <h1 className="text-center text-3xl font-bold mb-4">
            Jobs Questionnaire
          </h1>
          <p className="text-center mb-6">
            Take our questionnaire so that we can determine which jobs fit you
            the most
          </p>
          <div>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">
                Your Job Titles
              </label>
              <div className="relative flex">
                <input
                  type="text"
                  value={inputValueJobTitles}
                  onChange={handleInputChangeJobTitles}
                  placeholder="Enter a job title"
                  className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                />

                <button
                  type="button"
                  onClick={handleAddJobTitle}
                  className="px-4 py-2 bg-white text-primary font-semibold rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
              {errorJobTitle && (
                <div className="text-red-600 text-md mt-2 font-bold">
                  {errorJobTitle}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedJobTitles.map((title) => (
                  <span
                    key={title}
                    className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                  >
                    {title}
                    <span
                      onClick={() => handleRemoveTitleJobTitles(title)}
                      className="ml-2 text-red-500 font-bold cursor-pointer"
                    >
                      &times;
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Years of Experience
            </label>
            <input
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              type="number"
              placeholder="5"
              className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Skills
            </label>
            <div className="relative flex">
              <input
                type="text"
                value={inputValueSkills}
                onChange={handleInputChangeSkills}
                placeholder="Start typing your skills"
                className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
            </div>
            {errorSkills && (
              <div className="text-red-600 text-md mt-2">{errorSkills}</div>
            )}
            {suggestionsSkills.length > 0 && (
              <ul className="absolute z-10 bg-white text-black w-72 sm:w-96 max-w-96 border border-gray-300 rounded mt-1 max-h-60 overflow-y-scroll">
                {suggestionsSkills.map((skill) => (
                  <li
                    key={skill.id}
                    onClick={() => handleAddSkill(skill.skill_name)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {skill.skill_name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 my-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                >
                  {skill}
                  <span
                    onClick={() => handleRemoveTitleSkills(skill)}
                    className="ml-2 text-red-500 font-bold cursor-pointer text-xl"
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <HiInformationCircle />
              <p>Fill out as many as you can</p>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Degree</label>
            <RadioGroup
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              value={degree}
              onValueChange={setDegree}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="No Degree"
                  id="no-degree"
                />
                <label htmlFor="no-degree" className="text-white">
                  No Degree
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="Bachelor"
                  id="bachelor"
                />
                <label htmlFor="bachelor" className="text-white">
                  Bachelor
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="Master"
                  id="master"
                />
                <label htmlFor="master" className="text-white">
                  Master
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="MBA"
                  id="mba"
                />
                <label htmlFor="mba" className="text-white">
                  MBA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="PhD"
                  id="phd"
                />
                <label htmlFor="phd" className="text-white">
                  PhD
                </label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              className="bg-white text-primary hover:bg-white/90 text-center py-2 px-4 rounded hover:text-primary transition-all duration-300"
            >
              Submit Job Questionnaire
            </Button>
          </div>
        </form>

        <AlertDialog open={isSubmitting || submissionComplete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className={submissionComplete ? "" : "-mb-24"}>
                {submissionComplete ? "Submission Successful" : "Submitting..."}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {submissionComplete ? (
                "Your submission was successful. Click continue to proceed."
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <LoadingIcon />
                  <div className="mt-4 text-lg">
                    Hold on... This might take a while
                  </div>
                </div>
              )}
            </AlertDialogDescription>
            <AlertDialogFooter>
              {submissionComplete && (
                <AlertDialogAction onClick={handleContinue}>
                  Continue
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default Assessment;
