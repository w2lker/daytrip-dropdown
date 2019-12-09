import React from "react";
import {IDropdownOptionsElement} from "../DropdownRoot/DropdownRoot";

interface IDropdownHeadProps {
    label?: string;
    placeholder?: string;
    selectedItem?: IDropdownOptionsElement | null,
    onClick: () => void;
}

const DropdownHead: React.FC<IDropdownHeadProps> = (props) => {
    return null;
};

export default DropdownHead;
