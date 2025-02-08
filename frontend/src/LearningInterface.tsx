import React, { useState, useEffect } from 'react';
import CourseContent from './CourseContent';
import IDE from './IDE';
import { modules } from './modules';

const LearningInterface = ({ userPreferences }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const nextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1); // Update to the next module
      setIsCorrect(false); // Reset correctness for the next module
    }
  };

  return (
    <div className="flex space-x-4">
      <CourseContent
        module={modules[currentModule]} // Triggers speech when this changes
        onNext={nextModule}
        isCorrect={isCorrect}
      />
      <IDE
        initialCode={modules[currentModule].task}
        expectedOutput={modules[currentModule].expectedOutput}
        onCorrectSubmission={() => setIsCorrect(true)}
      />
    </div>
  );
};

export default LearningInterface;
