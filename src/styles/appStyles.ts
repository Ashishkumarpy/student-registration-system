import { styled } from '@mui/material/styles';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Main container for the entire app
export const MainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
  minHeight: '100vh',
}));

// Container for content
export const ContentContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  width: '100%',
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// App header bar
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  width: '100%',
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Toolbar within app bar
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
    gap: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  }
}));

// App title
export const AppTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
  textAlign: 'center',
  fontSize: '1.3rem',
  fontWeight: 600,
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : '#000000',
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'rgba(0, 0, 0, 0.7)',
  }
}));

// Navigation container
export const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

// Navigation link
export const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : '#000000',
  fontWeight: 500,
  padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
  borderRadius: 0,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  textTransform: 'none',
  minWidth: 'auto',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.mode === 'dark' ? '#e0e0e0' : 'rgba(0, 0, 0, 0.7)',
    boxShadow: 'none',
  },
  '&:after': {
    content: '""',
    display: 'block',
    width: '0',
    height: '2px',
    backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000',
    transition: 'width 0.3s',
  },
  '&:hover:after': {
    width: '100%',
  }
}));

// Custom Router Link
export const StyledRouterLink = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
});

// Main content container
export const MainContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Home page content
export const HomeContent = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(4)} 0`,
  textAlign: 'center',
  width: '100%',
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.standard,
  }),
})); 