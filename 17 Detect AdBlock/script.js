const detect = document.querySelector("#detect"),
wrapper = document.querySelector(".wrapper"),
button = wrapper.querySelector("button");

let adClasses = ["ad", "ads", "adsbox", "ad-placement", "doubleclick", "adplaceholder", "ad-badge"];

// adClasses bir Array-dir. (item of adClasses) dedikde biz bu Array icindeki deyerleri String olaraq
// "item" deyiskenine oturmus oluruq.
     
for (let item of adClasses){
    //* console.log(adClasses);  - (7) ['ad', 'ads', 'adsbox', 'ad-placement', 'doubleclick', 'adplaceholder', 'ad-badge']
    //* console.log(item);       - ad, ads, adsbox, ad-placement, doubleclick, adplaceholder, ad-badge
    //! Butun Array deyerlerini DIV tag-inin CLASS atributuna elave edirik.
    detect.classList.add(item);
}


//! 1. Array icerisinde string deyerleri var, hansiki bu deyerleri elave edeceyik klass adlari kimi DIV tag-inin icerisine. 
//! 2. AdBlock proqqramlari bu CLASS adlarini hemin HTML tag-i icerisinde gorur ve hemin klass adlari olan TAG ucun DISPLAY: NONE; elave edir.
// getComputedStyle() bu metod DIV tag-i ucun istifade edilen ve edilen bilen butun CSS kodlarini ve onlarin deyerlerini verir.
// getPropertyValue() metodu hemin DIV tag-inin 'display' CSS kodunun deyerini qaytarir. Bu deyer default olaraq "block"-dur.
let getProperty = window.getComputedStyle(detect).getPropertyValue("display");
console.log(getProperty);


button.addEventListener("click", () => {
    wrapper.classList.remove("show");
});


// Atributlarin icerisindeki deyerler hemin atributlarin usaq elementi sayilir. Metod "CONTAINS()" bir elementin icerisinde basqa bir elementin olub olmadigini yoxlayir.
// classList JS kodu bize CLASS atributunu qaytarir. containes("show") dedikde ise hemin "show" adinin CLASS atributunun icerisinde olub olmadigini yoxlayiriq.
//! Eger DIV tag-inin CLASS atributunda "SHOW" adinda deyer yoxdursa (!) onda IF instruksiyasinin icindeki kodlar islesin.
if(!wrapper.classList.contains("show")){   
    // Eger AdBlock proqrami aktivdirse onda netice olaraq "NONE" qayidacaq ve biz Ekrana hemin proqramin qaldirilmasi ucun mesaj vereceyik.
    getProperty == "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
};



 //* Sayita girdiyimizde ADBLOCK olsada olmasada 'show' class adi yoxdur.
 //* Onda bize if sorgusu ne ucun lazimdir ?
 //* Onun ucun ki, BUTTON-a basaraq 'show' klass adini sildikde yene IF sorgusu baxsin ki show var yoxsa yoxdur?!
 //* Eger show yoxdursa IF baxacaq ki display none-dirmi yoxsa block-durmu. Ve eger none-dirse yeniden show deyecek ve Adblock-u qaldirin mesaji alasiyiq
 //! Belelikle Adblock qaldirilana qeder saytda gezmek mumkun olmayacaq
