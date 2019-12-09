import React, {useEffect, useRef} from "react";

interface IDropdownBodyFilterProps {
    value: string;
    onChange: (val: string) => void;
    classes: any;
    // TODO: add on select previous, on select next and on enter keypress
}

const DropdownBodyFilter: React.FC<IDropdownBodyFilterProps> = (props) => {
    const { value, onChange } = props;
    const inputRef = useRef(null);
    useEffect(() => {
        // @ts-ignore
        inputRef && inputRef.current && inputRef.current.focus && inputRef.current.focus();
    });
    const handleFilterEnter = (event: React.FormEvent<HTMLInputElement>):void => onChange((event.target as HTMLInputElement).value);
    return (
        <div>
        {/*  TODO: add search icon here  */}
            <input
                ref={inputRef}
                value={value}
                onChange={handleFilterEnter}
            />
        </div>
    )
};

export default DropdownBodyFilter;
