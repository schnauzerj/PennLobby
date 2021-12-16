/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { IconButton } from "@mui/material";
import Avatar from '@material-ui/core/Avatar';
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import UserAvatar from './UserAvatar';

function Menu() {
  const [loggedIn, setLoggedin] = React.useState(false);

  const userName = sessionStorage.getItem('username');

  React.useEffect(() => {
    if (userName) {
      setLoggedin(true);
    }
  }, []);

  const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12,
    },
    menuButton: {
      marginRight: 16,
      marginLeft: -12,
    },
  });
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (themes) => `1px solid ${themes.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>

        <nav>
          {/* <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 0.3 }}
          >
            
          </Typography> */}
          <Link
            variant="button"
            color="text.primary"
            href="/lobby"
            sx={{ my: 1, mx: 7 }}
            id="home"
          >
            <img className="barLogo" src="../../logo.png" alt="logo_pic" />
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/lobby"
            sx={{ my: 1, mx: 7 }}
            // fontWeight="600"
            id="home"
          >
            Home
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/group"
            sx={{ my: 1, mx: 7 }}
            id="mygroups"
          >
            My Groups
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/post"
            sx={{ my: 1, mx: 7 }}
            id="myposts"
          >
            My Posts
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/message"
            sx={{ my: 1, mx: 7 }}
            id="messages"
          >
            Messages
          </Link>

        </nav>
        <section className={classes.rightToolbar} margin="auto">
          {/* <IconButton aria-label="settings">
            <NotificationsNoneIcon />
          </IconButton> */}
          {loggedIn ? (
            <UserAvatar setLoggedin={setLoggedin} />
          ) : (
            <Button href="./login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
        </section>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
