export interface CourseType {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  courseTypeId: string;
  name?: string; // Derived from course and course type names
  createdAt?: string; // Timestamp when the offering was created
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface StudentRegistration {
  id: string;
  studentId: string;
  courseOfferingId: string;
  registrationDate: string;
} 