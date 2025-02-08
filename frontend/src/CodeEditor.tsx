import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ language = "javascript", code, onChange }) => {
  const editorRef = useRef(null);
  const monacoEditor = useRef(null);

  useEffect(() => {
    monacoEditor.current = monaco.editor.create(editorRef.current, {
      value: code || '',
      language: language,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    monacoEditor.current.onDidChangeModelContent(() => {
      onChange(monacoEditor.current.getValue());
    });

    return () => {
      monacoEditor.current.dispose();
    };
  }, [code, language, onChange]);

  return <div ref={editorRef} style={{ height: '500px', width: '100%' }} />;
};

export default CodeEditor;