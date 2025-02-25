import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "./NavButton.tsx";
import { Switch, useTheme } from "@mui/material";

export const ButtonAppBar = ({ changeModeHandler }: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <NavButton>Login</NavButton>
          <NavButton>Logout</NavButton>
          <NavButton>FAQ</NavButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

type Props = {
  changeModeHandler: () => void;
};
