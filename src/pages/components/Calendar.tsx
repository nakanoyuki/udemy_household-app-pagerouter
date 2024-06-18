import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import React from "react";
import { EventChangeArg } from "@fullcalendar/core";
import styles from "../../Calendar.module.scss";

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

const Calendar = () => {
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventCount}
    />
  );
};

export default Calendar;
