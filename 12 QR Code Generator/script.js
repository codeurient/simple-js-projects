const wrapper = document.querySelector('.wrapper'),
qrInput = wrapper.querySelector('.form input'),
generateBtn = wrapper.querySelector('.form button'),
qrImg = wrapper.querySelector('.qr-code img');

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;
    // Eger input sahesinin icerisine deyer yazilmaz ise netice olaraq FALSE aliriq.
    // 2 FALSE 1 TRUE verecekdir ve netice olaraq return qayidacaqdir. Yeni, bir sonraki setrdeki kodlara 
    // kecid etmeyeceyik. 
    if(!qrValue) return;

    generateBtn.innerText = "Generating QR Code...";

    // https://goqr.me/ - QR kodu bu sayt vasitesi ile enteqrasiya edirik INPUT sahesinde yerlesdirilen deyere.
    // Hemin qr kod bize sekil formatinda geri qayidacaqdir ve biz bu sekli 
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;

    // IMG tag-ine sekil yuklendikde DIV tag-ine 'active' klass adi elave edilsin.
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    })
});


// Bu funksiya eger input sahesi bosdursa div tag-i icerisinden active klass adini silecekdir.
const removeActive = () => {
    if(!qrInput.value){
        wrapper.classList.remove("active");
    }
}
// input sahesinde klavyaturadaki duymeni buraxdiqda 'removeActive' funksiyasi ise kecsin
qrInput.addEventListener("keyup", removeActive);
// input sahesinde kursoru buraxdiqda 'removeActive' funksiyasi ise kecsin
qrInput.addEventListener("mouseout", removeActive);


