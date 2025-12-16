import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';

function App() {
  return (
    <div className="cv-container">
      <Hero />

      {/* 2-Column Layout for upper section if needed, or stacked. 
          Given the dense request, stacked sections with side-by-side internal layouts work best. */}

      <Skills /> {/* High priority on CVs often comes early or side */}
      <Experience />
      <Projects />
      <Education />

      {/* Profile/Summary is often part of header or just below it. I'll put it in Hero or just below. */}
    </div>
  );
}

export default App;
