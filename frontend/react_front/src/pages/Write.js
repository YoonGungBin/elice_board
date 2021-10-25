
import React, { useState,createRef } from 'react';
import "../components/style.css"
import BasicBar from '../components/BasicBar';
import BasicButton from '../components/Buttons/BasicButton';
import { useHistory } from 'react-router';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';

import { Editor } from '@toast-ui/react-editor';

function MarkDown({title}) {
  const [content, setContent] = useState("")
  
    const editorRef = createRef();

  const handleClick = () => 
  {
    const content = editorRef.current.getInstance().getHTML();
    setContent(content)

    axios(
      {
        method: "post",
        url: "/post/write",
        data: {
          content:content,
          title:title
        }
      })
    .catch((e)=>console.log(e))

  };

 
    return (
      <div>
        <Editor
          previewStyle="vertical"
          height="70vh"
          initialEditType="markdown"
          initialValue="hello"
          ref={editorRef}
        />
        <div id="toastUIEditor">
            <h1>Toast UI Editor Example</h1>
            <div id = "button">
                <button className="btn_save" onClick={handleClick}>Save</button>
            </div>
        </div>
        <h2>Result</h2>
        <textarea className="result" value={title+content} readOnly="readOnly"></textarea>

        {/* <button onClick={this.handleClick}>make bold</button> */}
      </div>
    );
  }


function Write() {
  const [title, setTitle] = useState("");
  const handleTitle = (e) => {
    return setTitle(e.target.value);
  };
    return (
        <div>
        <BasicBar />
        <input value={title} onChange={handleTitle}/>
        <MarkDown title={title}/>
        </div>
            );
}

export default Write;
