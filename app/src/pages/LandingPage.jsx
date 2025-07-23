import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import HeroSection from '../components/home/HeroSection';
import TrustBadges from '../components/home/TrustBadges';
import HowItWorksSection from '../components/home/HowItWorksSection';
import Features from '../components/home/Features';
import IndustrySolutions from '../components/home/IndustrySolutions';
import PricingPlans from '../components/home/PricingPlan';
import Testimonials from '../components/home/Testimonials';
import FinalCTASection from '../components/home/FinalCTASection';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      position: 'relative',
      // Supprime l'espacement en haut pour éliminer l'espace avec le header
      mt: 0,
      pt: 0
    }}>
      <HeroSection />
      <TrustBadges />
      <HowItWorksSection />
      <Features />
      <IndustrySolutions />
      <PricingPlans />
      <Testimonials />
      <FinalCTASection />
    </Box>
  );
};

export default LandingPage;