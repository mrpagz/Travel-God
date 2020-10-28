//MAP STUFF
let map;

var currentLocation;
var options = 


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7306, lng: -73.9352 },
        zoom: 12,
    });
    const input = document.getElementById("travel-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places) //where the name is captured 
        currentLocation = places[0].name; //storing the name
        console.log(currentLocation);
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.setOptions({minZoom : 12, maxZoom : 16 }) //fixed zoom to make more sense on search of city
        map.fitBounds(bounds);
    });
}
/////////////////




// //////////////// EVENT Test
// var getEvents = [];
// $.ajax({
//   type: "GET",
//   url: "https://app.ticketmaster.com/discovery/v2/events.json?size=4&apikey=ElWPP9FatyxVq4ke0f4mPT8u3LtGG04m",
//   async: true,
//   dataType: "json",
//   success: function(json) {
//       getEvents.json = json;
//       showEvents(json);
//       console.log(json);
//       }
// });
// function showEvents(json) {
//   var items = $('#events .list-group-item'); //// might want to try grabbing just the class and use the class at each index instead of using an id 
//   var events = json._embedded.events;
//   var item = items.first(); ////may not need
//   for (var i=0; i< events.length; i++) {
//     item.children('.list-group-item-heading').text(events[i].name);
//     item.children('.list-group-item-text').text(events[i].dates.start.localDate);
//     item.children('.list-group-url').text(events[i].url);
//     try {
//       item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name + " url " + events[i]._embedded.venues[0].url);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

