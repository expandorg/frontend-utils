declare type ReduxAction = {
  type: string,
  payload: any,
  complete?: boolean,
  failed?: boolean,
  meta?: {
    validation?: Object,
    schema?: Object,
    params?: Object,
    asyncCall?: () => Promise<any>,
    track?: {
      action?: string | Object,
      complete?: string | Object,
      failed?: string | Object,
    },
  },
  [key: string]: any,
};
