$(function() {
  $('#generate-user-button').on('click', function() {
    let url = 'https://randomuser.me/api/';

    const gender = $('#chooseGender').val();
    
    if (gender === 'Чоловік') {
      url += '?gender=male';
    } else if (gender === 'Жінка') {
      url += '?gender=female';
    }

    $.ajax({
      url: url,
      dataType: 'json',
      beforeSend: function() {
        $('#spinner').css({'display': 'inline-block'});
      },
      success: function(data) {
        const user = data.results[0]; 
        const userRow = $('<tr>');
        const avatarCell = $('<td>').html('<img src="' + user.picture.medium + '">');
        const nameCell = $('<td>').text(user.name.first + ' ' + user.name.last);
        const emailCell = $('<td class="mobile-hide">').text(user.email);
        const phoneCell = $('<td class="mobile-small-hide">').text(user.phone);
        const detailsCell = $('<td>')
          .html('<button class="btn btn-primary" id="open-info" data-toggle="modal" data-target="#infoModal">Деталі</button>');

        userRow.append(avatarCell, nameCell, emailCell, phoneCell, detailsCell);
        $('#users-table tbody').prepend(userRow);

        $('#open-info').on('click', function() {
          $('#info-avatar').html('<img src="' + user.picture.large + '">');
          $('#infoName').html(user.name.first + ' ' + user.name.last);
          $('#infoGender').html(user.gender);
          $('#infoEmail').html(user.email);
          $('#infoPhone').html(user.phone);
          $('#infoAdress').html(
            user.location.country + ', ' +
            user.location.state + ', ' + 
            user.location.city + ', ' +
            user.location.street.number + ', ' +
            user.location.street.name
          );
        }); 

        const lastUserRow = $('<tr>');
        const avatarCellClone = avatarCell.clone();
        const nameCellClone = nameCell.clone();
        const emailCellClone = emailCell.clone();
        const phoneCellClone = phoneCell.clone();

        lastUserRow.append(avatarCellClone, nameCellClone, emailCellClone, phoneCellClone);
        $('#last-user tbody').html(lastUserRow);

        $('#spinner').hide();
        $('#success-api').show();
        $('#success-api').fadeOut(2000);
      },
      error: function() {
        $('#error-api').show();
        $('#error-api').fadeOut(2000);
      }
    });
  });

    $('#create-form').on('submit', function(event) {
      event.preventDefault();

      const userRow = $('<tr>');
      const avatarCell = $('<td>')
        .append($('<img>')
        .attr('src', $('#inputAvatar').val())
        .css({'width': '72px', 'height': '72px'}));
        
      const nameCell = $('<td>').text($('#inputName').val());
      const emailCell = $('<td class="mobile-hide">').text($('#inputEmail').val());
      const phoneCell = $('<td class="mobile-small-hide">').text($('#inputPhone').val());
      const detailsCell = $('<td>')
        .html('<button class="btn btn-primary" id="open-info2" data-toggle="modal" data-target="#infoModal">Деталі</button>');
  
      userRow.append(avatarCell, nameCell, emailCell, phoneCell, detailsCell);
  
      $('#users-table tbody').prepend(userRow);

      const lastUserRow = $('<tr>');
      const avatarCellClone = avatarCell.clone();
      const nameCellClone = nameCell.clone();
      const emailCellClone = emailCell.clone();
      const phoneCellClone = phoneCell.clone();

      lastUserRow.append(avatarCellClone, nameCellClone, emailCellClone, phoneCellClone);
      $('#last-user tbody').html(lastUserRow);

      $('#open-info2').on('click', function() {
        $('#info-avatar')
          .html($('<img>')
          .attr('src', $('#inputAvatar').val())
          .css({'width': '128px', 'height': '128px'}));

        $('#infoName').html($('#inputName').val());
        $('#infoGender').html($('#chooseGenderCreate').val());
        $('#infoEmail').html($('#inputEmail').val());
        $('#infoPhone').html($('#inputPhone').val());
        $('#infoAdress').html($('#inputAdress').val());
      }); 
    })

  $('#inputPhone').inputmask("+380 (99) 999-99-99");
});
