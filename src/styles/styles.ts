import { styled } from '@mui/material/styles';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  Paper,
  Button,
  TextField, 
  createTheme,
  PaletteMode,
  Table,
  TableContainer as MuiTableContainer,
  TableCell, 
  TableHead, 
  TableRow, 
  Dialog, 
  DialogTitle, 
  DialogContent as MuiDialogContent, 
  DialogActions as MuiDialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';

// ====================================================
// THEME CONFIGURATION
// ====================================================

// Create custom theme
export const createAppTheme = (mode: PaletteMode) => 
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#3f51b5' : '#a7c0c5',
        light: mode === 'light' ? '#757de8' : '#d7e3e7',
        dark: mode === 'light' ? '#002984' : '#7b929a',
        contrastText: mode === 'light' ? '#000000' : '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#ff4081' : '#ff4081',
        light: mode === 'light' ? '#ff79b0' : '#ff79b0',
        dark: mode === 'light' ? '#c60055' : '#c60055',
        contrastText: mode === 'light' ? '#000000' : '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f8f9fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#424242' : '#b0b0b0',
      },
      error: {
        main: mode === 'light' ? '#f44336' : '#f44336',
      },
      warning: {
        main: mode === 'light' ? '#ff9800' : '#ff9800',
      },
      info: {
        main: mode === 'light' ? '#2196f3' : '#2196f3',
      },
      success: {
        main: mode === 'light' ? '#4caf50' : '#4caf50',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
        color: mode === 'light' ? '#000000' : '#ffffff',
      },
      h6: {
        fontWeight: 600,
        color: mode === 'light' ? '#000000' : '#ffffff',
      },
      button: {
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: mode === 'light' ? 2 : 3,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            ...(mode === 'light' && {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px 0 rgba(0,0,0,0.05)' 
              : '0 2px 12px 0 rgba(0,0,0,0.5)',
            ...(mode === 'light' && {
              backgroundImage: 'none',
              backgroundColor: '#f0f0f0',
              color: '#000000'
            }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              ...(mode === 'light' && {
                backgroundColor: '#e0e0e0',
              }),
            },
          },
          containedPrimary: {
            ...(mode === 'light' && {
              backgroundImage: 'none',
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }),
          },
          containedSecondary: {
            ...(mode === 'light' && {
              backgroundImage: 'none',
              backgroundColor: '#ff4081',
              '&:hover': {
                backgroundColor: '#f50057',
              },
            }),
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'light' ? '#121212' : '#f5f5f5',
            color: mode === 'light' ? '#ffffff' : '#121212',
            fontSize: '0.85rem',
            fontWeight: 500,
            padding: '8px 12px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
            maxWidth: 220,
            borderRadius: 6,
          },
          arrow: {
            color: mode === 'light' ? '#121212' : '#f5f5f5',
          }
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            ...(mode === 'light' && {
              backgroundImage: 'none',
              backgroundColor: '#f0f0f0',
            }),
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            ...(mode === 'light' && {
              color: '#000000',
              fontWeight: 600,
            }),
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: mode === 'light' 
                ? 'rgba(0, 0, 0, 0.08)' 
                : 'rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            width: '100%',
            height: '100%',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        },
      },
    },
  });

// ====================================================
// APP LAYOUT STYLES (from appStyles.ts)
// ====================================================

// Main container for the entire app
export const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

// Container for content
export const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
}));

// App header bar
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  borderRadius: '12px',
  margin: theme.spacing(1.5),
  boxShadow: theme.shadows[2],
}));

// Toolbar within app bar
export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 20px',
  minHeight: '64px',
});

// App title
export const AppTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0.5,
  color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main,
  },
}));

// Navigation container
export const NavContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

// Navigation link
export const NavLink = styled(Typography)(({ theme }) => ({
  margin: '0 12px',
  fontWeight: 500,
  fontSize: '0.95rem',
  padding: '6px 0',
  position: 'relative',
  color: theme.palette.mode === 'light' ? theme.palette.text.secondary : theme.palette.primary.light,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main,
    '&::after': {
      width: '100%',
      opacity: 0.5,
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease, opacity 0.3s ease',
    opacity: 0,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 700,
    '&::after': {
      width: '100%',
      opacity: 1,
    }
  }
}));

// Custom Router Link
export const StyledRouterLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
});

// Main content container
export const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

// Home page content
export const HomeContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '70vh',
}));

// ====================================================
// COMPONENT STYLES (from componentStyles.ts)
// ====================================================

// Page container
export const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius * 2,
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Header container
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  }
}));

// Page title
export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto'
  },
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Action button
export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Table styles
export const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  overflow: 'auto',
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: 8,
  overflow: 'hidden',
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& .MuiTableCell-root': {
    color: theme.palette.text.primary,
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
  },
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Dialog styles
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
  }
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

// Content box for flexible layouts
export const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  justifyContent: 'center'
}));

export const ContentPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 300,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const PanelHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: 'center',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

// Empty state container
export const EmptyStateCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const FormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  padding: theme.spacing(0.75, 2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
  },
}));

export const TableActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const StyledTable = styled(Table)({
  tableLayout: 'fixed',
});

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const DialogContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const DialogActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const TabContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SelectContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

export const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
})); 