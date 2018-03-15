import React from 'react';

const TextToHtml = (text) => {
  const paragraphs = text.split('\n\n');
  return paragraphs.map((paragraph, index) => {
    const key = `paragraph-${index}`;
    return (
      <p
        key={key}
      >
        { paragraph }
      </p>
    );
  });
};
export default TextToHtml;
