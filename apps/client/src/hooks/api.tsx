import {useQuery} from "@tanstack/react-query";
import {type AxiosRequestConfig} from "axios";
import {api} from "../api/base";

interface FetchData {
  url: string;
  data?: object | object[] | null;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: object;
  keys?: string[];
  enable?: boolean;
}

export const useFetch = ({url, method, data, headers, keys, enable = true}: FetchData) => {
  return useQuery({
    queryKey: keys || [url],
    queryFn: async () => {
      const config: AxiosRequestConfig = {method, url, headers, data, withCredentials: true};
      const res = await api.request(config);
      return res.data;
    },
    enabled: enable,
  });
};
