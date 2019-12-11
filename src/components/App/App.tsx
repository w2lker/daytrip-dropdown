import React from 'react';
import Dropdown from "../Dropdown";
import countries from "../../const/countries";

const App: React.FC = () => {
  const onChange = (val: string) => console.log('-----', val);
  return (
    <div className="App">
      <Dropdown
        label='Your country'
        placeholder='Select your residence country'
        options={countries}
        onSelect={onChange}
      />
    </div>
  );
};

export default App;
