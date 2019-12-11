import React, { useState } from "react";

export interface IWithControlledSwitcher {
    value: string;
    onSelect: (val: string) => void;
}

function withControlledSwitcher<Props>(Child: React.ComponentType<Props>):React.FC<Props & IWithControlledSwitcher> {
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
        return <Child {...other} value={controlledValue} onSelect={setControlledValueWithCallback}/>
    };
}

export default withControlledSwitcher;
