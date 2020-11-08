import React from 'react';
import { Editor } from '@tinymce/tinymce-react'; 

interface CustomEditorProps {
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  height: number,
}

const CustomEditor = ({ content, setContent, height }: CustomEditorProps): JSX.Element => {
  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_KEY}
      initialValue={content}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist autolink lists link image', 
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | image link | bullist numlist outdent indent | help'
      }}
      onEditorChange={(content: string) => setContent(content)}
    />
  );
}

export default CustomEditor;
