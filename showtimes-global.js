﻿function ReplaceUri(args) {
    // BORRAR ARCHIVO
    // AGREGAR ESTE ARCHIVO EN S3 SOLO EN AMBIENTE STAGE / PREPROD

    debugger;
    const url = new URL(args.href);
    const params = new URLSearchParams(url.search);
    const currentLocation = window.location.hostname;

    const conditions0 = ['localhost'];
    const conditions1 = ['preprod', 'stage'];

    const isLabsLocal = conditions0.some(i => currentLocation.includes(i));
    const isLabsStagePre = conditions1.some(i => currentLocation.includes(i));

    let countryCode = 'MX';
    let cinemaVistaId = params.get('cinemaVistaId');
    let showtimeVistaId = params.get('showtimeVistaId');

    if (isLabsLocal) {
        let search_countryCode_local = document.getElementById('tmp-country').value.split("'");
        let countryCode_local = search_countryCode_local[1];
        countryCode = countryCode_local.slice(-2);
    }

    if (isLabsStagePre) {
        const search_countryCode = currentLocation.split('.');
        countryCode = search_countryCode[3].toUpperCase();
    }

    showtimeVistaId = parseInt(showtimeVistaId);

    switch (showtimeVistaId) {
        case 36838:
            showtimeVistaId = 31858;
            break;

        case 31740:
            showtimeVistaId = 35934;
            break;

        case 31762:
            showtimeVistaId = 36817;
            break;

        default:
            showtimeVistaId = showtimeVistaId;
    }

    let merge = `https://sls-pre-compra.cinepolis.com/?cinemaVistaId=${cinemaVistaId}&showtimeVistaId=${showtimeVistaId}&countryCode=${countryCode}`;
    args.href = merge;
}
