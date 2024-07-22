import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import React, { useState } from "react";
import { EventChangeArg } from "@fullcalendar/core";
import styles from "../../Calendar.module.scss";
import { calculateDailyBalances } from "@/utils/financeCalculation";
import { Balance, CalenderContent, Transaction } from "@/type";
import { format } from "date-fns";

const events = [
  { title: "Meeting", start: "2024-06-11" },
  {
    title: "Meeting",
    start: "2024-06-20",
    income: 300,
    expense: 200,
    balance: 100,
  },
];

const Calendar = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        income: 300,
        expense: 200,
        balance: 100,
      };
    });
  };

  const calenderEvents = createCalenderEvents(dailyBalances);

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
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calenderEvents}
      eventContent={renderEventCount}
    />
  );
};

export default Calendar;
