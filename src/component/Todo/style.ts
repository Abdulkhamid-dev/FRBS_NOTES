import styled from "styled-components";
import { Modal } from "@mui/material";
export const StyledTodo = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  align-items: center;
  padding: 6px;
  margin: 4px 0;
`;

export const StyledTodoModal = styled(Modal)`
  .modal_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
