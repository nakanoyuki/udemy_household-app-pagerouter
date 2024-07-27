import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  currentDay: string;
}

const TransactionForm = ({ closeModal, isModalOpen, currentDay }: Props) => {
  const formWidth = 320;
  const { control, setValue } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
  });

  type IncomeExpenseType = "income" | "expense";

  const incomeExpenseToggle = (type: IncomeExpenseType) => {
    setValue("type", type);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isModalOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={closeModal}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => {
                    incomeExpenseToggle("expense");
                  }}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={() => {
                    incomeExpenseToggle("income");
                  }}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          {/* カテゴリ */}

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
                value={"食費"}
              >
                <MenuItem value={"食費"}>
                  <ListItemIcon>
                    <FastfoodIcon />
                  </ListItemIcon>
                  食費
                </MenuItem>
              </TextField>
            )}
          />

          {/* 金額 */}

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="金額" type="number" />
            )}
          />

          {/* 内容 */}

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="内容" type="text" />
            )}
          />

          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
