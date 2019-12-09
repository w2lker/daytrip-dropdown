import React, { useEffect, useState } from 'react';
import {modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline} from './DropdownRoot.hooks';
import DropdownHead from "../DropdownHead";
import DropdownBody from "../DropdownBody";

export interface IDropdownOptionsElement {
    [value: string]: string;
}

export type IDropdownOptionsArray = IDropdownOptionsElement[];

interface IDropdownProps {
    options: IDropdownOptionsArray;
    selected?: string;
    rows?: number;
    label?: string;
    placeholder?: string;
    onSelect?: (selected: string) => void;
    // TODO: define class definition in JSS package
    classes?: any;
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
    const toggleDropdownOpen = () => setIsOpened(true);
    const toggleDropdownClosed = () => setIsOpened(false);

    const selectedOption = selected && options && options.length ?
        options.find( (opt) => Object.keys(opt)[0] === selected )
    : null;

    return (
        <div className={classes.root}>
            <DropdownHead
                label={label}
                placeholder={placeholder}
                onClick={toggleDropdownOpen}
                selectedItem={selectedOption}
            />
            {isOpened && (
                /*TODO: provide props for DropdownBody*/
                <DropdownBody />
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
