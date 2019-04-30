//intilize users table 
$(document).ready(function () {
    const unapprovedUsers = $('.data-table').DataTable({
        ajax: "/admin/users/unapproved"
    });
});