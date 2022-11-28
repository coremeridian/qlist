import React, { Fragment, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useFloating, autoUpdate, arrow } from "@floating-ui/react-dom";

interface PopoverFrameProps {
    hasArrow: boolean;
    buttonIcon: JSX.Element;
    children: React.ReactNode;
}

const PopoverFrame = (props: PopoverFrameProps) => {
    const arrowRef = useRef(null);
    const {
        x,
        y,
        reference,
        floating,
        strategy,
        placement,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
        placement: "bottom-end",
        whileElementsMounted: autoUpdate,
        middleware: [arrow({ element: arrowRef })],
    });
    const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    }[placement.split("-")[0]];
    return (
        <Popover>
            {({ open }) => (
                <>
                    <Popover.Button
                        ref={reference}
                        className="block p-6 text-xl"
                    >
                        {props.buttonIcon}
                    </Popover.Button>
                    <div
                        ref={floating}
                        style={{
                            position: strategy,
                            top: y ?? "",
                            left: x ?? "",
                        }}
                        className="z-50"
                    >
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel>
                                {props.hasArrow && staticSide && (
                                    <div
                                        ref={arrowRef}
                                        style={{
                                            left: arrowX ?? "",
                                            top: arrowY ?? "",
                                            [staticSide]: "-4px",
                                        }}
                                    />
                                )}
                                {props.children}
                            </Popover.Panel>
                        </Transition>
                    </div>
                </>
            )}
        </Popover>
    );
};

export default PopoverFrame;
