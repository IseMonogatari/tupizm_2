// TODO какие функции у нас будут выполняться при запуске страницы
$(document).ready(function() {
    $('#wantToBeAdmin').click(function() {
        $(this).attr('disabled', true); // Либо добавить атрибут disabled
    });


    if (getUserStatus(showAuthorizedUser().id)) {
        $('#wantToBeAdmin').attr('disabled', true); // скрываем кнопку, если уже отправили запрос, но ответа нет
    }  else {
        $('#wantToBeAdmin').attr('disabled', false); // показываем кнопку
    }
});


// TODO изменяем цвет таба при отправке запроса "стать админом"
function changeColor() {
    let tab = document.getElementById('new_admin');
    tab.style.backgroundColor = '#aa3402';
    tab.style.color = '#ffffff';
}
function changeColorFalse() {
    let tab = document.getElementById('new_admin');
    tab.style.backgroundColor = '#F5F5F5';
    tab.style.color = '#007bff';
}

//TODO При нажатии кнопки отправляем комментарий в ВК и меняем статус пользователя на Я ХОЧУ БЫТЬ АДМИНОМ
function postToVKAndChangeUserStatusToIWantToBeAAdminInDB() {
    let user = showAuthorizedUser();
    $.ajax({
        url: '/post_I_WANT_TO_BE_A_ADMIN',
        type: 'POST',
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            user_id: user.id,
            status: true
        },
        success: function(result) {
            console.log(result);
        },
        error: function (error) {
            console.log("ошибка запроса 'отправить комментарий в ВК' " + error);
        }
    });
}

// TODO Получаем пользователей, которые хотят получить роль АДМИНИСТРАТОР, из БД!
function getUsersWhichWantToBeAAdminForTable() {
    let listUsers = getUsersWhichWantToBeAAdmin();
    let table;
    if (listUsers.length !== 0) {
        for (i = 0; i < listUsers.length; i++) {
            let userId = listUsers[i].id;
            let userName = listUsers[i].name;

            table = table +
                "<tr>" +
                "   <td>" + userId + "</td>" +
                "   <td>" + userName + "</td>" +
                "   <td>" + `<button type=\"button\" class=\"btn btn-primary\" onclick='changeUserStatusToFalseAndGetRoleAdmin("${userId}")'>Добавить роль</button>`
                + " "
                + `<button type=\"button\" class=\"btn btn-danger\" onclick='changeUserStatusToFalseAndRefuse("${userId}")'>Отказать</button>`
                + "</td>" +
                "</tr>";
        }
        $("#get_VK").html(table);
    } else {
        table =
            "<tr>" +
            "</tr>";
        $("#get_VK").html(table);
    }
}

function getUsersWhichWantToBeAAdmin() {
    let userList;
    $.ajax({
        url: '/get_users_which_WANT_TO_BE_A_ADMIN',
        type: 'GET',
        async: false,
        contentType: 'application/json',
        success: function (listUsers) {
            userList = listUsers;
        },
        error: function (error) {
            console.log("Ошибка в получении пользователей \"НА АДМИНКУ\" из БД " + error);
        }
    });
    return userList;
}


//TODO Обновляем СТАТУС пользователя идаём ему роль АДМИН
function changeUserStatusToFalseAndGetRoleAdmin(USER_ID) {
    changeUserStatus(USER_ID, false);
    changeUserRoleToAdminInDB(showUser(USER_ID));
    getUsersWhichWantToBeAAdminForTable();
    showAllUsers();
    if (getUsersWhichWantToBeAAdmin().length === 0) {
        changeColorFalse();
    }
}

//TODO Обновляем СТАТУС пользователя до "Refuse_Request" и обновляем комментарий в ВК
function changeUserStatusToFalseAndRefuse(USER_ID) {
    changeUserStatus(USER_ID, false);
    getUsersWhichWantToBeAAdminForTable();
    if (getUsersWhichWantToBeAAdmin().length === 0) {
        changeColorFalse();
    }
}

// TODO Что решили по поводу роли АДМИН?
function checkUserStatusInDB() {
    let user = showAuthorizedUser();
    let userStatus = getUserStatus(user.id);

    if (userStatus) {
        set_message_info("#refuseMessage", "Запрос пока в обработке.");
    }  else {
        set_message_error("#refuseMessage", "Вы Не отправляли запроса.");
    }
}

function changeUserStatus(USER_ID, TRUE_OR_FALSE) {
    $.ajax({
        url: '/edit_user_status',
        type: 'POST',
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            user_id: USER_ID,
            status: TRUE_OR_FALSE
        },
        success: function(result) {
            console.log(result);
        },
        error: function (error) {
            console.log("ошибка в изменении статуса на " + TRUE_OR_FALSE + ".\n" + error);
        }
    });
}


// TODO Добавляем пользователю роль "АДМИН"
function changeUserRoleToAdminInDB(USER) {
    $.ajax({
        url: '/update_user',
        type: 'POST',
        cache: false,
        async: false,
        contentType: 'application/json',
        data: JSON.stringify({
            id: USER.id,
            lastName: USER.lastName,
            name: USER.name,
            email: USER.email,
            password: null, //не передаём пароль, ибо он зашифрованный, что нельзя будет сравнить
            role: "ROLE_ADMIN"
        }),
        success: function(result) {
            console.log("Дали роль 'АДМИН' " + result);
        },
        error: function (error) {
            console.log("какая-то ошибка обновления РОЛИ " + error);
        }
    });
}


function getUserStatus(USER_ID) {
    let status;
    $.ajax({
        url: '/get_user_status',
        type: 'GET',
        cache: false,
        async: false,
        data: {
            user_id: USER_ID
        },
        success: function(result) {
            status = result;
            console.log("Статус пользователя " + result);
        },
        error: function (error) {
            console.log("ошибка в получении статуса пользователя.\n" + error);
        }
    });
    return status;
}