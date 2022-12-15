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

const sendPosts = (post: ILogin) => {
  return httpClient.post(api.registerUser, post);
};
const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation(sendPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.registerUser);
      toastSuccess("User registered Successfully");
    },
    onError: () => {
      toastFail("Failed to register");
    },
  });
};

export { useRegisterUser };
