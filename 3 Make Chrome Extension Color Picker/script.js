const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
// localStorage-de eger melumat varsa onu aliriq. Eger yoxdursa onda bos array [] veririk.
// button-a klik olunduqda asagidaki funksiya 'pickedColors' deyiskenine 'sRGBHex'-i gonderir
// ve setItem() metodu ile storage-ye object-i JSON formatinda yazdiririq.
// eger storage-de melumat varsa onu parse() metodu ile OBJECT-e cevirib geri elde edirik.
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
// storage-den elde edilen melumati ekrana yazdirmaq ucun funksiya yaradiriq.

const copyColor = elem => {
    // 'span' tag-inin 'data-color' atributunun icinden '${color}' deyerini kopyalayiriq.
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied!";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColors = () => {
    // Eger 'pickedColors' icinde ! (NOT) yeni hecne yoxdursa "return" bize "true" verir
    // ve funksiya oz iwini dayandirir. Cunki return-den sonra nese qayitsin yaxud
    // olsun dememisik. Eger 'pickedColors' icinde nese varsa "return" yox, "return"-den sonra 
    // gelen diger kodlar isleyecekdir. Cunki, 'pickedColors' icinde bir seyler olacaqdir
    // ve eger nese varsa biz !NOT dediyimz ucun yanlis demis oluruq cunki, yeni, artiq nese var.
    // Ne ise varsa bu TRUE-dur ve NOT ile TRUE false verdiyi ucun if instruksiyasi islemeyecekdir.
    if(!pickedColors.length) return;

    // map() - metodunun icerisinde yazdigimiz funksiyadir. 'color' hemin funksiyanin 
    // arqumentidir. hemin 'color' arqumenti 'pickedColor' Array-indan deyerler qebul edir,
    // ve yeniden bize geri Array qaytarir. join() - metodu ise bu Array-i String-e ceviri.
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}  "></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
    `).join("");
    
    // 'hide' klas adi silindikde (remove) 'Clear All' metni gorsenir.
    document.querySelector(".picked-colors").classList.remove("hide");
   
    // querySelectorAll Object qaytarir, forEach metodu hemin object icindeki 
    // deyerleri 'li' arqumentine gonderir ve string olaraq geri qaytarir.
    document.querySelectorAll(".color").forEach(li => {
        // 'li' tag-ine klikledikde "e" arqumentine, 'li' tag-leri haqqinda
        // PointerEvent oturulur. sonra bu arqumenti funksiyaya oturerek
        // 'li' tag-inin icerisindeki son usaq elementi elde edirik ve arqument kimi
        // copyColor() funksiyasina gonderirik. Bu span tag-idir.
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showColors();

const activateEyeDropper = () => {
    // rengi sec dedikde body tag-i yox edilir.
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            // EyeDropper interfeysi rəngləri seçmək üçün, damcı effekti yaradir.
            const eyeDropper = new EyeDropper();
            // EyeDropper interfeysi bize 'sRGBHex' acar sozu ve deyer qaytarir
            // asagida yazilan qaydada hemin acar sozu cagiraraq onun icine secilen 
            // reng deyerini geri yazdirmaq olur.
            const { sRGBHex } = await eyeDropper.open();
            // secilen rengi kopyalamaq ucun clipboard js kodundan istifade edirik.
            navigator.clipboard.writeText(sRGBHex);
    
            // kopyalanan rengleri localstorage menbesine yazdiririq ve ordan cagiraraq
            // veb sehifede gosteririk. localstorage menbesine yazdirmadan once, 'pickedColors' adinda 
            // bir Array yaradiriq ve bu arrayin icerisine rengleri yerlesdiririk.
            // push() metodu bir ve daha cox elementi Arrayin sonuna elave etmek ucun istifade edilir.
            if(!pickedColors.includes(sRGBHex)) {
                pickedColors.push(sRGBHex);
                // console.log(pickedColors); - bu bize array qaytarir ancaq prototype ile, Yeni, OBJECT
                // console.log(JSON.stringify(pickedColors)); - bu bize temiz Array qaytarir. Yeni stringify() metodu OBJECT-i JSON formata cevirir.
                // parse() - bu metod ise JSON-nu OBJECT-e geri qaytarir.
                // setItem() bu metod storage ucun açar və dəyər əlavə edir. - storage.setItem(ключа, значение);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
                // rengleri elave etmek ucun funksiya yaradiriq.
                showColors();
            } 
        } catch (error) {
            console.log(error);
        }
        // 
        document.body.style.display = "block";
    }, 10)
   
}

// Clear All 'span' tag-ine basildiqda 'div' tag-i gizledilir
// ve 'pickedColors' deyiskenine 0 (sifir) verilir. Sonra ise hemin sifiri yeni,
// 'pickedColors' deyiskenini 'setItem()' deyerek localStorage-ye yazdiririq.
// Ve artiq pickedColors deiskeni ve localStorage bos oldugu ucun eyni vaxtda
// Clear All 'span' tagine basildiqda, 'div' tag-ine 'hide' class adini elave ederek
// hemin 'div' tag-ini gizledirik.
const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);

