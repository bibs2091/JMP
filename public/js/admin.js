//intiliaze users table 
var unapprovedUsers;
var allUsers;
$(document).ready(function () {
    unapprovedUsers = $('#unapproved-users').DataTable({
        "ajax": "/api/users/unapproved"
    });
    allUsers = $('#all-users').DataTable({
        "ajax": "/api/users/all"
    });
});
//delete a user by id
function deleteUser(id) {
    $.ajax({
        url: '/admin/users/delete/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (result) {
            unapprovedUsers.ajax.reload();
            allUsers.ajax.reload();
        }
    });
}
//approve a user by id
function approveUser(id) {
    $.ajax({
        url: '/admin/users/approve/' + id,
        method: 'PUT',
        contentType: 'application/json',
        success: function (result) {
            allUsers.ajax.reload();
            unapprovedUsers.ajax.reload();
        }
    });
}
//make a user coach
function makeCoach(id) {
    $.ajax({
        url: '/admin/users/makecoach/' + id,
        method: 'PUT',
        contentType: 'application/json',
        success: function (result) {
            unapprovedUsers.ajax.reload();
            allUsers.ajax.reload();
        }
    });
}