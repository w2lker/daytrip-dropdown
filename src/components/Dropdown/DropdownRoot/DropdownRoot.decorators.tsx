import React from "react";

import withStyles from "react-jss";

import DropdownRoot from "./DropdownRoot";
import DropdownLang from "./DropdownRoot.lang";

import withControlledSwitcher from "../../Decorators/withControlledSwitcher";
import withLangContext from "../../Decorators/withLangContext";
import dropdownRootStyles from "./DropdownRoot.styles";
import lang from "../../../const/lang";

const withControlledSwitcherDecorated = withControlledSwitcher(DropdownRoot);
const withLangContextDecorated = withLangContext(withControlledSwitcherDecorated, DropdownLang, lang.dropdown);
const styledComponent = withStyles(dropdownRootStyles)(withLangContextDecorated);

export default styledComponent;
