import { RefObject, useEffect } from 'react'

export function useClickOutsideNotifier(ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void): void
{
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node))
            {
                handler(event)
            }
        }

        document.addEventListener<'mousedown'>('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener<'mousedown'>('mousedown', handleClickOutside)
        }
    }, [ ref, handler ])
}