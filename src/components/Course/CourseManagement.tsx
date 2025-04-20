import React, { useState } from 'react';
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
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const CourseManagement: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ id: '', name: '' });
  const [nameError, setNameError] = useState('');

  const handleOpen = () => {
    setCurrentCourse({ id: '', name: '' });
    setIsEditing(false);
    setNameError('');
    setOpen(true);
  };

  const handleEdit = (course: { id: string; name: string }) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setNameError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!currentCourse.name.trim()) {
      setNameError('Course name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (isEditing) {
      updateCourse(currentCourse.id, currentCourse.name);
    } else {
      addCourse(currentCourse.name);
    }
    
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 1000, 
      margin: '0 auto', 
      p: 2,
      bgcolor: 'background.paper',
      boxShadow: 1,
      borderRadius: 2
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', width: { xs: '100%', sm: 'auto' } }}>
          Courses
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} hover>
                <TableCell>{course.name}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(course)} color="primary" sx={{ mx: 0.5 }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(course.id)} color="error" sx={{ mx: 0.5 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                  No courses available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>{isEditing ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            fullWidth
            value={currentCourse.name}
            onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
            error={!!nameError}
            helperText={nameError}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement; 