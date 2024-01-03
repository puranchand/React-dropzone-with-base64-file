import React, { useState } from "react";

import "../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import "./index.css";
import FileUploader from "./FileUploader";


function App() {

  const [videoSrc, setVideoSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [base64File, setBase64File] = useState("");

  // useEffect( () => {
  //   if (!file) return
  //   toBase64(file)
  // }, [file])

  const handleFileUpload = async(files) => {
    var file = files[0];
    // var reader = new FileReader();
    console.log(file)
    var url = URL.createObjectURL(file);
    setFileName(file.name)
    setVideoSrc(url);

    let base64File = await toBase64(file)

    setBase64File(base64File.split('base64,')[1])

  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });


  const uploadFileUI = () => {
    return (
      <div className="upload-box">
        <div
          style={{ marginBottom: "10px", fontSize: "20px", fontWeight: 500, }}
        >
          Drag and Drop file here
        </div>
        <div
          style={{ marginBottom: "20px", fontSize: "16px", fontWeight: 400 }}
        >
          (OR)
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "gray",
          }}
        >
          Please select Video File
        </div>
      </div>
    )
  }

  return (
    <div className="App">
        {videoSrc ?

          <>
            <div className="common-div">
              <span>Name of the {fileName}</span>
              {/* <button className="btn-common" onClick={() => gotoTranscript()}>Transcript</button> */}
            </div>
            <div className="common-div-video">
              {/* <img src={videoImg} alt="video" /> */}
              <div className="file-upload-container" style={{ border: "none" }}>
                <Player
                  playsInline
                  src={videoSrc}
                  fluid={false}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
           
          </>
          : 
          <FileUploader 
          onChange={handleFileUpload}
          >
            {uploadFileUI()}
          </FileUploader>
        }
    </div>
  );
}

export default App;
