import React, {createContext, ReactElement} from "react";
import withLangContext from "../withLangContext";
import {shallow} from "enzyme";

const setup = () => {
  const SampleComponent = ():ReactElement => {
    return (<></>);
  };
  const sampleLang = {
    text: 'Text passes',
  };

  const SampleContext = createContext(sampleLang);
  const sampleProps = {
    customProp: 'customProp-passes'
  };

  return {SampleComponent, SampleContext ,sampleProps, sampleLang};
};

it('pass original props if they are provided', () => {
  const {SampleComponent, SampleContext, sampleLang, sampleProps} = setup();
  const DecoratedComponent = withLangContext(SampleComponent, SampleContext, sampleLang);
  // @ts-ignore
  const component = shallow(<DecoratedComponent {...sampleProps}/>);
  const props = component.find(SampleComponent).props() as typeof sampleProps;
  expect(props.customProp).toBe(sampleProps.customProp);
});

it('actually creates context', () => {
  const {SampleComponent, SampleContext, sampleLang, sampleProps} = setup();
  const DecoratedComponent = withLangContext(SampleComponent, SampleContext, sampleLang);
  // @ts-ignore
  const component = shallow(<DecoratedComponent {...sampleProps}/>);
  const context = component.find('ContextProvider');
  expect(context.length).toBe(1);
  expect(context.prop('value')).toEqual(sampleLang);
});

