# Student Registration System

A React application for managing student registrations for various courses and course types.

## Features

### Course Types Management
- Create new course types (e.g., Individual, Group, Special)
- List existing course types
- Update course type names
- Delete course types

### Courses Management
- Create new courses (e.g., Hindi, English, Urdu)
- List existing courses
- Update course names
- Delete courses

### Course Offering Management
- Create course offering by associating a course with a course type
- List all available course offering options
- Update course and course type associations
- Delete course offering entries

### Student Registration Management
- Add new students with name and email
- Register students for specific course offering
- View registered students for a specific course offering
- Filter available course offering by course type

## Technologies Used

- React
- TypeScript
- Material-UI for component styling
- React Router for navigation
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (version 14.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Project Structure

- `/src/components` - React components organized by feature
- `/src/context` - Context providers for application state
- `/src/types` - TypeScript type definitions

## Usage

1. First, create course types if needed (or use the defaults: Individual, Group, Special)
2. Create courses or use the default ones (Hindi, English, Urdu)
3. Create course offering by combining a course and course type
4. Add students and register them for a specific course offering
5. View registrations by selecting a course offering

## Deployment

To build the application for production:
```
npm run build
```

The build output will be in the `dist` directory, which can be deployed to any static hosting service.
