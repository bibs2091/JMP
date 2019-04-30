//intilize users table 
$(document).ready(function () {
    const unapprovedUsers = $('#unapproved-users').DataTable({
        "ajax": "/api/users/unapproved"
    });
});