import { useContext, useLayoutEffect, useState } from "react";

import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  format,
} from "date-fns";

import { CalendarContext } from "../context";

import ReminderForm from "./ReminderForm";

import CellDay from "../components/CellDay";
import { Container } from "../components/utils/commonComponents";

function WeekDays(props) {
  const { state, dispatch } = useContext(CalendarContext);

  const { currentDate, defaultReminder } = state;

  const [cellDays, setCellDays] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [cellDate, setCellDate] = useState();

  const handleOnClick = (event, reminder, date) => {
    setAnchorEl(event.currentTarget);
    setCellDate(date);
    const _reminder = reminder || defaultReminder;
    dispatch({
      type: "SET_REMINDER",
      payload: {
        ..._reminder,
        date: date
          ? format(date, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"),
      },
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useLayoutEffect(() => {
    const startOfMonthDay = startOfMonth(currentDate);
    const endOfMonthDay = endOfMonth(currentDate);

    const startOfWeekDay = startOfWeek(startOfMonthDay);
    const endOfWeekDay = endOfWeek(endOfMonthDay);

    const firstBlanksCells = eachDayOfInterval({
      start: startOfWeekDay,
      end: startOfMonthDay,
    })
      .filter((date) => date < startOfMonthDay)
      .map((item) => ({
        inCurrentMonth: false,
        date: item,
      }));
    const lastBlanksCells = eachDayOfInterval({
      start: endOfMonthDay,
      end: endOfWeekDay,
    })
      .filter((date) => date > endOfMonthDay)
      .map((item) => ({
        inCurrentMonth: false,
        date: item,
      }));

    const monthDays = eachDayOfInterval({
      start: startOfMonthDay,
      end: endOfMonthDay,
    }).map((item) => ({
      inCurrentMonth: true,
      date: item,
      holiday: isWeekend(item),
    }));
    setCellDays([...firstBlanksCells, ...monthDays, ...lastBlanksCells]);
  }, [currentDate]);

  return (
    <Container wrap>
      {cellDays.map((item) => (
        <CellDay onClick={handleOnClick} {...item} />
      ))}
      {open && (
        <ReminderForm
          id={id}
          open={open}
          date={cellDate}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
}

export default WeekDays;
