import React, { useState } from "react";
import CourseViewer from "./CourseViewer";

const App = () => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Course Generator</h1>

      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <label className="block text-lg mb-2">Enter a Topic:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Python Programming"
            required
          />

          <label className="block text-lg mb-2">Experience:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            
         
            placeholder="e.g., in years"
            required
          />
          <label className="block text-lg mb-2">Select Language:</label>
          <select
            className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate Course
          </button>
        </form>
      ) : (
        <CourseViewer topic={topic} language={language} />
      )}
    </div>
  );
};

export default App;

