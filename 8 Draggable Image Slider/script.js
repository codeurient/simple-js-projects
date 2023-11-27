// 'div' tag-ini cagiririq
const carousel = document.querySelector('.carousel'),
// birinci Img tag-ini 'firstImg' deyiskenine yazdiririq.
firstImg = carousel.querySelectorAll("img")[0], 
// Ox ikonlarini 'arrowIcons' deyiskenine yazdiririq.
arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;



const showHideIcons = () => {
    // (let scrollWidth = carousel.clientWidth;) - 'carousel' bizim DIV tag-imizdir. Ve hemin tag 1200px genisliyi olan 
    // 'wrapper' klas adina sahib DIV tag-inin icerisinde yerlesir. 'clientWidth' xassesi ise bize hemin 'carousel' klas 
    // adina sahib olan tag-in ümumi genişliyini qaytarır. Bu ise 1200px-dir. Cunki 'carousel' yerləşir həmin 'wrapper' içərisində.
    //!  Ancaq ümumi genişlik bundan daha çoxdur və geri qalan hissə SCROLL ilə gizlədilmişdir. Bu ümumi genişliyi əldə etmək üçün isə
    //!  'scrollWidth' xassesinden istifade edilir. Hal-hazirki numunede elde edeceyimiz genislik '3712px'-dir.
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // 3712 - 1200 = 2512

    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';

    //! Aşağıda forEach() metodu içərisində, hər dəfə sağa sürüşdürmə ikonuna kliklədikdə (carousel.scrollLeft + 414) 
    //* 414+414+....+414 = 2512 olduqda yeni,  carousel.scrollLeft (cəm) == scrollWidth (2512) olduqda.
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block';
}


// forEach() metodu bütün 'i' tag-lərini seçir
arrowIcons.forEach(icon => {
    //* 'clientWidth' xassesi, seçili olan tag-in ümumi genişliyi nə qədərdirsə, həmin genişliyi bizə verir.
    // burda (firstImg) 'img' tag-ine muraciet ederek hemin tag-in genisliyini elde edirik.
    let firstImgWidth = firstImg.clientWidth + 14; //! margin-right: 14px;   -   414px elde edirik.
    // hər i tag-i kliklendikde funksiya icra olunsun deyirik.  
    icon.addEventListener("click", () => {
        // 'div' tag-i 'img' tag-inin genisliyi qeder SCROLL olsun. Yeni, sürüşsün.
        carousel.scrollLeft += icon.id == "left" ?  -firstImgWidth : firstImgWidth;

        // 'i' tag-ine basdiqda bu funksiya icra olunacaq.
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoslide = () => {
    // autoslide() biz DIV tag-ini surusdurerken bas verir. Eger 0 > -1 veya 0 <= 0 deyirik burda.
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    // console.log(positionDiff);
    // Kursor ile tutaraq, sürüşdürməyə başladığım yerdən kursoru buraxanadək olan məsafəni PX (piksel) ilə mənə qaytarır. Həmin PX-li kursoru buraxdıqda qaytarır.
    // Sağa sürüşdürdükdə artan Sola sürüşdürdükdə azalan dəyərlər əldə edirik. Ancaq həmişə müsbət ədədlər əldə etmək üçün abs() metodundan istifadə edirik.
    // Sürüşdürmə nə qədər uzun olarsa əldə edilən dəyərdə bir o qədər çox olar. 
    positionDiff = Math.abs(positionDiff);  //! 4, 66, 345, 500 və.s

    // Ekranin genisliyi azaldiqda IMG tag-leri sixilir ve elde edilen deyer az ola biler. 
    let firstImgWidth = firstImg.clientWidth + 14;  //! max genislik - 414
    // Bir IMG tag-inin genisliyinden cixiriq positionDiff deyiskenindeki deyeri.
    let valDifference = firstImgWidth - positionDiff; //! 414 - 4 = 410px,      414 - 66 = 348px,   414 - 345 = 69,   414-500=-86,     414 - 1000 = -586.
    
    //! console.log(prevScrollLeft);
    //! console.log(carousel.scrollLeft);
    // prevScrollLeft - in baslangic deyeri 0 (sifir)-dir. Bu 0-ri kursoru klikledikde aliriq. 
    // carousel.scrollLeft - in baslangic deyeri 0 (sifir)-dir. Bu 0-ri da kursoru klikledikde aliriq. Ancaq Kursor ile DIV tag-ini sürüşdürdükdə, dəyər artır.
    // Ve deyer artiqdan sonra:
    // prevScrollLeft olur 0 (sifir) - cunki HELE KI kursoru kliklememisik
    // carousel.scrollLeft olur mesel ucun - Sola surusdurdukde ancaq ARTA-ARTA geden deyerler: //! 400, 434, 512 ve.s. Saga ise azala-azala gedir.
    // Ve belelikle biz her zaman kurosu sağa surusdurdukde: scrollLeft > (boyukdur her zaman) prevScrollLeft. NOT! Ancaq kursoru klikledikde onlar yene beraberdirler.
    // autoslide() funksiyasi ise, biz kursoru sürüşdürüb buraxdiqdan sonra işlədiyi üçün: scrollLeft > (boyukdur her zaman) prevScrollLeft.
    // Kursoru sola sürüşdürdükdə birinci kliklədiyimiz üçün 'prevScrollLeft' deyiskeni evvel kursor suruserken olan deyeri qazanir. Ancaq 'carousel.scrollLeft' azalir.
    // belelikle sola surusdurmede 'scrollLeft < (kicikdir her zaman) prevScrollLeft'
    //! Bir soznen 'prevScrollLeft' ile 'scrollLeft' eyni deyerlere sahibdirler.
    if(carousel.scrollLeft > prevScrollLeft){   //* Eger 'scrollLeft' sadece boyukdurse onda 'if' icerisindeki emeliyyat icra olunacaq.
        //                                       4 > 414 / 3 = 138                            -411
        //                                      66 > 414 / 3 = 138                            -348
        //                                     345 > 414 / 3 = 138             69
        //                                     500 > 414 / 3 = 138            -86
        // DİV tag-ini sürüşdürərkən (positionDiff) əldə olunan dəyər IMG tag-inin 3-de 1-indən böyük olarsa onda həmin İMG tag-inin üstünə 
        // 'valDifference' deyiskenindeki deyeri gelirik. Yox eger kicik olarsa onda -positionDiff deyiskenindeki deyerleri elave edirik..
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}


const dragStart = (e) => {
    isDragStart = true;
    // DIV tag-inin müəyyən bir genişliyi mövcuddur. Kursor, bu DİV tag-i üzərində sağa-sola hərəkət etdikdə, koordinasiya
    // çəkir. Bu DİV tag-inin hər hansı bir yerinde kursoru klikledikde hemin kliklenen yerdeki koordinasiyani elde etmek ucun 
    // 'pageX' xassesinden istifade edirik. Yeni, bu koordinasiya 500, 300, 445, 50 ve.s ola biler.
    //! Aşağıda, belə bir kod yazmışıq: (let positionDiff = e.pageX - prevPageX;). 
    //! Hemin kod kursor hereket etdirildikde, başlanğıc koordinasiyanı elde etmek ucundur. Eslində 'prevPageX' ile 'dragging()'
    //! funksiyasi icerisindeki 'e.pageX', bize eyni neticeni verir. Yəni, 500-500=0, 336-336 = 0, ve.s.
    prevPageX = e.pageX || e.touches[0].pageX;  //* telefon ucun istifade edilen kod budur: (e.touches[0].pageX)
    //! DIV (.carousel) tag-i uzerinde kursoru klikledikde SÜRÜŞDÜRMƏ ucun olan baslangic pozisiyasini əldə edirik. Bu 0 (sifir)-dir. Həmin pozisiya tez-tez dəyişəcəkdir.
    //! Bu pozisiyanı yaddaşda saxlamaq üçün aşağıda 'dragging()' funksiyasi içərisində 'carousel.scrollLeft' üçün artib azalan reqemler yazdiririq.
    //! Yəni, məsələn kursoru sağa sürüşdürdük və (carousel.scrollLeft = prevScrollLeft - positionDiff;)
    //! və carousel.scrollLeft tutalım oldu 433.
    //! Kursoru buraxdıqda bu 433 artıq 'carousel.scrollLeft' içərisində mövcuddur.
    //! İndi yeniden DİV tag-inin hansı yerində olsa belə, biz kursora klikledikde başlanğıc pozisiya 0 (sifir) olmuyacaq. Artiq 433 olacaqdır.
    prevScrollLeft = carousel.scrollLeft;
}


// Kursor hereket etdikde 'e' parametri avtomatik KOORDINASIYA-lari bize qaytarir.
const dragging = (e) => {
    // Eger 'if' TRUE qaytararsa, onda aşağıdakı kodlar işləməyəcəkdir
    if(!isDragStart) return;

    // img tag-i uzerinde kursoru basili tutaraq kenara apardiqda hemin ŞƏKİLİ kölgə kimi yerindən qaldırmaq olur.
    // Ancaq  'preventDefault()' metodu ile 'div' tag-ine kliklendikde, diger butun EVENT-lari yeni baş vere bilecek 
    // butun hadiseleri legv etmis oluruq ve artiq kənara daşımaqda bir hadisə olduğundan və bu özəlliyi ləğv etdiyimiz
    // ucun artiq bele bir şey mümkün olmayacaqdır.
    // Bu bütün EVENT-lar 'e' parametri icerisinde movcud oldugu ucun kodu bele yaziriq: 'e.preventDefault();'
    // NOT! Bu EVENT-i legv etme ozelliyi sadece hemin DIV tag-i icerisinde aktivdir. DIV tag-inin serheddini kecdikde
    // şəkilləri yenədə kənara daşımaq mümkün olur.
    e.preventDefault(); 

    // Eger kursor DIV tag-i uzerinde hereket ederse: isDragging deyiskenine true deyerini veririk.
    isDragging = true;

    // kursoru sola-saga hereket etdirdikde 'div' tag-ine "dragging" klasi adi elave edirik.
    // eger "dragging" klas adi varsa onda, (scroll-behavior: auto;) olsun deyirik.
    carousel.classList.add("dragging");

    //! 'positionDiff' deyiskenine 0 (sifir) yazdirmaq ucun dragStart() funksiyasindan istifade etdik. Artiq 0 (sifir) bizim baslangic pozisiyamiz olacaq
    //! ve kursoru SOLA hereket etdirdikde menfi (-) SAGA hereket etdirdikde ise musbet (+) deyerler elde edeceyik. -5 -4 -3 -2 -1 0 1 2 3 4 5 kimi.
    //* positionDiff - GLOBAL deyiskendir. Yəni, kodun hər yerində əl çatandır.
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

    // pageX - 'div' tag-i uzerinde, X oxu boyunca artan (saga) ve azalan (sola) deyerler qaytarir.
    // scrollLeft - bu xasse scroll yeni sürüşmə effekti yaratmaq ucun istifade edilir.
    // Soldan saga dogru hereket etdirdikde 'pageX' xassesi, artan deyerleri hemin scrollLeft xassesine verir.
    // Sagdan sola hereket etdirdikde ise 'pageX' azalir ve azalan deyerleri scrollLeft xassesine verir.
    // scrollLeft xassesi sürüşmə effekti yaratmaq üçün istifadə edilir.
    //! Burda, (0 - positionDiff) demiş oluruq məntiqlə. 'positionDiff' artib azalan rəqəmlərdi. 
    //! Saga hereket etdirdikde artan deyeri çıxırıq. 0 - 1 = -1.
    //! Sola hereket etdirdikde azalan deyeri çıxırıq. 0 - (-1) = 1.
    //! Kursoru sürüşdürdük deyək və nəticə olaraq əldə etdik 433. Artıq scrollLeft = 433 oldu. 
    //! Kursoru buraxdıqdan sonra yenindən klikləsək, 'dragStart()' funksiyası, 'prevScrollLeft' dəyişkəninə 433 yazdiracaqdir.
    //! Və yenidən kursoru sağa sola hərəkət etdirdikdə, 433-dən azaldacaq yaxud 433-ü artırasıyıq.
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}


const dragStop = () => {
    isDragStart = false;
    // kursoru buraxdiqda "dragging" klasi silinecek ve yene, (scroll-behavior: smooth;) css kodu aktiv edilecekdir.
    carousel.classList.remove("dragging");

    // dragging() funksiyasi icerisinde (isDragging = true;) demisik. Yeni eger biz kursoru DIV tag-i uzerinde hereket etdirsek onda "isDragging" deyiskeni TRUE 
    // deyerini qazanacaq ve bu asagidaki if sorgusu netice olaraq FALSE qaytaracaq. FALSE qayitdigi ucun 'autoslide();' funksiyasi isleye bilecek.
    //* Kursoru buraxdiqda ise 'isDragging' deyiskeni FALSE olacaq ve 2 false 1 TRUE verir. Yeni netice olaraq asagidaki if sorgusu bize TRUE verecek ve
    //* sadece RETURN qayidacaq ve asagidaki 'autoslide()' funksiyasina hec zaman kecid etmeyeceyik.
    if(!isDragging) return; 
    //! 'mousemove' dedim 'isDragging' TRUE oldu ve autoslide() isledi. 
    //! korsuro buraxdim 'isDraggin' FALSE oldu ve 2 false 1 true verdiyi ucun RETURN qayitdi sadece ve 'autoslide();' funksiyasina kecid ede bilmedik.
    isDragging = false;
    // Bu funksiyani onun ucun yaradiriq ki, şəkili yarıya qədər sürüşdürüb ortada saxladıqda, həmin şəkil avtomatik olaraq
    // sona qədər özü sürüşsün və yerinə tam otursun.
    autoslide();
}


// kursoru klikledikde dragStart funksiyasi işləsin.
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart); //! telefon ucun

// 'div' tag-i uzerinde kursoru hereket etdirdikde,'dragging' funksiyasi ise kececek.
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);   //! telefon ucun

// kursorun klikini qaldirdiqda dragStop funksiyasi işləsin.
carousel.addEventListener("mouseup", dragStop);
// kursoru DIV tag-i uzerinden qaldirdiqda dragStop() funksiyasi işə keçəcəkdir.
carousel.addEventListener("touchend", dragStop);    //! telefon ucun