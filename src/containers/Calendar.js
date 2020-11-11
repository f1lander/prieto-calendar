import { useContext } from "react";
import { Paper } from "@material-ui/core";
import { CalendarContext } from "../context";
import CalendarHeader from "./Header";
import WeekDays from "./WeekDays";
import CellDays from "./CellDays";
import { Container } from "../components/utils/commonComponents";

const Calendar = (props) => {
  const { state } = useContext(CalendarContext);

  return (
    <Paper elevation={3} style={{ margin: "calc(100% / 17)" }}>
      <Container column>
        <CalendarHeader currentDate={state.currentDate} />
        <WeekDays />
        <CellDays />
      </Container>
    </Paper>
  );
};

export default Calendar;
