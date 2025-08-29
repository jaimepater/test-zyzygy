import React from 'react';
import './App.css';
import SignupForm from './components/signup-form/signup-form';

function App() {
  return (
    <main className="App" role="main" aria-label="Signup Application">
      <header>
        <h1 tabIndex={0}>Welcome to the Signup App</h1>
        <p id="app-desc">Create your account using the form below. All fields are required.</p>
      </header>
      <section className="signup-container" aria-labelledby="info-heading">
        <SignupForm />
      </section>
    </main>
  );
}

export default App;
