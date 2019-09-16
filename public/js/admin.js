//intiliaze users tables
var unapprovedUsers, allStudents, allCoaches, allAdmins;
$(document).ready(function () {
    unapprovedUsers = $('#unapproved-users').DataTable({
        "ajax": "/api/users/unapproved"
    });
    allStudents = $('#all-users').DataTable({
        "ajax": "/api/users/students"
    });
    allCoaches = $('#all-coaches').DataTable({
        "ajax": "/api/users/coaches"
    });
    allAdmins = $('#all-admins').DataTable({
        "ajax": "/api/users/coaches"
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
            allStudents.ajax.reload();
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
            allStudents.ajax.reload();
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
            allStudents.ajax.reload();
        }
    });
}