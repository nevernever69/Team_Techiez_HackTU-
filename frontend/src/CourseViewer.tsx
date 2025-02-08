import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import TTSComponent from "./TTSComponent";
import CodeEditor from "./CodeEditor";

const CourseViewer = ({ topic, language }) => {
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState('');

  const hasFetched = useRef(false);
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (hasFetched.current) return; // Prevent duplicate call
      hasFetched.current = true;
  
      try {
        const response = await axios.post("http://localhost:8000/generate-course", {
          topic,
          language,
        });
        setCourse(response.data);
        setSelectedModule(response.data.modules[0]);
        setCode(response.data.modules[0].code_example);

      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
  
    fetchCourse();
  }, [topic, language]);
  
  const handleModuleChange = (e) => {
    const selected = course.modules[e.target.value];
    setSelectedModule(selected);
    setCode(selected.code_example);
  };

  const handleExecuteCode = async () => {
    const response = await fetch("http://localhost:3000/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: topic}),
    });

    const result = await response.json();
    setOutput(result.output);
  };

  if (!course) return <div className="text-white text-center mt-10">Loading course...</div>;
  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold">{course.course_title}</h2>

      {/* Module Selection */}
      <div className="my-4">
        <label className="text-lg font-medium mr-2">Select Module:</label>
        <select onChange={handleModuleChange} className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
          {course.modules.map((module, index) => (
            <option key={index} value={index}>{module.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Side: Content */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          {selectedModule && (
            <>
              <h2 className="text-2xl font-semibold">{selectedModule.title}</h2>
              <p className="mt-2 text-gray-300">{selectedModule.description}</p>
              <p className="mt-4 text-gray-400 italic">{selectedModule.summary}</p>
              <TTSComponent text={selectedModule.summary} />

              {/* Code Example */}
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Code Example</h3>
                <pre className="bg-black p-3 rounded text-green-400 overflow-x-auto">
                  <code>{selectedModule.code_example}</code>
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Code Editor */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Try It Yourself</h3>
          <CodeEditor code={code} onChange={setCode} />
          <button className="mt-4 px-4 py-2 bg-blue-500 rounded-lg" onClick={handleExecuteCode}>
            Run Code
          </button>
          <pre className="mt-4 p-3 bg-black text-green-400">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
