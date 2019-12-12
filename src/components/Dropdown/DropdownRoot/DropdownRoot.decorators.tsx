import withStyles from "react-jss";

import DropdownRoot from "./DropdownRoot";
import DropdownLang from "./DropdownRoot.lang";

import withControlledSwitcher from "../../Decorators/withControlledSwitcher";
import withLangContext from "../../Decorators/withLangContext";

import dropdownRootStyles from "./DropdownRoot.styles";
import lang from "../../../const/lang";

const styledComponent = withStyles(dropdownRootStyles)(DropdownRoot);
const withControlledSwitcherDecorated = withControlledSwitcher(styledComponent);
const withLangContextDecorated = withLangContext(withControlledSwitcherDecorated, DropdownLang, lang.dropdown);

export default withLangContextDecorated;
