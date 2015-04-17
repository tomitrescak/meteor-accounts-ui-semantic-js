Package.describe({
  name: 'tomi:accounts-ui-semantic-js',
  summary: 'Accounts-ui template with semantic-js',
  version: '1.0.0',
  git: 'git://github.com/tomitrescak/meteor-accounts-ui-semantic-js.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'accounts-base',
    'accounts-password',
    'less',
    'templating',
  ], 'client');

  api.imply([
    'softwarerero:accounts-t9n@1.0.0',
    'iron:router@1.0.5',
  ], ['client', 'server']);

  api.addFiles(
    [
      'lib/helpers.js',
      'views/resendVerification.html',
      'views/resendVerification.js',
      'views/forgotPassword.html',
      'views/forgotPassword.js',
      'views/resetPassword.html',
      'views/resetPassword.js',
      'views/loginView.html',
      'views/loginView.js',
      'views/signIn.html',
      'views/signIn.js',
      'views/signOut.html',
      'views/signOut.js',
      'views/signUp.html',
      'views/signUp.js',
      'views/userView.html',
      'views/userView.js',
    ],
    ['client']);

  api.addFiles([
    'globalConfig.js',
    'lib/i18n.js'
  ], ['client', 'server']);

  api.addFiles('serverConfig.js', ['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tomi:accounts-ui-semantic-js');
  api.addFiles('tests/tests.js');
});
