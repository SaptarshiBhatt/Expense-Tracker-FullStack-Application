import CreateExpense from "@/components/creations/CreateExpense";
import { ToastContainer } from "react-toastify";

const create = () => {
  return (
    <>
      <CreateExpense />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

export default create;
