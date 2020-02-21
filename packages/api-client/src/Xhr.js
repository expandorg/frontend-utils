// @flow

export type XhrResponse = {
  status: number,
  statusText: string,
  responseText: string,
};

export type XhrCallbacks = {
  onProgress?: Function,
  abort?: Function,
};

export default class Xhr {
  headers: Object;

  constructor(headers: Object) {
    this.headers = headers;
  }

  getXhrStatus = (xhr: XMLHttpRequest) => ({
    status: xhr.status,
    statusText: xhr.statusText,
    responseText: xhr.responseText,
  });

  send = (
    method: string,
    url: string,
    formData: ?FormData = undefined,
    xhrCallbacks: XhrCallbacks = {}
  ): Promise<XhrResponse> => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if (xhrCallbacks.onProgress) {
      xhr.upload.onprogress = xhrCallbacks.onProgress;
    }

    xhr.open(method, url, true);

    xhrCallbacks.abort = () => {
      xhr.abort();
    };

    Object.keys(this.headers).forEach(header => {
      xhr.setRequestHeader(header, this.headers[header]);
    });

    const promise = new Promise<any>(resolve => {
      /* eslint-disable prefer-promise-reject-errors */

      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(this.getXhrStatus(xhr));
          }
        }
      };

      xhr.onabort = () => {
        resolve(this.getXhrStatus(xhr));
      };

      xhr.onerror = () => {
        resolve(this.getXhrStatus(xhr));
      };
    });

    xhr.send(formData);

    return promise;
  };
}
