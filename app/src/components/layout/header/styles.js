import { alpha, styled } from '@mui/material/styles';
import { InputBase, FormControl } from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
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
        display: 'none'
    },
}));

export const MobileSearch = styled('div')(({ theme }) => ({
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

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1.5, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

export const LanguageSelector = styled(FormControl)(({ theme }) => ({
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