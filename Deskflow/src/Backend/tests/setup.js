// Mock localStorage for Jest Node env
if (typeof global.localStorage === 'undefined') {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => {
        return store[key] || null;
      },
      setItem: (key, value) => {
        store[key] = String(value);
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}
