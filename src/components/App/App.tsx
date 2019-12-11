import React from 'react';
import Dropdown from "../Dropdown";
import { IDropdownOptionsArray } from "../Dropdown/DropdownRoot/DropdownRoot";

const App: React.FC = () => {
  const content: IDropdownOptionsArray = [
    {'opt1': 'value1'},
    {'opt2': 'value2'},
    {'opt3': 'value3'},
    {'opt4': 'value4'},
    {'opt5': 'value5'},
    {'opt6': 'value6'},
    {'opt7': 'value7'},
  ];
  const onChange = (val: string) => console.log('-----', val);
  return (
    <div className="App">
      <Dropdown
        options={content}
        onSelect={onChange}
      />
    </div>
  );
};

export default App;
