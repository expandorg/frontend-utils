// @flow
import ApiError from './ApiError';
import { type XhrCallbacks } from './Xhr';
import type ApiRequest from './ApiRequest';

export default class ApiClient {
  apiUrl: string;
  request: ApiRequest;

  constructor(request: Object, apiUrl: string) {
    this.apiUrl = apiUrl;
    this.request = request;
  }

  get = (url: string, query?: Object) =>
    this.request.get(`${this.apiUrl}${url}`, query).then(this.processResponse);

  post = (url: string, payload?: Object) =>
    this.request
      .post(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse);

  patch = (url: string, payload?: Object) =>
    this.request
      .patch(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse);

  put = (url: string, payload?: Object) =>
    this.request
      .put(`${this.apiUrl}${url}`, payload)
      .then(this.processResponse);

  delete = (url: string) =>
    this.request.delete(`${this.apiUrl}${url}`).then(this.processResponse);

  postForm = (url: string, form: Object) =>
    this.request
      .postForm(`${this.apiUrl}${url}`, form)
      .then(this.processResponse);

  uploadFile = (
    url: string,
    name: string,
    file: Object,
    xhrCallbacks?: XhrCallbacks = {}
  ) =>
    this.request
      .uploadFile(`${this.apiUrl}${url}`, name, file, xhrCallbacks)
      .then(response =>
        this.processJsonRepsonse(
          response.responseText,
          response.status,
          response.statusText
        )
      );

  processResponse = async (response: Object): Promise<?Object> => {
    const text = await response.text();
    return this.processJsonRepsonse(text, response.status);
  };

  processJsonRepsonse = (
    text: string,
    status: number,
    statusText?: string
  ): ?Object => {
    let json = null;
    try {
      json = text.length ? JSON.parse(text) : null;
    } catch (e) {
      throw new ApiError(statusText || e.message || '', status);
    }

    if (json && json.error) {
      throw new ApiError(json.error || '', status);
    }
    if (status < 200 || status >= 400) {
      throw new ApiError(json || '', status);
    }
    return json;
  };
}
