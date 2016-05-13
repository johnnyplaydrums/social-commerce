$(function() {

  //track if username was changed
  var username;

  //get user information
  $.ajax({
    type : 'get',
    url : '/getUser'
  }).done(function(response) {
    showUser(response);
  }).fail(function() {
    toastr.error('Something went wrong! Please reload page');
  });
  
  function showUser(user) {
    username = user.username;
    $('#submitButton').prop('disabled', false);
    $('#updateUsername').val(user.username);
  }
  
  
  
  //process username/password update
  $('#accountInfo').submit(function(e) {
    e.preventDefault();
    if ($('#updateUsername').val() === username) {
      return toastr.success('Changes saved!');
    }
    $.ajax({
      type : 'post',
      url : '/updateUsername',
      data : { newUsername : $('#updateUsername').val() }
    }).done(function(response) {
      if (response.status === 'error') {
        toastr.error('Something went wrong! Please try again.');
      } else if (response.status === 'username taken') {
        toastr.error('That username is taken!');
      } else if (response.status === 'success') {
        location.reload();
      }
    }).fail(function(xhr, status, message) {
      toastr.error('Something went wrong! Please try again.');
    }); 
    
  });
  
});