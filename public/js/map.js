mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: Listing.geometry.coordinates,
    zoom: 10
});

new mapboxgl.Marker({ color: 'red' })
    .setLngLat(Listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${Listing.title}</h3><p>${Listing.address || ""}${Listing.address ? ", " : ""}${Listing.location}</p>`)
    )
    .addTo(map);
