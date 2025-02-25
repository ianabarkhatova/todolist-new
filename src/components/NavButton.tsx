import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type NavButtonProps = {
  background?: string;
};

export const NavButton = styled(Button)<NavButtonProps>(({ theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  textTransform: "uppercase",
  margin: "0 10px",
  padding: "8px 24px",
  color: theme.palette.primary.contrastText,
}));
