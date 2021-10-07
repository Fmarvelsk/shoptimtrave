import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export interface SignUpInputType {
  email: string;
  password: string;
  username: string;
}
async function signUp(input: SignUpInputType) {
 return http.post(API_ENDPOINTS.LOGIN, input);
  return {
    token: `${input.email}.${input.username}`.split("").reverse().join(""),
  };
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      Cookies.set("auth_token", data);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
