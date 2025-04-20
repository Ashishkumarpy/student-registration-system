import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CourseType, Course, CourseOffering, Student, StudentRegistration } from '../types';

interface AppContextProps {
  courseTypes: CourseType[];
  courses: Course[];
  courseOfferings: CourseOffering[];
  students: Student[];
  studentRegistrations: StudentRegistration[];
  addCourseType: (name: string) => void;
  updateCourseType: (id: string, name: string) => void;
  deleteCourseType: (id: string) => void;
  addCourse: (name: string) => void;
  updateCourse: (id: string, name: string) => void;
  deleteCourse: (id: string) => void;
  addCourseOffering: (courseId: string, courseTypeId: string) => void;
  updateCourseOffering: (id: string, courseId: string, courseTypeId: string) => void;
  deleteCourseOffering: (id: string) => void;
  addStudent: (name: string, email: string) => void;
  registerStudent: (studentId: string, courseOfferingId: string) => void;
  getStudentsByOffering: (courseOfferingId: string) => Student[];
  getCourseById: (id: string) => Course | undefined;
  getCourseTypeById: (id: string) => CourseType | undefined;
  getCourseOfferingById: (id: string) => CourseOffering | undefined;
  getFilteredOfferings: (courseTypeId: string) => CourseOffering[];
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([
    { id: uuidv4(), name: 'Individual' },
    { id: uuidv4(), name: 'Group' },
    { id: uuidv4(), name: 'Special' }
  ]);
  
  const [courses, setCourses] = useState<Course[]>([
    { id: uuidv4(), name: 'Hindi' },
    { id: uuidv4(), name: 'English' },
    { id: uuidv4(), name: 'Urdu' }
  ]);
  
  const [courseOfferings, setCourseOfferings] = useState<CourseOffering[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentRegistrations, setStudentRegistrations] = useState<StudentRegistration[]>([]);

  const addCourseType = (name: string) => {
    setCourseTypes([...courseTypes, { id: uuidv4(), name }]);
  };

  const updateCourseType = (id: string, name: string) => {
    setCourseTypes(
      courseTypes.map(ct => (ct.id === id ? { ...ct, name } : ct))
    );
  };

  const deleteCourseType = (id: string) => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    // Clean up related course offerings
    setCourseOfferings(courseOfferings.filter(co => co.courseTypeId !== id));
  };

  const addCourse = (name: string) => {
    setCourses([...courses, { id: uuidv4(), name }]);
  };

  const updateCourse = (id: string, name: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, name } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    // Clean up related course offerings
    setCourseOfferings(courseOfferings.filter(co => co.courseId !== id));
  };

  const addCourseOffering = (courseId: string, courseTypeId: string) => {
    // Check if this combination already exists
    const exists = courseOfferings.some(
      offering => offering.courseId === courseId && offering.courseTypeId === courseTypeId
    );
    
    // If it exists, don't add a duplicate
    if (exists) {
      return;
    }
    
    setCourseOfferings([
      ...courseOfferings,
      { 
        id: uuidv4(), 
        courseId, 
        courseTypeId, 
        createdAt: new Date().toISOString() 
      }
    ]);
  };

  const updateCourseOffering = (
    id: string,
    courseId: string,
    courseTypeId: string
  ) => {
    // Check if this combination already exists in another offering
    const exists = courseOfferings.some(
      offering => 
        offering.courseId === courseId && 
        offering.courseTypeId === courseTypeId && 
        offering.id !== id // Exclude the current offering
    );
    
    // If it exists, don't update
    if (exists) {
      return;
    }
    
    setCourseOfferings(
      courseOfferings.map(co =>
        co.id === id ? { ...co, courseId, courseTypeId } : co
      )
    );
  };

  const deleteCourseOffering = (id: string) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
    // Clean up related student registrations
    setStudentRegistrations(
      studentRegistrations.filter(sr => sr.courseOfferingId !== id)
    );
  };

  const addStudent = (name: string, email: string) => {
    setStudents([...students, { id: uuidv4(), name, email }]);
  };

  const registerStudent = (studentId: string, courseOfferingId: string) => {
    // Get the course offering
    const courseOffering = courseOfferings.find(co => co.id === courseOfferingId);
    if (!courseOffering) return;
    
    // Find course ID for the selected offering
    const courseId = courseOffering.courseId;
    
    // Check if student is already registered for any offering with this course 
    // (regardless of course type)
    const hasExistingRegistrationForCourse = studentRegistrations.some(reg => {
      // Get course offering for this registration
      const offering = courseOfferings.find(co => co.id === reg.courseOfferingId);
      // Check if student ID matches and course matches
      return reg.studentId === studentId && 
             offering && 
             offering.courseId === courseId;
    });
    
    // If already registered for this course, don't add
    if (hasExistingRegistrationForCourse) {
      return;
    }
    
    setStudentRegistrations([
      ...studentRegistrations,
      {
        id: uuidv4(),
        studentId,
        courseOfferingId,
        registrationDate: new Date().toISOString()
      }
    ]);
  };

  const getStudentsByOffering = (courseOfferingId: string): Student[] => {
    const registrationIds = studentRegistrations
      .filter(sr => sr.courseOfferingId === courseOfferingId)
      .map(sr => sr.studentId);
    
    return students.filter(student => registrationIds.includes(student.id));
  };

  const getCourseById = (id: string): Course | undefined => {
    return courses.find(c => c.id === id);
  };

  const getCourseTypeById = (id: string): CourseType | undefined => {
    return courseTypes.find(ct => ct.id === id);
  };
  
  const getCourseOfferingById = (id: string): CourseOffering | undefined => {
    return courseOfferings.find(co => co.id === id);
  };

  const getFilteredOfferings = (courseTypeId: string): CourseOffering[] => {
    if (!courseTypeId) return courseOfferings;
    return courseOfferings.filter(co => co.courseTypeId === courseTypeId);
  };

  return (
    <AppContext.Provider
      value={{
        courseTypes,
        courses,
        courseOfferings,
        students,
        studentRegistrations,
        addCourseType,
        updateCourseType,
        deleteCourseType,
        addCourse,
        updateCourse,
        deleteCourse,
        addCourseOffering,
        updateCourseOffering,
        deleteCourseOffering,
        addStudent,
        registerStudent,
        getStudentsByOffering,
        getCourseById,
        getCourseTypeById,
        getCourseOfferingById,
        getFilteredOfferings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}; 