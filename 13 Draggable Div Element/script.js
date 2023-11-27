const wrapper = document.querySelector('.wrapper'),
header = wrapper.querySelector('header');


//! movementX ve movementY xasseleri avtomatik olaraq hemin bu 2 parametrlere teyin edilecekdir.
// movementX: 1 yaxud -1 dir.   movementY: 1 yaxud -1 dir.
function onDrag( {movementX, movementY} ){
    // JS-de CSS kodlarini istifade etmek mumkundur. Butun CSS kodlarini cagirmaq ucun getComputedStyle() metodundan istifade edirik. Bu metod icerisinde hec 
    // olmasa 1 argument mutleq yazilmalidir. Biz '.wrapper' klas adina sahib olan DIV tagini cagiririq. Hemin getComputedStyle() metodu, bize bu  DIV tag-i
    // ile istifade ede bileceyimiz CSS kodlarini ve hal-hazirda o tag-in CSS kodlarinin sahib oldugu deyerleri verecekdir. 
    let getStyle = window.getComputedStyle(wrapper);
   
    // 'getStyle' deyiskeni icerisinde CSS kodlarimiz oldugu ucun ona muraciet ederek onun icerisinden 'left' xassesini cagira bilerik.
    // qayidan deyerlerin tipi STRING-dir ancaq bize NUMBER lazim oldugu ucun parseInt() metodundan istifade edirik
    //! 'left' deyiskeninin elde etdiyi deyer, hemin wrapper klas adina sahib olan DIV tag-inin hal-hazirda yerlesmis oldugu pozisiyasidir.
    let leftVal = parseInt(getStyle.left);     //? '.wrapper 'klas adina sahib DIV tag-inin left deyerini elde edirik

    // 'getStyle' deyiskeni icerisinde CSS kodlarimiz oldugu ucun ona muraciet ederek onun icerisinden 'top' xassesini cagira bilerik.
    // qayidan deyerlerin tipi STRING-dir ancaq bize NUMBER lazim oldugu ucun parseInt() metodundan istifade edirik
    //! 'top' deyiskeninin elde etdiyi deyer, hemin wrapper klas adina sahib olan DIV tag-inin hal-hazirda yerlesmis oldugu pozisiyasidir.
    let topVal = parseInt(getStyle.top);      //? '.wrapper' klas adina sahib DIV tag-inin top deyerini elde edirik

    // hal-hazirki pozisiyanin uzerine 1 yaxud -1 gel.
    wrapper.style.left = `${leftVal + movementX}px`;
    // hal-hazirki pozisiyanin uzerine 1 yaxud -1 gel.
    wrapper.style.top = `${topVal + movementY}px`;

    //console.log(typeof left, typeof top);
}


// header tag-ini klikledikden (mousedown) sonra eger hereket etdireremse (mousemove) hemin tag-i, onda "onDrag" funksiyasi işləsin.
header.addEventListener("mousedown", () => {
    header.classList.add("active");
    // 'onDrag' funksiyasi "mousemove" hadisesi ucun istifade edildiyi ucun, eger bize yuxarida bu funksiyani yaratdigimiz zaman 'function onDrag(e){}'
    // yazsaq, onda 'MouseEvent' hadisesi ile istifade edile bilen butun JS xasseleri hemin 'e' parametrine gonderilecekdir. Bu xasseler icerisinde bize
    // lazim olan sadece 2 xasse vardir. Biri: movementX, Digeri ise: movementY -dir. //? Bu parametrleri 'onDrag' funksiyasina bu forma gondere bilerik:
    //! function onDrag( {movementX, movementY} ){ }
    header.addEventListener("mousemove", onDrag);
});


// kursoru 'document'-in her hansisa bir yerinde buraxdiqda hemin '.wrapper' klas adini herekete getiren 'mousemove' hadisesi silinsin.
document.addEventListener("mouseup", () => {
    header.classList.remove("active");
    header.removeEventListener("mousemove", onDrag);
});

