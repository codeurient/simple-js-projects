const cookieBox = document.querySelector('.wrapper');
acceptBtn = cookieBox.querySelector(".buttons button");


// "COOKIE" xassesi brovserdeki cookie-leri oxumaq ve onlara ne ise yazmaq ucun istifade edilir. 
// Asagidaki kod duymeni klikledikde cookie-lere bu yazini yazdirir ve artiq cookie-lerde bu yazilar olur: 
//! ("CookieBy=CodingNepal; max-age=" + 60*60*24*30;)
acceptBtn.onclick = () => {
    // 60saniye * 60deq * 24saat * 30gun = 2.592.000 saniye yeni 1 ay.
    // cookie - ler 1 aydan sonra oz aktualligini avtomatik olaraq itirecek.
    document.cookie = "CookieBy=CodingNepal; max-age=" + 60*60*24*30;

   
    if(document.cookie){
        // Eger yuxaridaki cookie-ler qurasdirilidirsa onda (.wrapper) div tag-ine "hide" klas adi elave edilsin
        cookieBox.classList.add("hide");
    } else{
        // eks cookie-ler qurasdirili deyilse alert ile mesaj verilsin.
        alert("Cookie can not be set!");
    }
};


//! Eger bu asagidaki kod olmasa idi, yuxarida "if" ile kodu gizledikden sonra, yene de cookie-leri qebul edin deye mesaj alasiydiq. Yuxaridaki
//! kod DUYMENI BASDIQDA cookie-lerde nese varsa DIV tag-ini gizledir. Sehifeni yeniledikde ise yeniden ekrana mesaj gelir. Ve bu mesaji gizlemek
//! ucun yene DUYMENI BASMAQ lazimdir. Asagidaki kod ise cookie-lerin icinde nese var oldugu muddetce hemin DIV tag-ini gorunmez tutur.
// indexOf() - bu metod "document.cookie" icerisinde hemin stringi axtaracaq ve varsa onun indeksini qaytaracaq (sifir 0)
let checkCookie = document.cookie.indexOf("CookieBy=CodingNepal");
// Eger checkCookie yeni sifir beraber deyilse menfi bire (0 != -1) onda, DIV tagi gizlensin. Eks teqdirde gorsensin. 
// 0 (sifir) -1-e (menfi bire) beraber olmadigi ucun DIV tag-i gizlenecek.
//! -1 vermekde sebeb indexOf() metodunun axtardigi deyeri tapmadiqda avtomatik olaraq -1 qaytarmasidir. Eger 1 verse idik hemise ? sualdan sonra 
//! gelen kod işləyəcəkdi. Çünki (0 != 1) ve ( -1 != 1 ) demis olacaqdiq. 
checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");