import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css';
import './EditForm.scss';

const EditForm = (): JSX.Element => {
  const [content, setContent] = useState('');

  return (
    <div className="edit-form">
      <SunEditor
        setOptions={{
          height: 300,
          plugins: plugins,
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
        onChange={(content: string) => setContent(content)}
      />
    </div>
  )
}

export default EditForm;
