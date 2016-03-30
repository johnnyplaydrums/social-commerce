$(function() {
  
  var id = document.URL.split('id=')[1];
  
  //Retrieve product info to be edited
  // GET /getProductInfo
  $.ajax({
    type : 'GET',
    url : '/getProduct',
    data : { 'id' : id }
  }).success(function(response) {
    displayProduct(response);
  }).fail(function(xhr, status, message) {
    toastr.error('Something went wrong! Please reload page.');
    console.log(message);
  });
  
  function displayProduct(response) {
    $('[name=id]').val(response._id);
    $('[name=name]').val(response.name);
    $('[name=description]').val(response.description);
    $('[name=techSpecs]').val(response.techSpecs);
  }
  
  //submit edited product
  // POST /editProduct
  $('#editProduct').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type : 'POST',
      url : '/editProduct',
      data : $('#editProduct').serialize()
    }).success(function(response) {
      console.log(response);
    }).fail(function(xhr, status, message) {
      toastr.error('Something went wrong! Please try again.');
    });
  });
  
});