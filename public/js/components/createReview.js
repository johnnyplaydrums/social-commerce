$(function() {
  
  //product id
  var id = document.URL.split('id=')[1];
  
  //set hidden input field with id of product
  $('#productId').val(id);
  
  //get product information
  $.ajax({
    type : 'get',
    url : '/getProduct',
    data : { id : id }
  }).done(function(response) {
    showName(response.name);
  }).fail(function() {
    
  });
  
  function showName(name) {
    $('.panel-heading').append(
      $('<a>')
        .attr('href', '/product?id=' + id)
        .html(name)
    );
  }
  
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
        location = '/product?id=' + id;
      }
    }).fail(function(xhr, status, message) {
    });
  });
  
});