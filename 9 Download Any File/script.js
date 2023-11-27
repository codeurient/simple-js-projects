const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    // button duymesini basanda SUBMIT edilir yeni, melumatlar gonderilir ve kod islemir.
    // Bunun olmamasi ucun 'e.preventDefault()' deyirik yeni hemin SUBMIT olma ozelliyini aradan qaldiririq.
    e.preventDefault();
    
    
    downloadBtn.innerText = "Downloading file...";

    // fetchFile() - ozumuzun yaratdigi funksiyadir ve input sahesinde girilen deyeri arqument kimi gonderirik parametre.
    fetchFile(fileInput.value);
});

// 
function fetchFile(url){
    // console.log(url);   // - https://cdn.pixabay.com/photo/2023/02/04/09/20/castle-7766794_1280.jpg
    
    // fetch() metodu data alib-gondererken istifade edilen metotdur. Bu metod, AJAX sistemi evezine istifade edile bilen bir sistemdir.
    // blob() - binary large object - ikili say sisteminde olan boyuk fayllar (sekil, video, pdf ve.s). Bu cur fayllari yuklemek ucun blob() metodundan istifade edilir.
    // fetch() metodu, secilen linke esasen hemin faylin melumatlarini response olaraq qaytarir ve blob() metodu avtomatik bu faylin olcusunu ve tipini verir bize.
    fetch(url)
        .then(res => res.blob())
        //! console.log(file);  -  > Blob {size: 588009, type: 'image/jpeg'}
        .then(file => {         
        //! console.log(tempUrl);   BLOB URL yaratdiq   - blob:null/9bb15b9d-bba6-4e8a-a57f-4ea406da2423
            let tempUrl = URL.createObjectURL(file);
            // a tag-i yaradiriq 
            let aTag = document.createElement("a");
            // Hemin STRING url-ni href atributuna yazdiririq.
            aTag.href = tempUrl;
            // yuklenen faylin adi aTag.download atributuna verilen deyer ile tenzimlenir.
            // faylin sonundaki SLESH (/) isaresinden sonra olan adi esas gotur deyirik.
            aTag.download = url.replace(/^.*[\\\/]/, '');
            document.body.appendChild(aTag);
            // buttona basdiqda click() metodu avtomatik a tag-ini ise salacaq ve yuklenme heyata kececek.
            aTag.click();
            // clic() metodu ise kecdikden sonra remove() metodu a tag-ini avtomatik silecek.
            aTag.remove();

            // createObjectURL() metodu ile URL yaratdiqdan sonra bu URL-ler yaddasda yer tutmasin deye, revokeObjectURL() metodu ile evvel yaradilan ve yaddasa yazilan 
            // URL -ni silerek yaddasi temizleyirik. 
            URL.revokeObjectURL(tempUrl);

            downloadBtn.innerText = "Download file";
            
        }).catch(() => {
            downloadBtn.innerText = "Download file";
            alert("Failed to download file");
        });
}



