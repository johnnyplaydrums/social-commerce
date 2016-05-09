//retrieve users list from server
$(function() {
  
  $.ajax({
    type : 'get',
    url : '/getUsers',
  }).done(function(response) {
    displayUsers(response);
  }).fail(function() {
  });
  
  function displayUsers(data) {
    var users = data.users,
        user = data.user,
        container = $('.users-field .container'),
        col,
        panel,
        heading,
        body,
        img,
        addFriend,
        br,
        i,
        j;
    
    for (i = 0; i < users.length; i++) {
      col = $('<div>')
        .addClass('col-xs-6 col-sm-3');
      panel = $('<div>')
        .addClass('panel panel-default');
      heading = $('<div>')
        .addClass('panel-heading')
        .text(users[i].username);
      body = $('<div>')
        .addClass('panel-body');
      img = $('<img>')
        .css('width', '100%')
        .attr('src', '/img/avatar.png');
      addFriend = $('<a>')
        .addClass('btn btn-primary')
        .html('Add friend!')
        .addClass('addFriend')
        .attr('data-username', users[i].username);
      br = $('<br>');
      for (j = 0; j < user.friends.length; j++) {
        if (user.friends[j] === users[i].username) {
          addFriend
            .attr('class', 'btn btn-success')
            .html('Friends');
        }
      }
      
      body.append(img, br, addFriend);
      panel.append(heading, body);
      col.append(panel);
      container.append(col);  
    }
    
    $('.addFriend').click(function() {
      var $that = $(this);
      $.ajax({
        type : 'post',
        url : '/addFriend',
        data : { username : $(this).attr('data-username') }
      }).done(function(response) {
        if (response.status === 'already friend') {
          buttonGreen($that);
          toastr.info('Already friends!');
        } else if (response.status === 'error') {
          toastr.error('Error: please try again later');
        } else {
          buttonGreen($that);
        }
      }).fail(function() {
        console.log('fail');
      });
    });
    
  }
    
  function buttonGreen($button) {
    $button
      .attr('class', 'btn btn-success')
      .html('Friends');
  }

});