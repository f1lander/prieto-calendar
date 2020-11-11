import styled, { css } from "styled-components";
import { useContext } from "react";
import { isSameDay } from "date-fns";
import { Box, ButtonBase } from "@material-ui/core";
import { getDate } from "date-fns";

import Reminder from "../components/Reminder";
import { CalendarContext } from "../context";

function CellDay(props) {
  const { state } = useContext(CalendarContext);
  const { reminders } = state;
  const { date, inCurrentMonth, holiday, onClick } = props;
  const filteredReminders = reminders.filter((item) =>
    isSameDay(new Date(item.date), date)
  );
  const hasReminder = filteredReminders.length > 0;
  const handleOnClickReminder = (e, reminder) => {
    e.stopPropagation();
    onClick(e, reminder, null, hasReminder);
  };

  return (
    <>
      <CellButton
        disabled={!inCurrentMonth}
        hasReminder={filteredReminders.length}
        onClick={(e) => onClick(e, null, date, hasReminder)}
      >
        <DayLabel inCurrentMonth={inCurrentMonth} holiday={holiday}>
          {getDate(date)}
        </DayLabel>
        <Box pt={1} />
        {filteredReminders.map((reminder) => (
          <Reminder reminder={reminder} onClick={handleOnClickReminder} />
        ))}
      </CellButton>
    </>
  );
}

export default CellDay;

const DayLabel = styled.div`
  display: flex;
  justify-content: flex-flex-start;
  align-items: flex-start;
  color: ${({ inCurrentMonth }) => (inCurrentMonth ? "#222c3c" : " #999ea7")};
  ${({ holiday }) =>
    holiday &&
    css`
      color: "#00c9ff";
      font-weight: 700;
    `}
`;

const CellButton = styled(ButtonBase)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow: auto;
  justify-content: flex-start;
  border: 1px solid lightgray;
  width: calc(100% / 7);
  min-height: 8rem;
  max-height: 8rem;
  padding: 0.5rem;
  background-color: ${({ hasReminder }) => hasReminder && "#dfdbd8"};
`;
