import React, {useEffect, useState} from 'react';

import DropdownHead from "../DropdownHead";
import DropdownBody from "../DropdownBody";

import {modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline} from './DropdownRoot.helpers';
import {getKey} from "../../../utils/dropdown";
import {WithStyles} from "react-jss";
import dropdownRootStyles from "./DropdownRoot.styles";

export interface IDropdownOptionsElement {
    [value: string]: string;
}

export type IDropdownOptionsArray = IDropdownOptionsElement[];

interface IDropdownProps extends WithStyles<typeof dropdownRootStyles> {
    options: IDropdownOptionsArray;
    selected?: string;
    rows?: number;
    label?: string;
    placeholder?: string;
    onSelect?: (selected: string) => void;
}

const DropdownRoot: React.FC<IDropdownProps> = (props) => {
    const { options, rows, label, placeholder, selected, classes, onSelect } = props;
    let modifiedOptions: IDropdownOptionsArray;
    // Filter options array to display only unique key value to prevent issue with onSelect callback validation
    useEffect(() => {
        const withoutDuplicates = modifyDropdownOptionsDuplicates(options);
        modifiedOptions = modifyDropdownOptionsMultiline(withoutDuplicates);
    }, [options]);

    const [isOpened, setIsOpened] = useState(false);

    const selectedOption = selected && options && options.length ?
        options.find( (opt) => getKey(opt) === selected)
    : null;

    return (
        <div className={classes.root}>
            <DropdownHead
                opened={isOpened}
                label={label}
                placeholder={placeholder}
                onClick={() => setIsOpened(!isOpened)}
                selectedItem={selectedOption}
            />
            {isOpened && (
                <DropdownBody
                  selected={selected}
                  options={options}
                  rows={rows}
                  onSelect={onSelect}
                  onClose={() => setIsOpened(false)}
                />
            )}
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
