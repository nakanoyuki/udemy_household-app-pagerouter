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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import SavingsIcon from "@mui/icons-material/Savings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Controller, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory } from "@/type";

interface Props {
  closeModal: () => void;
  isModalOpen: boolean;
  currentDay: string;
}

type IncomeExpenseType = "income" | "expense";
interface CategoryItemType {
  label: IncomeCategory | ExpenseCategory;
  icon: React.JSX.Element;
}

const TransactionForm = ({ closeModal, isModalOpen, currentDay }: Props) => {
  const formWidth = 320;

  const expenseCategories: CategoryItemType[] = [
    { label: "食費", icon: <FastfoodIcon /> },
    { label: "日用品", icon: <AlarmIcon /> },
    { label: "住居費", icon: <AddHomeIcon /> },
    { label: "交際費", icon: <Diversity3Icon /> },
    { label: "娯楽", icon: <SportsTennisIcon /> },
    { label: "交通費", icon: <TrainIcon /> },
  ];

  const incomeCategories: CategoryItemType[] = [
    { label: "給与", icon: <WorkIcon /> },
    { label: "副収入", icon: <AddBusinessIcon /> },
    { label: "お小遣い", icon: <SavingsIcon /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);

  const { control, setValue, watch } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
  });

  const incomeExpenseToggle = (type: IncomeExpenseType) => {
    setValue("type", type);
  };

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  const currentType = watch("type");

  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : incomeCategories;
    console.log(currentType);
    setCategories(newCategories);
  }, [currentType]);

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
              <TextField {...field} id="カテゴリ" label="カテゴリ" select>
                {categories.map((category) => (
                  <MenuItem value={category.label} key={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                label="金額"
                type="number"
              />
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
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
