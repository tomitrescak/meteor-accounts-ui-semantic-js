Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for
  // help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'SCEM Play <no-reply@play.scem.uws.edu.au>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Play';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return T9n.get('confirmEmail');
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return T9n.get('clickOnEmail') + url + '\n\n SCEM Play';
  };

  // (server-side) called whenever a login is attempted
  Accounts.validateLoginAttempt(function(attempt) {
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified) {
      return false; // the login is aborted
    }
    return true;
  });

  // (server-side)
  Accounts.onCreateUser(function(options, user) {
    // add profile
    user.profile = options.profile;

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
      console.log('Sending email to: ' + user);
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
  });

  Meteor.methods({
    addUser: function(data) {
      // TODO: Roles
      return Accounts.createUser({
        email: data.email,
        password: data.password,
        profile: data.profile
      });
    }
  })
});
