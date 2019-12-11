import React, { useState } from "react";

export interface IWithControlledSwitcher {
    selected?: string;
    onSelect?: (val: string) => void;
}

function withControlledSwitcher<Props>(Child: React.ComponentType<Props>):React.FC<Props & IWithControlledSwitcher> {
    return (props) => {
        const {selected, onSelect, ...other} = props as IWithControlledSwitcher;
        if (selected && onSelect) {
            return <Child {...props} />;
        }
        const [controlledValue, setControlledValue] = useState('');
        const setControlledValueWithCallback = (selected: string) => {
            setControlledValue(selected);
            onSelect && onSelect(selected);
        };
        // @ts-ignore
        return <Child {...other} selected={controlledValue} onSelect={setControlledValueWithCallback}/>
    };
}

export default withControlledSwitcher;
