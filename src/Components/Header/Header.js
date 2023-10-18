import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import './Header.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Header = () => {
  return (
    <>
      <AppBar theme={darkTheme} position="static">
          <section className="layout__tooltar__section">
            <div>
            <a href="https://fontmeme.com/netflix-font/">
                <img className="header__name" src="https://fontmeme.com/permalink/231015/7b324c5b0963e3e4e558648110ab6729.png" alt="netflix-font" border="0" />

                </a>
            </div>
            <div>

            </div>
          </section>
      </AppBar>
    </>
  );
};

export default Header;
