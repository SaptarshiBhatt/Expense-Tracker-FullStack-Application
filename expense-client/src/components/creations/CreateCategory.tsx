import { Button, Code, Input } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdCategory } from "react-icons/md";
import { toast } from "react-toastify";

type Inputs = {
  category: string;
};

const CreateCategory = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Inputs>();

  const createCategory: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const category = {
      categoryName: data.category,
    };

    try {
      await axios.post("http://localhost:8080/category", category);
      toast.success("Created Category!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    } catch (error) {
      toast.error("This Category already exists!", {
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
      <div className="w-full flex flex-col gap-6">
        <p className="text-2xl font-bold">
          Create new Category (If the current ones do not match your criteria)
        </p>
        <form
          className="w-full space-y-4"
          onSubmit={handleSubmit(createCategory)}
        >
          <Input
            startContent={<MdCategory size={20} />}
            {...register("category", {
              required: {
                value: true,
                message: "This field is required",
              },
              maxLength: {
                value: 50,
                message: "limit exceeded",
              },
            })}
            color="primary"
            variant="faded"
            placeholder="Enter new category name"
          />
          {errors.category && (
            <Code color="danger" size="md">
              {errors.category.message}
            </Code>
          )}
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
            className="flex items-center w-full gap-2"
          >
            <span>Add Expense</span>
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
