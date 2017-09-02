/* globals renderUsers, renderUserForm, renderOfficeForm, renderOffices */

$(function () {
    $.get('/users')
        .then(users => {
            $.get('/offices')
                .then(offices => {
                    //gets the users from db
                    function getUsers() {
                        renderUsers({
                            id: '#UsersList',
                            users: users,
                            offices: offices,
                            removeUser,
                            addOfficeToUser
                        });

                    }

                    function getOffices() {

                        renderOffices({
                            id: '#OfficesList',
                            offices: offices
                        })
                    }

                    function addOfficeToUser(obj) {
                        $.ajax({
                            url: `/users/${obj.id}`,
                            type: 'PUT',
                            data: { officeId: obj.officeId }
                        }).then((user) => {
                            if (user.officeId !== null) {
                                if (offices[user]) {
                                    offices[user.officeId - 1].users.splice(0, 1);
                                }

                            }
                            if (offices[obj.officeId - 1]) {
                                offices[obj.officeId - 1].users.push(users[obj.id - 1]);
                            }

                            getOffices();
                        })
                    }

                    getOffices();
                    getUsers();
                    renderUserForm({
                        id: '#UserForm',
                        addUser
                    });
                    renderOfficeForm({
                        id: '#OfficeForm',
                        addOffice
                    });

                    initAutocomplete();

                    function addUser(obj) {
                        $.post('/users', { name: obj.name })
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

                    function addOffice(obj) {
                        $.post('/offices', { add: obj.add, lat: obj.lat, lng: obj.lng })
                            .then(office => {
                                console.log(offices);
                                offices.push(office);
                                getOffices();
                                getUsers();
                            })

                    }

                });
        });
});
