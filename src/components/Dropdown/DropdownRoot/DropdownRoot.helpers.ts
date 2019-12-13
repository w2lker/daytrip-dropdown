import {IDropdownOptionsArray} from "./DropdownRoot";

import {sendWarning} from "../../../utils/warn";
import {getDropdownOptionEntries} from "../../../utils/dropdown";

export function modifyDropdownOptionsToSingleKey(opts: IDropdownOptionsArray): IDropdownOptionsArray {
  return opts.reduce( (accumulator, option) => {
    const optionsArray = Object.keys(option).map( (key) => ({[key]: option[key]}));
    return accumulator.concat(optionsArray);
  }, [] as IDropdownOptionsArray);
}

export function modifyDropdownOptionsDuplicates(opts: IDropdownOptionsArray): IDropdownOptionsArray {
    let collector: { [key: string]: string } = {};
    if (!opts) return [];

    collector = opts.reduce( (collection, item) => {
        const {key, value} = getDropdownOptionEntries(item);
        if (!collection[key]) collection[key] = value;
        return collection;
    }, collector);

    const collectedKeys = Object.keys(collector);
    if (collectedKeys.length === opts.length) {
        return opts;
    }

    sendWarning('Dropdown options should contain unique elements. Some of options are skipped to provide component appropriate functionality');

    return collectedKeys.map( (key) => ({
        [key]: collector[key],
      })
    );
}

export function modifyDropdownOptionsMultiline(opts: IDropdownOptionsArray): IDropdownOptionsArray {
    return opts.map( (opt) => {
        const {key, value} = getDropdownOptionEntries(opt);
        return {[key]: value.replace('\n', '')}
    })
}
