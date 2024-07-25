import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import { Transaction } from "@/type";
import Icon from "./common/Icon";

interface Props {
  transaction: Transaction;
}

const DailyTransactionList = ({ transaction }: Props) => {
  return (
    <ListItem disablePadding>
      <Card
        sx={{
          width: "100%",
          backgroundColor:
            transaction.type === "income"
              ? (theme) => theme.palette.incomeColor.light
              : (theme) => theme.palette.expenseColor.light,
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container spacing={1} alignItems="center" wrap="wrap">
              <Grid item xs={1}>
                {Icon[transaction.category]}
              </Grid>
              <Grid item xs={2.5}>
                <Typography variant="caption" display="block" gutterBottom>
                  {transaction.category}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" gutterBottom>
                  {transaction.content}
                </Typography>
              </Grid>
              <Grid item xs={4.5}>
                <Typography
                  gutterBottom
                  textAlign={"right"}
                  color="text.secondary"
                  sx={{
                    wordBreak: "break-all",
                  }}
                >
                  ¥{transaction.amount}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default DailyTransactionList;
