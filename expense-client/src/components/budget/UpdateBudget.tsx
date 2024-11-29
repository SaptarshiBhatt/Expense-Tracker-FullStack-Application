import { BudgetAtom } from "@/utils/BudgetAtom";
import { Button, Code, Input } from "@nextui-org/react";
import axios from "axios";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { DeleteIcon } from "../buttonIcons/DeleteIcon";
import DeleteBudgetButton from "../buttons/DeleteBudgetButton";
import { useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "../buttonIcons/EditIcon";

type Inputs = {
  budget: number;
};

const UpdateBudget = () => {
  const [budgetAmt, setBudgetAmt] = useAtom(BudgetAtom);
  console.log(budgetAmt.uid);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Inputs>();

  const handleUpdateBudget: SubmitHandler<Inputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const budget = {
      budget: data.budget,
    };

    try {
      const budgetItem = await axios.patch(
        `http://localhost:8080/budget/${budgetAmt.uid}`,
        budget
      );

      if (budgetItem.status === 200 && budgetItem.statusText === "OK") {
        setBudgetAmt(budgetItem.data.result);
        toast.success("Budget Updated!", {
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
      toast.error("Failed to update!", {
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
      <div className="flex flex-col gap-8">
        <p className="text-2xl font-bold">Update Current Budget</p>
        <form onSubmit={handleSubmit(handleUpdateBudget)} className="space-y-5">
          {!budgetAmt.uid ? (
            <div className="flex flex-col gap-6">
              <Input
                disabled
                defaultValue={budgetAmt.budget.toString()}
                startContent={<FaRupeeSign />}
                {...register("budget", {
                  required: {
                    value: true,
                    message: "This filed is required",
                  },
                })}
                type="number"
                className=""
                size="md"
                variant="faded"
                color="primary"
                placeholder="Enter title for expense"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <Input
                defaultValue={budgetAmt.budget.toString()}
                startContent={<FaRupeeSign />}
                {...register("budget", {
                  required: {
                    value: true,
                    message: "This filed is required",
                  },
                })}
                type="number"
                className=""
                size="md"
                variant="faded"
                color="primary"
                placeholder="Enter title for expense"
              />
              <Button
                isLoading={isSubmitting}
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
                type="submit"
                size="lg"
                color="warning"
                variant="solid"
                className="flex items-center gap-2 w-full"
              >
                <EditIcon />
                <span>Update Budget</span>
              </Button>
            </div>
          )}

          {errors.budget && (
            <Code color="danger" size="md">
              {errors.budget.message}
            </Code>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateBudget;
