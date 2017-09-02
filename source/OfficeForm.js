var initAutocomplete;

function renderOfficeForm(config) {
    
    const container = $(config.id)
    console.log(container);

    const template = `
        <div>
            <h3>Offices</h3>
            <div class = 'well'>
                <strong>Name</strong>
                <input id = 'autocomplete' type = 'text' class = 'form-control' name = 'officeName'>
                </br>
            </div>
        <div>
    `

    const $html = $(template);
    $(container).empty();
    $(container).append($html);

    $html.on('change', '#autocomplete', function () {
        initAutocomplete();
    });

    initAutocomplete  = function(){
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
        var place = autocomplete.getPlace();
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            config.addOffice({
                add: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lat()
            })
    
        });
    
    }
    
}




