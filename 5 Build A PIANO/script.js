const pianoKeys = document.querySelectorAll(".piano-keys .key"),
// Range olan input elementini cagiririq
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

// bir array yaradiriq ve asagida forEach() metodu olan yerde 'data-key' atributunun
// deyerlerini bu arrayin icerisine push() deyerek gonderirik.
let allKeys = [],
// new Audio() obyekti HTML-de auido elementini yaradir.
// Default (varsayilan) olaraq 'tunes' qovlugundaki 'a' melodiyasi aktiv olacaq.
audio = new Audio("tunes/a.wav");

// aşağıda playTune() funksiyasini cagirdiqda arqument kimi verdiyimiz deyerleri  
// burda 'key' parametrine ötürürük.
const playTune = (key) => {
    // "audio" elementinin "src" atributuna elde etdiyimiz 'span' icindeki deyerleri yazdiririq
    // bu deyerler 'tunes' qovlugundaki melodilere verdiyimiz adlarla eynidir.
    audio.src = `tunes/${key}.wav`;
    audio.play();

    // `[data-key="${key}"]` - atribut vasitesi ile muraciet edirik 'li' tag-ine
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    // her duymeye basildiqda "active" klass adi elave olunacaq. 
    clickedKey.classList.add("active");
    // ve bu klass adi 150 millisaniye sonra silinecek avtomatik olaraq.
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150)
}

// forEach() metodu icindeki "key" parametri avtomatik olaraq butun 
// "li" tag-larini bize verir. Bu "li" tag-lerinin icerisinde 'data-key'
// adinda atribut ve bu atributlarin icerisinde deyerler var. Hemin deyerleri
// elde etmek ucun 'key.dataset.key' deyirik. playTune() funksiyasini 
// burda cagirmisiq ancaq yuxarida yaratmisiq. Cagirdiqda arqumnet olaraq
// 'key.dataset.key' gonderirik. Yeni deyerleri parametrlere otururuk.
pianoKeys.forEach((key) => {
    // 'data-key' atributunun deyerlerini 'allKeys' array-ina gonderirik.
    // Asagida "pressedKey()" funksiyasinda deyirik ki, eger bu array icinde
    // hemin deyerler movcuddursa onda "playTune()" funksiyasi işə keçsin.
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// input elementini hereket etdirdikde 'e' parametrine hemin 'input' elementi haqqinda melumat gonderilir.
// Bu 'input' elementi icerisinde 'target' acari var ve bu 'target' acarinda 'volume' deyilen xasse var.
// Bu xasse sesin 0-dan 100-e qeder olan derecesini teyin edir.
const handleVolume = (e) => {
    // "Audio" object-inin "volume" acar sozune input-un artib azalan deyerini yazdiririq 'e.target.value' deyerek. 
    // yeni input-un range-i artib azalanda, bu tesir edecek audio elementinin volume yeni sesine.
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    // butun 'li' tag-lerine "hide" klas adi elave edirik.
    // toggle() metodu elemente eger hemin klas adi yoxdursa elave edir
    // yox eger varsa onda hemin klas adini silir.
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key)){
        playTune(e.key);
    }
}


// checkbox duymesini basdiqda herfler gorsensin yaxud gizlensin demek ucun 
// 'showHideKeys' funksiyasini yaradiriq.
keysCheckbox.addEventListener("click", showHideKeys);

// 'range' olan 'input' elementini hereket etdirdikde 'handleVolume' funksiyasini cagirirq
volumeSlider.addEventListener("input", handleVolume);

// klavyaturada her hansisa bir duymeye basildiqda "pressedKey" funksiyasi işləməyə başlasın
document.addEventListener("keydown", pressedKey);