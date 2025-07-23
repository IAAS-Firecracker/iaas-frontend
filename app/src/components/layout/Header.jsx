import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  InputBase,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  styled,
  CssBaseline,
  Select,
  FormControl,
  alpha,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  VpnKey as VpnKeyIcon,
  ExitToApp as LogoutIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
  Dns as VmIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import useUser from '../../hooks/useUser';

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 500,
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    display: 'none' // Hide search on small screens
  },
}));

const MobileSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  margin: theme.spacing(1),
  width: '100%',
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const LanguageSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    marginLeft: 0,
  },
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const auth = useUser();
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.currentUser;
  const logout = auth.logout;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const notificationCount = 5;
  
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  // Navigation items
  const mainNavItems = [
    { name: t('navigation.home'), icon: <HomeIcon color="primary" />, route: '/' },
    { name: t('navigation.dashboard'), icon: <DashboardIcon color="primary" />, route: '/dashboard' },
    { name: t('navigation.compute'), icon: <VmIcon color="primary" />, route: '/compute' },
    { name: t('navigation.storage'), icon: <StorageIcon color="primary" />, route: '/storage' },
  ];

  const supportNavItems = [
    { name: t('navigation.settings'), icon: <SettingsIcon color="primary" />, route: '/settings' },
    { name: t('navigation.help'), icon: <HelpIcon color="primary" />, route: '/help' },
  ];

  // Profile menu
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          minWidth: 200,
          borderRadius: 2,
          mt: 1,
        }
      }}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
        <ListItemIcon>
          <AccountCircle fontSize="small" color="primary" />
        </ListItemIcon>
        {t('navigation.profile')}
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" color="primary" />
        </ListItemIcon>
        {t('navigation.settings')}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="primary" />
        </ListItemIcon>
        {t('navigation.logout')}
      </MenuItem>
    </Menu>
  );

  // Notifications menu
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: {
          width: isSmallScreen ? '100vw' : 350,
          maxHeight: 400,
          borderRadius: isSmallScreen ? 0 : 2,
          mt: 1,
          p: 1,
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {t('notifications')}
        </Typography>
        <Button 
          size="small" 
          color="primary"
          onClick={() => { handleNotificationsClose(); navigate('/notifications'); }}
        >
          {t('viewAll')}
        </Button>
      </Box>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {t('noNewNotifications')}
        </Typography>
      </Box>
    </Menu>
  );

  // Navigation drawer
  const renderDrawer = (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isMobile ? mobileOpen : isAuthenticated}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText
            }}
          >
            {t('appName').charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div" fontWeight={600}>
            {t('appName')}
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List sx={{ pt: 0 }}>
        {mainNavItems.map((item) => (
          <ListItem 
            key={item.name}
            button 
            onClick={() => {
              navigate(item.route);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" sx={{ px: 3, py: 1, color: theme.palette.text.secondary }}>
        {t('support')}
      </Typography>
      <List>
        {supportNavItems.map((item) => (
          <ListItem 
            key={item.name}
            button 
            onClick={() => {
              navigate(item.route);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar position="fixed" open={isAuthenticated && !isMobile}>
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              mr: 2,
              flexShrink: 0
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 1,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }}
            >
              {t('appName').charAt(0)}
            </Avatar>
            {!isSmallScreen && t('appName')}
          </Typography>

          {isAuthenticated && (
            <>
              {!showMobileSearch && (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <form onSubmit={handleSearchSubmit}>
                    <StyledInputBase
                      placeholder={t('search') + '...'}
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </form>
                </Search>
              )}

              {showMobileSearch && (
                <MobileSearch>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <form onSubmit={handleSearchSubmit}>
                    <StyledInputBase
                      placeholder={t('search') + '...'}
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                  </form>
                  <IconButton
                    onClick={() => setShowMobileSearch(false)}
                    sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </MobileSearch>
              )}

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexShrink: 0
              }}>
                {isSmallScreen && !showMobileSearch && (
                  <Tooltip title={t('search')}>
                    <IconButton
                      color="inherit"
                      onClick={() => setShowMobileSearch(true)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <LanguageSelector size="small" sx={{ mr: 1 }}>
                  <Select
                    value={i18n.language}
                    onChange={changeLanguage}
                    sx={{ 
                      '& .MuiSelect-select': {
                        py: 1,
                        px: isSmallScreen ? 1 : 2,
                        display: 'flex',
                        alignItems: 'center'
                      }
                    }}
                    renderValue={(value) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!isSmallScreen && (
                          <>
                            <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                            {value.toUpperCase()}
                          </>
                        )}
                        {isSmallScreen && (
                          <LanguageIcon fontSize="small" />
                        )}
                      </Box>
                    )}
                  >
                    <MenuItem value="en">
                      <Box component="span" sx={{ width: 24, mr: 1, textAlign: 'center' }}>🇬🇧</Box>
                      English
                    </MenuItem>
                    <MenuItem value="fr">
                      <Box component="span" sx={{ width: 24, mr: 1, textAlign: 'center' }}>🇫🇷</Box>
                      Français
                    </MenuItem>
                  </Select>
                </LanguageSelector>

                <Tooltip title={t('notifications')}>
                  <IconButton
                    size="medium"
                    color="inherit"
                    onClick={handleNotificationsOpen}
                  >
                    <Badge badgeContent={notificationCount} color="error" max={9}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                <Tooltip title={t('account')}>
                  <IconButton
                    size="medium"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    {user?.profile_image ? (
                      <Avatar 
                        src={user.profile_image} 
                        alt={user.username}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText
                        }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}

          {!isAuthenticated && (
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center', 
              gap: 1,
              flexShrink: 0
            }}>
              <LanguageSelector size="small">
                <Select
                  value={i18n.language}
                  onChange={changeLanguage}
                  sx={{ 
                    '& .MuiSelect-select': {
                      py: 1,
                      px: isSmallScreen ? 1 : 2,
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}
                  renderValue={(value) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {!isSmallScreen && (
                        <>
                          <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                          {value.toUpperCase()}
                        </>
                      )}
                      {isSmallScreen && (
                        <LanguageIcon fontSize="small" />
                      )}
                    </Box>
                  )}
                >
                  <MenuItem value="en">
                    <Box component="span" sx={{ width: 24, mr: 1, textAlign: 'center' }}>EN</Box>
                    English
                  </MenuItem>
                  <MenuItem value="fr">
                    <Box component="span" sx={{ width: 24, mr: 1, textAlign: 'center' }}>🇫🇷</Box>
                    Français
                  </MenuItem>
                </Select>
              </LanguageSelector>

              {!isSmallScreen && (
                <>
                  <Button 
                    variant="outlined"
                    color="inherit"
                    component={Link} 
                    to="/login"
                    startIcon={<VpnKeyIcon />}
                    sx={{ 
                      ml: 1,
                      color: 'text.primary',
                      borderColor: alpha(theme.palette.text.primary, 0.3),
                      '&:hover': {
                        borderColor: alpha(theme.palette.text.primary, 0.5),
                      }
                    }}
                  >
                    {t('navigation.login')}
                  </Button>
                  <Button 
                    variant="contained"
                    color="primary"
                    component={Link} 
                    to="/register"
                    startIcon={<AccountCircle />}
                    sx={{ 
                      ml: 1,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
                  >
                    {t('navigation.register')}
                  </Button>
                </>
              )}

              {isSmallScreen && (
                <>
                  <Tooltip title={t('navigation.login')}>
                    <IconButton
                      component={Link}
                      to="/login"
                      color="inherit"
                    >
                      <VpnKeyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('navigation.register')}>
                    <IconButton
                      component={Link}
                      to="/register"
                      color="primary"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated && renderDrawer}
      {renderProfileMenu}
      {renderNotificationsMenu}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mb:4,
          width: isAuthenticated ? `calc(100% - ${drawerWidth}px)` : '100%',
          marginLeft: isAuthenticated ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
       
      </Box>
    </Box>
  );
};

export default Header;