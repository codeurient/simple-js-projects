// ul tag-ini cagiririq
const tabsBox = document.querySelector(".tabs-box"),

// 'li' tag-lerini cagirirq.
allTabs = document.querySelectorAll(".tab"),

// 'div' tag-i icerisindeki 'i' tag-lerine muraciet edirik.
arrowIcons = document.querySelectorAll(".icon i");

// dragging sozu ingilis dilinde suruklemek demekdir.
let isDragging = false;

const handleIcons = (scrollVal) => {
    // 'ul' (tabsBox) tag-ine muraciet ederek 'scrollLeft' xassei ile 0-dan baslayaraq arta bilen deyerlere muraciet ede bilirik.
    // round() yeni yuvarlaqlasdirmaq. Cunki 'scrollLeft' xassesi, pikselleri kesir ededlerle qaytarirdi. Ve eger 0.01px bele 
    // artiq yaxud az olsa SCROLL-un deyeri onda ICON duymeleri NONE yaxud FLEX olmuyacaqdi. Onun ucun tam ededlere yuvarlaqlasdirmaq 
    // lazimdir.
    //let scrollVal = Math.round(tabsBox.scrollLeft);


    // Scroll maksimum genisliye catdiqda NEXT icon0nunu gizledirik.
    // scrollWidth - scroll-un ümumi genisliyinden,
    // clientWidth - scroll-un hal hazirki genisliyini cixiriq.
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    
    // console.log(arrowIcons); - 'i' tag-lerini Array olaraq elde edirik. [i#left.fa-solid.fa-angle-left, i#right.fa-solid.fa-angle-right]
    // 'parentElement' js kodu ile ana element olan DIV tag-i ucun display: flex deyerek gizlenen ikonu gorsel formaya salirik.
    // Baslangic olaraq scroll deyerimiz 0 (sifir)-dir. Ve 0 oldugu ucun "flex" ol deye bilirik. Herekete basladiqda ise 1px bele artim olarsa onda 
    // "none" yazdirmis sayilasiyiq 'display' css stiline.
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";  
    
    // next ICON-unun gizledilmesi.
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";   
};

// 'i' tag-lerine forEach() metodu ile ayri-ayri her biri deyerek muraciet edirik. 
// Ve bu 'i' tag-lerini 'icon' parametrine gonderirik ki, funksiya icerisinde cagiraraq istifad edek.
// Her 'i' tag-ine klik dedikde funksiya bize bu deyerleri qaytarir: <i id="right" class="fa-solid fa-angle-right">::before</i>
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // Eger 'i' tag-inin 'id'-si beraberdirse "left" String-ine onda 'ul' tag-inin scroll-una '350px' elave et. Eks tqedirde 350px cıx.
        // sag ve sol duymelere basdiqda sürüşdürmə yavas formada heyata kecsin deye elave etdiyimiz bir CSS stili vardir: (scroll-behavior: smooth;)
       let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;

       handleIcons(scrollWidth);

       // Her defe ICON duymesine basdiqda handleIcons() funksiyasi cagrilir. 
       // Eger sadece handleIcons(); funksiyasini cagirsaq netice olaraq (display:none;) elde edesiyik. Baxmiyaraq ki, 'scrollLeft' xassesinin deyeri
       // 0 (sifir)-dan boyukdur. Ikinci defe yeniden ICON duymesini basdiqda, artiq (display:flex;) elde edesiyik. 
       // Ancaq 2ci defe basdiqda yox, 1ci defe basdiqda (display:flex;) elde etmek ucun, 50 millisaniye sonra avtomatik handleIcons() funksiyasinin
       // cagrilmasini emr edirik. Bunun ucun setTimeout() metodundan faydalaniriq.
       //setTimeout(() => handleIcons(), 50);
    });
});



allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // ul tag-inin icerisinde olan li tag-ine muraciet edirik.
        tabsBox.querySelector(".active").classList.remove("active");
        // sonra ise TAB yeni, hal hazirki kliklenen li tag-ine active klas adini elave edirik.
        tab.classList.add("active");
    });
});

// "e" parametrine, eger kursoru 'ul' tag-i uzerinde hereket etdirerikse o zaman, X ve Y oxlarinin piksellerini gondermis olariq.
const dragging = (e) => {
    //! eger 'if' bize 'TRUE' vererse onda 'if' konstruktoru sadece 'RETURN' qaytaracaqdir ve biz sonraki kodlara kecir etmeyeceyik.
    // Ve yuxarida 'FALSE' yazdigimiz ucun burda qeyd etdiyimiz ! nida isaresi bize deyirki hemin deyiskenin icerisinde
    // 'FALSE' var ve biz dogru demis oldugumuz ucun netice olaraq 'TRUE' elde edirik. 
    if(!isDragging) return;
    
    // 'ul' tag-ine (scroll-behavior: smooth;) CSS stilini elave etdiyimiz ucun, kursor ile surusdurmede problem yasanir.
    // Bunun ucun eger kursor ile surusdurmek istesek onda "ul" tag-ine "dragging" klass adini elave ederek (scroll-behavior: auto;) deyirik.
    // Asagida dragStop() funksiyasi icerisinde ise, kursoru buraxdiqda "dragging" klas adini silirik.
    tabsBox.classList.add("dragging");

    // 1 - "scrollLeft" xassesi X oxu koordinatlarinin piksellerini QAYTARIR yaxud var olan koordinatlarin uzerine basqa koordinatlar YAZDIRIR. Baslangic 
    // noqtesi Left yeni sol terefdir. Yeni, soldan basla X oxu boyunca kursoru saga-sola hereket etdirdikde piksel ile reqemsal deyeri artir.
    // 2 - "movementX" xassesi X oxu koordinatlarini SADECE oxumaq ucun istifade edilir. Kursoru saga hereket etdirdikde MUSBET sola hereket etdirdikde
    // menfi deyerler elde edirik. 
    // CSS terefde eslinde overflow-x: auto; dedikde surusdure cubugu yaranir. Ancaq biz bunu overflow-x: hidden; deyerek gizledirik ve hemin 'ul' icerisinde
    // kursoru hereket etdirdikde gizli olan "ul" tag-ine "scrollLeft" deyerek SCROLL ozelliyi elave edirik. 
    tabsBox.scrollLeft -= - e.movementX;

    handleIcons(tabsBox.scrollLeft);
};



// Button-u buraxdiqda, bu funksiya 'isDragging' deyiskenine yeniden 'false' deyerini yazdirir. 
// Deyer 'FALSE' olduqda yene 'if' konstruktoru 'RETURN' qaytarir ve 'scrollLeft' kodu islemir.
const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

// "mousedown" - bu EVENT, duymeni basdiqda demekdir. Ve biz 'ul' tagi uzerinde kursoru klikledikde 'isDragging' deyiskenine 'TRUE' veririk
// 'isDragging' deyiskeni 'TRUE' olduqda 'if' konstruktoru netice olaraq bize 'FALSE' qaytarir. Neticesi FALSE oldugu ucun 'if' konstruktorundan 
// sonra gelen "tabsBox.scrollLeft -= - e.movementX;" kodlari işləməyə baslayir ve overflow-x CSS stili herekete herekete kecir.
tabsBox.addEventListener("mousedown", () => isDragging = true);

// Basili olan duymeni buraxdiqda 'dragStop' funksiyasi işləsin. 
tabsBox.addEventListener("mouseup", dragStop);

// ul tag-i uzerinde (mousemove) yeni, kursoru hereket etdirdikde 'dragging' adindaki funksiyamiz ise düşsün
tabsBox.addEventListener("mousemove", dragging);