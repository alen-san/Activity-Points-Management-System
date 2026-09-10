import React, { createContext, useContext, useState, useEffect } from 'react';
import initialStudents from '../data/students.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('aps_students');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[0]?.uid?.startsWith('u2480')) return parsed;
      } catch (e) {}
    }
    return initialStudents;
  });

  const [currentStudent, setCurrentStudent] = useState(() => {
    const saved = localStorage.getItem('aps_current_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.uid?.startsWith('u2480')) return parsed;
      } catch (e) {
        console.error('Failed to parse saved student', e);
      }
    }
    return initialStudents[0];
  });

  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('aps_current_student', JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem('aps_current_student');
    }
  }, [currentStudent]);

  const login = (uid, password) => {
    const found = students.find(
      (s) => s.uid.toLowerCase() === uid.trim().toLowerCase() && s.password === password
    );

    if (found) {
      setCurrentStudent(found);
      return { success: true, student: found };
    }

    return { success: false, message: 'Invalid UID or Password. Try UID: u248010 and Password: pass' };
  };

  const logout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('aps_current_student');
  };

  return (
    <AuthContext.Provider value={{ currentStudent, students, login, logout, setCurrentStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
