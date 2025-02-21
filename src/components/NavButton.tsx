import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type NavButtonProps = {
  background?: string;
};

export const NavButton = styled(Button)<NavButtonProps>(
  ({ background, theme }) => ({
    minWidth: "110px",
    fontWeight: "bold",
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.light}`,
    textTransform: "capitalize",
    margin: "0 10px",
    padding: "8px 24px",
    color: theme.palette.primary.contrastText,
    background: background || "#1565c0",
  }),
);
