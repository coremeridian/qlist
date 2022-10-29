import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const Grid = styled.div`
    display: grid;
    grid-area: tests;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--grid-gap);
    background-color: white;
    padding: var(--grid-gap);
    border-radius: 0.2rem;
`;

const CardLink = styled(Link).attrs((props) => ({ to: props.to }))`
    background-color: white;
`;
const Card = tw(
    CardLink
)`relative block p-8 border border-gray-100 shadow-xl rounded-xl`;

const VersionTag = tw.span`absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs`;

export { Grid, Card, VersionTag };
