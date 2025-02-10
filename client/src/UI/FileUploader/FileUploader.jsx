import { memo } from "react";
import cl from "./FileUploader.module.css";

const MemoizedFileUploader = memo(function FileUploader({
  handleFileUpload,
  placeholder,
  width,
}) {
  return (
    <div className={cl.uploaderContainer}>
      <label
        htmlFor="file-upload"
        className={cl.fileUploader}
        style={{ width: width }}
      >
        {placeholder || "Upload File"}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className={cl.hiddenInput}
      />
    </div>
  );
});

export default MemoizedFileUploader;
