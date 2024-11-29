import { Button } from "@nextui-org/react";
import { DeleteIcon } from "../buttonIcons/DeleteIcon";
import axios from "axios";
import { useAtom } from "jotai";
import { BudgetAtom } from "@/utils/BudgetAtom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const DeleteBudgetButton = ({ id }: { id: string }) => {
  const [budgetAmt, setBudgetAmt] = useAtom(BudgetAtom);
  const [load, setLoad] = useState(false);

  const handleBudgetDelete = async (id: string) => {
    setLoad(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (id) {
      try {
        await axios.delete(`http://localhost:8080/budget/${id}`);
        setBudgetAmt({
          uid: "",
          budget: 0,
        });
        toast.success("Budget Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoad(false);
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
    }
  };
  return (
    <>
      <Button
        isLoading={load}
        spinner={
          <svg
            className="animate-spin h-7 w-7 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        }
        onPress={() => handleBudgetDelete(id)}
        type="submit"
        size="lg"
        color="danger"
        variant="solid"
        className="flex items-center gap-2 w-full"
      >
        <DeleteIcon />
        <span>Delete Budget</span>
      </Button>
    </>
  );
};

export default DeleteBudgetButton;
