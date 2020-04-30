import React, { lazy, Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { Redirect, Route, useRouteMatch } from 'react-router'
import PrivateLayout from '../../components/PrivateLayout'
import LinearProgress from '@material-ui/core/LinearProgress'
import { ProvideProject } from './ProjectContext'
import CreateIncidentsPage from './CreateIncidentsPage'
import IncidentDetailsPage from './IncidentDetailsPage'

const IncidentsPage = lazy(() => import('./IncidentsPage'))
const MembersPage = lazy(() => import('./MembersPage'))
const ActivityLogPage = lazy(() => import('./ActivityLogPage'))
const SubscribersPage = lazy(() => import('./SubscribersPage'))
const ComponentsPage = lazy(() => import('./ComponentsPage'))
const PageSettingsPage = lazy(() => import('./PageSettingsPage'))
const ProfilePage = lazy(() => import('./ProfilePage'))
const ProjectSettingsPage = lazy(() => import('./ProjectSettingsPage'))

export default () => {
  const { url } = useRouteMatch()

  return (
    <ProvideProject>
      <PrivateLayout>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route exact path={`${url}/incidents`} component={IncidentsPage} />
            <Route exact path={`${url}/incidents/:incidentId`} component={IncidentDetailsPage} />
            <Route exact path={`${url}/new-incident`} component={CreateIncidentsPage} />
            <Route exact path={`${url}/components`} component={ComponentsPage} />
            <Route exact path={`${url}/members`} component={MembersPage} />
            <Route exact path={`${url}/subscribers`} component={SubscribersPage} />
            <Route exact path={`${url}/page`} component={PageSettingsPage} />
            <Route exact path={`${url}/activity-log`} component={ActivityLogPage} />
            <Route exact path={`${url}/settings`} component={ProjectSettingsPage} />
            <Route exact path={`${url}/profile`} component={ProfilePage} />
            <Redirect to={`${url}/incidents`} />
          </Switch>
        </Suspense>
      </PrivateLayout>
    </ProvideProject>
  )
}
