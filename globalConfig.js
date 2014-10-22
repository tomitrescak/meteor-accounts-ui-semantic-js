Meteor.startup(function() {
  Accounts.config({
//    restrictCreationByEmailDomain: 'uws.edu.au',
    sendVerificationEmail: true,
    forbidClientAccountCreation: true
  })
});