import { expect } from 'chai';
import templates from './templates';
import { getType, strToEl } from './lib/utils';

const stripElement = element => element.outerHTML.replace(/(^|>)\s+|\s+(?=<|$)/g, '$1');

describe('templates', () => {
  // describe('containerOuter', () => {

  // });

  describe('containerInner', () => {
    it('returns expected html', () => {
      const classes = {
        containerInner: 'test',
      };
      const expectedOutput = strToEl(`<div class="${classes.containerInner}"></div>`);
      const actualOutput = templates.containerInner(classes);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
    });
  });

  describe('itemList', () => {
    describe('select one element', () => {
      it('returns expected html', () => {
        const classes = {
          list: 'test 1',
          listSingle: 'test 2',
          listItems: 'test 3',
        };
        const expectedOutput = strToEl(`<div class="${classes.list} ${classes.listSingle}"></div>`);
        const actualOutput = templates.itemList(classes, true);

        expect(getType(actualOutput)).to.equal('HTMLDivElement');
        expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
      });
    });

    describe('non select one element', () => {
      it('returns expected html', () => {
        const classes = {
          list: 'test 1',
          listSingle: 'test 2',
          listItems: 'test 3',
        };
        const expectedOutput = strToEl(`<div class="${classes.list} ${classes.listItems}"></div>`);
        const actualOutput = templates.itemList(classes, false);

        expect(getType(actualOutput)).to.equal('HTMLDivElement');
        expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
      });
    });
  });

  describe('placeholder', () => {
    it('returns expected html', () => {
      const classes = {
        placeholder: 'test',
      };
      const value = 'Test';
      const expectedOutput = strToEl(`
        <div class="${classes.placeholder}">${value}</div>`,
      );
      const actualOutput = templates.placeholder(classes, value);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
    });
  });

  // describe('item', () => {

  // });

  describe('choiceList', () => {
    describe('select one element', () => {
      it('returns expected html', () => {
        const classes = {
          list: 'test',
        };
        const expectedOutput = strToEl(`
          <div
            class="${classes.list}"
            dir="ltr"
            role="listbox"
            >
          </div>
        `);
        const actualOutput = templates.choiceList(classes, true);

        expect(getType(actualOutput)).to.equal('HTMLDivElement');
        expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
      });
    });

    describe('non select one element', () => {
      it('returns expected html', () => {
        const classes = {
          list: 'test',
        };
        const expectedOutput = strToEl(`
          <div
            class="${classes.list}"
            dir="ltr"
            role="listbox"
            aria-multiselectable="true"
            >
          </div>
        `);
        const actualOutput = templates.choiceList(classes, false);

        expect(getType(actualOutput)).to.equal('HTMLDivElement');
        expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
      });
    });
  });

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
      const actualOutput = templates.input(classes);

      expect(getType(actualOutput)).to.equal('HTMLInputElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
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
      const actualOutput = templates.dropdown(classes, value);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
    });
  });

  describe('notice', () => {
    it('returns expected html', () => {
      const classes = {
        item: 'test 1',
        itemChoice: 'test 2',
        noResults: 'test 3',
        noChoices: 'test 4',
      };
      const label = 'Test';
      const expectedOutput = strToEl(`
        <div class="${classes.item} ${classes.itemChoice}">
          ${label}
        </div>
      `);
      const actualOutput = templates.notice(classes, label);

      expect(getType(actualOutput)).to.equal('HTMLDivElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
    });

    describe('passing a notice type', () => {
      describe('no results', () => {
        it('adds no results classname', () => {
          const classes = {
            item: 'test 1',
            itemChoice: 'test 2',
            noResults: 'test 3',
            noChoices: 'test 4',
          };
          const label = 'Test';
          const expectedOutput = strToEl(`
            <div class="${classes.item} ${classes.itemChoice} ${classes.noResults}">
              ${label}
            </div>
          `);
          const actualOutput = templates.notice(classes, label, 'no-results');

          expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
        });
      });

      describe('no choices', () => {
        it('adds no choices classname', () => {
          const classes = {
            item: 'test 1',
            itemChoice: 'test 2',
            noResults: 'test 3',
            noChoices: 'test 4',
          };
          const label = 'Test';
          const expectedOutput = strToEl(`
            <div class="${classes.item} ${classes.itemChoice} ${classes.noChoices}">
              ${label}
            </div>
          `);
          const actualOutput = templates.notice(classes, label, 'no-choices');

          expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
        });
      });
    });
  });

  describe('option', () => {
    it('returns expected html', () => {
      const data = {
        disabled: false,
        selected: false,
        value: 'Test value',
        label: 'Test label',
      };
      const expectedOutput = strToEl(`<option value="${data.value}" ${data.selected ? 'selected' : ''} ${data.disabled ? 'disabled' : ''}>${data.label}</option>`);
      const actualOutput = templates.option(data);

      expect(getType(actualOutput)).to.equal('HTMLOptionElement');
      expect(stripElement(actualOutput)).to.equal(stripElement(expectedOutput));
    });

    describe('when selected', () => {
      it('sets selected attr to true', () => {
        const data = {
          disabled: false,
          selected: true,
          value: 'Test value',
          label: 'Test label',
        };
        const output = templates.option(data);

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
        const output = templates.option(data);

        expect(output.disabled).to.equal(true);
      });
    });
  });
});
