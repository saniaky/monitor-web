import React, { lazy, Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { Redirect, Route, useRouteMatch } from 'react-router'
import PrivateLayout from '../../components/PrivateLayout'

const IncidentsPage = lazy(() => import('./IncidentsPage'))
const MembersPage = lazy(() => import('./MembersPage'))
const ActivityLogPage = lazy(() => import('./ActivityLogPage'))
const SubscribersPage = lazy(() => import('./SubscribersPage'))
const ComponentsPage = lazy(() => import('./ComponentsPage'))
const PageSettingsPage = lazy(() => import('./PageSettingsPage'))

export default () => {
  const { url } = useRouteMatch()

  return (
    <PrivateLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={`${url}/incidents`} component={IncidentsPage} />
          <Route path={`${url}/components`} component={ComponentsPage} />
          <Route path={`${url}/members`} component={MembersPage} />
          <Route path={`${url}/subscribers`} component={SubscribersPage} />
          <Route path={`${url}/page`} component={PageSettingsPage} />
          <Route path={`${url}/activity-log`} component={ActivityLogPage} />
          <Route path={`${url}/profile`} component={ActivityLogPage} />
          <Redirect to={`${url}/incidents`} />
        </Switch>
      </Suspense>
    </PrivateLayout>
  )
}
