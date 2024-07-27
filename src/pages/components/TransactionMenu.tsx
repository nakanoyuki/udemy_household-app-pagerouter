import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DailySummary from "./DailySummary";
import { format } from "date-fns";
import { Transaction } from "@/type";
import DailyTransactionList from "./DailyTransactionList";

interface Props {
  transactions: Transaction[];
  currentMonth: Date;
  currentDay: string;
  handleAddTransactionForm: () => void;
}

const TransactionMenu = ({
  transactions,
  currentMonth,
  currentDay,
  handleAddTransactionForm,
}: Props) => {
  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(format(currentMonth, "yyyy-MM"))
  );

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  const menuDrawerWidth = 320;

  return (
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,
          top: 64,
          height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
        },
      }}
      variant={"permanent"}
      anchor={"right"}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        <Typography fontWeight={"fontWeightBold"}>
          日時： {currentDay}
        </Typography>
        <DailySummary dailyTransactions={dailyTransactions} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          <Button
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={handleAddTransactionForm}
          >
            内訳を追加
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {dailyTransactions.map((transaction) => (
                <DailyTransactionList
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
