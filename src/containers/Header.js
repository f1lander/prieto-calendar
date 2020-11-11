import { useContext } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { IconButton, Typography } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

import { CalendarContext } from "../context";
import { HEADER_TITLE_DATE_FORMAT } from "../constants";

function Header(props) {
  const { dispatch } = useContext(CalendarContext);
  const { currentDate, dateFormat = HEADER_TITLE_DATE_FORMAT } = props;
  return (
    <HeaderContainer>
      <IconButton
        onClick={() => dispatch({ type: "PREVIOUS_DATE" })}
        size="small"
      >
        <NavigateBefore />
      </IconButton>
      <HeaderTitle variant="h6">
        {format(currentDate, dateFormat)}
      </HeaderTitle>
      <IconButton onClick={() => dispatch({ type: "NEXT_DATE" })} size="small">
        <NavigateNext />
      </IconButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const HeaderTitle = styled(Typography)`
  color: #112432;
  flex: 2;
  text-align: center;
`;

export default Header;
