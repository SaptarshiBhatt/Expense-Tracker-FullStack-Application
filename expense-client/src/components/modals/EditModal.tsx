import { Category } from "@/utils/CategoryType";
import { SingleExpense } from "@/utils/ExpenseType";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  AutocompleteItem,
  Autocomplete,
  Code,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";
import { MdCategory, MdTitle } from "react-icons/md";
import { toast } from "react-toastify";
import { EditIcon } from "../buttonIcons/EditIcon";

type Inputs = {
  title: string;
  amount: number;
  category: string;
};

const EditModal = ({
  isOpen,
  onOpenChange,
  info,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  info: SingleExpense;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Inputs>();

  console.log(info);

  const handleUpdateExpense: SubmitHandler<Inputs> = async (expdata) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const expense = {
      title: expdata.title,
      amount: expdata.amount,
      category_name: expdata.category,
    };

    try {
      if (info.result.uid) {
        const updated = await axios.patch(
          `http://localhost:8080/expense/${info.result.uid}`,
          expense
        );
        if (updated.statusText === "OK" && updated.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["expense"] });
          toast.success("Item updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          onOpenChange();
        }
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

  const { data, isError, isFetched, isFetching, isLoading, isSuccess } =
    useQuery({
      queryKey: ["category"],
      queryFn: async () => {
        const res = await axios.get("http://localhost:8080/category");
        const data = res.data as Category;

        return data.result;
      },
      refetchOnWindowFocus: false,
      retry: true,
    });

  if (data === undefined) {
    return;
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Expense
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(handleUpdateExpense)}
                >
                  <Input
                    defaultValue={info.result.title}
                    startContent={<MdTitle />}
                    {...register("title", {
                      required: {
                        value: true,
                        message: "This filed is required",
                      },
                      max: {
                        value: 50,
                        message: "limit exceded",
                      },
                    })}
                    type="text"
                    className=""
                    size="md"
                    variant="faded"
                    color="primary"
                    placeholder="Enter title for expense"
                  />
                  {errors.title && (
                    <Code color="danger" size="md">
                      {errors.title.message}
                    </Code>
                  )}
                  <div className="w-full flex justify-between items-center gap-2">
                    <div className="flex flex-col w-full gap-3">
                      <Input
                        defaultValue={info.result.amount.toString()}
                        startContent={<FaRupeeSign />}
                        {...register("amount", {
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
                        placeholder="Enter expense amount"
                      />
                      {errors.amount && (
                        <Code color="danger" size="md">
                          {errors.amount.message}
                        </Code>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-3">
                      <Autocomplete
                        startContent={<MdCategory size={25} />}
                        {...register("category", {
                          required: {
                            value: true,
                            message: "This filed is required",
                          },
                        })}
                        color="primary"
                        variant="faded"
                        defaultItems={data}
                        placeholder="Select or Create Category"
                        className="max-w-xs"
                      >
                        {(item) => (
                          <AutocompleteItem key={item.uid}>
                            {item.categoryName}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {errors.category && (
                        <Code color="danger" size="md">
                          {errors.category.message}
                        </Code>
                      )}
                    </div>
                  </div>
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
                    color="primary"
                    variant="solid"
                    className="flex items-center gap-2"
                  >
                    <EditIcon />
                    <span>Update Expense</span>
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
