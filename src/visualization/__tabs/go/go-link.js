import React from 'react';

export const links = {
  cor: 'https://mips.helmholtz-muenchen.de/genre/proj/corum/complexdetails.html?id=',
  hp: 'https://compbio.charite.de/hpoweb/showterm?id=',
  keg: 'https://www.genome.jp/dbget-bin/www_bget?map',
  mi: 'http://www.mirbase.org/cgi-bin/query.pl?terms=',
  rea: 'https://www.reactome.org/content/detail/',
  go: 'http://amigo.geneontology.org/amigo/term/',
};

const link = (id, source) => {
  let href;
  switch (source) {
    case 'cor':
      href = `${links.cor}${id.substring(6)}`;
      break;
    case 'hp':
      href = `${links.hp}${id}`;
      break;
    case 'keg':
      href = `${links.keg}${id.substring(5)}`;
      break;
    case 'mi':
      href = `${links.mi}${id.substring(3)}`;
      break;
    case 'rea':
      href = `${links.rea}${id.substring(5)}`;
      break;
    default:
      href = `${links.go}${id}`;
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
