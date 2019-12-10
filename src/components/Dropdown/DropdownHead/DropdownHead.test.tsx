import React from 'react';

import { mount, shallow } from 'enzyme';

import DropdownHead, { IDropdownHeadProps } from './DropdownHead';
import DropdownHeadDecorated from './DropdownHead.decorators';
import dropdownHeadStyles from './DropdownHead.styles';
import {getValue} from "../../../utils/dropdown";
import {DropdownLang, IDropdownOptionsElement} from "../DropdownRoot/DropdownRoot";

const setup = () => {
  const classes = {
    wrapper: 'dropdownHead-wrapper',
    label: 'dropdownHead-label',
    content: 'dropdownHead-content',
    caret: 'dropdownHead-caret',
    caretReverted: 'dropdownHead-caretReverted',
  };
  const classesKeys = Object.keys(classes);
  const sampleProps: IDropdownHeadProps = {
    opened: true,
    label: 'Test label',
    placeholder: 'Test Placeholder',
    selectedItem: {'key1': 'value1'},
    onClick: jest.fn(),
    classes,
  };

  const defaultText = {
    head: {
      label: 'default label',
      placeholder: 'default placeholder'
    }
  };

  return { sampleProps, classes, classesKeys, defaultText };
};

describe('DropdownHead component', () => {

  it('match snapshot', () => {
    const { sampleProps } = setup();
    const component = shallow(<DropdownHead {...sampleProps} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('displays content', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownHead {...sampleProps} />);
    expect(component.find(`.${classes.label}`).text()).toBe(sampleProps.label);
    expect(component.find(`.${classes.content}`).text()).toBe(getValue(sampleProps.selectedItem as IDropdownOptionsElement));
    if (sampleProps.opened) {
      expect(component.find(`.${classes.caretReverted}`).length).toBe(1);
    }
  });

  it('displays placeholder', () => {
    const { classes, sampleProps } = setup();
    const props = {
      ...sampleProps,
      selectedItem: null,
    };
    const component = shallow(<DropdownHead {...props} />);
    expect(component.find(`.${classes.label}`).text()).toBe(sampleProps.label);
    expect(component.find(`.${classes.content}`).text()).toBe(sampleProps.placeholder);
  });

  it('displays constant text', () => {
    const { classes, sampleProps, defaultText } = setup();
    const props = {
      ...sampleProps,
      selectedItem: undefined,
      label: undefined,
      placeholder: undefined,
    };
    const component = mount(
      <DropdownLang.Provider value={defaultText}>
        <DropdownHead {...props} />
      </DropdownLang.Provider>
    );

    expect(component.find(`.${classes.label}`).text()).toBe(defaultText.head.label);
    expect(component.find(`.${classes.content}`).text()).toBe(defaultText.head.placeholder);
  });

  it('handles click', () => {
    const { classes, sampleProps } = setup();
    const component = shallow(<DropdownHead {...sampleProps}/>);
    component.find(`.${classes.wrapper}`).simulate('click');
    expect(sampleProps.onClick).toBeCalledTimes(1);
  });
});

describe('DropdownHead styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownHeadStyles).toBeDefined();
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(dropdownHeadStyles[keyValue]).toBeDefined();
    });
  });
});

describe('DropdownHead decorators', () => {
  it('provides styled classes from decorators', () => {
    const { sampleProps, classesKeys } = setup();
    const component = mount(<DropdownHeadDecorated {...sampleProps} />);
    // @ts-ignore
    const assignedClasses = component.find('NoRenderer').props().classes;
    classesKeys.forEach(keyValue => {
      expect(assignedClasses[keyValue]).toBeDefined();
    });
  });
});
