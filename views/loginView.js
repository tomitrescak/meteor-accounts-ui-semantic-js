Template['loginView'].rendered = function() {
  Session.set('alerts', null);
  Session.set('infos', null);
}

// (client-side)
Template['loginView'].created = function() {
  if (Accounts._resetPasswordToken) {
    Session.set('login-view', 'resetPassword');
  };

  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          showError(T9n.get('loginTokenExpired'));
        }
      } else {
        showInfo(T9n.get('info.emailVerified'));
      }
    });
  }
};

Template['loginView'].helpers({
  alerts: function() {
    return Session.get('alerts');
  },
  infos: function() {
    return Session.get('infos');
  },
  resendVerification: function() {
    return Session.get('login-view') === 'resendVerification';
  },
  resetPassword: function() {
    return Session.get('login-view') === 'resetPassword';
  },
  showForgotPassword: function() {
    return Session.get('login-view') === 'forgotPassword';
  },
  showRegisterForm: function() {
    return Session.get('login-view') === 'register';
  }
});
