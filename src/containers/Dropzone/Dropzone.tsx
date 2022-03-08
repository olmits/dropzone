import { DropzoneProvider } from "../../contexts/Dropzone";

import DropzoneComponent from "../../components/Dropzone";

const Dropzone = () => {
    return (
        <DropzoneProvider>
            <DropzoneComponent />
        </DropzoneProvider>
    );
}

export default Dropzone;
