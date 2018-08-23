import React from 'react';

const link = (id, source) => {
  let href
  switch (source) {
    case 'cor':
      href = `https://mips.helmholtz-muenchen.de/genre/proj/corum/complexdetails.html?id=${id.substring(6)}`;
      break;
    case 'hp':
      href = `https://compbio.charite.de/hpoweb/showterm?id=${id}`;
      break;
    case 'keg':
      href = `https://www.genome.jp/dbget-bin/www_bget?map${id.substring(5)}`;
      break;
    case 'mi':
      href = `http://www.mirbase.org/cgi-bin/query.pl?terms=${id.substring(3)}`;
      break;
    case 'rea':
      href = `https://www.reactome.org/content/detail/${id.substring(5)}`;
      break;
    default:
      href = `http://amigo.geneontology.org/amigo/term/${id}`;
      break;
  }
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      { id }
    </a>
  );
};

export default link;
