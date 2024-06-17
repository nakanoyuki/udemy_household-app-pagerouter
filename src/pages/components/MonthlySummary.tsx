import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Transaction } from "@/type";
import { financeCalculation } from "@/utils/financeCalculation";

interface Props {
  monthlyTransactions: Transaction[];
}

const MonthlySummary = ({ monthlyTransactions }: Props) => {
  const { income, expense, balance } = financeCalculation(monthlyTransactions);
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem", color: "white" }} />
              <Typography sx={{ color: "white" }}>収入</Typography>
            </Stack>
            <Typography
              variant="h5"
              textAlign={"right"}
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ￥{income}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem", color: "white" }} />
              <Typography sx={{ color: "white" }}>支出</Typography>
            </Stack>
            <Typography
              variant="h5"
              textAlign={"right"}
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ￥{expense}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem", color: "white" }} />
              <Typography sx={{ color: "white" }}>残高</Typography>
            </Stack>
            <Typography
              variant="h5"
              textAlign={"right"}
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ￥{balance}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
