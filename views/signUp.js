Template.signUp.events({
  'submit #signUpForm': function(e, t) {
    e.preventDefault();

    clearMessages();

    var signUpForm = $(e.currentTarget);
    var name = trimInput(signUpForm.find('#name').val());
    var email = trimInput(signUpForm.find('#email').val().toLowerCase());
    var password = signUpForm.find('#password').val();
    var passwordConfirm = signUpForm.find('#password-again').val();

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) &&
      areValidPasswords(password, passwordConfirm)) {

      $(signUpForm).addClass('loading');

      Meteor.call('addUser', {email: email, password: password, profile: {name: name}}, function(err, id) {

        $(signUpForm).removeClass('loading');
        if (err) {
          if (err.message === 'Email already exists. [403]') {
            showError(T9n.get('error.accounts.Email already exists.'));
          } else if (err.message == '@uws.edu.au email required [403]') {
            showError(T9n.get('emailLimited') + '@uws.edu.au');
          } else if (err.message === 'Login forbidden [403]') {
            showInfo(T9n.get('verificationSent'));
            Session.set('login-view', null);

          } else {
            showError(T9n.get('Unknown error'));
          }
        } else {
          showInfo(T9n.get('verificationSent'));
        }
      });
    }
    return false;
  },
  'click #signInButton': function() {
    Session.set('login-view', null);
  }
});

Template['signUp'].rendered = function() {
  $('.ui.form')
    .form({
      name: {
        identifier : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : T9n.get('nameRequired')
          },
          {
            type   : 'contains[ ]',
            prompt : T9n.get('nameRequired')
          }
        ]
      },
      username: {
        identifier : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : T9n.get('emailRequired')
          },
          {
            type   : 'email',
            prompt : T9n.get('emailRequired')
          }
        ]
      },
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
}
