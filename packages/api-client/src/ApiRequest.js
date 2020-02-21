// @flow
import 'whatwg-fetch';

import encodeUrlParams from './encodeUrlParams';
import Xhr, { type XhrResponse, type XhrCallbacks } from './Xhr';

const defaultSettings = {
  credentials: 'include',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default class ApiRequest {
  requestSettings: Object;

  constructor(requestSettings: Object = defaultSettings) {
    this.requestSettings = requestSettings;
  }

  get = (url: string, query?: Object) => {
    const params = query ? encodeUrlParams(query) : '';
    return fetch(`${url}${params && `?${params}`}`, {
      ...this.requestSettings,
      method: 'GET',
    });
  };

  post = (url: string, payload?: Object) =>
    fetch(url, {
      ...this.requestSettings,
      method: 'POST',
      body: JSON.stringify(payload),
    });

  patch = (url: string, payload?: Object) =>
    fetch(url, {
      ...this.requestSettings,
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

  put = (url: string, payload?: Object) =>
    fetch(url, {
      ...this.requestSettings,
      method: 'PUT',
      body: JSON.stringify(payload),
    });

  delete = (url: string) =>
    fetch(url, {
      ...this.requestSettings,
      method: 'DELETE',
    });

  uploadFile = (
    url: string,
    name: string,
    data: Object,
    cb?: XhrCallbacks = {}
  ): Promise<XhrResponse> => {
    const {
      headers: { 'Content-Type': _, ...headers },
    } = this.requestSettings;

    const formData = new FormData();
    formData.append(name, data);

    const xhr = new Xhr(headers);
    return xhr.send('POST', url, formData, cb);
  };

  postForm = (url: string, form: Object) => {
    const data = new FormData();

    if (form) {
      Object.keys(form).forEach(name => {
        data.append(name, form[name]);
      });
    }

    const {
      headers: { 'Content-Type': _, ...headers },
      ...settings
    } = this.requestSettings;

    return fetch(url, {
      ...settings,
      headers,
      method: 'POST',
      body: data,
    });
  };
}
