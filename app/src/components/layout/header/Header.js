import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    useMediaQuery,
    useTheme,
    styled,
    Badge,
    Tooltip,
    Avatar,
    Select,
    MenuItem,
    MenuList,
    ListItemIcon,
    Divider,
    Menu,
    alpha

} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    VpnKey as VpnKeyIcon,
    AccountCircle,
    Language as LanguageIcon,
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    Close as CloseIcon
} from '@mui/icons-material';

import Drawer from './Drawer';
import { Search, MobileSearch, SearchIconWrapper, StyledInputBase, LanguageSelector } from './styles';
import useUser from '../../../hooks/useUser';

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

const Header = ({  }) => {
    const { t, i18n } = useTranslation();
    const auth = useUser();
    const { isAuthenticated, currentUser: user, isAdmin, logout } = auth;
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xl'));
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
     
        const notificationCount = 5;
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
    const isNotificationsOpen = Boolean(notificationsAnchorEl);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowMobileSearch(false);
        }
    };

     const handleNotificationsOpen = (event) => {
        setNotificationsAnchorEl(event.currentTarget);
    };

       const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

      const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsClose = () => {
        setNotificationsAnchorEl(null);
    };


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
    

    return (
        <Box sx={{ display: 'flex' , mb: 5 }}>
            <AppBar position="fixed" open={isAuthenticated && !isMobile && !isLanding}>
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
            
            {isAuthenticated && (
                <Drawer 
                    open={mobileOpen} 
                    onClose={handleDrawerToggle}
                    isMobile={isMobile}
                    isAdmin={isAdmin}
                    user={user}
                />
            )}
             {renderNotificationsMenu}
             {renderProfileMenu}
        </Box>
    );
};

export default Header;