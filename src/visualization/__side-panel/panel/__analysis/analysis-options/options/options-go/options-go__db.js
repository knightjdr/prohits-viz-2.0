import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'antd';

const Database = ({
  form,
  handleCheckbox,
  handleGoCheckbox,
}) => (
  <div>
    <div className="analysis-option__label">Query databases</div>
    <div className="analysis-option__details-go">
      <Checkbox
        checked={form.sf_CORUM}
        onChange={() => { handleCheckbox('sf_CORUM'); }}
      >
        Corum
      </Checkbox>
      <div>
        <Checkbox
          checked={form.sf_GO}
          onChange={handleGoCheckbox}
        >
          Gene ontology
        </Checkbox>
      </div>
      <ul>
        <li>
          <Checkbox
            checked={form['sf_GO:BP']}
            onChange={() => { handleCheckbox('sf_GO:BP'); }}
          >
            Biological process
          </Checkbox>
        </li>
        <li>
          <Checkbox
            checked={form['sf_GO:CC']}
            onChange={() => { handleCheckbox('sf_GO:CC'); }}
          >
            Cellular component
          </Checkbox>
        </li>
        <li>
          <Checkbox
            checked={form['sf_GO:MF']}
            onChange={() => { handleCheckbox('sf_GO:MF'); }}
          >
            Molecular function
          </Checkbox>
        </li>
      </ul>
      <Checkbox
        checked={form.sf_HP}
        onChange={() => { handleCheckbox('sf_HP'); }}
      >
        Human Phenotype Ontology
      </Checkbox>
      <Checkbox
        checked={form.sf_KEGG}
        onChange={() => { handleCheckbox('sf_KEGG'); }}
      >
        KEGG
      </Checkbox>
      <Checkbox
        checked={form.sf_MI}
        onChange={() => { handleCheckbox('sf_MI'); }}
      >
        miRBase
      </Checkbox>
      <Checkbox
        checked={form.sf_REAC}
        onChange={() => { handleCheckbox('sf_REAC'); }}
      >
        Reactome
      </Checkbox>
      <Checkbox
        checked={form.sf_TF}
        onChange={() => { handleCheckbox('sf_TF'); }}
      >
        TRANSFAC TFBS
      </Checkbox>
    </div>
  </div>
);

Database.propTypes = {
  form: PropTypes.shape({
    sf_CORUM: PropTypes.bool,
    sf_GO: PropTypes.bool,
    sf_HP: PropTypes.bool,
    sf_KEGG: PropTypes.bool,
    sf_MI: PropTypes.bool,
    sf_REAC: PropTypes.bool,
    sf_TF: PropTypes.bool,
    'sf_GO:BP': PropTypes.bool,
    'sf_GO:CC': PropTypes.bool,
    'sf_GO:MF': PropTypes.bool,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleGoCheckbox: PropTypes.func.isRequired,
};

export default Database;
