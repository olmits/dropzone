import { createContext, useContext, useMemo, useState } from "react";

const DropzoneContext = createContext({});

export function useDropzone() {
    const dropzone = useContext(DropzoneContext);

    if (!dropzone) {
        throw new Error("useDropzone must be used within DropzoneProvider");
    }

    return dropzone;
}

export function DropzoneProvider(props: any) {
    const [url, setUrl] = useState<string>("");

    const value = useMemo(() => {
        return [ url, setUrl ];
    }, [url]);

    return <DropzoneContext.Provider value={value} {...props} />;
}
