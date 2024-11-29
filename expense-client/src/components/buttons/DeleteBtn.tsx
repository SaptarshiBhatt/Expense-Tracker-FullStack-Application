import { Button } from "@nextui-org/react";
import { DeleteIcon } from "../buttonIcons/DeleteIcon";
import { Expense, SingleExpense } from "@/utils/ExpenseType";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

const DeleteBtn = ({ info }: { info: SingleExpense }) => {
  const queryClient = useQueryClient();

  const deleteExpense = async (id: string) => {
    try {
      if (id) {
        const item = await axios.delete(`http://localhost:8080/expense/${id}`);

        if (item.status === 200 && item.statusText === "OK") {
          toast.success("Item Deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          queryClient.invalidateQueries({ queryKey: ["expense"] });
        }
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Failed to delete!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <Button
        onPress={() => deleteExpense(info.result.uid)}
        size="sm"
        isIconOnly
        variant="flat"
        color="danger"
      >
        <DeleteIcon />
      </Button>
    </>
  );
};

export default DeleteBtn;
