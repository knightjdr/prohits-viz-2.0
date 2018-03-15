import React from 'react';
import TextToHtml from './text-to-html';

const expected = ([
  <p key="paragraph-0">some text</p>,
  <p key="paragraph-1">more text</p>,
]);
const txt = 'some text\n\nmore text';

describe('TextToHtml', () => {
  it('Split text separated by two newlines to <p>', () => {
    expect(TextToHtml(txt)).toEqual(expected);
  });
});
