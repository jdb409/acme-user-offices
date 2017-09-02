/* globals renderUsers, renderUserForm */

$(function () {
    $.get('/users')
        .then(users => {

            //gets the users from db
            function getUsers() {

                console.log(users);
                renderUsers({
                    id: '#UsersList',
                    users: users,
                    removeUser
                });

            }

            getUsers();

            renderUserForm({
                id: '#UserForm',
                addUser
            })

            function addUser(obj) {
                $.post('/users', {name: obj.name })
                    .then(user => {
                        users.push(user);
                        getUsers();
                    })
            }

            function removeUser(obj) {
                $.ajax({
                    url: `/users/${obj.id}`,
                    type: 'DELETE'
                }).then(() => {
                    users = users.filter(user => user.id * 1 !== obj.id * 1);
                    getUsers();
                })
            }
        });
});
