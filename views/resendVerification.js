Template['resendVerificationView'].events({
  'submit #resendVerificationForm': function(e) {
    e.preventDefault();

    clearMessages();

    var forgotPasswordForm = $(e.currentTarget);
    var email = trimInput(forgotPasswordForm.find('#email').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {
      $(forgotPasswordForm).addClass('loading');

      Meteor.call('sendVerificationEmail', email, function(err) {
        $(forgotPasswordForm).removeClass('loading');
        if (err) {
          if (err.message === 'User not found [403]') {
            showError(T9n.get('emailNotFound'));
          } if (err.message === 'User already verified [403]') {
            showError(T9n.get('userAlreadyVerified'));
          } else {
            showError(T9n.get('Unknown error'));
          }
        } else {
          showInfo(T9n.get('verificationEmailSent'));
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

Template['resendVerificationView'].rendered = function() {
  $('.ui.form')
    .form({
      username: {
        identifier : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          },
          {
            type   : 'email',
            prompt : 'Please enter a valid email'
          }
        ]
      }
    }, {
      inline : true,
      on     : 'blur'
    })
  ;
};
