import { useState } from "react";
import InterviewForm from "../../components/InterviewForm";
import QuestionsList from "../../components/QuestionList";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeneratePage = () => {
  const [valueInput, setValueInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    localStorage.getItem("data_interview")
      ? JSON.parse(localStorage.getItem("data_interview"))
      : []
  );

  const [result, setResult] = useState([]);

  const handleCreate = async (value) => {
    setLoading(true);
    console.log("v", value.level);
    setValueInput(value.value);
    const promt = `Hãy viết cho tôi vài câu hỏi ít nhất 4 câu hỏi khi đi phỏng vấn công việc: "${valueInput}" với vị trí: ""${value.level}"" và viết dưới dạng ngôn ngữ: "${value.language}".
                  Định dạng bằng Markdown thuần túy (không bọc trong \`\`\`markdown hoặc bất kỳ code block nào).
                  Yêu cầu cụ thể:
                  - Có tiêu đề cho câu hỏi, tiêu đề câu hỏi phải là giống như một câu hỏi mà người phỏng vấn hỏi, không đặt trong dấu "".
                  - Trong câu hỏi có các phần: Key Concepts, Explanation, Example, Best Practices, Common Mistakes (Không in nghiêng)
                    Các phần đó phải có nội dung ở trong tối thiểu là 2 nội dung được phân biệt bởi dấu chấm phẩy
                  - Chỉ cần nội dung tiêu đề câu hỏi, không cần phải để "câu 1", "câu 2", ... hoặc "câu hỏi" ở trước chỉ cần thêm đúng chữ "Question: " thôi không cần đếm
                  - Thêm cho tôi ký tự >>> vào cuối nội dung của các câu hỏi
                  - Không cần xuống hàng với từng nội dung của các câu hỏi
                  - Không dùng dấu "-"
                `;
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(promt);
    console.log(
      "response",
      response.response.candidates[0].content.parts[0].text
    );
    const content = response.response.candidates[0].content.parts[0].text;
    const parts = content.split(">>>");
    console.log("parts", parts);
    const newParts = [];
    parts.forEach((part) => {
      if (part === "\n") return;
      newParts.push({
        question: part.split("Question:")[1]?.split("Key Concepts:")[0],
        key_concepts: part.split("Key Concepts:")[1]?.split("Explanation:")[0],
        explanation: part.split("Explanation:")[1]?.split("Example:")[0],
        example: part.split("xample:")[1]?.split("Best Practices:")[0],
        best_practices: part
          .split("Best Practices:")[1]
          ?.split("Common Mistakes:")[0],
        common_mistakes: part.split("Common Mistakes:")[1],
      });
    });
    const newData = {
      id: Date.now(),
      title: valueInput,
      level: value.level,
      language: value.language,
      parts: newParts,
    };
    console.log(newData);
    setLoading(false);
    console.log("result", result);
    setResult([newData]);
    setData([...data, newData]);
  };

  const handleClear = () => {
    alert("Are you sure you want to delete all history?");
    setResult([]);
  };

  const handleSave = () => {
    alert("Session saved successfully");
    localStorage.setItem("data_interview", JSON.stringify(data));
  };

  return (
    <div>
      <InterviewForm
        setValueInput={setValueInput}
        handleCreate={handleCreate}
        loading={loading}
      />
      <div className="mt-8">
        <QuestionsList
          result={result}
          handleClear={handleClear}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default GeneratePage;
