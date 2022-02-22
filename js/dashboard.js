$(document).ready(function(){
    
    // Actualizamos fecha
    $('#date').append('<i class="fa-solid fa-calendar-day"></i>' +  getDate());
    
    // Obtenemos valores de clasificación
    getStandings();

    //Gestión de eventos

        // modo oscuro
    $('#switch').on('click', () => {
        $('body').toggleClass('dark'); 
        $('#switch').toggleClass('active');
    });

        // selección de año
    $('#year').on('change', function(){
        getStandings($(this).val());
    })
    
})


/* 

    getStandings 

    Obtiene la clasificación de pilotos para un año concreto recibido como parámetro 
    El parámetro año es opcional. Si no se recibe muestra los datos del año actual
    Los datos se recuperan de la API de Ergast https://ergast.com/api/f1 a través de AJAX

*/


function getStandings(year){

    var url;
    if (year == null ) {
        url = 'https://ergast.com/api/f1/current/driverStandings.json';
    } else { 
        url = 'https://ergast.com/api/f1/' + year + '/driverStandings.json';
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success : function(json) {
            data = json.MRData.StandingsTable.StandingsLists[0];
            showTableStandings(data);
        },
    })
}


/*

   showTableStangings

   Formatea la tabla con la clasificación de pilotos a partir de los datos que recibe

*/

function showTableStandings(data){
    $('#tableStandings').empty();
    data.DriverStandings.forEach(function(piloto){
        $('#tableStandings').append(
            '<tr>  <td>' + piloto.position + '</td>' + 
            '<td class="avatar"><i class="fa-solid fa-user"></i></td>' +
            '<td>' + piloto.Driver.givenName + ' ' + piloto.Driver.familyName +  '</td>' +
            '<td>' + piloto.Constructors[0].name + '</td>' +
            '<td>' + piloto.points + '</td>' +
            '<td>' + piloto.wins + '</td>' +
            '<td><button>Detalle</button></td>' +
            '</tr>'
        )

    })

}

function getDate() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;
    return date;

}