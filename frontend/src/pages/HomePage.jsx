import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import LocalProof from '../components/LocalProof';
import Waitlist from '../components/Waitlist';
import Investor from '../components/Investor';

const HomePage = () => {
    return (
        <div className="space-y-24 pb-24">
            <section id="home">
                <Hero />
            </section>
            <Problem />
            <Solution />
            <HowItWorks />
            <Features />
            <LocalProof />
            <section id="waitlist">
                <Waitlist />
            </section>
            <Investor />
        </div>
    );
};

export default HomePage;
