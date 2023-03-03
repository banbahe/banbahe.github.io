function ReplaceUri(args) {
    // BORRAR ARCHIVO
    // AGREGAR ESTE ARCHIVO EN S3 SOLO EN AMBIENTE STAGE / PREPROD
    debugger;

    const url = new URL(args.href);
    const params = new URLSearchParams(url.search);
    const currentLocation = window.location.hostname;

    const conditions0 = ['localhost'];
    const conditions1 = ['stage'];
    const conditions2 = ['preprod'];

    const isLocal = conditions0.some(i => currentLocation.includes(i));
    const isStage = conditions1.some(i => currentLocation.includes(i));
    const isPreprod = conditions2.some(i => currentLocation.includes(i));

    let countryCode = 'MX';
    let hostNamePuchase = 'https://sls-stage-compra.cinepolis.com/';
    let cinemaVistaId = params.get('cinemacode');
    let showtimeVistaId = params.get('txtSessionId');

    let search_countryCode_local = document.getElementById('tmp-country').value.split("'");
    let countryCode_local = search_countryCode_local[1];

    try {

        countryCode = countryCode_local.slice(-2);
        cinemaVistaId = cinemaVistaId == null ? params.get('cinemaVistaId') : cinemaVistaId;
        showtimeVistaId = showtimeVistaId == null ? params.get('showtimeVistaId') : showtimeVistaId;
        
        if(countryCode == 'PE') {
          hostNamePuchase = 'https://compra.cinepolis.com/';
        }

    } catch (err) {
        countryCode = 'MX'
    }

    if (isPreprod) {
        hostNamePuchase = 'https://sls-preprod-compra.cinepolis.com/';
        cinemaVistaId = params.get('cinemaVistaId');
        showtimeVistaId = params.get('showtimeVistaId');
        // const search_countryCode = currentLocation.split('.');
        // countryCode = search_countryCode[3].toUpperCase();
    }

    showtimeVistaId = parseInt(showtimeVistaId);

    switch (showtimeVistaId) {
        case 19136:
            showtimeVistaId = 15404;
            break;

        case 19141:
            showtimeVistaId = 15458;
            break;
        
        case 6218:
            showtimeVistaId = 5195;
            break;	
			
        case 6217:
            showtimeVistaId = 5225;
            break;

        case 110905:
            showtimeVistaId = 110493;
            break;

        case 38345:
            showtimeVistaId = 35633;
            break;
			
        default:
            showtimeVistaId = showtimeVistaId;
    }

    let merge = `${hostNamePuchase}?cinemaVistaId=${cinemaVistaId}&showtimeVistaId=${showtimeVistaId}&countryCode=${countryCode}`;
    args.href = merge;
}
