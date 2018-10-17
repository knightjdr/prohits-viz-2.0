const formSubmit = (form, session, type) => (
  new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('session', session);
    const url = `${process.env.REACT_APP_API_ROOT}/analysis/${type}`;
    return fetch(url, {
      cache: 'no-store',
      body: form,
      headers,
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        resolve(json.id);
      })
      .catch(() => {
        reject();
      });
  })
);

export default formSubmit;
