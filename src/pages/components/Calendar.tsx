import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import React, { Dispatch, SetStateAction } from "react";
import { DatesSetArg, EventChangeArg } from "@fullcalendar/core";
import styles from "../../Calendar.module.scss";
import { calculateDailyBalances } from "@/utils/financeCalculation";
import { Balance, CalenderContent, Transaction } from "@/type";
import { format } from "date-fns";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";

interface Props {
  transactions: Transaction[];
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  currentDay: string;
  setCurrentDay: Dispatch<SetStateAction<string>>;
}

const Calendar = ({
  transactions,
  currentMonth,
  setCurrentMonth,
  currentDay,
  setCurrentDay,
}: Props) => {
  const theme = useTheme();
  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(format(currentMonth, "yyyy-MM"))
  );

  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>
  ): CalenderContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];

      return {
        start: date,
        income: income,
        expense: expense,
        balance: balance,
      };
    });
  };

  const calenderEvents = createCalenderEvents(dailyBalances);

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    setCurrentMonth(datesetInfo.view.currentStart);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };

  const renderEventCount = (eventInfo: EventChangeArg) => {
    return (
      <>
        <div
          className={`${styles.calendarContainer__money} ${styles.calendarContainer__eventIncome}`}
        >
          {eventInfo.event.extendedProps.income}
        </div>
        <div
          className={`${styles.calendarContainer__money} ${styles.calendarContainer__eventExpense}`}
        >
          {eventInfo.event.extendedProps.expense}
        </div>
        <div
          className={`${styles.calendarContainer__money} ${styles.calendarContainer__eventBalance}`}
        >
          {eventInfo.event.extendedProps.balance}
        </div>
      </>
    );
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calenderEvents, backgroundEvent]}
      eventContent={renderEventCount}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
