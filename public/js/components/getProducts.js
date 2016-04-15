$(function() {
  
  //ajax call to load products
  // GET /getProducts
  $.ajax({
    type : 'GET',
    url : '/getProducts'
  }).success(function(response) {
    displayProducts(response);
  }).fail(function(xhr, status, message) { 
    toastr.error('Something went wrong!');
  });
  
  function displayProducts(response) {
    var container = $('.products-field .container'),
        col,
        panel,
        heading,
        body,
        img,
        rating,
        help,
        detailsButton,
        editButton,
        i,
        j;
    
    for (i = 0; i < response.length; i++) {
      col = $('<div>')
        .addClass('col-sm-4 col-lg-3');
      panel = $('<div>')
        .addClass('panel panel-default');
      heading = $('<div>')
        .addClass('panel-heading')
        .text(response[i].name);
      body = $('<div>')
        .addClass('panel-body');
      img = $('<div>').addClass('image-container')
        .append(
          $('<img>')
            .addClass('product-image')
            .attr('src', '/img/' + response[i].img));
      rating = $('<p>')
        .addClass('starRating display')
        .append($('<span class="star"></span>'),$('<span class="star"></span>'),
                $('<span class="star"></span>'),$('<span class="star"></span>'),
                $('<span class="star"></span>'));
      help = $('<span>')
        .addClass('help-block');
      detailsButton = $('<a>')
        .addClass('btn btn-primary')
        .text('Details')
        .attr('href', '/product?' + response[i]._id);
      editButton = $('<a>')
        .addClass('btn btn-primary')
        .css('float', 'right')
        .text('Edit')
        .attr('href', '/editProduct?id=' + response[i]._id);
      
      for (j = 0; j < 5; j++) {
        if (j >= response[i].averageRating) {
          $(rating.children()[j])
            .append(
              $('<img>').attr('src', '/fonts/star-off.svg')
            );
        } else {
          $(rating.children()[j])
            .append(
              $('<img>').attr('src', '/fonts/star-on.svg')
            );
        }
      }

      body.append(img, rating, help, detailsButton, editButton);
      panel.append(heading, body);
      col.append(panel);
      container.append(col);
    }
  }
  
});