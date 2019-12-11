import {modifyDropdownOptionsDuplicates, modifyDropdownOptionsMultiline} from "./DropdownRoot.helpers";
import {IDropdownOptionsArray} from "./DropdownRoot";
import {getEntries} from "../../../utils/dropdown";

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

describe('DropdownRoot component', () => {
  it('some test', () => {
    expect(true).toBe(true);
  });
  test.todo('match snapshot');
});

describe('DropdownRoot styles', () => {
  test.todo('Some test');
});

describe('Dropdown decorators', () => {
  test.todo('withStyles paths classes prop');
  test.todo('decorator paths controlled props');
});
