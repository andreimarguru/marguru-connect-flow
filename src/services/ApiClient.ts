// src/services/ApiClient.ts
import axios, { AxiosHeaders, AxiosInstance } from "axios";

import { useAuth0 } from "@auth0/auth0-react";
type ExtendedTokenOptions = {
  audience?: string;
  scope?: string;
  ignoreCache?: boolean;
  detailedResponse?: boolean;
  timeoutInSeconds?: number;
};

type GetTokenFn = (options?: ExtendedTokenOptions) => Promise<string>;

const createAxiosInstance = (): AxiosInstance =>
  axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
  });

const createFakeAxiosInstance = (): AxiosInstance =>
  ({
    get: async () => ({ data: {} }),
    post: async () => ({ data: {} }),
    delete: async () => ({ data: {} }),
    interceptors: {
      request: { use: () => {}, eject: () => {} },
      response: { use: () => {}, eject: () => {} },
    },
  } as unknown as AxiosInstance); // грубый костыль, но допустимо

class ApiClient {
  private getAccessTokenSilently: GetTokenFn;
  private audience: string;
  private defaultScope: string;
  private client: AxiosInstance;

  constructor(
    getAccessTokenSilently: GetTokenFn,
    audience: string,
    defaultScope: string,
    axiosInstance?: AxiosInstance
  ) {
    this.getAccessTokenSilently = getAccessTokenSilently;
    this.audience = audience;
    this.defaultScope = defaultScope;

    if (axiosInstance) {
      this.client = axiosInstance;
    } else if (process.env.NODE_ENV === "test") {
      this.client = createFakeAxiosInstance();
    } else {
      this.client = createAxiosInstance();
    }

    if (this.client?.interceptors?.request?.use) {
      this.client.interceptors.request.use(async (config) => {
        const token = await this.getAccessToken();
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${token}`,
        });
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
    }
  }

  private async getAccessToken(): Promise<string> {
    return await this.getAccessTokenSilently({
      audience: this.audience,
      scope: this.defaultScope,
    });
  }

  async get<T = any>(url: string, params = {}): Promise<T> {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  async post<T = any>(url: string, data = {}): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async delete<T = any>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export default ApiClient;
