const appVolume = () => process.env.APP_VOLUME || '/app/volume';
const gatsbyPort = () => process.env.PORT || 8888;

module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: `${appVolume()}/root/examples/test-site`,
      script: 'npm',
      args: `run psh-start -- --port ${gatsbyPort()}`,
    },
    {
      name: 'backend',
      cwd: `${appVolume()}/root/examples/test-site`,
      script: `${appVolume()}/root/packages/bodiless-backend/src/server.js`,
    },
  ],
};
