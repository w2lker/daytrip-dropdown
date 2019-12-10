import {IDropdownOptionsElement} from "../components/Dropdown/DropdownRoot/DropdownRoot";

export function getKey(item: IDropdownOptionsElement): string {
  if (!item) return '';
  return Object.keys(item)[0];
}
