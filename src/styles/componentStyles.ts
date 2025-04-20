import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Button, 
  TableContainer, 
  TableCell, 
  TableHead, 
  TableRow, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Paper
} from '@mui/material';

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
export const StyledTableContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.contrastText,
  fontWeight: 'bold',
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)'
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

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
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
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.contrastText,
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