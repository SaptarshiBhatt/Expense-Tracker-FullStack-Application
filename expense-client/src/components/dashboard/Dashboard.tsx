import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
} from "@nextui-org/react";
import TableList from "./Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Budget, SingleBudget } from "@/utils/BudgetType";
import { useAtom } from "jotai";
import { TotalExpenseAtom } from "@/utils/TotalExpenseAtom";
import { EditIcon } from "../buttonIcons/EditIcon";
import { DeleteIcon } from "../buttonIcons/DeleteIcon";
import EditBudgetBtn from "../buttons/EditBudgetBtn";
import DeleteBudgetButton from "../buttons/DeleteBudgetButton";
import { BudgetAtom } from "@/utils/BudgetAtom";
import { useEffect, useState } from "react";
import { LoadingAtom } from "@/utils/LoadingAtom";
import Loading from "../Loading";

const Dashboard = () => {
  const [loading, setLoading] = useAtom(LoadingAtom);
  const [totalExpense] = useAtom(TotalExpenseAtom);
  const [budgetAmt, setBudgetAmt] = useAtom(BudgetAtom);

  const { data, isError, isFetched, isFetching, isLoading, isSuccess } =
    useQuery({
      queryKey: ["budget"],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:8080/budget/${budgetAmt.uid}`
        );
        const data = res.data as SingleBudget;

        return data.result;
      },
      refetchOnWindowFocus: false,
      retry: true,
    });

  const balance = isSuccess ? data.budget - totalExpense : null;
  // if (balance !== null && balance < 0) {
  //   setBalanceError("Please increase your budget");
  // }

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, isFetching]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isFetched && isSuccess) {
    return (
      <>
        <div className="md:ml-[15%] h-screen ml-0 md:p-10 p-4">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-10">
              <Card className="w-full shadow-none" radius="none">
                <CardHeader className="flex items-center justify-between">
                  <p className="text-xl font-bold">Total Budget</p>
                  <Chip color="warning" variant="flat">
                    Amount added
                  </Chip>
                </CardHeader>
                <CardBody className="flex flex-row justify-between items-center">
                  <div className="text-4xl text-warning font-bold tracking-widest w-full">
                    {data.budget === undefined ? `$${0}` : `$${data.budget}`}
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full shadow-none" radius="none">
                <CardHeader className="flex items-center justify-between">
                  <p className="text-xl font-bold">Total Expenses</p>
                  <Chip color="danger" variant="flat">
                    Amount deducted
                  </Chip>
                </CardHeader>
                <CardBody>
                  <p className="text-4xl text-danger font-bold tracking-widest">
                    ${totalExpense}
                  </p>
                </CardBody>
              </Card>
              <Card className="w-full shadow-none" radius="none">
                <CardHeader className="flex items-center justify-between">
                  <p className="text-xl font-bold">Balance</p>
                  <Chip color="success" variant="flat">
                    current balance
                  </Chip>
                </CardHeader>
                <CardBody>
                  <p className="text-4xl text-success font-bold tracking-widest">
                    ${Number.isNaN(balance) ? 0 : balance}
                  </p>
                </CardBody>
              </Card>
            </div>
            <TableList />
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
