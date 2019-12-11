import React from 'react';

import classNames from "classnames";
import {WithStyles} from "react-jss";

import dropdownBodyElementStyles from "./DropdownBodyElement.styles";


export interface IDropdownBodyElementProps extends WithStyles<typeof dropdownBodyElementStyles>{
  content: string;
  selected?: boolean;
  focused?: boolean;
  onClick: () => void;
}
const emptyClasses = {
  root: '',
  selected: '',
  focused: '',
};

const DropdownBodyElement: React.FC<IDropdownBodyElementProps> = (props) => {
  const { content, selected, focused, onClick } = props;
  const classes = props.classes || emptyClasses;
  const wrapperClass = classNames({
    [classes.root]: true,
    [classes.focused]: focused,
    [classes.selected]: selected,
  });
  const handleMouseDown = (event: React.MouseEvent): void => {
    if (!event.button) {
      return onClick();
    }
  };

  return (
    <div
      className={wrapperClass}
      onMouseDown={handleMouseDown}
    >
      {content}
    </div>
  );
};

export default DropdownBodyElement;
