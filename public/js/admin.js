//intilize users table 
var unapprovedUsers;
$(document).ready(function () {
    unapprovedUsers = $('#unapproved-users').DataTable({
        "ajax": "/api/users/unapproved"
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
            unapprovedUsers.ajax.reload();
        }
    });
}