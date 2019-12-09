import React, {ComponentType, useState} from "react";

export interface IWithControlledSwitcher {
    value?: string;
    onSelect?: (val: string) => void;
}

export default function <T>(Child: React.ComponentType<T>):React.FC<T & IWithControlledSwitcher> {
    return (props) => {
        const {value, onSelect, ...other} = props as IWithControlledSwitcher;
        if (value && onSelect) {
            return <Child {...props} />;
        }
        const [controlledValue, setControlledValue] = useState('');
        const setControlledValueWithCallback = (value: string) => {
            setControlledValue(value);
            onSelect && onSelect(value);
        };
        // @ts-ignore
        return <Child {...other} value={controlledValue} onSelect={setControlledValue}/>
    };
}


