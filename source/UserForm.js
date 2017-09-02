function renderUserForm(config) {
    const container = $(config.id);
    const template = `
    <h3>Users</h3>
    <div class = 'well'>
        <strong>Name</strong>
        <div class = 'form-group'>
            <input class = 'form-control' name = 'userName'>
            <button class = 'btn btn-primary class = 'form-control'>Save</button>
        </div>
    </div>
 `;

    const $html = $(template);

    $html.on('click', 'button', function () {
        config.addUser({
            name: $(this).prev().val()
        })
        $(this).prev().val('');
    })
    container.empty();
    container.append($html);
}