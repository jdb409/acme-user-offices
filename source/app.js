/* globals renderUsers, renderUserForm, renderOfficeForm, renderOffices, initAutocomplete */

$(function () {
    $.get('/users')
        .then(users => {
            $.get('/offices')
                .then(offices => {
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
                            offices: offices,
                            removeOffice
                        })
                    }

                    function addOfficeToUser(obj) {
                        $.ajax({
                            url: `/users/${obj.userId}`,
                            type: 'PUT',
                            data: { officeId: obj.officeId }
                        }).then(res => {
                            let currentIndex;
                            offices.forEach(office => {
                                office.users = office.users.filter(u => {
                                    return u.id * 1 !== res.user.id * 1;
                                })
                            })
                            offices.forEach((office, index) => {
                                if (office.id === obj.officeId * 1) {
                                    currentIndex = index;
                                }
                            })
                            offices[currentIndex].users.push(res.user);
                            getOffices();
                        })
                    }

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
                            offices.forEach(office => {
                                office.users.forEach((user, index) => {
                                    if (user.id * 1 === obj.id * 1) {
                                        office.users.splice(index, 1);
                                    }
                                });
                            });
                            getOffices();
                            getUsers();
                        })
                    }

                    function addOffice(obj) {
                        $.post('/offices', { add: obj.add, lat: obj.lat, lng: obj.lng })
                            .then(office => {
                                office.users = [];
                                offices.push(office);
                                console.log(offices);
                                getOffices();
                                getUsers();
                            })

                    }

                    function removeOffice(obj) {
                        $.ajax({
                            url: `/offices/${obj.officeId}`,
                            type: 'DELETE'
                        }).then(() => {
                            offices = offices.filter(office => {
                                return office.id * 1 !== obj.officeId * 1
                            });
                            offices.forEach(office => {
                                if (office.id > obj.officeId) {
                                    office.id = office.id - 1;
                                }
                            })
                            getOffices();
                            getUsers();
                        });
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

                });
        });
});
