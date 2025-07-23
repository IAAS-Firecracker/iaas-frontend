import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Link, 
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  TextField,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  RssFeed as BlogIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 6,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.secondary
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand/Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary
                }}
              >
                {t('appTitle')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('footer.tagline')}
            </Typography>
            
            {/* Newsletter Subscription */}
            <Box component="form" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                {t('footer.newsletter')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder={t('footer.emailPlaceholder')}
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.default
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{
                    borderRadius: 1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('footer.subscribe')}
                </Button>
              </Stack>
            </Box>

            {/* Social Links */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                {t('footer.followUs')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton 
                  aria-label="GitHub" 
                  href="https://github.com/your-repo"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  aria-label="Twitter" 
                  href="https://twitter.com/your-handle"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: '#1DA1F2'
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  aria-label="LinkedIn" 
                  href="https://linkedin.com/company/your-company"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: '#0077B5'
                    }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  aria-label="Blog" 
                  href="/blog"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.secondary.main
                    }
                  }}
                >
                  <BlogIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {t('footer.products')}
            </Typography>
            <Stack spacing={1}>
              <Link href="/vms" underline="hover" color="inherit">{t('footer.virtualMachines')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.kubernetes')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.storage')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.loadBalancers')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.backups')}</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {t('footer.resources')}
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit">{t('footer.documentation')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.apiReference')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.tutorials')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.community')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.status')}</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {t('footer.company')}
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit">{t('footer.aboutUs')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.careers')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.contact')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.blog')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.press')}</Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {t('footer.legal')}
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit">{t('footer.termsOfService')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.privacyPolicy')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.security')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.compliance')}</Link>
              <Link href="#" underline="hover" color="inherit">{t('footer.gdpr')}</Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2">
            {t('footer.copyright')}
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            <Link href="#" variant="body2" underline="hover" color="inherit">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="#" variant="body2" underline="hover" color="inherit">
              {t('footer.termsOfService')}
            </Link>
            <Link href="#" variant="body2" underline="hover" color="inherit">
              {t('footer.cookiePolicy')}
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;