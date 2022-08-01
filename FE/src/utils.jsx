export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    console.log('options.body===', options.body);
    const resp = await fetch(url, options);
    console.log('resp===', resp);
    const dataInJs = await resp.json();
    console.log('dataInJs===', dataInJs);
    return dataInJs;
  } catch (error) {
    throw new Error('error myFetch', error);
  }
}

export async function myFetchAuth(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('error myFetchAuth', error);
  }
}

export async function myDeleteAuth(url, method = 'GET', token, data = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    options.method = method === 'DELETE' ? 'DELETE' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    throw new Error('Error myFetchAuth', error);
  }
}

export const baseUrl = import.meta.env.VITE_BACKEND_URL;
console.log('baseUrl===', baseUrl);
if (!baseUrl) throw new Error('baseUrl nerastas');
