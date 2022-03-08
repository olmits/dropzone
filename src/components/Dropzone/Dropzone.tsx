import DropzoneHeader from "../DropzoneHeader/DropzoneHeader";
import DropzoneArea from "../DropzoneArea/DropzoneArea";
import "./Dropzone.sass"

const Dropzone = () => (
    <div className="dropzone">
        <DropzoneHeader />
        <DropzoneArea />
    </div>
);

export default Dropzone;
