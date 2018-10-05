import React from 'react';
import textToHtml from './text-to-html';

const expected = ([
  <p key="paragraph-0">some text</p>,
  <p key="paragraph-1">more text</p>,
]);
const txt = 'some text\n\nmore text';

describe('Text to html', () => {
  it('should split text separated by two newlines to <p>', () => {
    expect(textToHtml(txt)).toEqual(expected);
  });
});
