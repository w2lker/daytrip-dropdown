import React, {useState} from "react";
import {IDropdownOptionsArray} from "../DropdownRoot/DropdownRoot";
import {WithStyles} from "react-jss";
import dropdownBodyStyles from "./DropdownBody.styles";
import DropdownBodyElement from "./DropdownBodyElement";
import DropdownBodyFilter from "./DropdownBodyFilter";
import {getEntries, getKey, getValue} from "../../../utils/dropdown";

export interface IDropdownBodyProps extends WithStyles<typeof dropdownBodyStyles> {
    opened: boolean;
    selected?: string;
    options: IDropdownOptionsArray;
    // TODO: add rows handling
    rows?: number;
    onSelect?: (val: string) => void;
    onClose: () => void;
}

const emptyClasses = {
  wrapper: '',
  contentWrapper: '',
};

const filterOptions = (filter: string, options: IDropdownOptionsArray): IDropdownOptionsArray =>
    options.filter( (opt) => getValue(opt).includes(filter));

const DropdownBody: React.FC<IDropdownBodyProps> = (props) => {
    const { opened, selected, options, onSelect, onClose } = props;
    const [filter, setFilter] = useState('');
    const [focused, setFocused] = useState('');

    if (!opened) {
      return null;
    }

    const classes = props.classes || emptyClasses;
    if (!options) {
      return null;
    }

    const filtered = filterOptions(filter, options);

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
        onSelect && onSelect(key);
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
            onSelectPerform={ () => focused && onSelect && onSelect(focused) }
            onSelectNext={ focusSwitch(true) }
            onSelectPrev={ focusSwitch(false) }
          />
          <div className={classes.contentWrapper}>
            {renderElements}
            {/* TODO: add empty screens  */}
          </div>
        </div>
    )
};

export default DropdownBody;
