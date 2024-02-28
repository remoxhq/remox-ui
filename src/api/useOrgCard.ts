import { useMutation } from "@tanstack/react-query";
import instance from "./axiosInstance";

type Response = {
  statusCode: number;
  success: boolean;
  error?: string;
  result: string;
};

type IProps = {
  id: string;
};

// const addFavorites = async ({ id }: IProps): Promise<Response> => {
//   const response = await instance.post<Response>(`/organization/favorite/${id}`).then((res) => res.data);
//   return response;
// };
// export const useFavorites = () =>
//   useMutation({
//     mutationFn: () => addFavorites({id}),
//   });


