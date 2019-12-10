import React from "react";

import {WithStyles} from "react-jss";

import {IDropdownOptionsElement} from "../DropdownRoot/DropdownRoot";
import dropdownHeadStyles from "./DropdownHead.styles";

interface IDropdownHeadProps extends WithStyles<typeof dropdownHeadStyles>{
    label?: string;
    placeholder?: string;
    selectedItem?: IDropdownOptionsElement | null,
    onClick: () => void;
}

const DropdownHead: React.FC<IDropdownHeadProps> = (props) => {
    return null;
};

export default DropdownHead;
