import { ReactWrapper } from "enzyme";

export function findByDisplayNameRegex(component: ReactWrapper, regExp: RegExp) {
  let child = component;
  while(child.length && !regExp.test(child.name())) {
    child = child.childAt(0);
  }
  return child.length !== 0;
}
