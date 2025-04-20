import { useState, useMemo, createContext, useContext } from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { 
  Typography, 
  CssBaseline, 
  ThemeProvider, 
  PaletteMode,
  IconButton,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppProvider } from './context/AppContext';

// Import from consolidated styles file
import {
  createAppTheme,
  MainContainer,
  ContentContainer,
  StyledAppBar,
  StyledToolbar,
  AppTitle,
  NavContainer,
  NavLink,
  MainContent,
  HomeContent,
  StyledRouterLink
} from './styles/styles';

// Import components
import CourseTypeManagement from './components/CourseType/CourseTypeManagement';
import CourseManagement from './components/Course/CourseManagement';
import CourseOfferingManagement from './components/CourseOffering/CourseOfferingManagement';
import StudentRegistrationManagement from './components/StudentRegistration/StudentRegistrationManagement';

// Color mode context
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode
});

// Custom hook to use the color mode
export const useColorMode = () => useContext(ColorModeContext);

// Navigation component with active link highlighting
const Navigation = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <StyledRouterLink to="/course-types">
        <NavLink className={location.pathname === '/course-types' ? 'active' : ''}>
          Course Types
        </NavLink>
      </StyledRouterLink>
      <StyledRouterLink to="/courses">
        <NavLink className={location.pathname === '/courses' ? 'active' : ''}>
          Courses
        </NavLink>
      </StyledRouterLink>
      <StyledRouterLink to="/course-offerings">
        <NavLink className={location.pathname === '/course-offerings' ? 'active' : ''}>
          Course Offering
        </NavLink>
      </StyledRouterLink>
      <StyledRouterLink to="/student-registrations">
        <NavLink className={location.pathname === '/student-registrations' ? 'active' : ''}>
          Registrations
        </NavLink>
      </StyledRouterLink>
    </NavContainer>
  );
};

function App() {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    // Check if there's a saved preference in localStorage
    localStorage.getItem('colorMode') as PaletteMode || 
    // Otherwise use system preference
    (prefersDarkMode ? 'dark' : 'light')
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
      },
      mode,
    }),
    [mode],
  );

  // Create theme based on the current mode using the imported function
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Router>
            <CssBaseline />
            <MainContainer>
              <ContentContainer maxWidth="lg">
                <StyledAppBar position="static" color="primary">
                  <StyledToolbar>
                    <Tooltip title="Student Registration System" arrow placement="bottom">
                      <StyledRouterLink to="/">
                        <AppTitle variant="h6">
                          StudReg
                        </AppTitle>
                      </StyledRouterLink>
                    </Tooltip>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Navigation />
                      <IconButton 
                        onClick={colorMode.toggleColorMode} 
                        color="inherit"
                        sx={{ ml: 2 }}
                        aria-label="toggle dark mode"
                      >
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                      </IconButton>
                    </div>
                  </StyledToolbar>
                </StyledAppBar>

                <MainContent>
                  <Routes>
                    <Route path="/" element={
                      <HomeContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                          Welcome to Student Registration System
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Use the navigation menu to manage course types, courses, course offering, and student registrations.
                        </Typography>
                      </HomeContent>
                    } />
                    <Route path="/course-types" element={<CourseTypeManagement />} />
                    <Route path="/courses" element={<CourseManagement />} />
                    <Route path="/course-offerings" element={<CourseOfferingManagement />} />
                    <Route path="/student-registrations" element={<StudentRegistrationManagement />} />
                  </Routes>
                </MainContent>
              </ContentContainer>
            </MainContainer>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
