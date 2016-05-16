$(function() {
  
  var id = document.URL.split('id=')[1];
  
  //Retrieve product info to be edited
  // GET /getProductInfo
  $.ajax({
    type : 'GET',
    url : '/getProduct',
    data : { 'id' : id }
  }).done(function(response) {
    displayProduct(response);
  }).fail(function(xhr, status, message) {
    toastr.error('Something went wrong! Please reload page.');
  });
  
  function displayProduct(response) {
    $('[name=id]').val(response._id);
    $('[name=name]').val(response.name);
    $('[name=description]').val(response.description);
    $('[name=techSpecs]').val(response.techSpecs);
    $('<img>')
      .attr('src', '/img/' + response.img)
      .css('max-width', '100%')
      .insertAfter('#changePicture');
    $('[name=currentPicture]').val(response.img);
  }
  
  //display file input if change picture button is clicked
  $('#changePicture').click(function() {
    $('<input type="file" name="newPicture" id="pictureInput">').insertAfter($('#changePicture'));
    $('#changePicture').off('click');
    $('#changePicture:hover').css({
      'text-decoration' : 'none',
      'cursor' : 'default'
    });
  });

  //delete product
  // POST /deletProduct
  $('#delete').click(function (e) {
    $.ajax({
      type : 'POST',
      url : '/deleteProduct',
      data : $('#editProduct').serialize()
    }).done(function(response) {
      if (response.status === 'success') {
        location = '/';
      } else if (response.status === 'error') {
        toastr.error('Something went wrong! Please try again.');
      }
    }).fail(function(xhr, status, message) {
      toastr.error('Something went wrong! Please try again.');
    });
  });
  
});