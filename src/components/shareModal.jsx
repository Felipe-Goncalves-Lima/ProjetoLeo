import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

import { useState } from "react";

import { StyledDialog } from "./style/shareModalstyle";

export default function ShareModal({ open, onClose, post }) {
  const [copied, setCopied] = useState(false);

  const categorySlug = typeof post.category === 'object' ? post.category?.slug : post.category;
  const currentUrl = `${window.location.origin}/${categorySlug}/${post.slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
  };

  const openShare = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <DialogTitle>
          Compartilhar publicação
        </DialogTitle>

        <DialogContent>
          <List>

            <ListItemButton onClick={copyLink}>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>

              <ListItemText primary="Copiar Link" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                openShare(
                  `https://wa.me/?text=${encodeURIComponent(currentUrl)}`
                )
              }
            >
              <ListItemIcon>
                <WhatsAppIcon />
              </ListItemIcon>

              <ListItemText primary="WhatsApp" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                openShare(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                  )}`
                )
              }
            >
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>

              <ListItemText primary="Facebook" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                openShare(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}`
                )
              }
            >
              <ListItemIcon>
                <LinkedInIcon />
              </ListItemIcon>

              <ListItemText primary="LinkedIn" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                openShare(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    currentUrl
                  )}`
                )
              }
            >
              <ListItemIcon>
                <TelegramIcon />
              </ListItemIcon>

              <ListItemText primary="Telegram" />
            </ListItemButton>

          </List>
        </DialogContent>
      </StyledDialog>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copiado com sucesso!"
      />
    </>
  );
}