import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
  Button,
  Chip,
} from "@nextui-org/react";
import { EditIcon } from "../buttonIcons/EditIcon";
import { DeleteIcon } from "../buttonIcons/DeleteIcon";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Expense } from "@/utils/ExpenseType";
import { useAtom } from "jotai";
import { TotalExpenseAtom } from "@/utils/TotalExpenseAtom";
import EditBtn from "../buttons/EditBtn";
import DeleteBtn from "../buttons/DeleteBtn";

export default function TableList() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const [totalExpense, setTotalExpense] = useAtom(TotalExpenseAtom);

  const { data, isError, isFetched, isFetching, isLoading, isSuccess } =
    useQuery({
      queryKey: ["expense"],
      queryFn: async () => {
        const res = await axios.get("http://localhost:8080/expense");
        const data = res.data as Expense;

        return data.result.reverse();
      },
    });

  useEffect(() => {
    if (data) {
      // Calculate total expense
      const total = data.reduce((acc, item) => acc + item.amount, 0);

      setTotalExpense(total);
    }
  }, [data]);

  console.log(totalExpense);

  if (data === undefined) {
    return;
  }

  if (data.length === 0) {
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
    <div className="flex flex-col gap-3">
      <p className="text-2xl">All Expenses</p>
      <Table
        radius="none"
        color="primary"
        className="md:h-[600px] h-[400px] w-full shadow-none"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.uid}>
              <TableCell className="font-bold text-lg">{item.title}</TableCell>
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
  );
}
