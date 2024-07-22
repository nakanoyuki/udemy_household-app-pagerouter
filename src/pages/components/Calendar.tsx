import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import React, { Dispatch, SetStateAction } from "react";
import { DatesSetArg, EventChangeArg } from "@fullcalendar/core";
import styles from "../../Calendar.module.scss";
import { calculateDailyBalances } from "@/utils/financeCalculation";
import { Balance, CalenderContent, Transaction } from "@/type";
import { format } from "date-fns";

interface Props {
  transactions: Transaction[];
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
}

const Calendar = ({ transactions, currentMonth, setCurrentMonth }: Props) => {
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

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    setCurrentMonth(datesetInfo.view.currentStart);
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
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calenderEvents}
      eventContent={renderEventCount}
      datesSet={handleDateSet}
    />
  );
};

export default Calendar;
