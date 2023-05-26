// TODO Показываем все данные зарегистрированного пользователя
function tableAuthorizedUser() {
    let user = showAuthorizedUser();

    let table =
        "<tr>" +
        "   <td>" + user.id + "</td>" +
        "   <td>" + user.lastName + "</td>" +
        "   <td>" + user.name + "</td>" +
        "   <td>" + user.email + "</td>" +
        "   <td>" + user.allRoles + "</td>" +
        "</tr>";
    $("#oneUserTableBody").html(table);
}