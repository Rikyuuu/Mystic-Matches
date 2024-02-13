import { stayInFocusGlobalElement } from '@/lib/utils/accessibility.utils'
import { useEffect, useRef } from 'react'
import Button from '../Button/Button'
import { createPortal } from 'react-dom'

interface ModalProps {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
    closeThroughBackground?: boolean
    displayCloseButton?: boolean
    width?: string
}

const Modal = ({
    children,
    isOpen,
    onClose,
    closeThroughBackground = true,
    displayCloseButton = true,
    width,
}: ModalProps) => {
    const modalRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            stayInFocusGlobalElement(modalRef, onClose)
        }
    }, [])

    return isOpen
        ? createPortal(
              <div
                  ref={modalRef}
                  onClick={
                      closeThroughBackground
                          ? (e) => {
                                e.stopPropagation()
                                onClose()
                            }
                          : () => {}
                  }
                  className='z-50 fixed inset-0 flex cursor-default items-center justify-center bg-black bg-opacity-60 antialiased transition-opacity'
              >
                  <div
                      onClick={(e) => {
                          e.stopPropagation()
                      }}
                      className={`bg-white rounded-md p-3 flex flex-col max-w-[85%] max-h-[90vh] justify-center shadow-lg ${width}`}
                  >
                      <div
                          className={`flex flex-col w-full gap-2 overflow-y-auto overflow-x-hidden p-1`}
                      >
                          <div
                              className={`flex w-full flex-row items-center justify-end`}
                          >
                              {displayCloseButton && (
                                  <Button
                                      onClick={onClose}
                                      className='bg-sky-700 hover:bg-sky-600'
                                  >
                                      <div className='flex flex-row items-center gap-1'>
                                          <p>Fermer</p>
                                          <i className='ri-close-line'></i>
                                      </div>
                                  </Button>
                              )}
                          </div>
                          {children}
                      </div>
                  </div>
              </div>,
              document.body
          )
        : null
}

export default Modal
