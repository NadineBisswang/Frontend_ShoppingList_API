function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
    document.getElementById("content").classList.toggle('active');
}

function changeImage() {
    var image = document.getElementById('toggle_icon');
    if (image.src.match("left")) {
        image.src = "pictures/right_icon.PNG";
    } else {
        image.src = "pictures/left_icon.PNG";
    }
}

//-----------------------------------------------------
//Aktuelles Datum
function formatDate(date) {
    var monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAI", "JUN", "JUL",
        "AUG", "SEPT", "OCT",
        "NOV", "DEZ"
    ];
    var weekday = [
        "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var weekIndex = date.getDay();
    var year = date.getFullYear();

    return weekday[weekIndex] + ' | ' + monthNames[monthIndex] + ' ' + day + ' | ' + year;
}

function currentDate() {
    var d = formatDate(new Date());
    document.getElementById("heute").innerHTML = d;
}