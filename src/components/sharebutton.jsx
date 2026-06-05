import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

import ShareModal from "./shareModal.jsx";

export default function ShareButton({ post }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          color: "var(--color-text-muted)",

          "&:hover": {
            color: "#1f3b6d",
            backgroundColor: "rgba(31, 59, 109, 0.08)",
          },
        }}
      >
        <ShareIcon fontSize="small" />
      </IconButton>

      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        post={post}
      />
    </>
  );
}