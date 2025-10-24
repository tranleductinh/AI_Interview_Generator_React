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

  const [result, setResult] = useState("");

  const handleCreate = async (value) => {
    setLoading(true);
    console.log("v", value.level);
    setValueInput(value.value);
    const prompt = `Hãy viết cho tôi ít nhất 6 câu hỏi phỏng vấn khi ứng tuyển công việc: "${valueInput}" với vị trí: "${value.level}" và ngôn ngữ: "${value.language}".
      Trả về **duy nhất một đối tượng JSON** có định dạng chính xác như sau, không thêm hoặc bớt ký tự nào ngoài JSON:

      {
        "id": Date.now(),
        "success": true,
        "data": [
          {
            "question": "[Câu hỏi phỏng vấn]",
            "key_concepts": ["[nội dung 1]", "[nội dung 2]"],
            "explanation": "[Đoạn giải thích ngắn gọn, mô tả khái niệm hoặc cơ chế]",
            "example": [
              "function example() {\\n  const x = 1;\\n  console.log(x);\\n}"
            ],
            "best_practices": "[Nội dung mô tả cách sử dụng đúng hoặc hiệu quả]",
            "common_mistakes": "[Các lỗi thường gặp liên quan đến chủ đề này]"
          }
        ],
        "metadata": {
          "jobTitle": "${valueInput}",
          "level": "${value.level}",
          "language": "${value.language}",
          "timestamp": "[lấy ngày tháng năm giờ hiện tại theo format: 'MMM dd, yyyy, hh:mm a']"
        }
      }

      Yêu cầu chi tiết:
      * Trả về ít nhất 4 phần tử khác nhau trong mảng "data".
      * Không thêm dấu “...” hoặc bất kỳ ký tự ngoài JSON.
      * Không dùng markdown hoặc ký tự đặc biệt như \`\`\`.
      * Kết quả phải là JSON hợp lệ, có thể parse được trực tiếp.
      `;

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(prompt);
    console.log(
      "response",
      response.response.candidates[0].content.parts[0].text
    );
    const content = response.response.candidates[0].content.parts[0].text;
    const newData = JSON.parse(
      content.replace("```json", "").replace("```", "").trim()
    );
    // const parts = content.split(">>>");
    // console.log("parts", parts);
    // const newParts = [];
    // parts.forEach((part) => {
    //   if (part === "\n") return;
    //   newParts.push({
    //     question: part.split("Question:")[1]?.split("Key Concepts:")[0],
    //     key_concepts: part.split("Key Concepts:")[1]?.split("Explanation:")[0],
    //     explanation: part.split("Explanation:")[1]?.split("Example:")[0],
    //     example: part.split("xample:")[1]?.split("Best Practices:")[0],
    //     best_practices: part
    //       .split("Best Practices:")[1]
    //       ?.split("Common Mistakes:")[0],
    //     common_mistakes: part.split("Common Mistakes:")[1],
    //   });
    // });
    // const newData = {
    //   id: Date.now(),
    //   title: valueInput,
    //   level: value.level,
    //   language: value.language,
    //   parts: newParts,
    // };
    console.log(newData);

    setLoading(false);
    setResult(newData);
    console.log("result", result);
    setData([...data, newData]);
    console.log("data", data);
  };

  const handleClear = () => {
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
