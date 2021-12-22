import DropzoneHeader from "./DropzoneHeader";
import DropzoneArea from "./DropzoneArea";
import { Props } from "./Dropzone.types";
import "./Dropzone.sass"

const Dropzone = ({
    value,
    onChange,
}: Props) => (
    <div className="dropzone">
        <DropzoneHeader />
        <DropzoneArea value={value} onChange={onChange} />
    </div>
);

export default Dropzone;
