import React from 'react';

import { mount } from 'enzyme';

import DropdownBody, { IDropdownBodyProps } from './DropdownBody';
import dropdownBodyStyles from './DropdownBody.styles';

import {getDropdownOptionKey, getDropdownOptionValue} from "../../../utils/dropdown";

const setup = () => {
  const classes = {
    wrapper: 'dropdownBodyFilter-wrapper',
    contentWrapper: 'dropdownBodyFilter-content-wrapper',
  };

  const classesKeys = Object.keys(classes);
  const sampleProps: IDropdownBodyProps = {
    opened: true,
    selected: 'val1',
    options: [{'val1': 'content1'}, {'val2': 'content2'}],
    onSelect: jest.fn(),
    onClose: jest.fn(),
    classes,
  };
  const componentContent = {
    own: 'DropdownBody',
    filter: 'DropdownBodyFilter',
    filterInput: 'DropdownBodyFilter input',
    element: 'DropdownBodyElement',
  };
  return {classes, classesKeys, sampleProps, componentContent}
};

describe('DropdownBody component', () => {

  it('match snapshot', () => {
    const { sampleProps } = setup();
    const component = mount(<DropdownBody {...sampleProps} />);
    expect(component.debug()).toMatchSnapshot();
  });

  it('renders unfiltered list', () => {
      const { sampleProps, componentContent } = setup();
      const component = mount(<DropdownBody {...sampleProps} />);
      const list = component.find(componentContent.element);
      expect(list.length).toBe(2);
      list.forEach( (node, index) => {
        expect(node.props().content).toBe(getDropdownOptionValue(sampleProps.options[index]));
      })
  });

  it('filters content', () => {
    const { sampleProps, componentContent } = setup();
    const component = mount(<DropdownBody {...sampleProps} />);
    const filterInput = component.find(componentContent.filterInput);
    const filterValue = getDropdownOptionValue(sampleProps.options[0]);
    filterInput.simulate('change', {target: {value: filterValue}});
    const list = component.find(componentContent.element);
    expect(list.length).toBe(1);
    expect(list.get(0).props.content).toMatch(filterValue);
  });

  it('focus element', () => {
    const { sampleProps, componentContent } = setup();
    const component = mount(<DropdownBody {...sampleProps} />);
    const filterInput = component.find(componentContent.filterInput);
    filterInput.simulate('keyDown', {
      key: 'Tab',
      keyCode: 9,
    });
    expect(component.find(componentContent.element).get(0).props.focused).toBeTruthy();
  });

  it('select element', () => {
    const { sampleProps, componentContent } = setup();
    const component = mount(<DropdownBody {...sampleProps} />);
    component.find(`${componentContent.element} div`).first().simulate('click');
    // @ts-ignore
    const selectedKey = sampleProps.onSelect.mock.calls[0][0];
    expect(selectedKey).toBe(getDropdownOptionKey(sampleProps.options[0]));
  });

  it('perform onClose on element selection', () => {
    const { sampleProps, componentContent } = setup();
    const component = mount(<DropdownBody {...sampleProps} />);
    component.find(`${componentContent.element} div`).first().simulate('click');
    expect(sampleProps.onClose).toBeCalledTimes(1);
  });

});

describe('DropdownBody styles', () => {
  it('contains principle classes', () => {
    const { classesKeys } = setup();
    expect(dropdownBodyStyles).toBeDefined();

    let classes: Record<string, string>;
    const TestComp: React.FC = () => {
      classes = dropdownBodyStyles({props: 7});
      return null;
    };
    mount(<TestComp />);
    classesKeys.forEach((keyValue) => {
      // @ts-ignore
      expect(classes[keyValue]).toBeDefined();
    });
  });
});
