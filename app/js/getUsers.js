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
        friends,
        unfriend,
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
      friends = $('<a>')
        .addClass('btn btn-success friends')
        .css('width', '45%')
        .css('display', 'none')
        .html('Friends');
      unfriend = $('<a>')
        .addClass('btn btn-danger pull-right unfriend')
        .css('width', '45%')
        .css('display', 'none')
        .html('Unfriend')
        .attr('data-username', users[i].username);
      br = $('<br>');
      for (j = 0; j < user.friends.length; j++) {
        if (user.friends[j] === users[i].username) {
          addFriend.css('display', 'none');
          friends.css('display', 'inline-block');
          unfriend.css('display', 'inline-block');
        }
      }
      
      body.append(img, br, addFriend, friends, unfriend);
      panel.append(heading, body);
      col.append(panel);
      container.append(col);  
    }
    
    $('.addFriend').click(function() {
      var $panel = $(this).parent();
      $.ajax({
        type : 'post',
        url : '/addFriend',
        data : { username : $(this).attr('data-username') }
      }).done(function(response) {
        if (response.status === 'already friend') {
          showFriend($panel);
          toastr.info('Already friends!');
        } else if (response.status === 'error') {
          toastr.error('Error: please try again later');
        } else {
          showFriend($panel);
        }
      }).fail(function() {
        toastr.error('Error: please try again later');
      });
    });
    
    $('.unfriend').click(function() {
      var $panel = $(this).parent();
      $.ajax({
        type : 'post',
        url : '/unfriend',
        data : { username : $(this).attr('data-username') }
      }).done(function(response) {
        if (response.status === 'not friends') {
          hideFriend($panel);
        } else if (response.status === 'error') {
          toastr.error('Error: please try again later');
        } else {
          hideFriend($panel);
        }
      }).fail(function() {
        toastr.error('Error: please try again later');
      });
    });
  }
  
  function showFriend($panel) {
    $panel.find('a.addFriend').css('display', 'none');
    $panel.find('a.friends').css('display', 'inline-block');
    $panel.find('a.unfriend').css('display', 'inline-block');
  }
  
  function hideFriend($panel) {
    $panel.find('a.addFriend').css('display', 'inline-block');
    $panel.find('a.friends').css('display', 'none');
    $panel.find('a.unfriend').css('display', 'none');
  }

});