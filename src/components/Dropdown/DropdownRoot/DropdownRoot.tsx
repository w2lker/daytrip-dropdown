import React, {createContext, useEffect, useState} from 'react';

import DropdownHead from "../DropdownHead";
import DropdownBody from "../DropdownBody";

import {modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline} from './DropdownRoot.helpers';
import {getKey} from "../../../utils/dropdown";
import lang from "../../../const/lang";

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

export const DropdownLang = createContext({});

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
      <DropdownLang.Provider value={lang.dropdown}>
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
      </DropdownLang.Provider>
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
