import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ column }) => column && "column"};
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: wrap;
    `}
`;
