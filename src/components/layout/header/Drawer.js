import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Avatar,
    Box,
    Collapse,
    styled,
    useTheme,
    alpha,
    IconButton
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Help as HelpIcon,
    ExitToApp as LogoutIcon,
    Dns as VmIcon,
    Storage as StorageIcon,
    Settings as SettingsIcon,
    ExpandLess,
    ExpandMore,
    AdminPanelSettings as AdminIcon,
    Payment as PaymentIcon,
     People as PeopleIcon,
     

} from '@mui/icons-material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
  Notifications,
  Dashboard,
  Storage,
  Close as CloseIcon,
  Person
} from '@mui/icons-material';
import LanIcon from '@mui/icons-material/Lan';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


const drawerWidth = 260;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(2, 2, 1, 2),
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: theme.palette.text.secondary,
}));

const AdminListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.5, 1),
    backgroundColor: alpha(theme.palette.error.main, 0.05),
    border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
    '&:hover': {
        backgroundColor: alpha(theme.palette.error.main, 0.1),
    },
}));

const NavigationDrawer = ({ open, onClose, isMobile, isAdmin, user }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [adminPanelOpen, setAdminPanelOpen] = useState(false);

    const handleAdminPanelToggle = () => {
        setAdminPanelOpen(!adminPanelOpen);
    };

    // Navigation items grouped by category
    const mainNavItems = [
        { name: t('navigation.home'), icon: <HomeIcon color="primary" />, route: '/' },
        { name: t('navigation.dashboard'), icon: <DashboardIcon color="primary" />, route: '/dashboard' },
        { name: t('navigation.billing'), icon: <PaymentIcon color="primary" />, route: '/billing' },
    ];

    const computeStorageItems = [
        { name: t('navigation.compute'), icon: <VmIcon color="primary" />, route: '/vms' },
    ];

    const supportNavItems = [
        { name: t('navigation.settings'), icon: <SettingsIcon color="primary" />, route: '/settings' },
        { name: t('navigation.help'), icon: <HelpIcon color="primary" />, route: '/help' },
    ];

    const adminNavItems = [
        { name: t('navigation.users'), icon: <PeopleIcon color="primary" />, route: '/users' },
        { name: t('navigation.vms'), icon: <VmIcon color="primary" />, route: '/vms' },
        { name: t('navigation.clusters'), icon: <LanIcon color="primary" />, route: '/clusters' },
        { name: t('navigation.system_images'), icon: <Diversity2Icon color="primary" />, route: '/system-images' },
        { name: t('navigation.offers'), icon: <LocalOfferIcon color="primary" />, route: '/offers' },
    ];

    const renderNavItems = (items, isAdminSection = false) => (
        items.map((item) => {
            const ListItemComponent = isAdminSection ? AdminListItem : ListItem;
            return (
                <ListItemComponent
                    key={item.name}
                    button
                    onClick={() => {
                        navigate(item.route);
                        if (isMobile) onClose();
                    }}
                    sx={!isAdminSection ? {
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        }
                    } : {}}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{ 
                            fontWeight: isAdminSection ? 600 : 500,
                            fontSize: isAdminSection ? '0.9rem' : 'inherit'
                        }}
                    />
                </ListItemComponent>
            );
        })
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={open}
            onClose={onClose}
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
                {isMobile && (
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </DrawerHeader>
            <Divider />

            {/* Main Navigation */}
            <SectionHeader>{t('navigation.main')}</SectionHeader>
            <List sx={{ pt: 0 }}>
                {renderNavItems(mainNavItems)}
            </List>

            {/* Compute & Storage */}
            <SectionHeader>{t('navigation.computeStorage')}</SectionHeader>
            <List sx={{ pt: 0 }}>
                {renderNavItems(computeStorageItems)}
            </List>

            {/* Admin Panel - Only show if user is admin */}
            {isAdmin && (
                <>
                    <Divider sx={{ my: 1 }} />
                    <ListItem
                        button
                        onClick={handleAdminPanelToggle}
                        sx={{
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <AdminIcon  />
                        </ListItemIcon>
                        <ListItemText
                            primary={t('navigation.adminPanel')}
                            primaryTypographyProps={{ fontWeight: 600 }}
                        />
                        {adminPanelOpen ? <ExpandLess  /> : <ExpandMore  />}
                    </ListItem>
                    <Collapse in={adminPanelOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ pl: 1 }}>
                            {renderNavItems(adminNavItems, true)}
                        </List>
                    </Collapse>
                </>
            )}

            {/* Support Section */}
            <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ my: 1 }} />
                <SectionHeader>{t('navigation.support')}</SectionHeader>
                <List>
                    {renderNavItems(supportNavItems)}
                </List>
            </Box>
        </Drawer>
    );
};

export default NavigationDrawer;