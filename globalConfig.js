Meteor.startup(function() {
  Accounts.config({
    restrictCreationByEmailDomain: function(email) {
      var domain = email.slice(email.lastIndexOf("@")+1); // or regex
      var allowed = ["uws.edu.au", "student.uws.edu.au"];
      return _.contains(allowed, domain);
    },
    forbidClientAccountCreation: true
  })
});
