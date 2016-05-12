$(function() {

  $.ajax({
    type : 'get',
    url : '/getUser'
  }).done(function(response) {
    showUser(response);
  }).fail(function() {
    toastr.error('Something went wrong! Please reload page');
  });
  
  function showUser(user) {
    $('[name=username]').val(user.username);
  }
  
});