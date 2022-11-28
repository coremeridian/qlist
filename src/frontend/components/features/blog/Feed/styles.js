import styled from "styled-components";
import tw from "tailwind-styled-components";

const Frame = tw.article`flex flex-col pt-5 gap-10 items-center justify-center mx-auto h-full`;

const Post = styled.article`
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 0 3px hsl(224, 11%, 85%);
    padding: 15px;
    padding-top: 10px;
    margin-top: -20px;
    margin-left: 20px;
    border-radius: 1rem;
    height: 100%;
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: auto;
    justify-content: space-between;
    color: var(--primary-color);
`;

export { Frame, Post, Footer };
