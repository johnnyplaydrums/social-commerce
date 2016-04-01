//display navbar
//html must have <div class="navbar navbar-default navbar-static-top"></div>
$(function() {
  var container = $('.navbar.navbar-default.navbar-static-top');
  
  container.append(
    "<div class='navbar-header'> " + 
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
          "<ul class='nav navbar-nav'>" +
            "<li><a href='/'>Home</a></li>" +
            "<li><a href='/addProduct'>Add Product</a></li>" +
          "</ul>"  +
        "</div>"
  );
});