const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-btn");


const maxPaletteBoxes = 32;

const generatePalette = () => {
    container.innerHTML = "";
    // bir defe button duymesine basdiqda 32 eded HEX CODE verir bize for dongusu
    for(let i = 0; i < maxPaletteBoxes; i++) {
    // 0xffffff - bu kod 16,777,215 ededini verir bize
    // Math.random() * 0xffffff - bu kod, 0 (sifir) ile 16,777,215 arasinda random kesir eded qaytarir
    // floor() - bu metod yuvarlaqlasdirir
    // toString(16) - bu metod on altiliqli say sistemine cevirir alinan ededi.
    // NOT! ancaq bu kod bize 6 simvollu hex code vermir. Bezen 5 simvollu hex kod qaytarir.
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    
    // 6 simvollu HEX CODE almaq ve bawa (hash) # simvolu elave etmek ucun yaziriq:
    // yuxaridaki kod bize hemise 6 simvol vermir bezen 5 simvol verir
    // hemin 5 simvolu 6 simvola tamamlamaq ucun ise padStart() metodundan istifade edirik
    // padStart() metodundaki birinci parametr o demekdir ki, 6 simvola tamamla
    // 2ci parametr ise deyirik, eger 5 simvol olarsa 6 simvola tamamla ve baslangica 0 (sifir) elave et.
    randomHex = `#${randomHex.padStart(6, "0")}`;

    // li tag-i yaradilir ve ul tag-inin icerisine elave edilir.
    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                       <span class="hex-value">${randomHex}</span>`;

    // li tag-ine basdiqda copyColor funksiyasi isleyecek. 2 parametr gonderirik.
    // 1ci parametr: li tag-i, 2ci parametr: HAX CODE
    color.addEventListener("click", () => copyColor(color, randomHex));

    container.appendChild(color);
    }
}

generatePalette();

const copyColor = (elem, hexVal) => {
    // 'li' tag-inin icinden 'span' tag-ini cagirirq.
    const colorElement = elem.querySelector(".hex-value");

    // clipboard - bu xasse muveqqeti yaddas yaratmaq ucun istifade edilir.
    // hemin muveqqeti yaddasa 'writeText()' metodu ile HEX CODE yazdiririq.
    // yazdirma emeliyyati kopyalanaraq aparilir. Yeni, navigator.clipboard.writeText(hexVal) - bu kod umumilikde 
    // paramatrindeki 
    navigator.clipboard.writeText(hexVal).then(() => {
        colorElement.innerText = "Copied!";
        // 'span' tag-ine "Copied" mesajini yazdirdiqdan 1 saniye sonra yeniden HEX CODE yazdiririq. 
        setTimeout(() => colorElement.innerHTML = hexVal, 1000);
    }).catch(() => alert("Failed to copy the color code!")); // metni kopyalamaq alinmasa alert ile xeta mesaji yazdiririq
}

refreshBtn.addEventListener("click", generatePalette);