const Columns = {
  header: [
    {
      name: 'Term',
      sortable: true,
      sortDir: null,
      sortKey: 'order',
    },
    {
      name: 'ID',
      sortable: false,
    },
    {
      name: 'Source',
      sortable: true,
      sortDir: null,
      sortKey: 'source',
    },
    {
      name: 'T',
      sortable: true,
      sortDir: null,
      sortKey: 't',
    },
    {
      name: 'Q',
      sortable: true,
      sortDir: null,
      sortKey: 'q',
    },
    {
      name: 'Q ∩ T',
      sortable: true,
      sortDir: null,
      sortKey: 'qt',
    },
    {
      name: 'p-value',
      sortable: true,
      sortDir: null,
      sortKey: 'pValue',
    },
    {
      name: 'Genes',
      sortable: false,
    },
  ],
  order: ['term', 'termID', 'source', 't', 'q', 'qt', 'pValue', 'genes'],
};

export default Columns;
