import React, { ReactElement } from "react";
import {mount, shallow} from "enzyme";
import withControlledSwitcher from "../withControlledSwitcher";

const setup = () => {
  const SampleComponent = ():ReactElement => {
    return (<></>);
  };
  const sampleProps = {
    customProp: 'customProp-passes',
    select: 'someValue',
    onSelect: jest.fn()
  };
  return {SampleComponent, sampleProps};
};

it('match snapshot', () => {
  const {SampleComponent, sampleProps} = setup();
  const DecoratedComponent = withControlledSwitcher(SampleComponent);
  const component = mount(<DecoratedComponent {...sampleProps}/>);
  expect(component.debug()).toMatchSnapshot();
});

it('pass original props if they are provided', () => {
  const {SampleComponent, sampleProps} = setup();
  const DecoratedComponent = withControlledSwitcher(SampleComponent);
  const component = shallow(<DecoratedComponent {...sampleProps}/>);
  const props = component.find(SampleComponent).props();
  // @ts-ignore
  expect(props.customProp).toBe(sampleProps.customProp);
  // @ts-ignore
  props.onSelect();
  expect(sampleProps.onSelect).toBeCalledTimes(1);
});

it('provide state controller if non of {value, onSelect} provided', () => {
  const {SampleComponent} = setup();
  const DecoratedComponent = withControlledSwitcher(SampleComponent);
  const component = shallow(<DecoratedComponent />);
  const props = component.find(SampleComponent).props();
  // @ts-ignore
  expect(props.onSelect).toBeDefined();
  // @ts-ignore
  expect(typeof props.onSelect).toBe('function');
});

it('fires callback if value is not provided', () => {
  const {SampleComponent, sampleProps} = setup();
  const noValProps = {
    ...sampleProps,
    value: undefined,
  };

  const DecoratedComponent = withControlledSwitcher(SampleComponent);
  const component = shallow(<DecoratedComponent {...noValProps}/>);
  const props = component.find(SampleComponent).props();
  const { onSelect } = props as {onSelect: (val: string) => void};
  expect(onSelect).toBeDefined();
  expect(typeof onSelect).toBe('function');
  onSelect('some-val');
  expect(sampleProps.onSelect).toBeCalledTimes(1);
  expect(sampleProps.onSelect.mock.calls[0][0]).toBe('some-val');
});
