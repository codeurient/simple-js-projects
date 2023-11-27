const options = document.querySelectorAll("label");

for(let i = 0; i < options.length; i++){

    // "label" tag-ine basdiqda CLASS atributuna "selected" deyilen klas adi elave edirik.
    //! Ancaq bir dene "label" secdikde digerlerini secmek mumkun olmamalidir.
    //! Eger bir "label" secilidirse digerini secdikde evvel secili olani SILMEK lazimdir. 
    options[i].addEventListener("click", () => {


        // 1) BU "for" dongusu eger her hansisa bir "LABEL" tag-ine basilarsa butun "LABEL" tag-lerinin icini yoxlayir
        for (let k = 0; k < options.length; k++){
            // 2) Eger her hansisa bir "LABEL" tag-i icerisinde "selected" klas adi varsa onda hemin klas adini silir.
            if(options[k].classList.contains("selected")){
                options[k].classList.remove("selected");
            }
        }

        
        // 3) "selected" klas adi ilk once olmuyacaq onun ucun yuxaridaki kod asagi geldiyinde, bu hissede secilen 1 "LABEL"
        //     tag-i ucun "selected" klass adini elave edecek.
        options[i].classList.add("selected");

        // 4) Burda ise butun "LABEL" tag-leri ucun "selectall" klas adini elave edecek
        for (let j = 0; j < options.length; j++){
            options[j].classList.add("selectall");
        }

    });
};