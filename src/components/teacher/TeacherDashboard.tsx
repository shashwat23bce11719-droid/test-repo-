import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TeacherSidebar } from './TeacherSidebar';
import { TeacherDashboardHome } from './TeacherDashboardHome';
import { TeacherProfile } from './TeacherProfile';
import { WorksheetGenerator } from './WorksheetGenerator';
import { ContentEnhancer } from './ContentEnhancer';
import { ScheduledContentDelivery } from './ScheduledContentDelivery';
import { PerformanceTracker } from './PerformanceTracker';
import { DoubtSolverAI } from './DoubtSolverAI';
import { ClassDetailsPage } from './ClassDetailsPage';
import { SidebarProvider } from '../ui/sidebar';

export function TeacherDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <TeacherSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />
              <Route path="/dashboard" element={<TeacherDashboardHome />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/class/:classId" element={<ClassDetailsPage />} />
              <Route path="/worksheet-generator" element={<WorksheetGenerator />} />
              <Route path="/content-enhancer" element={<ContentEnhancer />} />
              <Route path="/scheduled-content" element={<ScheduledContentDelivery />} />
              <Route path="/performance-tracker" element={<PerformanceTracker />} />
              <Route path="/doubt-solver" element={<DoubtSolverAI />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}