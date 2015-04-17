Template.signOut.events({
  'click #signOutButton': function() {
    Meteor.logout(function() {
      // Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
    });
    return false;
  }
});

Template.signOut.helpers({
  signOutTemplate: function() {
    return Accounts.signOutTemplate;
  }
});