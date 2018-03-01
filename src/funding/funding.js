import React from 'react';

import CIHR from '../assets/logos/CIHR.svg';
import GenomeCanada from '../assets/logos/GenomeCanada.svg';
import LTRI from '../assets/logos/LTRI.svg';
import OntarioGenomics from '../assets/logos/OntarioGenomics.svg';
import './funding.css';

const fundingDetails = [
  {
    image: CIHR,
    name: 'CIHR',
    url: 'http://www.cihr-irsc.gc.ca/',
  },
  {
    image: GenomeCanada,
    name: 'Genome Canada',
    url: 'https://www.genomecanada.ca/',
  },
  {
    image: OntarioGenomics,
    name: 'Ontario Genomics',
    url: 'http://www.ontariogenomics.ca/',
  },
  {
    image: LTRI,
    name: 'LTRI',
    url: 'http://www.lunenfeld.ca/',
  },
];

const Funding = () => {
  const logoElement = fundingDetails.map(agency => (
    <a
      className="Funding-link"
      href={agency.url}
      key={agency.name}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        alt={agency.name}
        src={agency.image}
        height="50px"
      />
    </a>
  ));
  return (
    <div className="Funding-container">
      <div>
        Funding for this project was graciously provided by:
      </div>
      <div className="Funding-wrapper">
        { logoElement }
      </div>
    </div>
  );
};

export default Funding;
