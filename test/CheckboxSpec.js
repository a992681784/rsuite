import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Checkbox from '../src/Checkbox';
import { getDOMNode } from './TestWrapper';

describe('Checkbox', () => {
  it('Should render a checkbox', () => {
    const instance = getDOMNode(<Checkbox>Test</Checkbox>);
    assert.equal(instance.querySelectorAll('input[type="checkbox"]').length, 1);
  });

  it('Should add title', () => {
    const title = 'Text';
    const instance = getDOMNode(<Checkbox title={title}>Test</Checkbox>);
    assert.equal(instance.querySelector('label').title, title);
  });

  it('Should have checkbox-inline class', () => {
    const instance = getDOMNode(<Checkbox inline>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-inline\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Checkbox disabled>Test</Checkbox>);
    assert.ok(instance.querySelector('input').disabled);
    assert.ok(instance.className.match(/\bcheckbox-disabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Checkbox checked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
  });

  it('Should be defaultChecked', () => {
    const instance = getDOMNode(<Checkbox defaultChecked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
  });

  it('Should have a `Test` value', () => {
    const value = 'Test';
    const instance = getDOMNode(<Checkbox defaultValue={value}>Test</Checkbox>);
    assert.equal(instance.querySelector('input').value, value);
  });

  it('Should support inputRef', () => {
    let input;
    getDOMNode(<Checkbox inputRef={ref => (input = ref)}>Test</Checkbox>);
    assert.equal(input.tagName, 'INPUT');
  });

  it('Should call onChange callback', done => {
    const value = 'Test';
    const doneOp = data => {
      if (data === value) {
        done();
      }
    };

    const instance = getDOMNode(
      <Checkbox onChange={doneOp} value={value}>
        Title
      </Checkbox>
    );
    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should call onClick callback', done => {
    const doneOp = data => {
      done();
    };
    const instance = getDOMNode(<Checkbox onClick={doneOp}>Title</Checkbox>);
    ReactTestUtils.Simulate.click(instance.querySelector('label'));
  });

  it('Should be checked with change', done => {
    const doneOp = (value, checked) => {
      if (checked) {
        done();
      }
    };

    const instance = getDOMNode(<Checkbox onChange={doneOp}>Title</Checkbox>);

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should be unchecked with change', done => {
    const doneOp = checked => {
      if (!checked) {
        done();
      }
    };

    const instance = getDOMNode(
      <Checkbox onChange={doneOp} checked>
        Title
      </Checkbox>
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Checkbox className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Checkbox style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Checkbox classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
