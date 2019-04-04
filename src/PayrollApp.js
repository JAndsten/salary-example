import React, { Component } from 'react';
import './App.css';
import PayrollList from './PayrollList';

class PayrollApp extends Component {
  render() {
    return (
      <div>
        <header>
          <h3>Janne Andsten</h3>
          <h1>Palkkalaskuri</h1>
        </header>
        <PayrollList />
      </div>
    );
  }
}

export default PayrollApp;