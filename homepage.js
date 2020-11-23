$(function() {
    $(`#meetup`).on("click", handleMeetup)
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.addfav').on("click", handleAddFavoritePanel);
    $('#logout').on("click", handleLogout);

    const result = axios({
        method: 'get',
        url: 'https://secret-brook-97060.herokuapp.com/',
        withCredentials: true
    }).then((user) => {
        let welcome_tag = 
        //fix styline
        `<p style="float: right;" id="welcome">Welcome, ${user.data}</p>`

        $('#welcome').replaceWith(welcome_tag)
    })

    //handlers for both boxes to autocomplete
    google.maps.event.addDomListener(window, 'load', initializeFirstBox);
    google.maps.event.addDomListener(window, 'load', initializeSecondBox);


});

const handleLogout = async function(event){
    const result = axios({
        method: 'get',
        url: 'https://secret-brook-97060.herokuapp.com/logout',
        withCredentials: true
    }).then((user) => {
        window.location.href='index.html'
    })

}

//for autocomplete
function initializeFirstBox() {
    var input = document.getElementById('search1');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }

 function initializeSecondBox(){
    var input = document.getElementById('search2');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }



const handleAddFavoritePanel = function (event){
    event.preventDefault();
    let addfavoritepanel = 
            `<div class = "favoritepanel">
                <label class = "label" for = "favname">Location Name:</label>
                <input class = "favname" type = "text" name = "favname" value = "Ex: Home">
                <br>
                <br>
                <label class = "label" for = "favaddress">Address:</label>
                <input class = "favaddress" type = "text" name = "favaddress" value = "1234 Main St. Town, State Zip">
                <br>
                <br>
                <button class = "createfav button is-dark">Add</button>
            </div>`
    $('.addfav').replaceWith(addfavoritepanel);
    $('.createfav').on("click", handleCreateFavorite);


}
const handleCreateFavorite = function(event){
    event.preventDefault();
    let favname = $('.favname').val();
    let favaddress = $('.favaddress').val();
    let favorite = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${favname}</label>
            <label class = "${favaddress}" id = "${favaddress}">${favaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${favaddress}" style = "display: inline-block;" class = "meetfav button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Favorites').append(favorite);
    let replacementbutton = `<button class = "addfav button is-dark" style = "margin-left: 200px; margin-top: 10px; height: 75px; display: flex-right; justify-content: space-between;">Add a Favorite</button>`
    $('.favoritepanel').replaceWith(replacementbutton);
    $('.addfav').on("click", handleAddFavoritePanel);
    $('.meetfav').on("click", handleMeetFavorite);

}
const handleMeetFavorite = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.address1').val(event.target.id);
}

const handleAddFriendPanel = function (event){
    event.preventDefault();
    let addfriendpanel = 
            `<div class = "friendpanel">
                <label class = "label" for = "friendname">Name:</label>
                <input class = "friendname" type = "text" name = "friendname" value = "John Doe">
                <br>
                <br>
                <label class = "label" for = "friendaddress">Address:</label>
                <input class = "friendaddress" type = "text" name = "friendaddress" value = "1234 Main St. Town, State Zip">
                <br>
                <br>
                <button class = "createfriend button is-dark">Add</button>
            </div>`
    $('.addfriend').replaceWith(addfriendpanel);
    $('.createfriend').on("click", handleCreateFriend);


}
const handleCreateFriend = function(event){
    event.preventDefault();
    let friendname = $('.friendname').val();
    let friendaddress = $('.friendaddress').val();
    let friend = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${friendname}</label>
            <label class = "${friendaddress}" id = "${friendaddress}">${friendaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${friendaddress}" style = "display: inline-block;" class = "meetfriend button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Friends').append(friend);
    let replacementbutton = `<button class = "addfriend button is-dark" style = "margin-left: 250px; margin-top: 10px; height: 75px; display: flex-left; justify-content: space-between;">Add a Friend</button>`
    $('.friendpanel').replaceWith(replacementbutton);
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.meetfriend').on("click", handleMeetFriend);

}

const handleMeetFriend = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.address2').val(event.target.id);
}

const getMidpoint = function(lats, longs){

    let sum_lats = 0;
    let sum_longs = 0;

    for (let i=0; i<lats.length; i++){
        sum_lats = sum_lats + lats[i];
        sum_longs = sum_longs + longs[i];

    }
    
   

    let avg_lat = sum_lats/(lats.length);
    let avg_long = sum_longs/(longs.length);

    let coords = [avg_lat, avg_long];
    

    return coords;

    
}

const handleMeetup = async function(event){
    console.log("something");
    event.preventDefault();

    // let address1 = $('.streetname1').val() +",+"+$('.city1').val()+ ",+"+$('.state1').val();
    // let formatted_address1 = address1.replace(/ /g,'+')

    // let address2 = $('.streetname2').val() +", "+$('.city2').val()+ ", "+$('.state2').val();
    // let formatted_address2 = address2.replace(/ /g,'+')

    let address1 = $("#search1").val()
    let formatted_address1 = address1.replace(/ /g,'+')

    let address2 = $('#search2').val()
    let formatted_address2 = address2.replace(/ /g, '+')




    let meettype = $('input:radio[name=meetingplace]:checked').val();
    let stars = $('input:radio[name=stars]:checked').val();
    let price = $('input:radio[name=price]:checked').val();

    let latitudes = [];
    let longitudes = [];

    const coords1 = await axios({
        method: 'post',
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=425+Hillsborough+St,+Chapel+Hill,+NC&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address1}&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4`
    }).then((results)=> {
        let coords = results['data']['results'][0]['geometry']['location']
        let lat1 = coords.lat;
        latitudes.push(lat1);

        let long1 = coords.lng;
        longitudes.push(long1);

    })

    const coords2 = await axios({
        method: 'post',
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=425+Hillsborough+St,+Chapel+Hill,+NC&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address2}&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4`
    }).then((results)=> {
        let coords = results['data']['results'][0]['geometry']['location']
        let lat2 = coords.lat;
        latitudes.push(lat2);

        let long2 = coords.lng;
        longitudes.push(long2);
        
    })

    

  

    let mid_lat = getMidpoint(latitudes, longitudes)[0];
    let mid_lng = getMidpoint(latitudes, longitudes)[1];

    // console.log(lat);
    // console.log(lng);



    let request;

    if(meettype == "Restaurant") {
        if (stars <= 1.5) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 1.0
            };
        } else if (stars > 1.51 && stars <2.5) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 2.0
            };
        } else if (stars > 2.51 && stars <3.5 && price == "$$$") {
            console.log("here")
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 3.0,
                price_level: 3,
            };
        } else if (stars > 3.51 && stars <4.5) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 4.0
            };
        } else {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 5.0
            };
        }
    } else if( meettype == "Mall/Shopping Center") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'shopping',
            type: "shopping_mall"
        };
    } else if(meettype == "Retail Shop") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'shopping',
            type: "store"
        };
    } else if(meettype == "Recreation") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'recreation',
            type: "park"
        };
    } else if (meettype == "Movie") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'movies',
            type: "movie_theatre"
        };
    } else {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'shopping',
            type: "store"
        };
    };

    let map = $("<div/>", {html: `<div id="meet-map"></div>
                            <div id="right-panel">
                            <h2>Results</h2>
                            <ul id="places"></ul>
                            </div>`});

    $('#setup-meet').replaceWith(map);

    handleCreateMap(request, mid_lat, mid_lng);

    //let preferences = 'meat'

    // const result = axios({
    //     method: 'post',
    //     url: 'http://localhost:3030/meetups',
    //     data:{
    //         "address1": address1,
    //         "address2": address2,
    //         "meettype": meettype,
    //         "stars": stars,
    //         "price": price
    //     }
    // })

  //window.location.href = "homepage.html";

    let meetuppanel = 
        `<div class = "meetuppanel" style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
            <h3 class = "label">You Meet Between: </h3>
            <label>${address1}</label>
            <h3 class = "label">and</h3>
            <label>${address2}</label>
            <h4 class = "label">With the following prefernces: </h4>
            <label>${meettype}, </label>
            <label>${stars}, </label>
            <label">${price}</label>
        </div>`
        $('#Recents').append(meetuppanel);
}

const handleCreateMap = function(meeting_place, mid_lat, mid_lng){
    initMap(meeting_place, mid_lat, mid_lng);
}

function initMap(request, mid_lat, mid_lng) {
    // Create the map.
    const chapel_hill = { lat: mid_lat, lng: mid_lng };
    
    const map = new google.maps.Map(document.getElementById("meet-map"), {
        center: chapel_hill,
        zoom: 15,
        clickableIcons: false,
    });

    console.log(request)
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    //const moreButton = document.getElementById("more");
  
    /*moreButton.onclick = function () {
        moreButton.disabled = true;
    
        if (getNextPage) {
            getNextPage();
        }
    };*/

    service.search({location: new google.maps.LatLng(mid_lat, mid_lng),
                    radius: 1000, rating: 5,}, (results) => {console.log(results)})

    service.search(request, (results, status, pagination) => {
        if (status !== "OK") {console.log("error"); return;}
        createMarkers(results, map);
        //moreButton.disabled = !pagination.hasNextPage;

        if (pagination.hasNextPage) {
        getNextPage = pagination.nextPage;
        }
    })
/*
    // Perform a nearby search.
    service.nearbySearch(
        { location: chapel_hill, radius: 1000, type: meeting_place},
        (results, status, pagination) => {
            if (status !== "OK") {console.log("error"); return;}
            createMarkers(results, map);
            moreButton.disabled = !pagination.hasNextPage;
    
            if (pagination.hasNextPage) {
            getNextPage = pagination.nextPage;
            }
        }
    );*/
}

function createMarkers(places, map) {
    const bounds = new google.maps.LatLngBounds();
    const placesList = document.getElementById("places");

    let markers = []

    for (let i = 0, place; (place = places[i]); i++) {
        //console.log(place)
        const image = {
            url: 'solid_blue.png',
            size: new google.maps.Size(15, 15),
            //origin: new google.maps.Point(5, 5),
            //anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(5, 5),
        };

        let marker = new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
        }).addListener('click', () => { handleMeetingPlace(event["path"][1]['title'])});
        markers.push(marker);

        const li = document.createElement("li");
        li.addEventListener('click', (event) => { 
            // let solo_marker;
            // let mark = ''
            // console.log(event)
            // for(let h = 0; markers.length; h++) {
            //     //mark = markers[h]['j']['title']
                
            //     if(event['path'][0]['innerText'] == mark) {
            //         solo_marker = markers[h];
            //     }
            //     //markers[h].setMap(null)
            // }
            // handleFindOnMap(solo_marker, map)
            handleMeetingPlace(event)});
        
        li.textContent = place.name;
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);
    }
    //map.fitBounds(bounds);
}

function handleMeetingPlace(place_name) {
    console.log(place_name);
}

function handleFindOnMap(marker, map) {
    new google.maps.Marker({
        map,
        icon: marker['icon'],
        title: marker['title'],
        position: marker['position'],
    }).addListener('click', () => { handleMeetingPlace(event["path"][1]['title'])});
}