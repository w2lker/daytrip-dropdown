import React from 'react';

import { mount } from "enzyme";

import DropdownRoot, {IDropdownOptionsArray, IDropdownProps} from "./DropdownRoot";
import dropdownRootStyles from "./DropdownRoot.styles";
import DropdownRootDecorated from './DropdownRoot.decorators';

import {getEntries} from "../../../utils/dropdown";
import {findByDisplayNameRegex} from "../../../utils/tests";
import * as DropdownRootHelpers from "./DropdownRoot.helpers";
const { modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline } = DropdownRootHelpers;

describe('DropdownRoot helpers', () => {
  it('modifyDropdownOptionsDuplicates works', () => {
      const testArray: IDropdownOptionsArray = [
        {'key1': 'value1'},
        {'key1': 'value1'},
        {'key1': 'value1'},
        {'key2': 'value2'},
      ];
      const outputArray = modifyDropdownOptionsDuplicates(testArray);
      expect(outputArray.length).toBe(2);
  });
  it('modifyDropdownOptionsMultiline works', () => {
    const expectedArray: IDropdownOptionsArray = [
      {'key1': 'value1 value1 value1 value1'},
      {'key2': 'value1 value1 value1 value1'},
    ];
    const inputArray = expectedArray.map( item => {
      const {key, value} = getEntries(item);
      return {[key]: value.replace(' ', ' \n')}
    });
    const outputArray = modifyDropdownOptionsMultiline(inputArray);
    outputArray.forEach( (item, index) => {
      expect(item).toEqual(expectedArray[index]);
    });
  });
});

const setup = () => {

  const classes = {
    root: 'dropdownRoot-root',
  };
  const classesKeys = Object.keys(classes);

  const sampleProps: IDropdownProps = {
    options: [
      {'opt1': 'value1'},
      {'opt2': 'value2'},
      {'opt3': 'value3'},
      {'opt4': 'value4'},
      {'opt5': 'value5'},
      {'opt6': 'value6'},
      {'opt7': 'value7'},
    ],
    onSelect: jest.fn(),
    classes,
    label: 'some-label',
    placeholder: 'some-placeholder',
    caseInsensitiveSearch: true,
  };

  return {sampleProps, classes, classesKeys};
};

describe('DropdownRoot component', () => {
  it('match snapshot', () => {
      const { sampleProps } = setup();
      const component = mount(<DropdownRoot {...sampleProps} />);
      expect(component.debug()).toMatchSnapshot();
  });
  it('fires helpers on receiving options array', () => {
    const duplicatesSpy = jest.spyOn(DropdownRootHelpers, 'modifyDropdownOptionsDuplicates')
      .mockImplementation( (val) => val );
    const multilineSpy = jest.spyOn(DropdownRootHelpers, 'modifyDropdownOptionsMultiline')
      .mockImplementation( (val) => val );
    const { sampleProps } = setup();
    const component = mount(<DropdownRoot {...sampleProps} />);
    // Initial render
    expect(DropdownRootHelpers.modifyDropdownOptionsDuplicates).toBeCalledTimes(1);
    expect(DropdownRootHelpers.modifyDropdownOptionsMultiline).toBeCalledTimes(1);
    const newOptions = [...sampleProps.options, {'opt3': 'value3'}];
    const newProps = {
      ...sampleProps,
      options: newOptions,
    };
    // @ts-ignore
    component.setProps(newProps);
    // Component Did receive props
    expect(DropdownRootHelpers.modifyDropdownOptionsDuplicates).toBeCalledTimes(2);
    expect(DropdownRootHelpers.modifyDropdownOptionsMultiline).toBeCalledTimes(2);
    duplicatesSpy.mockRestore();
    multilineSpy.mockRestore();
  });
  it('renders head and body', () => {
    const { sampleProps } = setup();
    const component = mount(<DropdownRoot {...sampleProps} />);
    const head = component.find('DropdownHead');
    const body = component.find('DropdownBody');
    expect(head.length).toBe(1);
    expect(body.length).toBe(1);
  })
});

describe('DropdownRoot styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownRootStyles).toBeDefined();
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(dropdownRootStyles[keyValue]).toBeDefined();
    });
  });
});

describe('Dropdown decorators', () => {
  it('provides lang context', () => {
    const { sampleProps } = setup();
    const component = mount(<DropdownRootDecorated {...sampleProps} />);
    const langContextReg = new RegExp('^WithLangContext.*');
    expect(findByDisplayNameRegex(component, langContextReg)).toBeTruthy();
  });

  it('provides withControlledSwitch decorator', () => {
    const { sampleProps } = setup();
    const component = mount(<DropdownRootDecorated {...sampleProps} />);
    const langContextReg = new RegExp('^WithControlledSwitcher.*');
    expect(findByDisplayNameRegex(component, langContextReg)).toBeTruthy();
  });

  it('provides styled classes from decorators', () => {
    const { sampleProps, classesKeys } = setup();
    const component = mount(<DropdownRootDecorated {...sampleProps} />);
    // @ts-ignore
    const assignedClasses = component.find('DropdownRoot').props().classes;
    classesKeys.forEach(keyValue => {
      expect(assignedClasses[keyValue]).toBeDefined();
    });
  });
});
