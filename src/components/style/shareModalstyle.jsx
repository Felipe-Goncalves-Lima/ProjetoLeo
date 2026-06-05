import styled from "styled-components";
import Dialog from "@mui/material/Dialog";

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    min-width: 350px;
  }

  .MuiDialogTitle-root {
    color: #1f3b6d;
    font-size: 1.4rem;
    font-weight: 700;
    font-family: Georgia, serif;
    border-bottom: 1px solid #e5e7eb;
  }

  .MuiListItemButton-root:hover {
    background-color: rgba(31, 59, 109, 0.08);
  }

  .MuiListItemIcon-root {
    color: #1f3b6d;
  }
`;