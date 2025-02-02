import { Component, For, Show } from 'solid-js'
import { createQuery } from 'solid-urql'

import AppLayout from '../../components/layouts/AppLayout'
import { Service } from '../../types/service'
import CreateServiceButton from '../../components/CreateServiceButton'
import ServiceCard from '../../components/ServiceCard'

const GET_SERVICES = `
  query {
    services {
      id
      name
      description
      status
    }
  }
`

const CreateServiceEmptyState: Component = () => {
  return (
    <>
      <CreateServiceButton />
      <div class="border border-dashed border-zinc-700 rounded h-32"></div>
      <div class="border border-dashed border-zinc-700 rounded h-32"></div>
      <div class="border border-dashed border-zinc-700 rounded h-32"></div>
    </>
  )
}

const CreateService: Component = () => {
  const [services, servicesState] = createQuery({ query: GET_SERVICES })

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-2 col-span-2">
        <Show when={!servicesState().fetching} fallback={<>Loading...</>}>
          <For
            each={services().services as Service[]}
            fallback={<CreateServiceEmptyState />}
          >
            {(service) => <ServiceCard service={service} />}
          </For>

          <Show when={services().services.length}>
            <CreateServiceButton />
          </Show>
        </Show>
      </main>
    </AppLayout>
  )
}

export default CreateService
