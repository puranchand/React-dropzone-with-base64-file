import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function FileUploader(props) {
    const onDrop = useCallback((acceptedFiles) => {
        if(props.onChange){
            props.onChange(acceptedFiles)
        }

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {props.children ? props.children :
                <div className="upload-box">
                    <div
                        style={{ marginBottom: "10px", fontSize: "20px", fontWeight: 500, }}
                    >
                        Drag 'n' drop some files here, or click to select files
                    </div>
                </div>
            }
        </div>
    )
}

export default FileUploader;