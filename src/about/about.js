import React from 'react';

import CIHR from '../assets/funding/CIHR.svg';
import GenomeCanada from '../assets/funding/GenomeCanada.svg';
import LTRI from '../assets/funding/LTRI.svg';
import OntarioGenomics from '../assets/funding/OntarioGenomics.svg';
import './about.css';

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

const About = () => {
  const logoElement = fundingDetails.map(agency => (
    <a
      className="about__funding-link"
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
    <footer className="about">
      <div className="about__funding">
        <p>
          Funding for this project was graciously provided by:
        </p>
        <div className="about__funding-wrapper">
          { logoElement }
        </div>
      </div>
      <div className="about__footer">
        &copy; 2018,
        <a
          className="about__link"
          href="http://gingraslab.lunenfeld.ca/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gingras lab
        </a>
      </div>
    </footer>
  );
};

export default About;
