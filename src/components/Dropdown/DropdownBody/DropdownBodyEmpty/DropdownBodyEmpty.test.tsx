import React from 'react';

import { mount } from 'enzyme';

import DropdownBodyEmpty, { IDropdownBodyEmptyProps } from './DropdownBodyEmpty';
import DropdownLang from "../../DropdownRoot/DropdownRoot.lang";
import DropdownBodyEmptyDecorated from './DropdownBodyEmpty.decorators';

import dropdownBodyEmptyStyles from './DropdownBodyEmpty.styles';
import withLangContext from "../../../Decorators/withLangContext";

const setup = () => {
  const classes = {
    wrapper: 'dropdownBodyEmpty-wrapper',
    icon: 'dropdownBodyEmpty-icon',
    title: 'dropdownBodyEmpty-title',
    description: 'dropdownBodyEmpty-description',
  };
  const classesKeys = Object.keys(classes);
  const emptyProps: IDropdownBodyEmptyProps = {
    isEmpty: false,
    isFilteredEmpty: false,
    classes,
  };

  const sampleTexts = {
    emptyStates: {
      noOptionsProvided: {
        title: 'noOptions title',
        description: 'noOptions description',
      },
      noFilteredOptions: {
        title: 'noFiltered title',
        description: 'noFiltered description',
      },
    },
  };

  const ComponentWithLang = withLangContext(DropdownBodyEmpty, DropdownLang, sampleTexts);
  const DecoratedComponentWithLang = withLangContext(DropdownBodyEmptyDecorated, DropdownLang, sampleTexts);

  return {classes, classesKeys, emptyProps, sampleTexts, ComponentWithLang, DecoratedComponentWithLang};
};

describe('DropdownBodyEmpty component', () => {

  it('no options state match snapshot', () => {
    const { emptyProps, ComponentWithLang } = setup();
    const props = {
      ...emptyProps,
      isEmpty: true,
    };
    const component = mount(<ComponentWithLang {...props} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('no filtered state match snapshot', () => {
    const { emptyProps, ComponentWithLang } = setup();
    const props = {
      ...emptyProps,
      isFilteredEmpty: true,
    };
    const component = mount(<ComponentWithLang {...props} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('skips render is no empty required', () => {
    const { emptyProps, ComponentWithLang } = setup();
    const component = mount(<ComponentWithLang {...emptyProps} />);
    const componentContent = component.find('DropdownBodyEmpty').childAt(0);
    expect(componentContent.length).toBe(0);
  })
});

describe('DropdownBodyEmpty styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownBodyEmptyStyles).toBeDefined();
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(dropdownBodyEmptyStyles[keyValue]).toBeDefined();
    });
  });
});

describe('DropdownBodyEmpty decorators', () => {

  it('provides styled classes from decorators', () => {
    const { emptyProps, DecoratedComponentWithLang, classesKeys } = setup();
    const component = mount(<DecoratedComponentWithLang {...emptyProps} />);
    // @ts-ignore
    const assignedClasses = component.find('DropdownBodyEmpty').props().classes;
    classesKeys.forEach(keyValue => {
      expect(assignedClasses[keyValue]).toBeDefined();
    });
  });
});
