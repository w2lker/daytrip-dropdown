import React, {useEffect, useRef} from "react";
import {WithStyles} from "react-jss";
import dropdownBodyFilterStyles from "./DropdownBodyFilter.styles";

export interface IDropdownBodyFilterProps extends WithStyles<typeof dropdownBodyFilterStyles>{
    value: string;
    onClose?: () => void;
    onFilterChange: (val: string) => void;
    onSelectPerform: () => void;
    onSelectPrev: () => void;
    onSelectNext: () => void;
}

const emptyClasses = {
  wrapper: '',
  input: ''
};

const DropdownBodyFilter: React.FC<IDropdownBodyFilterProps> = (props) => {
    const { value, onFilterChange, onSelectNext, onSelectPerform, onSelectPrev, onClose} = props;
    const classes = props.classes || emptyClasses;
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef && inputRef.current && inputRef.current.focus && inputRef.current.focus();
    });

    const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) =>
      onFilterChange((event.target as HTMLInputElement).value);

    const handleFilterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (key === 'Escape') return onClose && onClose();

      const ifSelectPerform = key === 'Enter';
      const ifSelectPrev = key === 'Keyup' || ( key === 'Tab' && event.shiftKey );
      const ifSelectNext = key === 'Keydown' || ( key == 'Tab' && !event.shiftKey );

      if (ifSelectPrev || ifSelectNext) {
        // Disallow browser to change focus on Tab
        event.preventDefault();
      }

      if (ifSelectPerform) return onSelectPerform();
      if (ifSelectPrev) return onSelectPrev();
      if (ifSelectNext) return onSelectNext();

    };
    // TODO: handle focus over close

    return (
        <div className={classes.wrapper}>
            {/*  TODO: add search icon here  */}
            <input
                className={classes.input}
                ref={inputRef}
                value={value}
                onChange={handleFilterChange}
                onKeyPress={handleFilterKeyPress}
                onBlur={onClose}
            />
        </div>
    )
};

// handle incorrect connection
DropdownBodyFilter.defaultProps = {
  onSelectPerform: () => null,
  onSelectPrev: () => null,
  onSelectNext: () => null,
  onFilterChange: () => null,
  onClose: () => null,
};

export default DropdownBodyFilter;
