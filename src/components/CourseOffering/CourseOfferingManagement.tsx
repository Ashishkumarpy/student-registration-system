import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Snackbar,
  Alert,
  Box,
  IconButton
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppContext } from '../../context/AppContext';
import {
  PageContainer,
  HeaderContainer,
  PageTitle,
  ActionButton,
  StyledTableContainer,
  StyledPaper,
  StyledTableHead,
  StyledHeaderCell,
  StyledTableRow,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  EmptyStateCell
} from '../../styles/componentStyles';

// Define sort columns and directions
type SortColumn = 'name' | 'course' | 'type';
type SortDirection = 'asc' | 'desc';

const CourseOfferingManagement: React.FC = () => {
  const { 
    courseOfferings, 
    courses, 
    courseTypes, 
    addCourseOffering, 
    updateCourseOffering, 
    deleteCourseOffering,
    getCourseById,
    getCourseTypeById
  } = useAppContext();
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOffering, setCurrentOffering] = useState({ 
    id: '', 
    courseId: '', 
    courseTypeId: '' 
  });
  const [courseIdError, setCourseIdError] = useState('');
  const [courseTypeIdError, setCourseTypeIdError] = useState('');
  
  // Sorting state
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');

  const handleOpen = () => {
    setCurrentOffering({ id: '', courseId: '', courseTypeId: '' });
    setIsEditing(false);
    setCourseIdError('');
    setCourseTypeIdError('');
    setOpen(true);
  };

  const handleEdit = (offering: { id: string; courseId: string; courseTypeId: string }) => {
    setCurrentOffering(offering);
    setIsEditing(true);
    setCourseIdError('');
    setCourseTypeIdError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const handleSortClick = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!currentOffering.courseId) {
      setCourseIdError('Course is required');
      isValid = false;
    } else {
      setCourseIdError('');
    }
    
    if (!currentOffering.courseTypeId) {
      setCourseTypeIdError('Course type is required');
      isValid = false;
    } else {
      setCourseTypeIdError('');
    }
    
    // Check for duplicate course and course type combination
    const duplicateOffering = courseOfferings.find(
      offering => 
        offering.courseId === currentOffering.courseId && 
        offering.courseTypeId === currentOffering.courseTypeId &&
        offering.id !== currentOffering.id // Exclude the current offering when editing
    );
    
    if (duplicateOffering) {
      // Get course and course type names for the error message
      const course = getCourseById(currentOffering.courseId);
      const courseType = getCourseTypeById(currentOffering.courseTypeId);
      
      // Set error message
      const errorMessage = `A course offering for "${course?.name}" with type "${courseType?.name}" already exists`;
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      
      isValid = false;
    }
    
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (isEditing) {
      updateCourseOffering(
        currentOffering.id, 
        currentOffering.courseId, 
        currentOffering.courseTypeId
      );
      setSnackbarMessage('Course offering updated successfully');
      setSnackbarSeverity('success');
    } else {
      addCourseOffering(currentOffering.courseId, currentOffering.courseTypeId);
      setSnackbarMessage('Course offering added successfully');
      setSnackbarSeverity('success');
    }
    
    setSnackbarOpen(true);
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      deleteCourseOffering(id);
      setSnackbarMessage('Course offering deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const getOfferingName = (courseId: string, courseTypeId: string) => {
    const course = getCourseById(courseId);
    const courseType = getCourseTypeById(courseTypeId);
    
    if (course && courseType) {
      return `${courseType.name} - ${course.name}`;
    }
    
    return 'Unknown Offering';
  };
  
  // Sort offerings based on selected column and direction
  const getSortedOfferings = () => {
    return courseOfferings
      .map(offering => {
        const course = getCourseById(offering.courseId);
        const courseType = getCourseTypeById(offering.courseTypeId);
        return {
          offering,
          course,
          courseType,
          courseName: course?.name || 'Unknown',
          courseTypeName: courseType?.name || 'Unknown',
          offeringName: getOfferingName(offering.courseId, offering.courseTypeId),
          createdAt: offering.createdAt || new Date(0).toISOString() // Default to epoch if missing
        };
      })
      .sort((a, b) => {
        let comparison = 0;
        
        // Determine which field to sort by
        switch (sortColumn) {
          case 'name':
            comparison = a.offeringName.localeCompare(b.offeringName);
            break;
          case 'course':
            comparison = a.courseName.localeCompare(b.courseName);
            break;
          case 'type':
            comparison = a.courseTypeName.localeCompare(b.courseTypeName);
            break;
          default:
            comparison = 0;
        }
        
        // Apply sort direction
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  };

  // Helper to render sort icons
  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return null;
    }
    
    return sortDirection === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle variant="h4">Course Offering</PageTitle>
        <ActionButton 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
        >
          Add Course Offering
        </ActionButton>
      </HeaderContainer>

      <StyledTableContainer>
        <StyledPaper>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                    onClick={() => handleSortClick('name')}>
                    Name {renderSortIcon('name')}
                  </Box>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                    onClick={() => handleSortClick('course')}>
                    Course {renderSortIcon('course')}
                  </Box>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                    onClick={() => handleSortClick('type')}>
                    Course Type {renderSortIcon('type')}
                  </Box>
                </StyledHeaderCell>
                <StyledHeaderCell align="right">Actions</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {getSortedOfferings().map(({ offering, courseName, courseTypeName }) => (
                <StyledTableRow key={offering.id}>
                  <TableCell>
                    {getOfferingName(offering.courseId, offering.courseTypeId)}
                  </TableCell>
                  <TableCell>{courseName}</TableCell>
                  <TableCell>{courseTypeName}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(offering)} color="primary" sx={{ mx: 0.5 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(offering.id)} color="error" sx={{ mx: 0.5 }}>
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
              {courseOfferings.length === 0 && (
                <TableRow>
                  <EmptyStateCell colSpan={4}>
                    No course offering available
                  </EmptyStateCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledPaper>
      </StyledTableContainer>

      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>
          {isEditing ? 'Edit Course Offering' : 'Add Course Offering'}
        </StyledDialogTitle>
        <StyledDialogContent>
          <FormControl fullWidth margin="dense" error={!!courseIdError}>
            <InputLabel>Course</InputLabel>
            <Select
              value={currentOffering.courseId}
              label="Course"
              onChange={(e) => setCurrentOffering({ ...currentOffering, courseId: e.target.value })}
            >
              {courses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
            </Select>
            {courseIdError && <FormHelperText>{courseIdError}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth margin="dense" error={!!courseTypeIdError}>
            <InputLabel>Course Type</InputLabel>
            <Select
              value={currentOffering.courseTypeId}
              label="Course Type"
              onChange={(e) => setCurrentOffering({ ...currentOffering, courseTypeId: e.target.value })}
            >
              {courseTypes
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((courseType) => (
                  <MenuItem key={courseType.id} value={courseType.id}>
                    {courseType.name}
                  </MenuItem>
                ))}
            </Select>
            {courseTypeIdError && <FormHelperText>{courseTypeIdError}</FormHelperText>}
          </FormControl>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </StyledDialogActions>
      </StyledDialog>
      
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
    </PageContainer>
  );
};

export default CourseOfferingManagement; 