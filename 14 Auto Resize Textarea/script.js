const textarea = document.querySelector('textarea');


// klavyaturada her hansisa bir duymeni klikledikden sonra hemin duymeni buraxdiqda funksiyas isleyeckdir.
// 'e' parametrine KeyboardEvent hadisesi ile bagli olan butun kodlar verilecekdir ve bizde bu kodlarin icerisinden 
// hundurlukle bagli olan kodu goturceyik.
textarea.addEventListener('keyup', e => {

    // auto o demekdir ki, height CSS kodu hansi hundurlukde olur olsun hemin hundurluk qorunub saxlasin
    // ancaq textarea sahesi icerisindeki her sey silindikde hemin height CSS kodu AUTO deyer qazansin. Varsayilan 
    // deyeri 55px-e geri qayitsin. Yeni avtomatik olaraq teyin edilsin. 
    textarea.style.height = "auto";


    // scrollHeight JS kodu elementin hundurluyunu px ile qaytarir.                                                                                                                                                                     Bu hundurluye padding daxildir ancaq, border, scrollbar ve margin yox. 
    // Hundrluk eslinde 59dur. 59-4=55px. (2px border-top, 2px border-bottom).
    let scHeight = e.target.scrollHeight;
    // textare sahesinde simvollar yazdiqca CSS trefede 'height:' kodunun uzerinde yeni artan deyerler yazilacaqdir ve
    // belelikle textarea TAG-inin hundurluyu artacaqdir.
    //! NOT: ancaq bu textarea sahesinin icerisindeki butun simvollari sildikde hemin hundurluk aniden azalmayacaqdir.
    // textarea sahesindeki her seyi sildikden sonra klavyaturadaki her hansisa bir duymeye basa basa durmaq lazimdir ki bu hundurluk azalsin
    // Bu ise dogru olmayan yanasmadir. Bize lazim olan odur ki, biz textarea sahesindeki her seyi silende hundurluk avtomatik olaraq azalsin.
    //! Bunun ucun en ustde bele bir kod yazmisiq: (textarea.style.height = "auto";)
    textarea.style.height = `${scHeight}px`;


});