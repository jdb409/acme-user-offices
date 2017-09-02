function renderUsers(config) {
    const container = $(config.id);
    const lis = config.users.map(user => {
        return `
        <li class = 'list-group-item'>${user.name}
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
    container.empty();
    container.append($html);
}