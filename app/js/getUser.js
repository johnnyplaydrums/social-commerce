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
  
  //modal for password change
  $('.account-info-field').append(
    "<div id='passwordModal' class='modal'>" + 
      "<div class='modal-content'>" +
        "<span class='closeButton' id='closeButtonPassword'>×</span>" +
        "<div class='panel panel-default'>" +
          "<div class='panel-heading'>Change Password</div>" +
          "<div class='panel-body'>" +
            "<form id='passwordForm'>" +
              "<input type='password' class='form-control' name='passwordChange' id='changePasswordModal' placeholder='Password'>" +
              "<input type='password' class='form-control' name='confirmPasswordChange' id='changeConfirmPasswordModal' placeholder='Confirm Password'>" +
              "<button class='btn btn-primary' id='userFormButtonModal' type='submit'>" +
                "Save" +
              "</button>" +
            "</form>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
  
  // Get the modal
  var modal = document.getElementById('passwordModal');

  // Get the <span> element that closes the modal
  var span = document.getElementById('closeButtonPassword');

  //event listeners for singup modal
  $(span).click(function() {
    $(modal).hide();
  });
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  
  //user clicks sign up/login text
  $('#passwordButton').click(function() {
    $(modal).show();
  });
  
  //handle password reset form
  $('#passwordForm').submit(function(e) {
    e.preventDefault();
    
    //ensure passwords match
    if ($('#changePasswordModal').val() !== $('#changeConfirmPasswordModal').val()) {
      toastr.error('Passwords don\'t match!', { fadeAway: 2500 });
      return; 
    }
    
    $.ajax({
      type : 'post',
      url : '/changePassword',
      data : { password : $('#changePasswordModal').val()}
    }).done(function(response) {
      if (response.status === 'error') {
        toastr.error('Something went wrong! Please reload page');
      } else {
        $(modal).hide();
        toastr.success('Changes saved!');
      }
    }).fail(function() {
      toastr.error('Something went wrong! Please reload page');
    });
  });
  
});