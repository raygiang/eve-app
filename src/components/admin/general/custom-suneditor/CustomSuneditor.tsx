import React from 'react';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css';
import './CustomSuneditor.scss';

interface CustomSuneditorProps {
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  height: number,
}

const CustomSuneditor = ({ content, setContent, height }: CustomSuneditorProps): JSX.Element => {
  return (
    <SunEditor
      setContents={content}
      setOptions={{
        height,
        plugins,
        buttonList: [
          ['undo', 'redo'],
          ['fontSize'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list'],
          ['table', 'link', 'image', 'video', 'audio'],
          ['fullScreen'],
        ],
      }}
      onBlur={(e: FocusEvent, contents: string) => setContent(contents)}
    />
  )
}

export default CustomSuneditor;
