import Upgrade from './indexeddb-upgrade';

describe('Upgrade indexedDB instance', () => {
  it('should not create store when it already exists', () => {
    const createIndex = jest.fn();
    const upgradeDb = {
      createObjectStore: () => ({
        createIndex,
      }),
      objectStoreNames: {
        contains: function contains(store) {
          return this.stores.includes(store);
        },
        stores: ['session'],
      },
    };
    Upgrade(upgradeDb);
    expect(createIndex).not.toHaveBeenCalled();
  });

  it('should create store when it does not exist', () => {
    const createIndex = jest.fn();
    const upgradeDb = {
      createObjectStore: () => ({
        createIndex,
      }),
      objectStoreNames: {
        contains: function contains(store) {
          return this.stores.includes(store);
        },
        stores: [],
      },
    };
    Upgrade(upgradeDb);
    expect(createIndex).toHaveBeenCalled();
  });
});
