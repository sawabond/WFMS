import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LanguageIcon from '@mui/icons-material/Language';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { userContext } from '../Contexts/userContext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Tooltip from '@mui/material/Tooltip';
import useLogout from '../hooks/useLogout';
import '../components/Header.scss';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);

  const { user } = useContext(userContext);
  const logOut = useLogout();

  const { t } = useTranslation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const userMenuId = 'primary-search-account-menu';
  const renderAccountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={userMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && user ? (
        <div className="menu-login">
          <MenuItem onClick={logOut}>{t('LOGOUT')}</MenuItem>
        </div>
      ) : (
        <div className="menu-unlogin">
          <Link to={'/registr'}>
            <MenuItem onClick={handleMenuClose}>{t('REGISTRATION')}</MenuItem>
          </Link>
          <Link to={'/login'}>
            <MenuItem onClick={handleMenuClose}>{t('LOG_IN')}</MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );

  const languageMenuId = 'primary-search-language-menu';
  const renderLanguageMenu = (
    <Menu
      anchorEl={languageAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
    >
      <div
        className="menu-language"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5%',
          width: '50px',
        }}
      >
        <div
          className="en-lang"
          onClick={() => {
            i18n.changeLanguage('en');
            localStorage.setItem('locale', 'en');
            handleLanguageMenuClose();
          }}
          style={{ cursor: 'pointer' }}
        >
          <Typography component="div">EN</Typography>
        </div>
        <div
          className="uk-lang"
          onClick={() => {
            i18n.changeLanguage('uk');
            localStorage.setItem('locale', 'uk');
            handleLanguageMenuClose();
          }}
          style={{ cursor: 'pointer' }}
        >
          <Typography component="div">UK</Typography>
        </div>
      </div>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: '#1976d2', color: 'white' }}
      >
        <Toolbar style={{ display: 'flex', gap: '1%' }}>
          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            <>
              <Tooltip title={t('TOOL_IMPORT_USER')}>
                <Link to={'/import'}>
                  <GroupAddIcon style={{ color: 'white' }} />
                </Link>
              </Tooltip>
              <Tooltip title={t('CREATE_ACHIEVEMENT_SYSTEM')}>
                <Link to={'/create-wind-farm'}>
                  <NoteAddIcon style={{ color: 'white' }} />
                </Link>
              </Tooltip>
              <Tooltip title={t('TOOL_ACHIEVEMNT_SYSTEMS')}>
                <Link to={'/system'}>
                  <EmojiEventsIcon style={{ color: 'white' }} />
                </Link>
              </Tooltip>
            </>
          ) : (
            ''
          )}

          <LanguageIcon onClick={handleLanguageMenuOpen} />

          <AccountCircle onClick={handleProfileMenuOpen} />
        </Toolbar>
      </AppBar>
      {renderLanguageMenu}
      {renderAccountMenu}
    </Box>
  );
}
