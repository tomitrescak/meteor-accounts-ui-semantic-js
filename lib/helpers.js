trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  Session.set('alert', 'Please fill in all required fields.');
  return false;
};

isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  Session.set('alert', 'Please enter a valid email address.');
  return false;
};

isValidPassword = function(password) {
  if (password.length < 7) {
    Session.set('alert', 'Your password should be 7 characters or longer.');
    return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    Session.set('alert', 'Your two passwords are not equivalent.');
    return false;
  }
  return true;
};

clearMessages = function() {
  Session.set('alerts', null);
  Session.set('infos', null);
}

showError = function(message) {
  Session.set('alerts', message);
}

showInfo = function(message) {
  Session.set('infos', message);
}
