import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';

const Header = ({ handleToggleDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Notes
        </Typography>
        <Switch onChange={(e) => handleToggleDarkMode(e.target.checked)} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
