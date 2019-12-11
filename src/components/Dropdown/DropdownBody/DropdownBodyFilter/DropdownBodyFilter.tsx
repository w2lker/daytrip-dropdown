import React, {useEffect, useRef} from "react";
import {WithStyles} from "react-jss";
import dropdownBodyFilterStyles from "./DropdownBodyFilter.styles";

export interface IDropdownBodyFilterProps extends WithStyles<typeof dropdownBodyFilterStyles>{
    value: string;
    onClose: () => void;
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

    const handleFilterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (key === 'Escape') return onClose && onClose();

      const ifSelectPerform = key === 'Enter';
      const ifSelectPrev = key === 'ArrowUp' || ( key === 'Tab' && event.shiftKey );
      const ifSelectNext = key === 'ArrowDown' || ( key === 'Tab' && !event.shiftKey );

      if (ifSelectPrev || ifSelectNext) {
        // Disallow browser to change focus on Tab
        event.preventDefault();
      }

      if (ifSelectPerform) {
        onSelectPerform();
        return onClose();
      }

      if (ifSelectPrev) return onSelectPrev();
      if (ifSelectNext) return onSelectNext();

    };

    return (
        <div className={classes.wrapper}>
            {/*  TODO: add search icon here  */}
            <input
                className={classes.input}
                ref={inputRef}
                value={value}
                onChange={handleFilterChange}
                onKeyDown={handleFilterKeyDown}
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
