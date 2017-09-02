function renderUsers(config) {
    const container = $(config.id);

    const options = config.offices.map(office => {
        return `
            <option data-officeId = ${office.id}>${office.name}</option>
        `
    });

    const lis = config.users.map(user => {
        return `
        <li class = 'list-group-item'>${user.name}
        <br>
        <select data-userId = ${user.id} '/class = 'form-control'>${options.join('')}</select>
        <br/>   
        <button class = 'btn btn-warning id='remove' data-id=${user.id}>Remove</button>
        </li>
        `;
    });

    const template = `
        <ul class = list-group>
            ${ lis.join('')}
        <ul>
    `;

    const $html = $(template);

    $html.on('click', 'button', function () {
        config.removeUser({
            id: $(this).attr('data-id')
        });
    })

    $html.on('change', 'select', function () {
        config.addOfficeToUser({
            id: $(this).attr('data-userId'),
            officeId: $(this).find(':selected').attr('data-officeId')
        })
        
    })
    container.empty();
    container.append($html);
}