import axios from "axios";
import * as jose from "jose";

type AuthResponse = {
    statusCode: number;
    success: boolean;
    error?: string;
    result: string;
  
}
type Auth = {
  data: AuthResponse
  status: number
  statusText: string

};

type IProps = {
  address: string;
};

const auth = async ({ address }: IProps): Promise<Auth> => {
  const secret = new TextEncoder().encode(import.meta.env.VITE_AUTH_Secret_Key);
  const alg = "HS256";
  const typ = "JWT"
  const jwt = await new jose.SignJWT({ address: address })
    .setProtectedHeader({ alg, typ })
    .setExpirationTime('7days')
    .sign(secret);

  const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_Base_API}/auth/signin`, {}, {
    headers: { AccessKey: jwt },
  }).then(res=>res).catch(error=> error.resp);
  console.log(response)
  return response;
};

export default auth;
