const button = document.querySelector('button');

button.addEventListener("click", () => {
    // if(navigator.geolocation) - bu kodun menasi: Eger browser bu JS kodunu (geolocation api) destekleyirse demekdir.
    // Yeni, browserler her hansisa bir JS kodunu desteklemedikde onu dogru sekilde tesvir etmezler.
    // Destekleyirse TRUE desteklemirse FALSE qaytararlar.
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        // geolocation.getCurrentPosition() - bu kod, cihazin hal-hazirda olan pozisiyasini qaytarir ve 3 parametr qebul ede biler: 1) success 2) error 3) options
        // Burda biz 2 parametrden istifade edeceyik 3cu parametre ehtiyac yoxdur. Hemin 2 parametr 'callback' funksiyalardir.
        // Bu funksiyalari asagida yaratmisiq ve getCurrentPosition() metodu icerisinde cagirmisiq. Hemin metod avtomatik olaraq bu funksiyalara arqumentler (deyerler) gonderir.
        // Bu arqumentler ferqli ferqli ola biler. Meselen eger istifadeci icaze vermese, onda deyerler buna uygun olacaq yox eger icaze verse onda koordinatlar gondermis olacagiq.
        //! Meselen: onSuccess = GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1677789918144};
        //! Meselen: onError = GeolocationPositionError {code: 1, message: 'User denied Geolocation'}
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser no support";
    }
});


//! position = GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1677789918144};
// position - bu parametr geo dannilar qebul edir ve hemin geo dannilarin icinde: 'latitude' ve 'longtitude' kodlari movcuddur.
function onSuccess(position) {
    button.innerText = "Detecting your location...";
    // Bele dedikde, avtomatik olaraq GEO kodlarindaki hemin adlar ile yaratmis oldugumuz deyisken adlari ust uste dusduyu ucun deyerler avtomatik olaraq oturulur hemin deyiskenlere.
    //* https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
    //* https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a500284c903d4cca86307a50f59616ab
    // Ilk once elde etdiyimiz koordinatlari bir xeriteye gondermeliyik. Bunun ucun koordinatlar ile GEO pozisiyani oyrenmeye icaze veren saytdan istifade edirik.
    //! Bu saytin adi: https://api.opencagedata.com
    
    let {latitude, longitude} = position.coords;
    // fetch() metodu hemin sayta sorgu gondermek ucun istifade edilir. Sorgu gonderildikden sonra, avtomatik olaraq geri cavab gelir.
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a500284c903d4cca86307a50f59616ab`)
    // melumatlari, geri JSON formatinda qebul edirik ancaq PROMISE kimi. Bize ise OBJECT kimi gelmesi lazimdir. Bunun yene then()-den istifade edirik.
    .then(response => response.json())  
    .then(result => {
        // result icerisindeki komponentleri cagiririq.
        let allDetails = result.results[0].components;
        // allDetails deyiskeninden cagirdigimiz acar sozlerdeki deyerleri asagidaki deyisken adlarina yazdiririq.
        let {town, postcode, country} = allDetails;
        button.innerText = `${town}, ${postcode}, ${country}`;
        console.log(allDetails);
    }).catch(() => {
        button.innerText = "Something went wrong";
    });    
}

//! error = GeolocationPositionError {code: 1, message: 'User denied Geolocation'};
function onError(error) {
    // Eger istifadeci mekan paylasmani qebul etmese.
    if(error.code == 1){    
        button.innerText = "You denied the request";
    }
    // Sistem terefinden mekanin paylasilmasina icaze verilmez ise.
    else if(error.code == 2){   
        button.innerText = "Location not available";
    } 
    // Her hansisa bir ferqli xeta aldiqda.
    else{
        button.innerText = "Something went wrong";
    }
    // Xeta mesaji aldiqdan sonra BUTTON duymesinin yeniden sorgu gonderme ozelliyini DISABLED edirik ki artiq işləməsin.
    button.setAttribute("disabled", "true");
}