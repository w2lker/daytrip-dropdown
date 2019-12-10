import React, {ComponentType} from 'react';

import classNames from "classnames";
import {WithStyles} from "react-jss";

import dropdownBodyElementStyles from "./DropdownBodyElement.styles";


export interface IDropdownBodyElementProps extends WithStyles<typeof dropdownBodyElementStyles>{
  content: string;
  selected?: boolean;
  focused?: boolean;
  onClick: () => void;
}

const DropdownBodyElement: React.FC<IDropdownBodyElementProps> = (props) => {
  const { content, selected, focused, onClick, classes } = props;
  const wrapperClass = classNames({
    [classes.root]: true,
    [classes.focused]: focused,
    [classes.selected]: selected,
  });
  return (
    <div
      className={wrapperClass}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

DropdownBodyElement.defaultProps = {
  classes: {
    root: '',
    selected: '',
    focused: '',
  }
};

export default DropdownBodyElement;
