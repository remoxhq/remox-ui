import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "./axiosInstance";


const useCardMutation = (id:string) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => {
      return instance.delete(`/organization/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries()
    },
    onError(error) {
      console.log(error)
    },
  });

 
  const favMutation = useMutation({
    mutationFn: () => {
      return instance.post(`/organization/favorite/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries()
    },
    onError(error) {
      console.log(error)
    },
  });

  return { deleteMutation, favMutation };
};

export default useCardMutation;
