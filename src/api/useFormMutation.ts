import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "./axiosInstance";
import { useToast } from "@components/shadcn/use-toast";
import { isAxiosError } from "axios";

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
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.error || "Something went wrong: Organization can't created";
        toast({
          title: serverErrorMessage,
          duration: 2000,
          variant: "destructive",
        });
      } else {
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
      if (isAxiosError(error)) {
        const serverErrorMessage = error.response?.data.error || "Something went wrong: Organization can't updated";
        toast({
          title: serverErrorMessage,
          duration: 2000,
          variant: "destructive",
        });
      } else {
        console.log(error);
      }
    },
  });

  return { createMutation, updateMutation };
};

export default useFormMutation;
