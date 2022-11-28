import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink).attrs((props) => ({ to: props.$to }))`
    &.active {
        background: white;
        box-shadow: 1px 4px 6px 0 rgb(0 0 0 / 0.1), 2px 2px 4px rgb(0 0 0 / 0.1);
    }
`;
