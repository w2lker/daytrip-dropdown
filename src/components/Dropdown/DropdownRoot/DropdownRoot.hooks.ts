import {IDropdownOptionsArray} from "./DropdownRoot";
import {sendWarning} from "../../../utils/warn";

export function modifyDropdownOptionsDuplicates(opts: IDropdownOptionsArray): IDropdownOptionsArray {
    let collector: { [key: string]: string } = {};

    if (!opts) return [];

    collector = opts.reduce( (collection, item) => {
        const entries = Object.entries(item);
        if (entries.length > 1) {
            sendWarning(`Dropdown options should contain only one pair key-value per array item. For element ${item} it skipped some elements`);
        }

        const [key, value] = entries[0];
        if (!collection[key]) collection[key] = value;

        return collection;
    }, collector);

    const collectedKeys = Object.keys(collector);
    if (collectedKeys.length === opts.length) {
        return opts;
    }

    sendWarning('Dropdown options should contain unique elements. Some of options are skipped to provide component appropriate functionality');

    return collectedKeys
        .map( (key) => ({
            [key]: collector[key],
        })
    );
}

export function modifyDropdownOptionsMultiline(opts: IDropdownOptionsArray): IDropdownOptionsArray {
    return opts.map( (opt) => {
        const [key, value] = Object.entries(opt)[0];
        return {[key]: value.replace('\n', '')}
    })
}
