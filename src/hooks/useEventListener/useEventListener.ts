import { RefObject, useEffect, useRef } from "react";

function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void
>(
    eventName: KW | KH,
    handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
    element?: RefObject<T>
) {
    const savedHandler = useRef<(event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: T | Window = element?.current || window;
        if (!(targetElement && targetElement.addEventListener)) {
            throw new Error('addEventListener is not supported by ' + element);
        }

        const eventListener: typeof handler = (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => {
            if (savedHandler.current) {
                savedHandler.current(event);
            }
        }

        targetElement.addEventListener(eventName, eventListener);

        return () => {
            targetElement.removeEventListener(eventName, eventListener);
          };
    }, [eventName, element])
}

export default useEventListener;
