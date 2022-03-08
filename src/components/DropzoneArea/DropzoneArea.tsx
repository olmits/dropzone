import React, { useState } from "react";
import { useDropzone } from "../../contexts/Dropzone";
import DropzoneLogo from "../../icons/DropzoneLogo.png";
import "./DropzoneArea.sass"

const Dropzone = () => {
    // @ts-ignore
    const [url, setUrl] = useDropzone();
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
                setUrl(result)
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
            onLoadFile(file);
        }
    }

    return (
        <div
            className={`dropzone-area ${dragging ? "dropzone-area_dragging" : ""}`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <div className={`.dropzone-area__loader ${loading ? ".dropzone-area__loader" : ""}`}>
                <img className="dropzone-area__logo" src={url || DropzoneLogo} alt="logo" />
            </div>
            <p className="dropzone-area__instruction">
                {loading && "Uploading"}
                {!loading && (url ? "Drag & drop here to replace" : "Drag & drop here")}
            </p>
            <p className="dropzone-area__separator">- or -</p>
            <>
                <label className="dropzone-area__label" htmlFor="dropzone-area__input">Select file to upload</label>
                <input
                    onChange={(e) => {
                        const { target: { files } } = e;
                        if (files && files.length > 0) {
                            onLoadFile(files[0])
                        }
                    }}
                    id="dropzone-area__input"
                    type="file"
                    className="dropzone-area__input"
                    accept=".png, .jpeg"
                />
            </>
        </div>
    );
}

export default Dropzone;
