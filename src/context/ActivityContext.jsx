import React, { createContext, useContext, useState, useEffect } from 'react';
import initialActivities from '../data/activities.json';
import initialCategories from '../data/categories.json';

const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('aps_activities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[0]?.studentUid?.startsWith('u2480')) return parsed;
      } catch (e) {}
    }
    return initialActivities;
  });

  const [categories] = useState(initialCategories);

  useEffect(() => {
    localStorage.setItem('aps_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activityData) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      studentUid: activityData.studentUid,
      activityName: activityData.activityName,
      category: activityData.category,
      categoryId: activityData.categoryId,
      date: activityData.date || new Date().toISOString().split('T')[0],
      pointsClaimed: Number(activityData.pointsClaimed),
      pointsApproved: activityData.autoApprove ? Number(activityData.pointsClaimed) : 0,
      status: activityData.autoApprove ? 'Approved' : 'Pending',
      description: activityData.description,
      certificate: activityData.certificate || 'certificate_doc.pdf',
    };

    setActivities((prev) => [newActivity, ...prev]);
    return newActivity;
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const updateStatus = (id, newStatus, approvedPoints = null) => {
    setActivities((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const points = approvedPoints !== null ? approvedPoints : (newStatus === 'Approved' ? a.pointsClaimed : 0);
          return {
            ...a,
            status: newStatus,
            pointsApproved: points,
          };
        }
        return a;
      })
    );
  };

  const resetToDefault = () => {
    setActivities(initialActivities);
    localStorage.removeItem('aps_activities');
  };

  // Compute student stats
  const getStudentMetrics = (studentUid, targetPoints = 100) => {
    const studentActivities = activities.filter((a) => a.studentUid === studentUid);
    
    const approvedActivities = studentActivities.filter((a) => a.status === 'Approved');
    const pendingActivities = studentActivities.filter((a) => a.status === 'Pending');

    const totalEarned = approvedActivities.reduce((acc, curr) => acc + (curr.pointsApproved || 0), 0);
    const pendingPoints = pendingActivities.reduce((acc, curr) => acc + (curr.pointsClaimed || 0), 0);
    const pendingCount = pendingActivities.length;
    const remaining = Math.max(0, targetPoints - totalEarned);

    // Calculate this month / semester points
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthEarned = approvedActivities.reduce((sum, act) => {
      const d = new Date(act.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        return sum + (act.pointsApproved || 0);
      }
      return sum;
    }, 0);

    // Category breakdown
    const categoryStats = categories.map((cat) => {
      const catActs = studentActivities.filter(
        (a) => a.categoryId === cat.id || a.category.toLowerCase().includes(cat.id)
      );
      const catApprovedPoints = catActs
        .filter((a) => a.status === 'Approved')
        .reduce((sum, a) => sum + (a.pointsApproved || 0), 0);
      const catClaimedPoints = catActs.reduce((sum, a) => sum + (a.pointsClaimed || 0), 0);

      return {
        ...cat,
        approvedPoints: catApprovedPoints,
        claimedPoints: catClaimedPoints,
        percentage: Math.min(100, Math.round((catApprovedPoints / cat.maxPoints) * 100)),
      };
    });

    return {
      studentActivities,
      totalEarned,
      targetPoints,
      remaining,
      pendingCount,
      pendingPoints,
      thisMonthEarned: thisMonthEarned > 0 ? thisMonthEarned : 35, // friendly fallback for demo
      totalActivitiesCount: studentActivities.length,
      categoryStats,
    };
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        categories,
        addActivity,
        deleteActivity,
        updateStatus,
        resetToDefault,
        getStudentMetrics,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};
