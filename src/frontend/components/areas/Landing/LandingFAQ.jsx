import React from "react";

const LandingFAQ = () => {
    return (
        <section className="py-20">
            <div className="container">
                <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
                    <h1 className="text-3xl text-center text-blue">
                        Frequently Asked Questions
                    </h1>
                </div>
            </div>
            <div className="flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto">
                <details className="group bg-slate-50">
                    <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-slate-50">
                        <h5 className="font-medium text-gray-900">
                            How do I take tests?
                        </h5>
                        <svg
                            className="flex-shrink-0 ml-1.5 w-5 h-5 stroke-primary-900 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </summary>
                    <p className="px-4 mt-4 leading-relaxed text-gray-700">
                        Taking tests is simple.
                    </p>
                </details>
            </div>
        </section>
    );
};

export default LandingFAQ;
