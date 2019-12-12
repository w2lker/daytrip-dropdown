import React, {useEffect, useRef, useState} from 'react';

import {WithStyles} from "react-jss";
import classNames from "classnames";

import DropdownHead from "../DropdownHead";
import DropdownBody from "../DropdownBody";

import {modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline} from './DropdownRoot.helpers';
import {getKey} from "../../../utils/dropdown";
import dropdownRootStyles from "./DropdownRoot.styles";

export interface IDropdownOptionsElement {
    [value: string]: string;
}

export type IDropdownOptionsArray = IDropdownOptionsElement[];

export interface IDropdownProps extends WithStyles<typeof dropdownRootStyles> {
    className?: string;
    options: IDropdownOptionsArray;
    selected?: string;
    rows?: number;
    label?: string;
    placeholder?: string;
    onSelect: (selected: string) => void;
}

let modifiedOptions: IDropdownOptionsArray = [];

const DropdownRoot: React.FC<IDropdownProps> = (props) => {
    const { className, options, rows, label, placeholder, selected, classes, onSelect } = props;

    const [isOpened, setIsOpened] = useState(false);

    // Filter options array to display only unique key value to prevent issue with onSelect callback validation
    useEffect(() => {
        const withoutDuplicates = modifyDropdownOptionsDuplicates(options);
        modifiedOptions = modifyDropdownOptionsMultiline(withoutDuplicates);
    }, [options]);

    // Handle close on click outside
    const wrapperRef = useRef<HTMLDivElement>(null);
    function handleClickOutside(event: MouseEvent ) {
      const isClickedOutside = wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLDivElement);
      if (isOpened && isClickedOutside) setIsOpened(false);
    }

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });

    const selectedOption = selected && modifiedOptions && modifiedOptions.length ?
        modifiedOptions.find( (opt) => getKey(opt) === selected)
      : null;

    const wrapperClass = classNames(classes.root, className);

    return (
        <div
          className={wrapperClass}
          ref={wrapperRef}
        >
            <DropdownHead
                opened={isOpened}
                label={label}
                placeholder={placeholder}
                onClick={() => setIsOpened(!isOpened)}
                selectedItem={selectedOption}
            />
            <DropdownBody
              opened={isOpened}
              selected={selected}
              options={modifiedOptions}
              rows={rows}
              onSelect={onSelect}
              onClose={() => setIsOpened(false)}
            />
        </div>
    );
};

DropdownRoot.defaultProps = {
    options: [],
    rows: 5,
    classes: {
        root: '',
    }
};

export default DropdownRoot;
