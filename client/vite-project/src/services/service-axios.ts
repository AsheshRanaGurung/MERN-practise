import axios, { AxiosRequestConfig } from "axios";
// import TokenService from "./service-token";

type RequestData = Record<string, any>;

const defaultTMSResponse = {
  data: [],
  status: 0,
  message: "",
};
const THREE_MINUTES = 3 * 60 * 1000;

export const backendURL = "http://localhost:5000/api";

export const baseURL = backendURL;

const baseConfig = (disableAuth?: boolean): AxiosRequestConfig<any> => {
  const token = localStorage.getItem("auth");
  return {
    baseURL,
    timeout: THREE_MINUTES,
    headers: disableAuth
      ? {}
      : {
          Authorization: `Bearer ${JSON.parse(token as string)}`,
        },
  };
};

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const httpClient = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.get<T>(url, {
      ...baseConfig(config?.disableAuth),
      ...config,
    }),

  post: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.post<T>(url, data, {
      ...baseConfig(config?.disableAuth),
      data,
      ...config,
    }),

  put: <T>(
    url: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>
  ) =>
    axios.put<T>(url, data, {
      ...baseConfig(),
      ...config,
    }),

  patch: <T>(
    url: string,
    data: RequestData,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.patch<T>(url, data, {
      ...baseConfig(config?.disableAuth),
      ...config,
    }),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig<RequestData> & { disableAuth?: boolean }
  ) =>
    axios.delete<T>(url, {
      ...baseConfig(config?.disableAuth),
      ...config,
    }),
};

/**
 * Remove empty, null and undefined values
 * @param obj a record of key value pair
 * @returns a record that does not have empty, null or undefined values
 */
function filterFalseyValues(obj: Record<string, any>) {
  for (const propName in obj) {
    if (["", null, undefined].includes(obj[propName])) {
      delete obj[propName];
    } else if (
      obj[propName] instanceof Object &&
      Object.keys(obj[propName]).length
    ) {
      obj[propName] = filterFalseyValues(obj[propName]);
    }
  }
  return obj;
}

function toFormData(data: Record<string, any>) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

function buildFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey?: string
) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else if (parentKey) {
    const value = data instanceof Date ? data.toString() : data;
    formData.append(parentKey, value);
  }
}

export { filterFalseyValues, toFormData, httpClient, defaultTMSResponse };
