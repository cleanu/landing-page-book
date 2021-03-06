import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from './Input';

configure({ adapter: new Adapter() });

describe('Input', () => {
  let props;
  let mounted;
  const input = () => {
    if (!mounted) {
      mounted = shallow(<Input {...props} />);
    }
    return mounted;
  };
  describe('Input', () => {
    beforeEach(() => {
      props = {};
      mounted = undefined;
    });

    it('should render', () => {
      expect(shallow(<Input {...props} />)).toMatchSnapshot();
    });

    it('always renders a div', () => {
      const divs = input().find('input');

      expect(divs.length).toBeGreaterThan(0);
    });
  });
});
