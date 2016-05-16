$(function() {
  
  $.ajax({
    type : 'get',
    url : '/getFriendProducts'
  }).done(function(response) {

    if (response.status === 'error') {
      toastr.error('Something went wrong. Please reload the page.');
    } else if (response.status === 'no user') {
      
    } else if (!response.products.length) {
      $("#friends-products-field").append('<span class="no-friends">Go to the <a href="/users/">Users</a> page to add friends!</span>').show(); 
    } else {
      displayProducts(response.products);
    }
  }).fail(function() {
    toastr.error('Something went wrong. Please reload the page.');
  });
  
    
  //display the produts
  function displayProducts(response) {
    var container = $('#friends-products-field'),
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
        .addClass('dynamic')
        .css('background', 'url("/img/' + response[i].img + '") no-repeat')
        .css('background-size', 'contain');
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
        .css('margin-bottom', '10px')
        .css('display', 'block')
        .attr('href', '/createReview?id=' + response[i]._id);
      detailsButton = $('<a>')
        .addClass('btn btn-primary')
        .text('Details')
        .attr('href', '/product?id=' + response[i]._id);
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
    
    $('<br>').insertAfter(container);
    
    //check if user is logged in before displaying edit button
    displayEditButton($('.edit-button'));
    
    $(window).resize(function() {
      if ($(window).width() < 800) {
        $('.image-container.dynamic').each(function() {
          $(this).css('height', $(this).width());
        });
      } else {
        $('.image-container.dynamic').each(function() {
          $(this).css('height', '185px');
        });
      }
    });
    
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