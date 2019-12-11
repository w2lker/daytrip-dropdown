import React, { useContext } from "react";

import {WithStyles} from "react-jss";
import classNames from "classnames";

import DropdownLang from "../DropdownRoot/DropdownRoot.lang";

import dropdownHeadStyles from "./DropdownHead.styles";
import lang from "../../../const/lang";

import { IDropdownOptionsElement } from "../DropdownRoot/DropdownRoot";
import {getValue} from "../../../utils/dropdown";
import {chevron} from "./DropdownHead.svg";

export interface IDropdownHeadProps extends WithStyles<typeof dropdownHeadStyles>{
  opened: boolean;
  label?: string;
  placeholder?: string;
  selectedItem?: IDropdownOptionsElement | null,
  onClick: () => void;
}

const DropdownHead: React.FC<IDropdownHeadProps> = (props) => {
  const { opened, label, placeholder, selectedItem, onClick, classes } = props;
  // Fallback if there is no context provided
  const contextLang = useContext(DropdownLang) as typeof lang.dropdown;
  const defaultTexts = contextLang && contextLang.head ? contextLang.head : { label: '', placeholder: '' };

  const labelTest = label || defaultTexts.label;
  const contentPlaceholder = placeholder || defaultTexts.placeholder;
  const contentText = selectedItem ? getValue(selectedItem) : contentPlaceholder;
  const caretClassname = classNames({
    [classes.caret]: true,
    [classes.caretReverted]: opened,
  });
  const handleMouseDown = (event: React.MouseEvent): void => {
    if (!event.button) {
      return onClick();
    }
  };

  return (
    <div
      className={classes.wrapper}
      onMouseDown={handleMouseDown}
    >
      <div className={classes.label}>{labelTest}</div>
      <div className={classes.content}>{contentText}</div>
      <div className={caretClassname}>
        {chevron()}
      </div>
    </div>
  )
};

export default DropdownHead;
