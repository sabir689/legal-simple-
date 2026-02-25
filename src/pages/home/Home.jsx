import React from 'react';
import Cover from './Cover';
import Steps from './Steps';
import TrustSection from './Trust';
import Pricing from './Pricing';
import FinalCTA from './FinalCTA';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import HowItWorks from './HowItWorks';
import SocialProof from './SocialProof';
import Navbar from '../shared/Navbar';


const Home = () => {
    return (
        <div>
            
            <Cover></Cover>
            <Steps></Steps>
            <ProblemSection></ProblemSection>
            <SolutionSection></SolutionSection>
            <HowItWorks></HowItWorks>
            <SocialProof></SocialProof>
            <TrustSection></TrustSection>
            <Pricing></Pricing>
            <FinalCTA></FinalCTA>
        </div>
    );
};

export default Home;