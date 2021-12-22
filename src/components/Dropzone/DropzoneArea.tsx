import React, { useState } from "react";
import DropzoneLogo from "../../icons/DropzoneLogo.png";
import { Props } from "./Dropzone.types";
import "./Dropzone.sass"

const Dropzone = ({
    value,
    onChange,
}: Props) => {
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLoadFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadstart = () => {
            setLoading(true);
        }

        reader.onloadend = () => {
            setLoading(false);
        }

        reader.onload = () => {
            const { result } = reader;
            if (result && typeof result === "string" ) {
                onChange(result)
            }
        }
    }

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
            const file = e.dataTransfer.files[0];
            console.log("asdf", file);
            
            onLoadFile(file);
        }
    }

    return (
        <div
            className={`dropzoneArea ${dragging ? "dropzoneAreaDragging" : ""}`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <div className={`dropzoneLoader ${loading ? "dropzoneLoaderLoading" : ""}`}>
                <img className="dropzoneLogo" src={value || DropzoneLogo} alt="logo" />
            </div>
            <p className="dropzoneAreaInstruction">
                {loading ? "Uploading" : (value ? "Drag & drop here to replace" : "Drag & drop here")}
            </p>
            <p className="dropzoneAreaInstructionSeparator">- or -</p>
            <div>
                <label className="dropzoneAreaLabel" htmlFor="dropzoneAreaInput">Select file to upload</label>
                <input
                    onChange={(e) => {
                        const { target: { files } } = e;
                        if (files && files.length > 0) {
                            onLoadFile(files[0])
                        }
                    }}
                    id="dropzoneAreaInput"
                    type="file"
                    className="dropzoneAreaInput"
                    accept=".png, .jpeg"
                />
            </div>
        </div>
    );
}

export default Dropzone;
