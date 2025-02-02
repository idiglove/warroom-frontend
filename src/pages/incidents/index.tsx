import { Component, Suspense } from 'solid-js'
import { createQuery } from 'solid-urql'

import AppLayout from '../../components/layouts/AppLayout'
import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'

const GET_INCIDENTS = `
  query {
    incidents {
      id
      title
      incidentDate
      severity
    }
  }
`

const Incidents: Component = () => {
  const [incidentsResult] = createQuery({
    query: GET_INCIDENTS,
  })
  const incidents = () => incidentsResult()?.incidents

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={incidents} />
      </main>
    </AppLayout>
  )
}

export default Incidents
