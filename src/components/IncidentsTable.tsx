import { Accessor, Component, createSignal, For } from 'solid-js'

import Button from './Button'
import IncidentRow from './IncidentRow'
import { Incident } from '../types/incident'
import CreateIncidentModal from './modals/CreateIncidentModal'

type Props = {
  incidents: Accessor<Incident[]>
}

const IncidentsTableEmptyState: Component = () => {
  const [getShouldDisplay, setShouldDisplay] = createSignal(false)

  const handleCreateIncident = () => {
    setShouldDisplay(true)
  }
  return (
    <>
      <div class="flex flex-col justify-center items-center h-52">
        <div class="text-zinc-500 mb-2">No incidents found</div>
        <Button onClick={handleCreateIncident}>Create one?</Button>
      </div>
      <CreateIncidentModal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
    </>
  )
}

const IncidentsTable: Component<Props> = ({ incidents }) => {
  console.log('incidents', {incidents})
  return (
    <div class="col-span-3 ">
      <section class="border border-zinc-700 rounded text-sm text-zinc-300 shadow shadow-zinc-900/50">
        <For each={incidents()} fallback={<IncidentsTableEmptyState />}>
          {(incident: Incident) => <IncidentRow incident={incident} />}
        </For>
      </section>
    </div>
  )
}

export default IncidentsTable
