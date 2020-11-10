import { useContext } from "react";
import { Paper, Box } from "@material-ui/core";
import styled from "styled-components";

import { CalendarContext } from "../context";
// import DateButton from "../components/DateButton";
import CalendarHeader from "./Header";
import WeekDays from "./WeekDays";
import CellDays from "./CellDays";

const Calendar = (props) => {
  const { state } = useContext(CalendarContext);
  console.log("CurrentDate", state.currentDate);

  return (
    <Paper elevation={3} style={{ margin: "5rem" }}>
      <Container>
        <CalendarHeader currentDate={state.currentDate} />
        <Box pt={2} />
        <WeekDays />
        <CellDays />
      </Container>
    </Paper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Calendar;
