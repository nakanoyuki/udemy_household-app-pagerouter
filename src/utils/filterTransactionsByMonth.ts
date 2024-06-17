import { Transaction } from "@/type";
import { format } from "date-fns";
import { useState } from "react";

export const filterTransactionsByMonth = (
  transactions: Transaction[],
  currentMonth: Date
): Transaction[] => {
  return transactions.filter((transaction) =>
    transaction.date.startsWith(format(currentMonth, "yyyy-MM"))
  );
};
