import axios from "axios";
import * as jose from "jose";

type Auth = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: string;
};

type IProps = {
  address: string;
};

const auth = async ({address}:IProps): Promise<Auth> => {
  const secret = new TextEncoder().encode(import.meta.env.VITE_Secret_Key);
  const alg = "HS256";
  const typ = "JWT"
  const jwt = await new jose.SignJWT({ address:address })
    .setProtectedHeader({ alg,typ })
    .setExpirationTime('1hr')
    .sign(secret);
    
  const response = await axios.post<Auth>(`${import.meta.env.VITE_Base_API}/auth/signin`,{}, {
    headers: { AccessKey: jwt },
  });
  return response.data;
};

export default auth;
