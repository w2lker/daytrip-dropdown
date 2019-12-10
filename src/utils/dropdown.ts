import {IDropdownOptionsElement} from "../components/Dropdown/DropdownRoot/DropdownRoot";

export function getKey(item: IDropdownOptionsElement): string {
  if (!item) return '';
  return Object.keys(item)[0];
}

export function getValue(item: IDropdownOptionsElement): string {
  if (!item) return '';
  return Object.values(item)[0];
}

interface IDropdownElementEntries {
  key: string;
  value: string;
}

export function getEntries(item: IDropdownOptionsElement): IDropdownElementEntries {
  if (!item) return {key: '', value: ''};
  const [key, value] = Object.entries(item)[0];
  return {key, value};
}
