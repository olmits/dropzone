import React, { useState } from "react";

import DropzoneComponent from "../../components/Dropzone";

const Dropzone = () => {
    const [value, setValue] = useState<string>("");

    const onChange = (url: string) => {
        if (url) {
            setValue(url);
        }
    }

    return (
        <DropzoneComponent
            value={value}
            onChange={onChange}
        />
    );
}

export default Dropzone;
