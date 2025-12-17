import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProgramList from './components/ProgramList';
import AddProgram from './pages/AddProgram';

// Example Home component (referenced in requirements)
const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__hero">
        <h1>Welcome to Code Differently</h1>
        <p>Discover and manage educational programs</p>
      </div>
      
      <div className="home__features">
        <div className="feature-card">
          <h3>Browse Programs</h3>
          <p>Explore our extensive catalog of educational programs</p>
        </div>
        <div className="feature-card">
          <h3>Add Programs</h3>
          <p>Contribute by adding new programs to our collection</p>
        </div>
        <div className="feature-card">
          <h3>Manage Content</h3>
          <p>Keep program information up to date and relevant</p>
        </div>
      </div>
    </div>
  );
};

// App component with React Router setup
const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      
      {/* Option 1: React Router Setup (uncomment if using React Router) */}
      {/*
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/add-program" element={<AddProgram />} />
        </Routes>
      </Router>
      */}
      
      {/* Option 2: Simple routing based on URL pathname */}
      <main className="main-content">
        {(() => {
          const path = window.location.pathname;
          switch (path) {
            case '/':
              return <Home />;
            case '/programs':
              return <ProgramList />;
            case '/add-program':
              return <AddProgram />;
            default:
              return <Home />;
          }
        })()}
      </main>
    </div>
  );
};

export default App;