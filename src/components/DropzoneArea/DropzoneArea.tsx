import React, { useState, useRef } from "react";
import { useDropzone } from "../../contexts/Dropzone";
import useEventListener from "../../hooks/useEventListener";
import DropzoneLogo from "../../icons/DropzoneLogo.png";
import "./DropzoneArea.sass"

const Dropzone = () => {
    // @ts-ignore
    const [url, setUrl] = useDropzone();
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    const dropzoneArea = useRef<HTMLDivElement>(null);

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
                setUrl(result);
            }
        }
    }

    useEventListener("dragenter", (e: Event) => {
        e.preventDefault();
        setDragging(true);
    }, dropzoneArea);
    useEventListener("dragleave", (e: Event) => {
        e.preventDefault();
        setDragging(false);
    }, dropzoneArea);
    useEventListener("dragover", (e: Event) => {
        e.preventDefault();
    }, dropzoneArea);
    useEventListener("drop", (e: Event) => {
        e.preventDefault();
        setDragging(false);
        // @ts-ignore
        if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
            // @ts-ignore
            const file = e.dataTransfer.files[0];
            onLoadFile(file);
        }
    }, dropzoneArea);

    return (
        <div
            ref={dropzoneArea}
            className={`dropzone-area ${dragging ? "dropzone-area_dragging" : ""}`}
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
