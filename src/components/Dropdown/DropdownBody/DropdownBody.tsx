import React, {useState} from "react";
import {IDropdownOptionsArray} from "../DropdownRoot/DropdownRoot";

interface IDropdownBodyProps {
    selected: string;
    options: IDropdownOptionsArray;
    onSelect: (val: string) => void;
    onClose: () => void;
}

const filterOptions = (filter: string, options: IDropdownOptionsArray): IDropdownOptionsArray =>
    options.filter( (opt) => Object.values(opt)[0].includes(filter));

const DropdownBody: React.FC<IDropdownBodyProps> = (props) => {
    const { selected, options, onSelect, onClose } = props;
    const [filter, setFilter] = useState('');
    const filtered = filterOptions(filter, options);
    return (
        <div>

        </div>
    )
};

export default DropdownBody;
