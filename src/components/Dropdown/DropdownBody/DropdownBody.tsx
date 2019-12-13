import React, { useState } from "react";

import dropdownBodyStyles from "./DropdownBody.styles";
import DropdownBodyElement from "./DropdownBodyElement";
import DropdownBodyFilter from "./DropdownBodyFilter";
import DropdownBodyEmpty from "./DropdownBodyEmpty";

import {IDropdownOptionsArray} from "../DropdownRoot/DropdownRoot";
import {getEntries, getKey, getValue} from "../../../utils/dropdown";

export interface IDropdownBodyProps {
    opened: boolean;
    selected?: string;
    options: IDropdownOptionsArray;
    rows?: number;
    caseInsensitiveSearch?: boolean;
    onSelect: (val: string) => void;
    onClose: () => void;
}

const filterOptions = (filter: string, options: IDropdownOptionsArray, caseInsensitive?: boolean): IDropdownOptionsArray => {
  const insensitive = caseInsensitive ? 'i' : '';
  const regExpFilter = new RegExp(filter, insensitive);
  return options.filter( (opt) => getValue(opt).match(regExpFilter));
};


const DropdownBody: React.FC<IDropdownBodyProps> = (props) => {
    const { opened, selected, options, onSelect, onClose, caseInsensitiveSearch } = props;
    const [filter, setFilter] = useState('');
    const [focused, setFocused] = useState('');

    if (!opened) {
      return null;
    }

    const filtered = filterOptions(filter, options, caseInsensitiveSearch);
    const classes = dropdownBodyStyles(props);

    const focusSwitch = (next: boolean) => () => {
      if (!filtered) return;
      const setNextFocused = (index: number) => {
        const next = getKey(filtered[index]);
        setFocused(next);
      };
      const index = filtered.findIndex( (item) =>  getKey(item) === focused);
      const filteredLast = filtered.length - 1;
      // Can't select next to last and prev to first element
      if (index === filteredLast && next) return;
      if (index === 0 && !next) return;
      // If focused doesn't match filtered list
      if (index === -1) {
        return setNextFocused(0);
      }
      setNextFocused(next ? index + 1 : index - 1);
    };

    const renderElements = filtered.map( (item) => {
      const {key, value: content} = getEntries(item);
      const handleSelect = () => {
        onSelect(key);
        onClose();
      };

      return (
        <DropdownBodyElement
          key={key}
          content={content}
          selected={ key === selected }
          focused={ key === focused }
          onClick={ handleSelect }
        />
      )
    });

    return (
        <div className={classes.wrapper}>
          <DropdownBodyFilter
            value={filter}
            onClose={onClose}
            onFilterChange={setFilter}
            onSelectPerform={ () => focused && onSelect(focused) }
            onSelectNext={ focusSwitch(true) }
            onSelectPrev={ focusSwitch(false) }
          />
          <div className={classes.contentWrapper}>
            {renderElements}
            <DropdownBodyEmpty
              isEmpty={!(options && options.length)}
              isFilteredEmpty={!(filtered && filtered.length)}
            />
          </div>
        </div>
    )
};

export default DropdownBody;
