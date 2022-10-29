import React, { useEffect } from "react";
import Select from "react-select";
import {
    useUISelectionControl,
    ControlActions,
    usePageIdentifier,
} from "@features/uistate/Context";

const options = [
    { value: "general", label: "General" },
    { value: "intelligence", label: "Intelligence" },
    { value: "personality", label: "Personality" },
];

const customSelectorStyle = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        padding: 20,
        borderRadius: "0.25rem",
    }),
    option: (provided, state) => ({
        ...provided,
        borderRadius: "1rem",
    }),
    control: (provided, { selectProps: { width, height } }) => ({
        ...provided,
        width: width,
        height: height,
        borderWidth: "2px",
        borderRadius: "1rem",
        borderColor: "inherit",
        ":hover": {
            borderColor: "var(--primary-color-light)",
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        paddingLeft: 20,
        color: "var(--primary-color-light)",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        fontWeight: 500,
    }),
};

const TagSelector = () => {
    const { isMainPage } = usePageIdentifier({ inPage: "tests" });
    const { dispatch } = useUISelectionControl();
    return (
        <Selection
            dispatch={
                isMainPage
                    ? (index) =>
                        dispatch(
                            ControlActions.setSelectedIndex("tests", index)
                        )
                    : undefined
            }
        />
    );
};

const Selection = ({ dispatch }) => (
    <Select
        components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
        }}
        defaultValue={options[0]}
        width="12rem"
        height="2.5rem"
        styles={customSelectorStyle}
        options={options.map((option, index) => {
            option.index = index;
            return option;
        })}
        onChange={(option) =>
            dispatch ? dispatch(option) : console.log("Selection Option Change")
        }
    />
);

export default TagSelector;
