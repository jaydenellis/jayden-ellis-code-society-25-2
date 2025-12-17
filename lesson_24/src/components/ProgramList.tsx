import React, { useState, useEffect } from 'react';

// Assuming these types exist in @code-differently/types
interface Program {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/programs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch programs: ${response.status} ${response.statusText}`);
      }

      const result: ApiResponse<Program[]> = await response.json();
      
      if (result.success) {
        setPrograms(result.data);
      } else {
        throw new Error(result.message || 'Failed to load programs');
      }
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchPrograms();
  };

  if (loading) {
    return (
      <div className="program-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="program-list">
        <div className="error-container">
          <h3>Error Loading Programs</h3>
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="program-list">
      <div className="program-list__header">
        <h2>Available Programs</h2>
        <p className="program-count">
          {programs.length} {programs.length === 1 ? 'program' : 'programs'} available
        </p>
      </div>

      {programs.length === 0 ? (
        <div className="empty-state">
          <h3>No Programs Available</h3>
          <p>There are currently no programs to display.</p>
        </div>
      ) : (
        <div className="program-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-card__content">
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
                {program.createdAt && (
                  <p className="program-date">
                    Created: {new Date(program.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramList;