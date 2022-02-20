import { Component, createSignal, For, lazy } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import classnames from 'classnames'
import { FiPlus } from 'solid-icons/fi'
import { useParams, useNavigate } from 'solid-app-router'

enum SECTION_TYPE {
  STATUSES = 'STATUSES',
  EVENTS = 'EVENTS',
  COMMENTS = 'COMMENTS',
}

const CreateButton: Component = () => {
  return (
    <div class="w-6 h-6 bg-zinc-700 rounded flex justify-center items-center hover:bg-opacity-75 hover:cursor-pointer">
      <FiPlus size={16} />
    </div>
  )
}

const SECTIONS = {
  [SECTION_TYPE.STATUSES]: {
    id: SECTION_TYPE.STATUSES,
    component: lazy(() => import('./IncidentStatuses')),
    createComponent: CreateButton,
  },
  [SECTION_TYPE.EVENTS]: {
    id: SECTION_TYPE.EVENTS,
    component: lazy(() => import('./IncidentEvents')),
    createComponent: CreateButton,
  },
  [SECTION_TYPE.COMMENTS]: {
    id: SECTION_TYPE.COMMENTS,
    component: lazy(() => import('./IncidentStatuses')),
    createComponent: CreateButton,
  },
}

const IncidentDetails: Component = () => {
  const navigate = useNavigate()
  const { id: incidentId, section } = useParams()
  const currentSection =
    Object.keys(SECTION_TYPE).find((key) => key === section?.toUpperCase()) ||
    SECTION_TYPE.STATUSES
  const [getSelectedSection, setSelectedSection] = createSignal<SECTION_TYPE>(
    currentSection as SECTION_TYPE
  )

  const handleSectionChange = (sectionId: SECTION_TYPE) => {
    setSelectedSection(sectionId)
    navigate(`/incidents/${incidentId}/${sectionId.toLowerCase()}`)
  }

  return (
    <section>
      <header class="border rounded-t flex items-center justify-between px-8 py-4 border-zinc-700 bg-zinc-800">
        <div class="flex space-x-8">
          <For each={Object.values(SECTIONS)}>
            {({ id: sectionId }) => {
              return (
                <h2
                  class={classnames(
                    {
                      'text-zinc-500': getSelectedSection() !== sectionId,
                    },
                    'hover:text-green-500 hover:cursor-pointer capitalize'
                  )}
                  onClick={() => handleSectionChange(sectionId)}
                >
                  {sectionId.toLowerCase()}
                </h2>
              )
            }}
          </For>
        </div>

        <Dynamic component={SECTIONS[getSelectedSection()].createComponent} />
      </header>

      <Dynamic component={SECTIONS[getSelectedSection()].component} />
    </section>
  )
}

export default IncidentDetails
