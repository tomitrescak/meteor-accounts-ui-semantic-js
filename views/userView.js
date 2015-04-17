Template['userView'].rendered = function() {
  $('#userMenu').dropdown({on: 'hover'});
}

Template['userView'].events({
  'click #signOut': function() {
    Meteor.logout();
    Router.go('/');
  },
  'click #profile': function() {
    Router.go('profile');
  }
});
