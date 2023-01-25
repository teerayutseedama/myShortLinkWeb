export interface IHttpResponse {
  data: Record<string, any> | null | any[] | boolean;
  error: Record<string, any> | null | any[];
  message: IHttpMessage;
}
export interface IHttpMessage {
  title: string;
  desc: string;
  type: 'success' | 'warn' | 'danger';
}

export interface CustomException {
  httpStatus?: number;
  desc?: string;
}
