import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const NewsEditor = ({ value, setValue }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          // [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"], //"image"
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="pr-6 ">
      <div className="mt-4">
        <ReactQuill
          // className={styles.editor}
          theme={"snow"}
          onChange={(e) => setValue(e)}
          value={value}
          modules={modules}
          formats={formats}
          bounds={"#root"}
          // placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default NewsEditor;
