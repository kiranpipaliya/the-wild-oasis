import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("cabin deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
};

export default useDeleteCabin;
