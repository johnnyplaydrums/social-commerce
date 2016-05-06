$(function() {
  
  //ajax call to load products
  // GET /getProducts
  $.ajax({
    type : 'GET',
    url : '/getProducts'
  }).done(function(response) {
    displayProducts(response);
  }).fail(function(xhr, status, message) { 
    toastr.error('Something went wrong!');
  });
  
  //display the produts
  function displayProducts(response) {
    var container = $('.products-field .container'),
        col,
        panel,
        heading,
        body,
        img,
        ratingContainer,
        rating,
        averageRating,
        writeReview,
        detailsButton,
        editButton,
        stars,
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
      img = $('<div>')
        .addClass('image-container')
        .css('background', 'url("/img/' + response[i].img + '") no-repeat')
        .css('background-size', 'contain')
        .css('height', '175px');
      
      ratingContainer = $('<div class="starsContainer">');
      averageRating = $('<div class="starContainer">')
        .attr('data-averageRating', response[i].averageRating)
        .append($('<p>')
          .addClass('starRating display')
          .append($('<span class="star"></span>'),$('<span class="star"></span>'),
                  $('<span class="star"></span>'),$('<span class="star"></span>'),
                  $('<span class="star"></span>')));
      writeReview = $('<a>')
        .addClass('write-review')
        .html('Write a review!')
        .attr('href', '/createReview?id=' + response[i]._id);
      detailsButton = $('<a>')
        .addClass('btn btn-primary')
        .text('Details')
        .attr('href', '/product?' + response[i]._id);
       editButton = $('<a>')
        .addClass('btn btn-primary')
        .addClass('edit-button')
        .css('float', 'right')
        .text('Edit')
        .attr('href', '/editProduct?id=' + response[i]._id)
        .hide();
  
      stars = $(averageRating).find('p');
      for (j = 0; j < 5; j++) {
        if (j >= response[i].averageRating) {
          $(stars.children()[j])
            .append(
              $('<img>').attr('src', '/fonts/star-off.svg')
            );
        } else {
          $(stars.children()[j])
            .append(
              $('<img>').attr('src', '/fonts/star-on.svg')
            );
        }
      }
      
      ratingContainer.append(averageRating);
      body.append(img, ratingContainer, writeReview, detailsButton, editButton);
      panel.append(heading, body);
      col.append(panel);
      container.append(col);  
    }
    
//    $('.starsContainer').mouseenter(function() {
//      $(this).children().remove();
//      $(this)
//        .append($('<span class="starRating display">')
//          .append('<input id="rating5" type="radio" name="rating" value="5">',
//                  '<label for="rating5">5</label>',
//                  '<input id="rating4" type="radio" name="rating" value="4">',
//                  '<label for="rating4">4</label>',
//                  '<input id="rating3" type="radio" name="rating" value="3">',
//                  '<label for="rating3">3</label>',
//                  '<input id="rating2" type="radio" name="rating" value="2">',
//                  '<label for="rating2">2</label>',
//                  '<input id="rating1" type="radio" name="rating" value="1">',
//                  '<label for="rating1">1</label>'));
//    });
    
//    $('.starContainer').mouseleave(function() {
//      $(this).children().remove();
//      $(this)
//        .append($('<p>')
//          .addClass('starRating display')
//          .append($('<span class="star"></span>'),$('<span class="star"></span>'),
//                  $('<span class="star"></span>'),$('<span class="star"></span>'),
//                  $('<span class="star"></span>')));
//      
//      for (j = 0; j < 5; j++) {
//        if (j >= $(this).attr('data-averageRating')) {
//          $(this).find('p').children()[j]
//            .append(
//              $('<img>').attr('src', '/fonts/star-off.svg')
//            );
//        } else {
//          $($(this).find('p').children()[j])
//            .append(
//              $('<img>').attr('src', '/fonts/star-on.svg')
//            );
//        }
//      }
//      
//    });
    
    //check if user is logged in before displaying edit button
    displayEditButton($('.edit-button'));
  }
  
  //if user is logged in, add the edit button
  function displayEditButton(editButtons) {
    $.ajax({
      type : 'get',
      url : '/isLoggedIn',
    }).done(function(response) {
      if (response.loggedIn) {
        editButtons.show();
      }
    }).fail(function(xhr, status, message) {
    });
  }
  
  function displayReviewButton(reviewButton) {
    $.ajax({
      type : 'get',
      url : '/isLoggedIn',
    }).done(function(response) {
      if (response.loggedIn) {
        reviewButton.show();
      }
    }).fail(function(xhr, status, message) {
    });
  }
  
});