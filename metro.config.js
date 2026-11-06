// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { execFileSync } = require('child_process');
const path = require('path');

const config = getDefaultConfig(__dirname);

// The phone app's release (an EAS build) loads the hymns as built when it is made, instead of building them while it
// opens (see src/data/hymns.ts). They are saved fresh here for every release, and the
// release then leaves out the code that builds them; if saving fails, the release builds them itself (slower to open,
// but never out of date).
if (process.env.NODE_ENV === 'production') {
  let saved = false;
  try {
    execFileSync(process.execPath, [require.resolve('tsx/cli'), path.join(__dirname, 'scripts', 'hymns-snapshot.mjs')], {
      cwd: __dirname,
      stdio: 'inherit',
    });
    saved = true;
  } catch (error) {
    console.warn('Could not save the hymns for release; the app will build them while it opens.', error?.message ?? error);
  }
  if (saved) {
    const hymnsModule = path.join(__dirname, 'src', 'data', 'hymns.ts');
    const upstream = config.resolver.resolveRequest;
    // Only the phone app: the website opens on computers, which build the hymns quickly, and its download would grow
    // (the saved hymns are larger than what they are built from)
    config.resolver.resolveRequest = (context, moduleName, platform) => {
      if (context.originModulePath === hymnsModule) {
        if (platform === 'web' && moduleName === './hymns-snapshot.generated') return { type: 'empty' };
        if (platform !== 'web' && moduleName === './hymns-build') return { type: 'empty' };
      }
      return upstream ? upstream(context, moduleName, platform) : context.resolveRequest(context, moduleName, platform);
    };
  }
}

module.exports = config;
