import React from 'react';

import { mount, shallow } from 'enzyme';

import DropdownBodyFilter, { IDropdownBodyFilterProps } from './DropdownBodyFilter';
import DropdownBodyFilterDecorated from './DropdownBodyFilter.decorators';
import dropdownBodyFilterStyles from './DropdownBodyFilter.styles';


const setup = () => {
  const classes = {
    wrapper: 'dropdownBodyFilter-wrapper',
    magnify: 'dropdownBodyFilter-magnify',
    input: 'dropdownBodyFilter-input',
    divider: 'dropdownBodyFilter-divider',
  };

  const classesKeys = Object.keys(classes);
  const sampleProps: IDropdownBodyFilterProps = {
    value: 'some filter',
    onClose: jest.fn(),
    onFilterChange: jest.fn(),
    onSelectPerform: jest.fn(),
    onSelectNext: jest.fn(),
    onSelectPrev: jest.fn(),
    classes,
  };

  return {classes, classesKeys, sampleProps}
};

describe('DropdownBodyFilter component', () => {

  it('match snapshot', () => {
    const { sampleProps } = setup();
    const component = shallow(<DropdownBodyFilter {...sampleProps} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('renders input', () => {
      const { classes, sampleProps } = setup();
    const component = shallow(<DropdownBodyFilter {...sampleProps} />);
    expect(component.find(`.${classes.input}`).length).toBe(1);
  });

  it('perform change', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownBodyFilter {...sampleProps} />);
    const newFilter = 'new filter';
    component.find(`.${classes.input}`).simulate('change', { target: { value: newFilter } });
    expect(sampleProps.onFilterChange).toBeCalledTimes(1);
    // @ts-ignore
    const passedArg = sampleProps.onFilterChange.mock.calls[0][0];
    expect(passedArg).toBe(newFilter);
  });

  it('handle switch selections', () => {
      const { classes, sampleProps } = setup();
      const preventFunction = jest.fn();
      const keyPressParams = (keyName: string, shiftKey?: boolean) => ({
        key: keyName,
        shiftKey: shiftKey,
        preventDefault: preventFunction,
      });
      const component = shallow(<DropdownBodyFilter {...sampleProps} />);
      const input = component.find(`.${classes.input}`);
      input.simulate('keyDown', keyPressParams('Enter'));
      expect(sampleProps.onSelectPerform).toBeCalledTimes(1);
      input.simulate('keyDown', keyPressParams('ArrowUp'));
      expect(sampleProps.onSelectPrev).toBeCalledTimes(1);
      input.simulate('keyDown', keyPressParams('ArrowDown'));
      expect(sampleProps.onSelectNext).toBeCalledTimes(1);
      input.simulate('keyDown', keyPressParams('Tab', true));
      expect(sampleProps.onSelectPrev).toBeCalledTimes(2);
      input.simulate('keyDown', keyPressParams('Tab'));
      expect(sampleProps.onSelectNext).toBeCalledTimes(2);
      expect(preventFunction).toBeCalledTimes(4);
  });

  it('handle close on input blur', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownBodyFilter {...sampleProps} />);
    const input = component.find(`.${classes.input}`);
    input.simulate('blur');
    expect(sampleProps.onClose).toBeCalledTimes(1);
  });

  it('handle close on Esc keypress', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownBodyFilter {...sampleProps} />);
    const input = component.find(`.${classes.input}`);
    input.simulate('keyDown', {key: 'Escape'});
    expect(sampleProps.onClose).toBeCalledTimes(1);
  })
});

describe('DropdownBodyFilter styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownBodyFilterStyles).toBeDefined();
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(dropdownBodyFilterStyles[keyValue]).toBeDefined();
    });
  });
});

describe('DropdownBodyFilter decorators', () => {
  it('provides styled classes from decorators', () => {
    const { classesKeys, sampleProps } = setup();
    const component = mount(<DropdownBodyFilterDecorated {...sampleProps} />);
    // @ts-ignore
    const assignedClasses = component.find('DropdownBodyFilter').props().classes;
    classesKeys.forEach(keyValue => {
      expect(assignedClasses[keyValue]).toBeDefined();
    });
  });
});
