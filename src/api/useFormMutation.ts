import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { useToast } from "@components/shadcn/use-toast";

type Response = {
  statusCode: number;
  result: string;
  success: boolean;
  error: string;
};

type IProps = {
  formData: FormData;
  id: string;
};

const useFormMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return instance.post<Response>(`/organization/create`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    },
    onSuccess(data) {
      queryClient.invalidateQueries();
      toast({
        title: data.data.result,
        duration: 2000,
        variant: "createOrg",
      });
    },
    onError(error) {
      if (error.response?.data.error) {
        toast({
          title: `${error.response?.data.error}`,
          duration: 2000,
          variant: "destructive",
        });
        console.log(error);
      } else {
        toast({
          title: "Something went wrong: Organization can't created",
          duration: 2000,
          variant: "destructive",
        });
        console.log(error);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ formData, id }: IProps) => {
      return instance.put<Response>(`/organization/update/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    },
    onSuccess(data) {
      queryClient.invalidateQueries();
      toast({
        title: data.data.result,
        duration: 2000,
        variant: "createOrg",
      });
    },
    onError(error) {
      if (error.response?.data.error) {
        toast({
          title: `${error.response?.data.error}`,
          duration: 2000,
          variant: "destructive",
        });
        console.log(error);
      } else {
        toast({
          title: "Something went wrong: Organization can't updated",
          duration: 2000,
          variant: "destructive",
        });
        console.log(error);
      }
    },
  });

  return { createMutation, updateMutation };
};

export default useFormMutation;
