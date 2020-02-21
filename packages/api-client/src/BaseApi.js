// @flow
import ApiClient from './ApiClient';

export default class BaseApi {
  client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  get = (...args: any) => this.client.get(...args);

  post = (...args: any) => this.client.post(...args);

  patch = (...args: any) => this.client.patch(...args);

  put = (...args: any) => this.client.put(...args);

  delete = (...args: any) => this.client.delete(...args);

  postForm = (...args: any) => this.client.postForm(...args);

  uploadFile = (...args: any) => this.client.uploadFile(...args);

  success = (data: any) => Promise.resolve(data);
}
