function renderOffices(config) {
    const container = $(config.id);
    let userLength
    const lis = config.offices.map(office => {
        if (office.users) {
            userLength = office.users.length
        }

        return `
            <li class= 'list-group-item'>
                <p>${office.name}<p>
                <p><em>lat: </em>${office.lat}</p>
                <p><em>lng: </em>${office.lng}</p>
                <button id = 'removeOffice' class = 'btn btn-danger' data-id = ${office.id}>Delete</button>
               <h4><span class='label label-success'>${userLength || 0} user</span></h4>
            </li>
        `
    })

    const template = `
        <ul class = 'list-group'>${lis.join('')}</ul>
    `

    const $html = $(template);

    $html.on('click', 'button', function () {
        config.removeOffice({
            officeId: $(this).attr('data-id')
        });
    })

    container.empty();
    container.append($html);


}