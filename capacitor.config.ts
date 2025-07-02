
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7e836fa686ba4c23bf1391ef6696426e',
  appName: 'study-flow-harmony',
  webDir: 'dist',
  server: {
    url: 'https://7e836fa6-86ba-4c23-bf13-91ef6696426e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
