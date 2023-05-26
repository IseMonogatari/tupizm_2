//TODO какие функции у нас будут выполняться при запуске страницы
$(document).ready(function() {

    showEmail();
    showRoles();

    tableAuthorizedUser();

    let user = showAuthorizedUser();

    if (user.allRoles.indexOf('ROLE_ADMIN') === -1) {
        $('#v-pills-admin-tab').hide();
        $('#admin_panel').hide();
    } else {
        showAllUsers();
        $('#wantToBeAdmin').hide();     //скрываем кнопку "хочу стать админом" для админов
        $('#refuse').hide();     //скрываем кнопку "ответ на запрос "хочу стать админом"" для админов
    }
});

// TODO достаём всех пользователей и засовываем в таблицу
function showAllUsers() {
    if (getUsersWhichWantToBeAAdmin().length !== 0) {
        changeColor();
    }

    $.get('/get_allUsers', function(data) {
        console.log(data);

        let table;

        for (i = 0; i < data.length; i++) {
            table = table +
                "<tr>" +
                "   <td>" + data[i].id + "</td>" +
                "   <td>" + data[i].lastName + "</td>" +
                "   <td>" + data[i].name + "</td>" +
                "   <td>" + data[i].email + "</td>" +
                "   <td>" + data[i].allRoles + "</td>" +
                "   <td>" + "<button type=\"button\" class=\"btn btn-primary\" onclick='editModalById(" + data[i].id + ")'>Обновить</button>"
                + " "
                + "<button type=\"button\" class=\"btn btn-danger\" onclick='deleteModalById(" + data[i].id + ")'>Удалить</button>"
                + "</td>" +
                "</tr>";
        }
        $("#allUserTableBody").html(table);
    });
}

//TODO достаём одного пользователя по его ID
function showUser(ID) {
    let user;
    $.ajax({
        url: '/get_user?id=' + ID,
        type: 'GET',
        async: false,
        contentType: 'application/json',
        success: function (response) {
            user = response;
            console.log("Удачный вызов пользователя по ID")
            console.log(response);
            console.log("_______")
        },
        error: function (error) {
            console.log("Ошибка вызова пользователя по ID")
            console.log(error);
            console.log("_______")
        }
    })
    return user;
}


//TODO вызываем модальное окно обновления пользователя по ID
function editModalById(ID) {

    console.log("до вызова пользователя по id =" + ID)
    let user = showUser(ID);
    console.log("вызов пользователя по id")
    console.log(user)

    $("#ID_edit").val(user.id);
    $("#lastName_edit").val(user.lastName);
    $("#name_edit").val(user.name);
    $("#email_edit").val(user.email);
    $("#password_edit").val();  //user.password
    $("#role_edit").val(user.role);


    $('#modal_edit').modal({
        show: true
    });

    //TODO при нажатии кнопки с id "edit_user" происходит обновление пользователя
    $('#edit_user').one('click', function() {
        console.log("до обновления пользователя")
        if (editUser(user.id)) {
            console.log("после обновления пользователя, но перед обновлением таблицы")
            showAllUsers();
            console.log("после обновления таблицы")
        } else {
            set_message_error('#error_edit',
                'Данный пользователь уже был зарегестрирован с роль \"ПОЛЬЗОВАТЕЛЬ\", ' +
                'поэтому он не может иметь роль \"АДМИНИСТРАТОР\"!')
        }
    });
}


//TODO функция обновления пользователя
function editUser(ID) {
    let good = false;
    $.ajax({
        url: '/update_user',
        type: 'POST',
        cache: false,
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({
            id: ID,
            lastName: $("#lastName_edit").val(),
            name: $("#name_edit").val(),
            email: $("#email_edit").val(),
            password: $("#password_edit").val(),
            role: $("#role_edit").val()
        }),
        success: function(result) {
            console.log(result);
            good = true;
        },
        error: function (error) {
            console.log("какая-то ошибка обновления" + error);
            good = false;
        }
    });
    return good;
}


//TODO вызываем модальное окно удаления пользователя по ID
function deleteModalById(ID) {

    let user = showUser(ID);

    $("#ID_delete").val(user.id);
    $("#lastName_delete").val(user.lastName);
    $("#name_delete").val(user.name);
    $("#email_delete").val(user.email);
    $("#role_delete").val(user.allRoles);

    $('#modal_delete').modal({
        show: true
    });

    //TODO при нажатии кнопки с id "delete_user" происходит обновление пользователя
    $('#delete_user').one('click', function() {
        if (deleteById(user.id)) {
            showAllUsers();
        }
    });
}


//TODO функция удаления пользователя
function deleteById(ID) {
    let good = false;
    $.ajax({
        url: '/delete_user?id=' + ID,
        type: 'DELETE',
        async: false,

        success: function(result) {
            console.log(result);
            good = true;
        },
        error: function () {
            console.log("ошибка какая-то");
            good = false;
        }
    });
    return good;
}