//! 1
// UL tag-ini cagiririq.
const sortableList = document.querySelector(".sortable-list");
// LI tag-lerini "items" deyiskenine yazdiririq.
const items = document.querySelectorAll(".item");

//! 2
// Butun LI tag-lerinin her birini "item" parametrine gonderirik.
items.forEach(item => {
    // Her bir LI tag-i ucun "dragstart" (surusdurme) EVENT-i elave edirik.
    item.addEventListener("dragstart", () => {
        // 1) LI tag-ini surusdurdukde hemin surusdurulen LI tag-ine "dragging" klas adi elave edilsin.
        // 2) "dragging" CLASS adi LI tag-ine solgunluq vererek onu gorunmez etmek ucun istifade edilir.
        // setTimeout() olmasa idi onda biz LI tag-ini klikledikde hemin LI tag-i solgunlasacaqdi. 
        // Hetta LI tagini kenara surukledikde hemin kenara surusen LI tag-i ve onun alti solgun qalacaqdi.
        // setTimeout() metodu ise mueyyen bir saniye gozledikden sonra LI tagine solgunluq verir buna gore de 
        // kenara surusen LI tag-i yox hemin LI tag-inin alti solgunlasir. 
        setTimeout(() => item.classList.add("dragging"), 0);
    }); 

    // Surusdurme bitdikde "dragging" klas adi silinsin
    item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
    });
});

//! 4
// "e" parametri SÜRÜŞDÜRMƏ HADİSƏLƏRİNİ (DragEvent) elde etmek ucun istifade edilir.
// Biz UL tag-i uzerinde kursoru hereket etdirdikde, avtomatik olaraq "e" parametrine DragEvent-lar ötürülür.
// Sonra ise biz bu DragEvent icerisinden bize lazim olan xasse ve metodlari çağıraraq istifadə edə bilərik.
//TODO: > DragEvent {isTrusted: true, dataTransfer: DataTransfer, screenX: 608, screenY: 389, clientX: 608, ...}
const initSortableList = (e) => {
    //! 9
    // Bu ona gore çağırılır ki, biz "dragover" event-indan istifade etdikde default olaraq BASQA heç bir EVETN işləməsin.
    e.preventDefault();

    //! 7
    // Hal-hazirda sürüşdürülən "dragging" klass adina sahib LI tag-ini cagiririq.
    const draggingItem = sortableList.querySelector(".dragging");

    // Bu funksiya bize UL tag-inin icindeki LI tag-lerini qaytarir.
    //TODO: sortableList.querySelectorAll(".item:not(.dragging)");
    //TODO: querySelectorAll() metodunun verdiyi netice: > NodeList(5) [li.item, li.item, li.item, li.item, li.item]
    //TODO: "dragging" klass adina sahib olmayan butun LI tag-leri "NODELIST" obyekti kimi qayidir.
    // Ancaq biz bu obyekti açaraq içinə daxil olmaliyiq.
    // Bunun ucun ise (...) 3 noqte operatorundan istifade edirik.
    // 3 noqte (...) operatoru elementleri parçalamaq yaxud bir yere toplamaq ucun istifade edilir.
    //* 3 noqte operatoru istifade edildikde qayidan netice (ARRAY olacaqdir): > (5) [li.item, li.item, li.item, li.item, li.item]
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];    

    //! 5
    // find() metodu ARRAY içərisindən DƏYƏRİ yaxud DƏYƏRLƏRİ əldə etmək üçün istifa edilir.
    // find() metodu icerisinde CALLBACK funksiya cagrilir. Bu funksiyanin parametri, avtomatik olaraq ARRAY icindeki deyeri qebul edir.
    
    //* 1) Bu forma yazı şəkli sadece 1ci dəyəri qaytaracaq
    //* console.log(     siblings.find(function(sibling) { return sibling; })      ); 

    //* 2) Bu forma yazı şəkli BÜTÜN deyerleri qaytaracaq
    //* siblings.find(function(sibling) {  return console.log(sibling)  });
    let nextSibling = siblings.find(sibling => {
        //! 6
        // 1) e.clientY            - bu kod ile UL tag-i uzerinde hereket eden LI tag-inin Y oxu koordinatlarini elde edirik. Yuxari azalan Asagi artan.
        //                           Hesablama 216ci px-den baslayir. Cunki BODY tag-inden 1ci LI tag-ine qeder olan mesafe 216px-dir.
        //                           Hesablama 690px-e qeder devam edir. Yeni UL tag-inin en son ucuna qeder.
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // 2) sibling.offsetTop    - bu kod ile BODY tag-inden LI tag-ine qeder olan hundurluyu elde etmek ucun istifade edilir.
        //                           Burda 1ci LI tag-i yox 2ci LI tag-i nezere alinir. 
        //                           Hesablama 291ci px-den baslayir. Cunki BODY tag-inden 2ci LI tag-ine qeder olan mesafe 291px-dir.
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // 3) sibling.offsetHeight - bu kod ile LI tag-inin umumi hundurluyunu elde edirik. (65px)
        //TODO: Bu asagidaki kod ile, sürüşdürülən elementin yerləşdirilməli olduğu qohum elementi tapırıq.
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight /2;
    });

    //! 8
    // "dragging" klas adina sahib LI tag-ini elave edirik ondan sonra gelen qohum elementin yerine.
    sortableList.insertBefore(draggingItem, nextSibling);
}

//! 3
// 1) Ul tag-i uzerinde surusdurule bilen elementin uzerine gelerek (Bu tag LI tag-idir)
// hemin tag-i klikleyerek kursoru hereket etdirdikde "DRAGOVER" event-i işə keçir.
// ve hemin event bu funksiyani çalışdırır -> "initSortableList"
sortableList.addEventListener("dragover", initSortableList);


//! 10
// Bu ona gore çağırılır ki, biz "dragenter" event-indan istifade etdikde default olaraq BASQA heç bir EVETN işləməsin.
sortableList.addEventListener("dragenter", e => e.preventDefault());
