import { Accessor, Component, Setter } from 'solid-js'
import { Portal } from 'solid-js/web'

import onClickOutside from '../../directives/onClickOutside'
import { getUseDirectives } from '../../utils/directives'
import ModalCloseButton from './CloseButton'

export type ModalProps = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}

const Modal: Component<ModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
  children,
}) => {
  return (
    <Portal>
      <div
        class="absolute w-screen h-screen flex justify-center items-center bg-black bg-opacity-25 top-0"
        // ref={getUseDirectives([onClickOutside, () => setShouldDisplay(false)])}
      >
        <div class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow-2xl shadow-zinc-900 w-1/2 mx-auto relative">
          <ModalCloseButton setShouldDisplay={setShouldDisplay} />
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
