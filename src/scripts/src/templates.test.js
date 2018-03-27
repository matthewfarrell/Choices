import { expect } from 'chai';
import TEMPLATES from './templates';
import { getType, strToEl } from './lib/utils';

describe('templates', () => {
  // describe('containerOuter', () => {

  // });

  describe('containerInner', () => {
    it('returns expected html', () => {
      const classes = {
        containerInner: 'test',
      };
      const expectedOutput = strToEl(`<div class="${classes.containerInner}"></div>`);
      const actualOutput = TEMPLATES.containerInner(classes);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(actualOutput.outerHTML).to.equal(expectedOutput.outerHTML);
    });
  });

  // describe('itemList', () => {

  // });

  describe('placeholder', () => {
    it('returns expected html', () => {
      const classes = {
        placeholder: 'test',
      };
      const value = 'Test';
      const expectedOutput = strToEl(`
        <div class="${classes.placeholder}">${value}</div>`,
      );
      const actualOutput = TEMPLATES.placeholder(classes, value);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(actualOutput.outerHTML).to.equal(expectedOutput.outerHTML);
    });
  });

  // describe('item', () => {

  // });

  // describe('choiceList', () => {

  // });

  // describe('choiceGroup', () => {

  // });

  // describe('choice', () => {

  // });

  describe('input', () => {
    it('returns expected html', () => {
      const classes = {
        input: 'Test 1',
        inputCloned: 'Test 2',
      };
      const expectedOutput = strToEl(`
        <input
          type="text"
          class="${classes.input} ${classes.inputCloned}"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          role="textbox"
          aria-autocomplete="list"
        >
      `);
      const actualOutput = TEMPLATES.input(classes);

      expect(getType(actualOutput)).to.equal('HTMLInputElement');
      expect(actualOutput.outerHTML).to.equal(expectedOutput.outerHTML);
    });
  });

  describe('dropdown', () => {
    it('returns expected html', () => {
      const classes = {
        list: 'test 1',
        listDropdown: 'test 2',
      };
      const value = 'Test';
      const expectedOutput = strToEl(`<div class="${classes.list} ${classes.listDropdown}" aria-expanded="false"></div>`);
      const actualOutput = TEMPLATES.dropdown(classes, value);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(actualOutput.outerHTML).to.equal(expectedOutput.outerHTML);
    });
  });

  // describe('notice', () => {

  // });

  describe('option', () => {
    it('returns expected html', () => {
      const data = {
        disabled: false,
        selected: false,
        value: 'Test value',
        label: 'Test label',
      };
      const output = TEMPLATES.option(data);

      expect(getType(output)).to.equal('HTMLOptionElement');
      expect(output.value).to.equal(data.value);
      expect(output.textContent).to.equal(data.label);
      expect(output.disabled).to.equal(false);
      expect(output.selected).to.equal(false);
    });

    describe('when selected', () => {
      it('sets selected attr to true', () => {
        const data = {
          disabled: false,
          selected: true,
          value: 'Test value',
          label: 'Test label',
        };
        const output = TEMPLATES.option(data);

        expect(output.selected).to.equal(true);
      });
    });

    describe('when disabled', () => {
      it('sets disabled attr to true', () => {
        const data = {
          disabled: true,
          selected: false,
          value: 'Test value',
          label: 'Test label',
        };
        const output = TEMPLATES.option(data);

        expect(output.disabled).to.equal(true);
      });
    });
  });
});
