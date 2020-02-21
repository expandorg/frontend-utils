const settings = {
  apiUrl: process.env.BACKEND_ADDRESS,
  cookieDomain: process.env.COOKIE_DOMAIN,
  gtmTrackingId: process.env.GTM_TRACKING_ID,
  maintenanceMode: process.env.MAINTENANCE_MODE || false,
  devTools: process.env.DEV_TOOLS,
};

global.gemsBuildInfo = gemsBuildInfo; // eslint-disable-line

export default settings;
