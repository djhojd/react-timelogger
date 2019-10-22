import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { ClientsView, ProjectsView, ProjectDetails, TimeTracker } from './views';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

export function App() {
  return (
    <Router>
      <header>
        <nav className="navbar navbar-expand navbar-dark fixed-top bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Timelogger
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/projects">
                    PROJECTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clients">
                    CLIENTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tracker">
                    TIME TRACKER
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <Switch>
            <Route path="/projects/:id">
              <ProjectDetails />
            </Route>
            <Route path="/projects">
              <ProjectsView />
            </Route>
            <Route path="/clients">
              <ClientsView />
            </Route>
            <Route path="/tracker">
              <TimeTracker />
            </Route>
            <Route path="/">
              <Redirect to="/projects" />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}
