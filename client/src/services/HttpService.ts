/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from 'i18next';
import { injectable } from 'inversify';
import 'reflect-metadata';

export interface HttpService {
  send<T>(url: string, methodType: MethodType, headers?: ApiHeader, data?: any): Promise<ApiResponse<T>>;
}

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export enum ContentType {
  FormData,
  Json,
}

export enum MethodType {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT,
}

export interface ApiResponse<T> {
  status: number;
  statusText: string;
  headers: Headers;
  data: T;
}

export interface ApiHeader {
  contentType?: ContentType;
  authorization?: string | null;
}

@injectable()
export default class DefaultHttpService implements HttpService {
  private readonly headerKeyContentType = 'Content-Type';
  private readonly headerValueContentTypeJson = 'application/json';
  private readonly headerValueContentTypeFormData = 'application/x-www-form-urlencoded';
  private readonly headerValueMethodTypeDelete = 'DELETE';
  private readonly headerValueMethodTypeGet = 'GET';
  private readonly headerValueMethodTypePatch = 'PATCH';
  private readonly headerValueMethodTypePost = 'POST';
  private readonly headerValueMethodTypePut = 'PUT';
  private readonly headerValueCredentialsTypeInclude = 'include';
  private readonly headerValueCredentialsTypeOmit = 'omit';

  public async send<T>(url: string, methodType: MethodType, headers?: ApiHeader, data?: any): Promise<ApiResponse<T>> {
    const headersRequest = this.getHeaders(headers);
    const bodyRequest = this.getBody(data, headers);
    const method = this.getMethod(methodType);
    const credentials = this.getCredentials(headers);
    const requestOptions: RequestInit = {
      method,
      credentials,
      headers: headersRequest,
      body: bodyRequest,
    };
    const response = await fetch(`${baseUrl}${url}`, requestOptions);
    return this.handleResponse(response);
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const message = await response.text();
      throw Error(message || i18n.t('app:error.unknown'));
    }
    const result: ApiResponse<T> = {
      ...response,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: await response.json(),
    };
    return result;
  }

  private getCredentials = (headers?: ApiHeader): RequestCredentials => {
    return headers && !!headers.authorization
      ? this.headerValueCredentialsTypeInclude
      : this.headerValueCredentialsTypeOmit;
  };

  private getMethod = (method: MethodType): string => {
    if (method === MethodType.DELETE) {
      return this.headerValueMethodTypeDelete;
    } else if (method === MethodType.PATCH) {
      return this.headerValueMethodTypePatch;
    } else if (method === MethodType.POST) {
      return this.headerValueMethodTypePost;
    } else if (method === MethodType.PUT) {
      return this.headerValueMethodTypePut;
    } else {
      return this.headerValueMethodTypeGet;
    }
  };

  private getBody = (data?: any, headers?: ApiHeader): string | URLSearchParams | undefined => {
    if (data) {
      if (headers && headers.contentType === ContentType.Json) {
        return JSON.stringify(data);
      } else {
        const params = new URLSearchParams();
        Object.keys(data).forEach((key) => {
          params.append(key, data[key]);
        });
        data.map;
        return params;
      }
    }
    return undefined;
  };

  private getHeaders = (headers?: ApiHeader): Record<string, string> => {
    let headersRequest = {};
    if (headers) {
      if (headers.contentType !== undefined) {
        headersRequest = {
          ...headersRequest,
          [this.headerKeyContentType]:
            headers.contentType === ContentType.Json
              ? this.headerValueContentTypeJson
              : this.headerValueContentTypeFormData,
        };
      }
      if (headers.authorization) {
        headersRequest = {
          ...headersRequest,
          Authorization: `Bearer ${headers.authorization}`,
        };
      }
    }
    return headersRequest;
  };
}
