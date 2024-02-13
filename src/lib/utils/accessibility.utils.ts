/**
 * This method keeps the focus in the global element defined during the call.
 * (Example: You can use this method in a modal to limit navigation in the global element and avoid navigating outside the modal)
 *
 * @param elementRef The global element in which you want to navigate by keyboard
 * @param onClose It is a method. It will be called when the space key is pressed. For example, for a modal, it is the modal closure method that will be passed to it.
 * @returns Suppress event when closing
 */
export const stayInFocusGlobalElement = (elementRef: any, onClose: any) => {
    const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])' // add all the elements inside modal which you want to make focusable
    const firstFocusableElement =
        elementRef.current.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal
    const focusableContent =
        elementRef.current.querySelectorAll(focusableElements)
    const lastFocusableElement = focusableContent[focusableContent.length - 1] // get last element to be focused inside modal
    if (!firstFocusableElement) return
    firstFocusableElement.focus()
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && onClose) {
            onClose()
            return
        }
        const isTabPressed = e.key === 'Tab'
        if (!isTabPressed) {
            return
        }
        if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus() // add focus for the last focusable element
                e.preventDefault()
            }
        } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
                // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus() // add focus for the first focusable element
                e.preventDefault()
            }
        }
    })
    return () => window.removeEventListener('keydown', close)
}
