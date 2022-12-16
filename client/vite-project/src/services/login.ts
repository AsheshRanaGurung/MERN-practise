import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { httpClient } from "./service-axios";
import { api } from "./service-api";
import { toastFail, toastSuccess } from "../components/Provider/Toast";

export type ILogin = {
  email: String;
  first_name: String;
  last_name: String;
  phone_number: Number;
  password: String;
  conf_password?: String;
};
export interface IUSerLogin {
  email: string;
  password: string;
}
const sendPosts = (post: ILogin) => {
  return httpClient.post(api.registerUser, post);
};
const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation(sendPosts, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(api.registerUser);
      toastSuccess("User registered Successfully");
    },

    onError: () => {
      toastFail("Failed to register");
    },
  });
};

const loginUser = (post: IUSerLogin) => {
  return httpClient.post<any>(api.loginUser, post);
};
const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("auth", JSON.stringify(data?.data.token));
      queryClient.invalidateQueries(api.loginUser);
      toastSuccess("Login Successfully");
    },

    onError: (err) => {
      console.log(err, "err");
      toastFail("Failed to Login");
    },
  });
};

export { useRegisterUser, useLoginUser };
