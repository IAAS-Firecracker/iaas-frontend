import React from 'react';
import { Paper, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Chip, IconButton, Box } from '@mui/material';
import { PersonAdd as PersonAddIcon, MoreVert as MoreVertIcon, People as AdminIcon, Person as PersonIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const UserManagement = ({ t }) => {
  const theme = useTheme();

  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Marie Lambert', email: 'marie@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Admin', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Pierre Durand', email: 'pierre@example.com', role: 'user', status: 'inactive' },
  ];

  const handleUserAction = (action, userId) => {
    console.log(`User action: ${action} for user ${userId}`);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          {t('dashboard.userManagement.title')}
        </Typography>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<PersonAddIcon />}
          onClick={() => handleUserAction('add')}
        >
          {t('dashboard.userManagement.addUser')}
        </Button>
      </Box>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('common.user')}</TableCell>
              <TableCell>{t('common.email')}</TableCell>
              <TableCell>{t('common.role')}</TableCell>
              <TableCell>{t('common.status')}</TableCell>
              <TableCell align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 30, 
                        height: 30, 
                        mr: 1,
                        bgcolor: user.role === 'admin' ? theme.palette.error.main : theme.palette.primary.main
                      }}
                    >
                      {user.role === 'admin' ? <AdminIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                    </Avatar>
                    <Typography variant="body2">{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    label={t(`roles.${user.role}`)} 
                    color={user.role === 'admin' ? 'error' : 'primary'}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    label={t(`status.${user.status}`)} 
                    color={user.status === 'active' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleUserAction('edit', user.id)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: 'right' }}>
        <Button size="small" onClick={() => handleUserAction('viewAll')}>
          {t('dashboard.userManagement.viewAll')}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserManagement;