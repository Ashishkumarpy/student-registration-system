import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  Button
} from '@mui/material';
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

const CourseTypeManagement: React.FC = () => {
  const { courseTypes, addCourseType, updateCourseType, deleteCourseType } = useAppContext();
  
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseType, setCurrentCourseType] = useState({ id: '', name: '' });
  const [nameError, setNameError] = useState('');

  const handleOpen = () => {
    setCurrentCourseType({ id: '', name: '' });
    setIsEditing(false);
    setNameError('');
    setOpen(true);
  };

  const handleEdit = (courseType: { id: string; name: string }) => {
    setCurrentCourseType(courseType);
    setIsEditing(true);
    setNameError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!currentCourseType.name.trim()) {
      setNameError('Course type name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (isEditing) {
      updateCourseType(currentCourseType.id, currentCourseType.name);
    } else {
      addCourseType(currentCourseType.name);
    }
    
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      deleteCourseType(id);
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle variant="h4">Course Types</PageTitle>
        <ActionButton 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
        >
          Add Course Type
        </ActionButton>
      </HeaderContainer>

      <StyledTableContainer>
        <StyledPaper>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>Name</StyledHeaderCell>
                <StyledHeaderCell align="right">Actions</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {courseTypes.map((courseType) => (
                <StyledTableRow key={courseType.id}>
                  <TableCell>{courseType.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(courseType)} color="primary" sx={{ mx: 0.5 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(courseType.id)} color="error" sx={{ mx: 0.5 }}>
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
              {courseTypes.length === 0 && (
                <TableRow>
                  <EmptyStateCell colSpan={2}>
                    No course types available
                  </EmptyStateCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledPaper>
      </StyledTableContainer>

      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>{isEditing ? 'Edit Course Type' : 'Add Course Type'}</StyledDialogTitle>
        <StyledDialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Type Name"
            fullWidth
            value={currentCourseType.name}
            onChange={(e) => setCurrentCourseType({ ...currentCourseType, name: e.target.value })}
            error={!!nameError}
            helperText={nameError}
          />
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
    </PageContainer>
  );
};

export default CourseTypeManagement; 