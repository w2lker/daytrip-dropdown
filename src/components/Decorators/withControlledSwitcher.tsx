import React, { useState } from "react";

export interface IWithControlledSwitcher {
    selected?: string;
    onSelect?: (val: string) => void;
}

function withControlledSwitcher<Props>(Child: React.ComponentType<Props>):React.FC<Props & IWithControlledSwitcher> {
    const ControlledSwitcherProvider: React.FC<Props> = (props) => {
        const {selected, onSelect, ...other} = props as IWithControlledSwitcher;
        const [controlledValue, setControlledValue] = useState('');
        if (selected && onSelect) {
            return <Child {...props} />;
        }
        const setControlledValueWithCallback = (selected: string) => {
            setControlledValue(selected);
            onSelect && onSelect(selected);
        };
        // @ts-ignore
        return <Child {...other} selected={controlledValue} onSelect={setControlledValueWithCallback}/>
    };
    ControlledSwitcherProvider.displayName = `WithControlledSwitcher(${Child.displayName})`;
    return ControlledSwitcherProvider;
}

export default withControlledSwitcher;
