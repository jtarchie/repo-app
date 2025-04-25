import { FunctionComponent } from "preact";
import Editor from "@monaco-editor/react";

interface JSONEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const JSONEditor: FunctionComponent<JSONEditorProps> = (
  { value, onChange },
) => {
  return (
    <div className="bg-base-300 rounded-lg overflow-hidden h-[75vh]">
      <Editor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
