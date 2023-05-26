//TODO Отправляем комментарий в ВК
function postCommentInVK(USER) {
    $.ajax({
        url: '/post_comment',
        type: 'POST',
        cache: false,
        async: false,
        data: {
            message: "Я, " + USER.name + ", хочу стать администратором Вашего ЗАМЕЧАТЕЛЬНОГО сайта."
        },
        success: function(result) {
            console.log(result);
        },
        error: function (error) {
            console.log("ошибка запроса 'отправить комментарий в ВК' " + error);
        }
    });
}

//TODO Получаем все комментарии из ВК
function getCommentsFromVK() {
    let responseFromVK;
    $.ajax({
        url: '/get_comments',
        type: 'GET',
        async: false,
        contentType: 'application/json',
        success: function (response) {
            responseFromVK = response;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return responseFromVK;
}

//TODO Обновляем комментарий в ВК
function editCommentInVK(COMMENT_ID, MESSAGE, YES_OR_NO) {
    let response;
    if (YES_OR_NO) {
        response = String("– " + MESSAGE +
            "\n– Мы повысили Вам до АДМИНИСТРАТОРА. " +
            "Зайдите на страницу, чтобы подтвердить изменения. (Администрация сайта)");
    } else {
        response =  String("– " + MESSAGE +
            "\n– Простите, но мы не можем повысить Вас в правах доступа на нашем сайте. (Администрация сайта)");
    }

    $.ajax({
        url: '/edit_comment',
        type: 'GET',
        cache: false,
        async: false,
        data: {
            comment_id: COMMENT_ID,
            message: response
        },
        success: function () {
            console.log("обновили комментарий в ВК");
        },
        error: function (error) {
            console.log("Ошибка обновления комментария в ВК " + error);
        }
    });
}

// TODO Удаляем комментарий с запросом на получение РОЛИ "АДМИН"
function deleteComment(commentId) {
    $.ajax({
        url: '/delete_comment',
        type: 'GET',
        cache: false,
        async: false,
        data: {
            comment_id: commentId
        },
        success: function(result) {
            console.log(result);
        },
        error: function (error) {
            console.log("какая-то ошибка удаления комментария" + error);
        }
    });
}

//TODO Удаляем конкретный комментарий в ВК
function deleteThisComment(RESPONSE_FROM_VK, USER) {
    let len = RESPONSE_FROM_VK.response.count;
    for (i = 0; i < len; i++) {
        let message = String(RESPONSE_FROM_VK.response.items[i].text);
        if (message.indexOf(USER.name) !== -1) {    //если содержит имя пользователя
            deleteComment(RESPONSE_FROM_VK.response.items[i].id);
            console.log("Успешно получили текст и id комментария из ВК");
        }
    }
}