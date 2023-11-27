// 'navigator' - JS-in bu xassesi istifadecinin cihazi haqqinda olan butun melumatlari ozune saxlayir.
// Cihaz dedikde biz veb ile islediyimiz ucun nezerde tutulan hemin cihaz istifadecinin Browser-idir.
// 'navigator' ise bu browser-in adini, versiyasini, dilini, ve.s kimi coxlu melumatlari elde etmeye imkan verir.
//* Bize lazim olan xasses ise 'userAgent' xassesidir hansi ki, bu xasse bize BROWSER-in adini verecek..
let userAgent = navigator.userAgent;

let browser;
// macth() metodu ona verilen setr icerisinde qaydali ifadeler (RegExp) vasitesi ile axtaris ederek bize lazim olan
// deyeri elde etmek ucun istifade edilir. Elde edilen deyer ise Array olaraq geri qayidir.
if(userAgent.match(/edg/i)) {
    browser = "edge";
} else if(userAgent.match(/firefox|fxios/i)) {
    browser = "firefox";
} else if(userAgent.match(/opr/i)) {
    browser = "opera";
} else if(userAgent.match(/chrome|chromium|crios/i)) {
    browser = "chrome";
} else if(userAgent.match(/safari/i)) {
    browser = "safari";
} else {
    alert("Other Browsers");
} 


// Acilan browser-den asili olaraq hemin browser-e uygun string elde edesiyik ve bu stringi let browser; deyiskenine yazdirasiyiq. 
// Bu deyiskendeki hemin stringi ise CLASS adi olaraq istifade edeceyik ki hemin klass adina sahib olan IMG tag-ini cagira bilek.
const logo = document.querySelector(`.logos .${browser}`);
console.log(logo);

// Burda ("") hemin bu 2 dirnaqciq sadece bos bir stringdir. 
// (!=) yazaraq eslinde biz demis oluruq ki, eger 'logo' deyiskeni bos deyilse. 
// Ve heqiqeten bu 'logo' deyiskeni bos deyildir. Onun icerisinde IMG TAG-i vardir.
// Hemin IMG tag-i 1 ededdir ve hemin tag hal-hazirda aciq olan browerden asili olaraq secilir.
// Biz dedik ki, logo stringe beraber deyil ve bu TRUE-dur. Ona gore giririk if-in icerisinde.
if(logo != ""){
    // 'logo' deyiskeni hal-hazirki browserden asili olaraq secilen IMG tag-i oldugu ucun, asagida
    // elde etdyimiz hemin IMG tag-inin solgunlugunu 1 et deyirik.
    logo.style.opacity = "1";
}