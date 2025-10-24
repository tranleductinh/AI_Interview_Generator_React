import React, { useState } from "react";
import { Button } from "../ui/button";


const QuestionsList = ({ result, handleClear, handleSave }) => {
  const [openCard, setOpenCard] = useState(null);

  const handleOpenCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };
  return (
    <div className="space-y-8">
      <div
        className={`${
          result != "" ? "space-y-3 animate-in fade-in duration-500" : "hidden"
        }`}
      >
        {result.map((item) => (
          item.parts.map((part, index) => (
            <div className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition">
            <button
              onClick={() => handleOpenCard(index)}
              className="p-4 w-full flex justify-between gap-4 hover:bg-muted/50 transition text-left"
            >
              <span className="text-foreground flex-1 font-medium">
                {part.question}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`'lucide lucide-chevron-down w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform' ${
                  openCard === true ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            {openCard === index ? (
              <div className="animate-in fade-in duration-300">
                <div className="bg-card text-card-foreground flex flex-col rounded-xl border mb-0 shadow-none border-none gap-0 p-0">
                  <div className="px-6">
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                      Key Concepts
                    </h3>
                    <ul className="my-2 list-disc list-inside">
                      {part.key_concepts.trim().split(";").map((value) => (
                        <li className="ml-4">
                            {value}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                      Explanation
                    </h3>
                    <p>{part.explanation}</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                      Example
                    </h3>
                    <p>{part.example}</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                      Best Practices
                    </h3>
                    <ul className="my-2 list-disc list-inside">
                      {part.best_practices.trim().split(";").map((value) => (
                        <li className="ml-4">
                            {value}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                      Commom Mistakes
                    </h3>
                    <ul className="my-2 list-disc list-inside">
                      {part.common_mistakes.trim().split(";").map((value) => (
                        <li className="ml-4">
                            {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          ))
        ))}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => handleSave()} className="text-[16px] px-6 py-2">Save this session</Button>
          <Button onClick={() => handleClear()} className="text-[16px] px-6 py-2 bg-secondary text-secondary-foreground">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
