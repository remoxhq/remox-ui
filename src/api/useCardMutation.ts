import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { useToast } from "@components/shadcn/use-toast";


const useCardMutation = (id:string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteMutation = useMutation({
    mutationFn: () => {
      return instance.delete(`/organization/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries()
      toast({
        title: "Organization removed",
        duration: 2000,
        variant: "createOrg",
      });
    },
    onError(error) {
      console.log(error)
      toast({
        title: "Something went wrong: Organization can't removed",
        duration: 2000,
        variant: "destructive",
      });
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
      toast({
        title: "Something went wrong: Organization can't favorited",
        duration: 2000,
        variant: "destructive",
      });
    },
  });

  return { deleteMutation, favMutation };
};

export default useCardMutation;
