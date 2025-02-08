import React, { useState, useRef, useEffect } from "react";

const TTSComponent = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // ✅ Fix: Define stopPlayback function
  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    stopPlayback(); // Stop any previous playback when text changes
  }, [text]);

  const handleTextToSpeech = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8880/v1/audio/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: text,
          voice: "af_bella",
          response_format: "mp3",
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body.getReader();
      const audio = new Audio();
      audioRef.current = audio;
      const mediaSource = new MediaSource();
      audio.src = URL.createObjectURL(mediaSource);
      
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        let queue = [];
        let isAppending = false;

        const appendToSourceBuffer = async () => {
          if (queue.length > 0 && !isAppending && !sourceBuffer.updating) {
            isAppending = true;
            sourceBuffer.appendBuffer(queue.shift());
          }
        };

        sourceBuffer.addEventListener("updateend", () => {
          isAppending = false;
          appendToSourceBuffer();
          if (queue.length === 0 && !sourceBuffer.updating) {
            mediaSource.endOfStream();
          }
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          queue.push(value.buffer);
          if (!isAppending && !sourceBuffer.updating) appendToSourceBuffer();
        }
      });

      audio.play();
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleTextToSpeech} disabled={isLoading}>
        {isLoading ? "Generating..." : "Play Audio"}
      </button>
      <button onClick={stopPlayback} className="ml-2">Stop</button>
    </div>
  );
};

export default TTSComponent;

