import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
require('dotenv').config();



const useStyles = makeStyles(theme => ({
    appBarRoot: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    barButtons: {
        marginRight: theme.spacing(2),
    }
}));
  
export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // const weatherCall = () => {
  //   const key = process.env.API_Key;
  //   axios.get("https://api.climacell.co/v3/weather/realtime?lat=47.6062&lon=122.3321&unit_system=si&fields=&apikey=" + key).then(res => {
  //     console.log(res, 'hi')
  //   })
  // }

  // useEffect(() => {
  //   weatherCall();
  // }, [])


  return(
    <AppBar position="static" className={classes.appBarRoot}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon 
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          />
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <Link to="/" onClick={handleClose} className="links">
                        <MenuItem>Home</MenuItem>
                      </Link>
                      <Link to='/profile' onClick={handleClose} className="links">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <Link to='/newPost' onClick={handleClose} className="links">
                        <MenuItem>New Post</MenuItem>
                      </Link>
                      <Link to="/settings" className="links">
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                      </Link>
                      <Link to='/logout' className="links">
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        <Link to='/' className="links home">The Tea</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}