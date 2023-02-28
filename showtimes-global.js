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
        case 18948:
            showtimeVistaId = 15196;
            break;

        case 18954:
            showtimeVistaId = 15248;
            break;
        
        case 19481:
            showtimeVistaId = 15410;
            break;	
			
        case 19477:
            showtimeVistaId = 15387;
            break;
			
        default:
            showtimeVistaId = showtimeVistaId;
    }

    let merge = `${hostNamePuchase}?cinemaVistaId=${cinemaVistaId}&showtimeVistaId=${showtimeVistaId}&countryCode=${countryCode}`;
    args.href = merge;
}
