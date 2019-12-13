import React from 'react';

import { mount, shallow } from 'enzyme';

import DropdownBodyElement, { IDropdownBodyElementProps } from './DropdownBodyElement';
import DropdownBodyElementDecorated from './DropdownBodyElement.decorators';
import dropdownBodyElementStyles from './DropdownBodyElement.styles';

const setup = () => {
  const classes = {
    root: 'dropdownBodyElement-wrapper',
    selected: 'dropdownBodyElement-selected',
    focused: 'dropdownBodyElement-focused',
  };
  const classesKeys = Object.keys(classes);
  const emptyProps: IDropdownBodyElementProps = {
    content: '',
    onClick: jest.fn(),
    classes,
  };
  const sampleProps: IDropdownBodyElementProps = {
    ...emptyProps,
    content: 'Some text',
    focused: true,
  };
  return { emptyProps, sampleProps, classes, classesKeys };
};

describe('DropdownBodyElement component', () => {

  it('match snapshot', () => {
    const { sampleProps } = setup();
    const component = shallow(<DropdownBodyElement {...sampleProps} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('displays content', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownBodyElement {...sampleProps}/>);
    expect(component.find(`.${classes.root}`).text()).toBe(sampleProps.content);
  });

  it('handles click', () => {
      const { classes, sampleProps } = setup();
      const component = shallow(<DropdownBodyElement {...sampleProps}/>);
      component.find(`.${classes.root}`).simulate('click');
      expect(sampleProps.onClick).toBeCalledTimes(1);
  });
});

describe('DropdownBodyElement styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownBodyElementStyles).toBeDefined();
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(dropdownBodyElementStyles[keyValue]).toBeDefined();
    });
  });
});

describe('DropdownBodyElement decorators', () => {
  it('provides styled classes from decorators', () => {
    const { sampleProps, classesKeys } = setup();
    const component = mount(<DropdownBodyElementDecorated {...sampleProps} />);
    // @ts-ignore
    const assignedClasses = component.find('DropdownBodyElement').props().classes;
    classesKeys.forEach(keyValue => {
      expect(assignedClasses[keyValue]).toBeDefined();
    });
  });
});
