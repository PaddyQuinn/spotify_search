var handleData = function(data) {
    var arr = data["tracks"];
    var offset = arr.offset;
    var next = arr.next;
    var tracks = arr["items"];
    var count = 0;
    var numRows = 0;
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        var id = track.id
        var preview_url = track.preview_url;
        var name = track.name
        if (name.length > 20) {
            name = name.substring(0, 25)
            name += " . . ."
        }
        var album = track.album.name;
        if (album.length > 20) {
            album = album.substring(0, 25)
            album += " . . ."
        }
        var artistArray = track.artists;
        var artists = "";
        if (track.album.images[0] != undefined){
            var artwork = track.album.images[0].url;
        } else {
            artwork = "default.png";
        }
        for (var j = 0; j < artistArray.length; j++) {
            if (j == 0) {
                artists += artistArray[j].name;
            } else {
                if (j == artistArray.length - 1) {
                    artists += " & " + artistArray[j].name;
                } else {
                    artists += ", " + artistArray[j].name;
                }
            }
        }
        if (artists.length > 20) {
            artists = artists.substring(0, 25)
            artists += " . . ."
        }
        $("table tr:last").append("<td><b>" + name + "</b><br><i>" + album + "</i><br>" + artists + "<br><img src=\"" + artwork + "\"><br><button class=\"stopped\" id= \"" + id + "\"><audio src=\"" + preview_url + "\"></audio>Play</button></td>");
        $("#" + id)[0].addEventListener("click", function() {
            var nowPlaying = $(".nowPlaying");
            if (nowPlaying.length > 0) {
                var stop = nowPlaying[0];
                if (this != stop) {
                    stop.className = "stopped";
                    stop.firstChild.pause();
                    stop.firstChild.currentTime = 0;
                    stop.childNodes[1].data = "Play";
                    this.className = "nowPlaying";
                    this.firstChild.play();
                    this.childNodes[1].data = "Pause";
                } else {
                    this.className = "paused";
                    this.firstChild.pause();
                    this.childNodes[1].data = "Play"
                }
            } else {
                this.className = "nowPlaying";
                this.firstChild.play();
                this.childNodes[1].data = "Pause";
                var paused = $(".paused");
                if (paused.length > 0) {
                    var reset = paused[0];
                    reset.className = "stopped";
                    reset.firstChild.pause();
                    reset.firstChild.currentTime = 0;
                    reset.childNodes[1].data = "Play";
                }  
            }
        });
        count++;
        if (count == 5) { 
            numRows++;
            var rowNumber = offset/5 + numRows;
            if (offset > 0 || i >= 9) {
                $("table").append("</tr><tr class=\"hidden\" id=\"" + rowNumber + "\" hidden>");
            } else {
                $("table").append("</tr><tr class=\"visible\" id=\"" + rowNumber + "\">");
            }
            count = 0; 
        }
    }
    if (next != null) {
        next = next.slice(40, -20);
        $("#next")[0].hidden = false;
        searchTracks(next);
    } else {
        $("table").append("</tr>");
        var rows = $("table")[0].children[0].children.length;
        if ($("table")[0].children[0].children[rows - 1].children.length < 1) {
            $("table")[0].children[0].children[rows - 1].id = "deleteMe";
            $("#deleteMe").remove();
        }
        console.log($("table"));
        if ($("table")[0].children[0].children.length > 2){
            $("#next")[0].hidden = false;
        }
    }
}

var searchTracks = function(query) {
    $.ajax({
        url: "https://api.spotify.com/v1/search?query=" + query + "&limit=50&type=track",
        success: handleData
    });
};

var createQuery = function(artist, track, album, genre, year) {
    var query = "";
    var first = true;
    if (artist != ""){
        query += "artist%3A" + artist;
        first = false;
    }
    if (track != "") {
        if (first) {
            query += "track%3A" + track;
            first = false;
        } else {
            query += "%20track%3A" + track;
        }
    }
    if (album != "") {
        if (first) {
            query += "album%3A" + album;
            first = false;
        } else {
            query += "%20album%3A" + album;
        }
    }
    if (genre != "") {
        if (first) {
            query += "genre%3A" + genre;
            first = false;
        } else {
            query += "%20genre%3A" + genre;
        }
    }
    if (year != "") {
        if (first) {
            query += "year%3A" + year;
        } else {
            query += "%20year%3A" + year;
        }
    }
    return query;
}

$(document).ready(function() {
    $("#prev")[0].addEventListener("click", function(event) {
        $("#next")[0].hidden = false;
        var hide = $("tr.visible");
        var unhide = [$("#" + (parseInt(hide[0].id) - 1))[0], $("#" + (parseInt(hide[0].id) - 2))[0]];
        if (unhide[1].id == 0) {
            $("#prev")[0].hidden = true;
        }
        hide[0].hidden = true;
        hide[1].hidden = true;
        unhide[0].hidden = false;
        unhide[1].hidden = false;
        hide[0].className = "hidden";
        hide[1].className = "hidden";
        unhide[0].className = "visible";
        unhide[1].className = "visible";
    });
    $("#next")[0].addEventListener("click", function(event) {
        $("#prev")[0].hidden = false;
        var hide = $("tr.visible");
        var unhide = [$("#" + (parseInt(hide[1].id) + 1))[0], $("#" + (parseInt(hide[1].id) + 2))[0], $("#" + (parseInt(hide[1].id) + 3))[0]];
        if (unhide[2] == undefined) {
            $("#next")[0].hidden = true;
        }
        if (unhide[1] != undefined) {
            unhide[1].hidden = false;
            unhide[1].className = "visible";
            if (unhide[1].children.length < 5) {
                $("#next")[0].hidden = true;
            }
        }
        hide[0].hidden = true;
        hide[1].hidden = true;
        unhide[0].hidden = false;
        hide[0].className = "hidden";
        hide[1].className = "hidden";
        unhide[0].className = "visible";
    });
    $("form")[0].addEventListener("submit", function(event) {
        event.preventDefault();
        var artist = $("#artist")[0].value;
        $("#artist")[0].value = "";
        var track = $("#track")[0].value;
        $("#track")[0].value = "";
        var album = $("#album")[0].value;
        $("#album")[0].value = "";
        var genre = $("#genre")[0].value;
        $("#genre")[0].value = "";
        var year = $("#year")[0].value;
        $("#year")[0].value = "";
        var query = createQuery(artist, track, album, genre, year);
        if (query != "") {
            $("table")[0].innerHTML = ""
            $("table").append("<tr class=\"visible\" id=\"0\">");
            $("#prev")[0].hidden = true;
            searchTracks(query, 0);
        }
    });
});
