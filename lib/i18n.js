Meteor.startup(function() {
  T9n.map('en', {
    welcom: 'Welcome',
    fullName: 'Full Name',
    nameAndSurename: 'Name and Surename',
    invalidCredentials: 'We\'re sorry but these credentials are not valid.',
    passwordRequired: 'Password is required',
    confirmEmail: 'Confirm Your Email Address',
    resendVerification: 'Re-send verification email',
    verificationEmailSent: 'Verification email sent',
    emailRequired: 'Email is required',
    clickOnEmail: 'Dear Player\n\nPlease, click on the following link to verify your email address: ',
    verificationSent: 'Congrats! You\'re now a new Player! Before logging in, your email has to be ' +
    'verified. Soon, you will receive a verification email.',
    loginTokenExpired: 'Sorry this verification link has expired.',
    emailLimited: 'Email is limited to ',
    emailNotFound: 'User with this email does not exist!',
    passwordResetEmailSent: 'Email sent, please check your inbox.',
    userAlreadyVerified: 'User was already verified',
    signup: {
      nameIncorrect: 'Specified name is incorrect',
      emailIncorrect: 'Specified email is incorrect',
      minChar7: 'Password has to have at least 7 characters'
    }
  });
});
