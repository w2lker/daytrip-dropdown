import React from "react";
import DropdownRoot from "./DropdownRoot";
import withControlledSwitcher from "../../Decorators/withControlledSwitcher";
import withStyles from "react-jss";
import dropdownRootStyles from "./DropdownRoot.styles";

const withControlledSwitcherDecorated = withControlledSwitcher(DropdownRoot);
// TODO: define class definition in JSS package
// @ts-ignore
const styledComponent = withStyles(dropdownRootStyles)(DropdownRoot);
export default withControlledSwitcherDecorated;
