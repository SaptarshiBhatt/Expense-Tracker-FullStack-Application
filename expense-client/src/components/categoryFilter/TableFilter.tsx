import { Expense } from "@/utils/ExpenseType";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
import EditBtn from "../buttons/EditBtn";
import DeleteBtn from "../buttons/DeleteBtn";

const TableFilter = ({ info }: { info: string }) => {
  console.log(info);

  const { data, isError, isFetched, isFetching, isLoading, isSuccess } =
    useQuery({
      queryKey: ["expense"],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:8080/expense`);
        const data = res.data as Expense;

        return data.result;
      },
      refetchOnWindowFocus: false,
    });

  if (data === undefined) {
    return;
  }

  const filteredData = data.filter((item) => {
    return item.category_name === info;
  });

  if (filteredData.length === 0) {
    return (
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      </Table>
    );
  }
  return (
    <>
      <div className="">
        <Table
          radius="none"
          color="primary"
          className="shadow-none"
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.uid}>
                <TableCell className="font-bold text-lg">
                  {item.title}
                </TableCell>
                <TableCell className="font-bold text-lg">
                  <Chip
                    variant="dot"
                    color="danger"
                    className="border-none text-lg"
                  >
                    {item.amount}
                  </Chip>
                </TableCell>
                <TableCell className="font-bold text-lg">
                  <Chip
                    variant="dot"
                    color="primary"
                    className="border-none text-lg"
                  >
                    {item.category_name}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditBtn info={{ result: item }} />
                    <DeleteBtn info={{ result: item }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableFilter;
