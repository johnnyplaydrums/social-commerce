$(function() {
  
  //set hidden input field with id of product
  $('#productId').val(document.URL.split('id=')[1]);
  
  //handle review submission
  $('#createReview').submit(function(e) {
    e.preventDefault();
    
    $.ajax({
      type : 'post',
      url : '/createReview',
      data : $('#createReview').serialize()
    }).done(function(response) {
      if (response.status === 'error') {
        toastr.error('Oh no! There was an error. Please try again');
      } else if (response.status === 'success') {
        toastr.success('Review saved!');
      }
    }).fail(function(xhr, status, message) {
    });
  });
  
});