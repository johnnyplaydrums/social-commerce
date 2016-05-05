//display navbar
//html must have <div class="navbar navbar-default navbar-static-top"></div>
$(function() {
  var container = $('.navbar.navbar-default.navbar-static-top');
  
  //add navbar to page
  container.append(
    "<div class='container-fluid'>" +
      "<div class='navbar-header'>" + 
            "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>" +
              "<span class='sr-only'>Toggle navigation</span>" +
              "<span class='icon-bar'></span>" +
              "<span class='icon-bar'></span>" + 
              "<span class='icon-bar'></span>" +
            "</button>" + 
            "<a href='/' class='navbar-brand'>" + 
              "<span ref='triangles' class='triangles animated'>" +
                "<div class='tri invert'></div>" + 
                "<div class='tri invert'></div>" +
                "<div class='tri'></div>" +
                "<div class='tri invert'></div>"  +
                "<div class='tri invert'></div>"  +
                "<div class='tri'></div>" +
                "<div class='tri invert'></div>" +
                "<div class='tri'></div>" +
                "<div class='tri invert'></div>" +
              "</span>" +
              "E-Commerce Now" +
              "<span class='badge badge-up badge-danger'></span>" +
            "</a>" +
        "</div>" +
        "<div id='navbar' class='navbar-collapse collapse'>" +
          "<form name='searchForm' class='navbar-form navbar-left animated'>" +
            "<div class='input-group'>" +
              "<input type='text' class='form-control' placeholder='Search' />" +
              "<span class='input-group-btn'>" +
                "<button class='btn btn-default'><span class='glyphicon glyphicon-search'></span></button>" +
              "</span>" +
            "</div>" +
          "</form>" +
          "<ul class='nav navbar-nav leftList'>" +
            "<li><a href='/'>Home</a></li>" +
            "<li id='addProductContainter'></li>" +
            "<li id='signupAddContainter'></li>" +
          "</ul>"  +
          "<ul class='nav navbar-nav navbar-right'>" +
            "<li class='dropdown' id='signupContainer'></li>" +
            "<li class='dropdown' id='loginContainer'></li>" +
            "<li id='usernameContainer'></li>" +
            "<li id='logoutContainer'></li>" +
          "</ul>" +
        "</div>" +
      "</div>"
  );
  
  //if user is logged in, add forms to navbar
  //else add the user information
  loggedIn();

  function loggedIn() {
    $.ajax({
      type : 'get',
      url : '/isLoggedIn',
    }).done(function(response) {
      if (response.loggedIn) {
        showUser(response.user);
      } else {
        showForms();
      }
    }).fail(function(xhr, status, message) {
      toastr.error('Oh no! There was an error. Please reload page.');
    });
  }
  
  //user has just logged in or signed up
  //remove the login forms
  //show user info and logout button
  function showUser(user) {
    
    //remove login/signup and signupAdd
    $('#signupContainer').removeClass('open').children().remove(); 
    $('#loginContainer').removeClass('open').children().remove();
    $('#signupAddContainter').children().remove();

    //show user in navbar
    $('#usernameContainer').append("<a>Hi, "  + user.username + "!</a>");
    
    //show logout button
    $('#logoutContainer').append("<a>Logout</a>");
    
    //display the 'edit' buttons on the products
    $('.edit-button').show();
    
    //show the 'add product' button
    $('#addProductContainter').append("<a href='/addProduct'>Add Product</a>");
  }
  
  //show login and signup forms
  //hide username, logout button (if displayed)
  function showForms() {
    
    $('#logoutContainer').children().remove();
    $('#usernameContainer').children().remove();
    $('#addProductContainter').children().remove();
    $('.edit-button').hide();
    
    //show signupAdd
    $('#signupAddContainter').append('<a>Sign up or log in to add products!</a>');
    
    //display signup form
    $('#signupContainer').append(
      "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Signup<span class='caret signup'></span></a>" +
      "<ul class='dropdown-menu userForm'>" +
        "<form id='signup'>" +
          "<input type='text' class='form-control' name='username' id='signupUsername' placeholder='Username'>" + 
          "<input type='password' class='form-control' name='password' id='signupPassword' placeholder='Password'>" + 
          "<input type='password' class='form-control' name='confirmPassword' id='signupConfirmPassword' placeholder='Confirm Password'>" +
          "<button class='btn btn-primary' id='userFormButton' type='submit'>Sign Up</button>" +
        "</form>" +
      "</ul>"
    );
    
    //display login form
    $('#loginContainer').append(
      "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Login <span class='caret'></span></a>" +
      "<ul class='dropdown-menu userForm'>" +
        "<form id='login'>" +
          "<input type='text' class='form-control' name='username' id='loginUsername' placeholder='Username'>" + 
          "<input type='password' class='form-control' name='password' placeholder='Password'>" + 
          "<button class='btn btn-primary' id='userFormButton' type='submit'>Log In</button>" +
        "</form>" +
      "</ul>"
    );
    
  }
  
  /** event listeners/bindings **/
  
  //when the user submits the signup form
  $('#signupContainer').submit(function(e) {
    //prevent standard form submission
    e.preventDefault();
    
    //ensure passwords match
    if ($('#signupConfirmPassword').val() !== $('#signupPassword').val()) {
      toastr.error('Passwords don\'t match!', { fadeAway: 2500 });
      return; 
    }
    
    //create query string from input fields
    var data = 'username=' + $('#signupUsername').val() + '&password=' + $('#signupPassword').val();
    
    $.ajax({
      type : 'post',
      url : '/signup',
      data : data
    }).done(function(response) {
      if (response.loggedIn) {
        showUser(response.user);
      } else if (response.status === 'username taken') {
        toastr.error('Username is taken!', { fadeAway: 2500 });
      }
    }).fail(function(xhr, status, message) {
      toastr.error('Oh no! There was an error. Please try again.');
    });
  });
  
  //user submits login form
  $('#loginContainer').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type : 'post',
        url : '/login',
        data : $('#login').serialize()
      }).done(function(response) {
        if (response.loggedIn) {
          location.reload();  
        } else if (response.status === 'no user') {
          toastr.error('Invalid username and/or password', { fadeAway: 2500 });
        }
        
      }).fail(function(xhr, status, message) {
        toastr.error('Oh no! There was an error. Please try again.');
      });
    });
  
  //user clicks logout button
  $("#logoutContainer").click(function() {
    $.ajax({
      type : 'get',
      url : '/logout'
    }).done(function(response) {
      location = '/';
    }).fail(function(xhr, status, message) {
      toastr.error('Oh no! There was an error. Please try again.');
    });
  });
    
});