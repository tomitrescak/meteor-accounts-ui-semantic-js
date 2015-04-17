Template.signUp.events({
  'submit #signUpForm': function(e, t) {
    e.preventDefault();

    clearMessages();

    var signUpForm = $(e.currentTarget);
    var name = trimInput(signUpForm.find('#name').val());
    var email = trimInput(signUpForm.find('#email').val().toLowerCase());
    var password = signUpForm.find('#password').val();
    var passwordConfirm = signUpForm.find('#password-again').val();

    var data = {email: email, password: password, profile: { name: name }};

    // now collect all extra fields
    $( '.profileExtra' ).each(function() {
      if ($(this).attr('data-type') === 'array') {
        data.profile[$(this).attr('data-name')] = [$(this).val()];
      } else {
        data.profile[$(this).attr('data-name')] = $(this).val();
      }
    });

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) &&
      areValidPasswords(password, passwordConfirm)) {

      $(signUpForm).addClass('loading');

      Meteor.call('addUser', data, function(err, id) {

        $(signUpForm).removeClass('loading');
        if (err) {
          if (err.message === 'Email already exists. [403]') {
            showError(T9n.get('error.accounts.emailAlreadyExists'));
          } else if (err.message === 'Email doesn\'t match the criteria. [403]') {
            showError(T9n.get('emailLimited') + '@uws.edu.au or @student.uws.edu.au');
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

Template.signUp.helpers({
  extraFieldsTemplate: function() {
    return Accounts.signupFieldsTemplate;
  }
});

Template.signUp.rendered = function() {
  var rules = {
    name: {
      identifier : 'name',
      rules: [
        {
          type   : 'regex[\\w \\w]',
          prompt : T9n.get('signup.nameIncorrect')
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
          prompt : T9n.get('signup.emailIncorrect')
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
          prompt : T9n.get('signup.minChar7')
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
  };

  if (Accounts.validationRules) {
    _.forEach(Accounts.validationRules, function(rule) {
      rules[rule.name] = rule.value;
    });
  }

  $('.ui.form')
    .form(rules, {
      inline : false,
      on     : 'submit'
    });
}
