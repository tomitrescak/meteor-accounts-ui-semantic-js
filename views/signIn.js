Template['signIn'].events({
  'submit #signInForm': function(e) {
    e.preventDefault();

    var signInForm = $(e.currentTarget);
    var email = trimInput(signInForm.find('#email').val().toLowerCase());
    var password = signInForm.find('#password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      $('#signInForm').addClass('loading');

      Meteor.loginWithPassword(email, password, function(err) {
        $('#signInForm').removeClass('loading');
        if (err) {
          Session.set('alerts', T9n.get('invalidCredentials'));
        } else {
          Router.go('dashboard');
        }
      });
    }
    return false;
  },
  'click #registerButton': function() {
    Session.set('login-view', 'register');
  },
  'click #forgotPasswordButton': function() {
    Session.set('login-view', 'forgotPassword');
    return false;
  }
});

Template['signIn'].rendered = function() {
  $('.ui.form')
    .form({
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
      }
    }, {
      inline : true,
      on     : 'blur'
    })
  ;
};
