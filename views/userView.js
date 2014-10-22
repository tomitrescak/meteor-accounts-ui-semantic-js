Template['userView'].rendered = function() {
  $('#userMenu').dropdown();
}

Template['userView'].events({
  'click #signOut': function() {
    Meteor.logout();
    Router.go('/');
  },
  'click #profile': function() {
    alert('move');
    Router.go('profile');
  }
});
