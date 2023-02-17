function ReplaceUri(args) {
    debugger;
    const url = new URL(args.href);
    const params = new URLSearchParams(url.search);
    const currentLocation = window.location.hostname;

    const conditions = ['preprod', 'stage'];
    const isLabs = conditions.some(i => currentLocation.includes(i));

    if (isLabs) {
        const search_countryCode = currentLocation.split('.');
        const countryCode = search_countryCode[3].toUpperCase();

        let cinemaVistaId = params.get('cinemacode');
        let showtimeVistaId = params.get('txtSessionId');
        let merge = `https://sls-pre-compra.cinepolis.com/?cinemaVistaId=${cinemaVistaId}&showtimeVistaId=${showtimeVistaId}&countryCode=${countryCode}`;
        args.href = merge;
    }
}