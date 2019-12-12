import React, {useContext} from 'react';
import {WithStyles} from "react-jss";

import dropdownBodyEmptyStyles from "./DropdownBodyEmpty.styles";
import DropdownLang from "../../DropdownRoot/DropdownRoot.lang";

import {emptySearch} from "./DropdownBodyEmpty.svg";
import lang from "../../../../const/lang";

export interface IDropdownBodyEmptyProps extends WithStyles<typeof dropdownBodyEmptyStyles>{
  isEmpty: boolean;
  isFilteredEmpty: boolean;
}

const DropdownBodyEmpty: React.FC<IDropdownBodyEmptyProps> = (props) => {
  const {isEmpty, isFilteredEmpty, classes} = props;
  // Fallback is case context is not connected
  const contextLang = useContext(DropdownLang) as typeof lang.dropdown;
  const emptyTextItem = { title: '', description: '' };
  const defaultTexts = contextLang && contextLang.emptyStates ? contextLang.emptyStates : { noOptionsProvided: emptyTextItem, noFilteredOptions: emptyTextItem };

  if( !(isEmpty || isFilteredEmpty) ) return null;
  const texts = isEmpty ? defaultTexts.noOptionsProvided : defaultTexts.noFilteredOptions;

  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        {emptySearch()}
      </div>
      <h5 className={classes.title}>{texts.title}</h5>
      <p className={classes.description}>{texts.description}</p>
    </div>
  );
};

export default DropdownBodyEmpty;
