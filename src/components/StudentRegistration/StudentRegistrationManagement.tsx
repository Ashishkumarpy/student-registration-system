import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppContext } from '../../context/AppContext';
import { StudentRegistration } from '../../types';
import AddIcon from '@mui/icons-material/Add';

// Define sort columns and directions for tables
type StudentSortColumn = 'name' | 'email';
type CourseSortColumn = 'type' | 'course';
type SortDirection = 'asc' | 'desc';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const StudentRegistrationManagement: React.FC = () => {
  const { 
    courseOfferings, 
    courseTypes,
    students, 
    addStudent,
    registerStudent,
    getStudentsByOffering,
    getCourseById,
    getCourseTypeById,
    getFilteredOfferings,
    studentRegistrations
  } = useAppContext();
  
  const [tabValue, setTabValue] = useState(0);
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [studentIdError, setStudentIdError] = useState('');
  const [offeringIdError, setOfferingIdError] = useState('');
  
  // Sorting state
  const [studentSortColumn, setStudentSortColumn] = useState<StudentSortColumn>('name');
  const [studentSortDirection, setStudentSortDirection] = useState<SortDirection>('asc');
  const [courseSortColumn, setCourseSortColumn] = useState<CourseSortColumn>('course');
  const [courseSortDirection, setCourseSortDirection] = useState<SortDirection>('asc');
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  // Filtered offerings based on selected course type
  const filteredOfferings = getFilteredOfferings(selectedCourseTypeId);

  // Group registrations by student
  const studentRegistrationMap = useMemo(() => {
    const map = new Map<string, {
      student: any,
      registrations: Array<{
        id: string;
        courseOfferingId: string;
        courseName: string;
        courseTypeName: string;
        offeringName: string;
        registrationDate: string;
      }>
    }>();
    
    // Include all students, even those without registrations
    students.forEach(student => {
      const studentRegs = studentRegistrations.filter((reg: StudentRegistration) => reg.studentId === student.id);
      
      map.set(student.id, {
        student,
        registrations: studentRegs.map((reg: StudentRegistration) => {
          const offering = courseOfferings.find(co => co.id === reg.courseOfferingId);
          if (!offering) return null;
          
          const course = getCourseById(offering.courseId);
          const courseType = getCourseTypeById(offering.courseTypeId);
          
          return {
            ...reg,
            courseName: course?.name || 'Unknown',
            courseTypeName: courseType?.name || 'Unknown',
            offeringName: `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`
          };
        }).filter(Boolean) as any
      });
    });
    
    return map;
  }, [students, studentRegistrations, courseOfferings, getCourseById, getCourseTypeById]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenStudentDialog = () => {
    setNewStudent({ name: '', email: '' });
    setNameError('');
    setEmailError('');
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
  };

  const handleOpenRegistrationDialog = () => {
    setSelectedStudentId('');
    setSelectedOfferingId('');
    setStudentIdError('');
    setOfferingIdError('');
    setOpenRegistrationDialog(true);
  };

  const handleCloseRegistrationDialog = () => {
    setOpenRegistrationDialog(false);
  };
  
  // Handle sorting for student table
  const handleStudentSortClick = (column: StudentSortColumn) => {
    if (studentSortColumn === column) {
      // Toggle direction if same column
      setStudentSortDirection(studentSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setStudentSortColumn(column);
      setStudentSortDirection('asc');
    }
  };
  
  // Handle sorting for course offering table
  const handleCourseSortClick = (column: CourseSortColumn) => {
    if (courseSortColumn === column) {
      // Toggle direction if same column
      setCourseSortDirection(courseSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setCourseSortColumn(column);
      setCourseSortDirection('asc');
    }
  };
  
  // Helper to render sort icons for student table
  const renderStudentSortIcon = (column: StudentSortColumn) => {
    if (studentSortColumn !== column) {
      return null;
    }
    
    return studentSortDirection === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };
  
  // Helper to render sort icons for course offering table
  const renderCourseSortIcon = (column: CourseSortColumn) => {
    if (courseSortColumn !== column) {
      return null;
    }
    
    return courseSortDirection === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };
  
  // Get sorted students
  const getSortedStudents = () => {
    return [...students].sort((a, b) => {
      let comparison = 0;
      
      switch (studentSortColumn) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        default:
          comparison = 0;
      }
      
      return studentSortDirection === 'asc' ? comparison : -comparison;
    });
  };
  
  // Get sorted course offerings
  const getSortedCourseOfferings = () => {
    return courseOfferings
      .map(offering => {
        const courseType = getCourseTypeById(offering.courseTypeId);
        const course = getCourseById(offering.courseId);
        return {
          offering,
          courseType,
          course,
          courseTypeName: courseType?.name || 'Unknown',
          courseName: course?.name || 'Unknown'
        };
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (courseSortColumn) {
          case 'type':
            comparison = a.courseTypeName.localeCompare(b.courseTypeName);
            break;
          case 'course':
            comparison = a.courseName.localeCompare(b.courseName);
            break;
          default:
            comparison = 0;
        }
        
        return courseSortDirection === 'asc' ? comparison : -comparison;
      });
  };

  const validateStudentForm = () => {
    let isValid = true;
    
    if (!newStudent.name.trim()) {
      setNameError('Student name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newStudent.email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(newStudent.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    return isValid;
  };

  const validateRegistrationForm = () => {
    let isValid = true;
    
    if (!selectedStudentId) {
      setStudentIdError('Student is required');
      isValid = false;
    } else {
      setStudentIdError('');
    }
    
    if (!selectedOfferingId) {
      setOfferingIdError('Course offering is required');
      isValid = false;
    } else {
      setOfferingIdError('');
    }
    
    return isValid;
  };

  const handleSaveStudent = () => {
    if (!validateStudentForm()) return;
    
    addStudent(newStudent.name, newStudent.email);
    handleCloseStudentDialog();
  };

  const handleSaveRegistration = () => {
    if (!validateRegistrationForm()) return;
    
    // Get the course offering
    const courseOffering = courseOfferings.find(co => co.id === selectedOfferingId);
    if (!courseOffering) return;
    
    // Find course ID and course name for the selected offering
    const courseId = courseOffering.courseId;
    const courseName = getCourseById(courseId)?.name;
    
    // Check if student is already registered for any offering with this course
    // (regardless of course type)
    const hasExistingRegistrationForCourse = studentRegistrations.some(reg => {
      // Get course offering for this registration
      const offering = courseOfferings.find(co => co.id === reg.courseOfferingId);
      // Check if student ID matches and course matches
      return reg.studentId === selectedStudentId && 
             offering && 
             offering.courseId === courseId;
    });
    
    if (hasExistingRegistrationForCourse) {
      // Show error message about course
      setSnackbarMessage(`Student is already registered for ${courseName} course!`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    registerStudent(selectedStudentId, selectedOfferingId);
    handleCloseRegistrationDialog();
    
    // Show success message
    setSnackbarMessage('Registration successful!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const getOfferingName = (courseId: string, courseTypeId: string) => {
    const course = getCourseById(courseId);
    const courseType = getCourseTypeById(courseTypeId);
    
    if (course && courseType) {
      return `${courseType.name} - ${course.name}`;
    }
    
    return 'Unknown Offering';
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="registration tabs">
          <Tab label="Register Students" />
          <Tab label="View Registrations" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', width: { xs: '100%', sm: 'auto' } }}>
            Student Registrations
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', sm: 'flex-end' }, width: { xs: '100%', sm: 'auto' } }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleOpenStudentDialog}
              sx={{ mr: 2 }}
            >
              Add New Student
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleOpenRegistrationDialog}
              sx={{ borderRadius: 2 }}
            >
              Register for Course
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={3} justifyContent="center">
          <Box flex="1" minWidth="300px" sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
              Students
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                        onClick={() => handleStudentSortClick('name')}>
                        Name {renderStudentSortIcon('name')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                        onClick={() => handleStudentSortClick('email')}>
                        Email {renderStudentSortIcon('email')}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedStudents().map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                    </TableRow>
                  ))}
                  {students.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No students available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box flex="1" minWidth="300px" sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
              Course Offering
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                        onClick={() => handleCourseSortClick('type')}>
                        Course Type {renderCourseSortIcon('type')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                        onClick={() => handleCourseSortClick('course')}>
                        Course {renderCourseSortIcon('course')}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedCourseOfferings().map(({ offering, courseTypeName, courseName }) => (
                    <TableRow key={offering.id}>
                      <TableCell>{courseTypeName}</TableCell>
                      <TableCell>{courseName}</TableCell>
                    </TableRow>
                  ))}
                  {courseOfferings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No course offering available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box mb={4} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            View Registrations
          </Typography>
          <Box mt={2} sx={{ maxWidth: 600, margin: '0 auto' }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Filter by Course Type</InputLabel>
              <Select
                value={selectedCourseTypeId}
                label="Filter by Course Type"
                onChange={(e) => {
                  setSelectedCourseTypeId(e.target.value);
                  setSelectedOfferingId('');
                }}
              >
                <MenuItem value="">
                  <em>All Course Types</em>
                </MenuItem>
                {courseTypes.map((courseType) => (
                  <MenuItem key={courseType.id} value={courseType.id}>
                    {courseType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Student Registration Details
          </Typography>
          
          {Array.from(studentRegistrationMap.entries()).map(([studentId, data]: [string, any]) => (
            <Accordion key={studentId} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`student-${studentId}-content`}
                id={`student-${studentId}-header`}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {data.student.name} ({data.student.email}) - 
                  {data.registrations.length > 0 
                    ? `${data.registrations.length} ${data.registrations.length === 1 ? 'course' : 'courses'}`
                    : 'No courses registered'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.registrations.length > 0 ? (
                  <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                          <TableCell sx={{ color: 'primary.contrastText' }}>Course Type</TableCell>
                          <TableCell sx={{ color: 'primary.contrastText' }}>Course</TableCell>
                          <TableCell sx={{ color: 'primary.contrastText' }}>Registration Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.registrations
                          .filter((reg: any) => 
                            !selectedCourseTypeId || 
                            courseOfferings.find(co => 
                              co.id === reg.courseOfferingId && 
                              co.courseTypeId === selectedCourseTypeId
                            )
                          )
                          .map((reg: any) => (
                            <TableRow key={reg.id} hover>
                              <TableCell>{reg.courseTypeName}</TableCell>
                              <TableCell>{reg.courseName}</TableCell>
                              <TableCell>{new Date(reg.registrationDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        {data.registrations.filter((reg: any) => 
                            !selectedCourseTypeId || 
                            courseOfferings.find(co => 
                              co.id === reg.courseOfferingId && 
                              co.courseTypeId === selectedCourseTypeId
                            )
                          ).length === 0 && selectedCourseTypeId && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              No courses match the selected filter
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ 
                    p: 2, 
                    textAlign: 'center', 
                    bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5', 
                    borderRadius: 2,
                    color: theme => theme.palette.text.primary
                  }}>
                    <Typography>
                      This student has not registered for any courses yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        setSelectedStudentId(studentId);
                        setOpenRegistrationDialog(true);
                      }}
                    >
                      Register for a Course
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}

          {studentRegistrationMap.size === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5', 
              borderRadius: 2,
              color: theme => theme.palette.text.primary
            }}>
              <Typography>No students found. Please add students first.</Typography>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleOpenStudentDialog}
              >
                Add New Student
              </Button>
            </Box>
          )}
        </Box>
      </TabPanel>

      {/* Add Student Dialog */}
      <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            fullWidth
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            error={!!emailError}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveStudent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Register Student Dialog */}
      <Dialog open={openRegistrationDialog} onClose={handleCloseRegistrationDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Register Student for Course</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" error={!!studentIdError}>
            <InputLabel>Student</InputLabel>
            <Select
              value={selectedStudentId}
              label="Student"
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </MenuItem>
              ))}
            </Select>
            {studentIdError && <FormHelperText>{studentIdError}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth margin="dense" error={!!offeringIdError}>
            <InputLabel>Course Offering</InputLabel>
            <Select
              value={selectedOfferingId}
              label="Course Offering"
              onChange={(e) => setSelectedOfferingId(e.target.value)}
            >
              {courseOfferings
                .map(offering => {
                  const course = getCourseById(offering.courseId);
                  const courseType = getCourseTypeById(offering.courseTypeId);
                  return {
                    offering,
                    course,
                    courseType,
                    displayName: `${courseType?.name || ''} - ${course?.name || ''}`
                  };
                })
                .sort((a, b) => {
                  // First sort by course name
                  const courseNameA = a.course?.name || '';
                  const courseNameB = b.course?.name || '';
                  const courseNameCompare = courseNameA.localeCompare(courseNameB);
                  
                  // If course names are the same, sort by course type
                  if (courseNameCompare === 0) {
                    const courseTypeA = a.courseType?.name || '';
                    const courseTypeB = b.courseType?.name || '';
                    return courseTypeA.localeCompare(courseTypeB);
                  }
                  
                  return courseNameCompare;
                })
                .map(({ offering, displayName }) => (
                  <MenuItem key={offering.id} value={offering.id}>
                    {displayName}
                  </MenuItem>
                ))
              }
            </Select>
            {offeringIdError && <FormHelperText>{offeringIdError}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegistrationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveRegistration} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Student Registration Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenRegistrationDialog}
          sx={{ fontWeight: 'bold' }}
        >
          Register Student for Course
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRegistrationManagement; 