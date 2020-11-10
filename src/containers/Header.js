import styled from "styled-components";
import { format } from "date-fns";
import { IconButton, Typography } from "@material-ui/core";
import {
  NavigateBefore,
  NavigateNext,
} from "@material-ui/icons";

import { HEADER_TITLE_DATE_FORMAT } from "../constants";

function Header(props) {
  const { currentDate, dateFormat = HEADER_TITLE_DATE_FORMAT } = props;
  return (
    <HeaderContainer>
      <IconButton size="small">
        <NavigateBefore />
      </IconButton>
      <HeaderTitle>{format(currentDate, dateFormat)}</HeaderTitle>
      <IconButton size="small">
        <NavigateNext />
      </IconButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled(Typography)`
  color: gray;
  flex: 2;
`;

export default Header;
