import React, {ChangeEvent, useState} from "react";
import c from "./FileUploader.module.less";

type Props={
    uploadedFiles:File[],
    setUploadedFiles:(a:File[])=>void
}

 const FileUploader:React.FC<Props> = ({uploadedFiles,setUploadedFiles}) => {

    const [fileLimit, setFileLimit] = useState(false);

    const MAX_COUNT=10
    const handleUploadFiles = (files:File[]) => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file:File) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
            return true
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }

    const handleFileEvent =  (e:ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }
    return (
        <div className="App">



            <input className={c.fileUploader} id='fileUpload' type='file' multiple
                   onChange={(e)=>handleFileEvent(e)}
                   disabled={fileLimit}
            />
            <h3 style={{textAlign:'center'}}>Uploaded files: </h3>

            <div className={c.fileUploader__fileName}>
                {uploadedFiles.map(file => (
                    <div >
                        {file.name}
                    </div>
                ))}
            </div>

        </div>
    );
}
export default React.memo(FileUploader)
