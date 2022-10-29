import React from "react";

const features = [
    {
        title: "User Profiles",
        description:
            "Maintainted certifications, profiling snapshots of test version history. And more currently in development!",
    },
];

const Feature = ({ title, description }) => {
    return (
        <div className="relative mt-20 lg:mt-24">
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
                <div className="flex flex-1 flex-col items-center lg:items-start">
                    <h1 className="text-3xl text-slate-700">{title}</h1>
                    <p className="text-grey-200 my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const LandingFeatures = () => {
    return (
        <section className="bg-slate-50 py-20 mt-20">
            <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
                <h1 className="text-3xl text-center text-blue">Features</h1>
                <p className="text-center text-grey mt-4">
                    We make available various means of accounting cognitive
                    profiles. We provide certifying amenities, and seek to
                    continue to improve the quality and facility of relevant
                    statistics. Initial development is still proceeding; a
                    fleshed out list will be made availabe soon.
                </p>
            </div>
        </section>
    );
};

export default LandingFeatures;
