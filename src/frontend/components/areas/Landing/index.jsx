import React from "react";

// Components
import LandingHero from "./LandingHero";
import LandingFeatures from "./LandingFeatures";
import LandingFAQ from "./LandingFAQ";
import LandingFooter from "./LandingFooter";
import PublicNavBar from "components/areas/Nav/PublicBar";

const Landing = () => {
    return (
        <>
            <PublicNavBar />
            <LandingHero />
            <LandingFeatures />
            <LandingFAQ />
            <LandingFooter />
        </>
    );
};

export default Landing;
