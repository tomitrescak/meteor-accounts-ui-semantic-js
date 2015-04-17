Template['resetPasswordView'].events({
  'submit #resetPasswordForm': function(e) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget);
    var password = resetPasswordForm.find('#password').val();
    var passwordConfirm = resetPasswordForm.find('#password-again').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      $(resetPasswordForm).removeClass('loading');

      Accounts.resetPassword(Accounts._resetPasswordToken, password, function(err) {
        $(resetPasswordForm).removeClass('loading');

        if (err) {
          if (err.message === 'Token expired [403]') {
            showError(T9n.get('error.accounts.Token expired'));
          } else {
            showError(err.message);
          }
        }
        else {
          showInfo(T9n.get('info.passwordChanged'));
          Accounts._resetPasswordToken = null;
          Session.set('login-view', 'signIn');
        }
      });
    }
    return false;
  },
  'click #signInButton': function() {
    Session.set('login-view', 'signIn');
    return false;
  }
});

Template['resetPasswordView'].rendered = function() {
  $('.ui.form')
    .form({
      password: {
        identifier : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : T9n.get('passwordRequired')
          },
          {
            type   : 'length[7]',
            prompt : T9n.get('minChar')
          }
        ]
      },
      passwordConfirm: {
        identifier : 'password-again',
        rules: [
          {
            type   : 'match[password]',
            prompt : T9n.get('error.pwdsDontMatch')
          }
        ]
      }
    }, {
      inline : true,
      on     : 'blur'
    })
  ;
};
