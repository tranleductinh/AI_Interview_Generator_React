import React, { useState } from "react";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const QuestionsList = ({ result, handleClear, handleSave, isHistoryPage }) => {
  const [openCard, setOpenCard] = useState(null);

  const handleOpenCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };
  return (
    <>
      {result != "" ? (
        <div className="space-y-8">
          <div
            className={`${
              result !== ""
                ? "space-y-3 animate-in fade-in duration-500"
                : "hidden"
            }`}
          >
            {result.data.map((item, index) => (
              <div className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition">
                <button
                  onClick={() => handleOpenCard(index)}
                  className="p-4 w-full flex justify-between gap-4 hover:bg-muted/50 transition text-left"
                >
                  <span className="text-foreground flex-1 font-medium">
                    {item.question}
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
                          {item.key_concepts.map((value) => (
                            <li className="ml-4">{value}</li>
                          ))}
                        </ul>
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                          Explanation
                        </h3>
                        <p>{item.explanation}</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                          Example
                        </h3>
                        {item.example.map((value) => (
                          
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {value}
                            </ReactMarkdown>
                          
                        ))}
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                          Best Practices
                        </h3>
                        <ul className="my-2 list-disc list-inside">
                          <p>{item.best_practices}</p>
                        </ul>
                        <h3 className="text-lg font-semibold mt-4 mb-2 text-primary">
                          Commom Mistakes
                        </h3>
                        <ul className="my-2 list-disc list-inside">
                          <p>{item.common_mistakes}</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}

            <div
              className={`flex gap-4 justify-center ${
                isHistoryPage ? "hidden" : ""
              }`}
            >
              <Button
                onClick={() => handleSave()}
                className="text-[16px] px-6 py-2"
              >
                Save this session
              </Button>
              <Button
                onClick={() => handleClear()}
                className="text-[16px] px-6 py-2 bg-secondary text-secondary-foreground"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default QuestionsList;
