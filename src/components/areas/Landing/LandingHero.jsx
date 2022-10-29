import React from "react";
import { LandingButton } from "./styles";
import background from "./background.png";

const LandingHero = () => {
    return (
        <section className="relative">
            <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-1 mt-14 lg:mt-28">
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h2 className="text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6">
                        Innovative, Accessible Psychometrics
                    </h2>
                    <p className="text-lg text-center lg:text-left mb-6">
                        A platform for development and research of creative
                        cognitive evaluations. We aim to provide groundbreaking
                        measures that anyone can use—not just researchers, and
                        not for a high price—all while maintaining industry
                        standards.
                    </p>
                    <div className="flex justify-center flex-wrap gap-6">
                        <LandingButton>Learn More</LandingButton>
                        <LandingButton colored="true">Register</LandingButton>
                    </div>
                </div>
                <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
                    <div className="bg-slate-300 w-5/6 h-80 sm:w-3/4 sm:h-3/4 md:w-full md:h-full">
                        <img src={background} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingHero;
