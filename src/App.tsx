import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { Query } from './components/Query';
import { SkillsCatalog } from './components/SkillsCatalog';
import { Library } from './components/Library';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'query':
        return <Query />;
      case 'skills':
        return <SkillsCatalog />;
      case 'library':
        return <Library />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Project Oversight';
      case 'query':
        return 'Compliance Query Agent';
      case 'skills':
        return 'Skills & Calculations';
      case 'library':
        return 'Technical Ledger';
      default:
        return 'Technical Ledger';
    }
  };

  const getPageSubtitle = () => {
    if (currentPage === 'skills') return '7,843 CHUNKS INDEXED';
    return undefined;
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 ml-64 flex flex-col">
        <TopBar title={getPageTitle()} subtitle={getPageSubtitle()} />
        <div className="flex-1">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
