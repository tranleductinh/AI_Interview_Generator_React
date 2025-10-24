import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const InterviewForm = ({ setValueInput, handleCreate, loading }) => {
  const [value, setValue] = useState("");
  const [level, setLevel] = useState("Fresher");
  const [language, setLanguage] = useState("English");

  const handleValue = (v) => {
    setValue(v);
    setValueInput(v);
  };
  const handleLevel = (v) => {
    setLevel(v);
  }
  const handleLanguage = (v) => {
    setLanguage(v);
  }
 
  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <div>
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Job Position
        </label>
        <Input
          onChange={(e) => handleValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate({value, level, language})}
          className=""
          placeholder="e.g. Frontend Developer"
        ></Input>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="" className="block text-sm font-medium mb-2">
            Level
          </label>
          <select onChange={(e) => handleLevel(e.target.value)} className="w-full px-3 py-2  border border-input rounded-md bg-background text-foreground">
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium mb-2">
            Language
          </label>
          <select onChange={(e) => handleLanguage(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>
      {value ? (
        <Button  disabled={loading} onClick={() => handleCreate({value, level, language})} className="w-full bg-primary">
          {loading === false ? "Generate Questions" : "Generating..."}
        </Button>
      ) : (
        <Button disabled className="w-full opacity-50">
          Generate Questions
        </Button>
      )}
    </div>
  );
};

export default InterviewForm;
