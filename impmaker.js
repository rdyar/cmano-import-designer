var map;
var markers = [];
var infowindows = [];
var currtitle = "Generic marker";

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2,
    center: {lat: 0, lng: 0}
  });
console.log("7");
   google.maps.event.addListener(map, 'click', function(event) {
      var marker = new google.maps.Marker({
            id: guid(),
            dbid: dbid.value,
            position: event.latLng,
            map: map,
            draggable: true,
            title: dbid.text,
            type: dbid.label
      });
console.dir(dbid)
      m = markers.push(marker) - 1;

      var contentString = '<div id="content">' +
                          '<div id="siteNotice">' +
                          '</div>' +
                          '<h2 id="firstHeading" class="firstHeading">' + markers[m].type + '</h2>' +
                          '<div id="bodyContent">' +
                          '<p><b>Name</b> <input onChange="javascript:markers[m].title=unitName' + m + '.value;" type="text" id="unitName' + m + '" value="' + markers[m].title + '" size="45"></p>' +
                          '</p>' +
                          '</div>' +
                          '</div>';

      var infowindow = new google.maps.InfoWindow({
            content: contentString
      });

      n = infowindows.push(infowindow);

      google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
      });

      google.maps.event.addListener(marker, 'dblclick', function() {
            marker.setMap(null);
            markers.splice(markers.indexOf(marker));
      });
  });
}

function guid() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

function genExport() {
    var inst = {
        DB_ID: 1,
        ValidFrom: "",
        ValidUntil: "",
        Name: mapName.value,
        Comments: "Generated by https://georgehedfors.github.io",
        FormatVersion: 0,
        MemberRecords: []
    };

    var parent = null;

    if (grouped.checked) {
        parent = mapName.value;
    }

    for (var i in markers) {
        var member = {
            Member_DBID: Number(markers[i].dbid),
            Member_GUID: markers[i].id,
            MemberType: "Command_Core.Facility",
            MemberName: markers[i].title,
            ParentGroupName: parent,
            Longitude: markers[i].position.lng(),
            Latitude: markers[i].position.lat(),
            Altitude: 0.0,
            LoadoutID: 0,
            Orientation: 0.0,
            HostedAircraftRecords: [],
            EmbarkedBoatRecords: [],
            MagazineRecords: [],
            Member_SBR: null
        }
console.table(markers[i]);
        inst.MemberRecords.push(member);
    }

    return(JSON.stringify(inst, null, 4));
}

$(document).ready(function () {
    for (var i in db) {
        $("#dbid").append("<option value=" + db[i] + ">" + i + "</option>");
    }

    $("#export").click(function() {
        this.href = 'data:text/plain;charset=utf-8,' +
                    encodeURIComponent(genExport());
    });

    $("#welcome").dialog({
        autoOpen: false,
        title: 'Welcome!'
    });
});

google.maps.event.addDomListener(window, 'load', initialize);
