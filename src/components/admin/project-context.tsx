'use client';

import React, { createContext, type ReactNode, useContext, useState } from 'react';

type ProjectContextType = {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const contextValue = React.useMemo(
    () => ({
      isCreateModalOpen,
      setIsCreateModalOpen,
      openCreateModal,
      closeCreateModal,
    }),
    [isCreateModalOpen],
  );

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
