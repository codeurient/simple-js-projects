// duymeni cagiririq
const screenshotBtn = document.querySelector("#src-btn"),
screenshotPreview = document.querySelector(".src-preview"), // 'div' tag-ini cagiririq ve asagida bu tag-in icindeki 'img' tag-ine muraciet edirik
closeBtn = screenshotPreview.querySelector("#close-btn");

const captureScreen = async () => {
    try {
        // 1) 'mediaDevices' xassesi kamera, mikrofon kimi media mezmun elde etmek ucun istifade edilen xassedir.
        // 2) getDisplayMedia() - bu metod, ekranin paylasmaga icaze verilmesi haqqinda teklif ireli surur.
        // 3) preferCurrentTab parametri default olaraq false-dur. Ve false olduqda hal hazirda hansi veb sehifedeyikse, 
        // o veb sehifenin ekranini paylasmaq olmur. "True" etdikde ise cari veb sehifesinide bize paylasmaga imkan
        // veren elave TAB pencere yaranir.
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        // video tag-ini yaradiriq. 
        const video = document.createElement("video");
        // loadedmetadata - eger 'video' tag-inin icinde 'src' atributunda URL varsa onda bir hadise bas versin deyirik.
        video.addEventListener("loadedmetadata", () => {
            // canvas tag-i yaradiriq. Bu tag JS ile qrafik fiqurlar cekmek ucun istifade edilir.
            const canvas = document.createElement("canvas");
            // getContext("2d") metodu Object qaytarir ve bizim ucun '2d' sahesi yaradir ki, x, y, z koordinatlarindan istifade ederek 
            // hemin sahede, yeni, canvas tag-i icinde bir seyler ceke bilek. canvas.getContext("2d") dedikde, 2D sahesi yaradiriq ve 
            // bu getContext() metodunun qaytardigi Object-in diger 'Xasse' ve 'Metodlarindan' istifade ederek qrafik fiqurlar ceke bilirik.
            const ctx = canvas.getContext("2d");
            // Biz ekrani Share dedikde 1ci olaraq 'video' tag-inin 'src' atributna 'url' gonderilir. Ve bu ekranin bir olcusu vardir 
            // hemin olcunu elde etmek ucun 'video.videoWidth' ve 'video.videoHeight' demek kifayetdir. 
            // Bu olculeri ise 'canvas' tag-inin olculerini teyin etmek ucun istifade edirik. Eslinde 'canvas' tag-inin bir olcusu vardir
            // sadece bu olcu Share olunan ekran olcusu ile eyni olsun deye 'canvas.width = video.videoWidth' deyerek 'canvas' tag-inin 
            // olcusunu yeniden teyin edirik.
            canvas.width = video.videoWidth;    // paylasilan ekran goruntusunun genisliyi
            canvas.height = video.videoHeight;  // paylasilan ekran goruntusunun hundurluyu
            // elave edilen ekran təsvirinin qara və ya boş olmaması üçün videonu oynadiriq.
            video.play();
            // mediaDevices - bu xasse ekranin sadece canli video goruntusunu elde ede bilir ancaq bize SCREEN yeni ekranin 
            // seklini elde lazimdirsa onda bunun ucun '2d' formatinda olan bir platforma yaradilir ve ekranin seklini cekmeye
            // imkan veren 'getContext() 'object-inin bir metodu olan 'drawImage()' metodundan istifade edilir.
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);    // drawImage(video, x, y, width, height)
            // stream-i cagiraraq mediafayllara muraciet edirik. getVideoTracks() metodu ise bize hemin 
            // mediafayllarin track-lerini Array olaraq elde etmeye imkan saglayir. 
            // Bu Array icinde var: '0: BrowserCaptureMediaStreamTrack'. 0 (sifirinci) indekse muraciet etmek ucun 
            // bele yazmaliyiq: 'stream.getVideoTracks()[0]'. 
            // Track - yeni, hal hazirda gosterilen, oynatilan video menasina gelir. 
            // Bize video lazim deyil. Bize ekranin screen yeni, sekli lazimdir. Bunun ucun ise oynatilan videonu 
            // dayandirmaliyiq. Onun ucun 'stream.getVideoTracks()[0]' deyerek hemin oynatilan video track-ine muraciet edirik
            // ve stop() metodunun komekliyi vasitesi ile hemin tack-i dayandiririq.
            stream.getVideoTracks()[0].stop();

            // append - yeni, elave et deyirik. Hara? 'div' tag-inin icindeki 'img' tag-ine. Neyi? 'canvas' tag-ini
            // canvas.toDataURL() - bu metod canvas
            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");
        });
            // evveller paylasilan ekran ucun URL yaratdiqda, 'createObjectURL()' metodundan istifade ediliridi.
            // sonra 'src' atributuna bu URL gonderilirdi. Indi ise sadece bir xasse olan 'srcObject' ile bu URL 
            // adresini hem yaradir hemde "src" atirubutuna gonderirik. 'stream' burada, ekran goruntusu ola biler. 
            // Hemin secilen media ilk once 'stream' deyiskenine gonderilir ve asagida 'src' atributuna bunu yazdirirq.
            video.srcObject = stream;
    } catch (error) {
        alert("Failed to capture");
    }
};  

// toggle() - bir defe klikledikde show klas adini elave et ikinci defe basdiqda show klas adini sil.
closeBtn.addEventListener("click", () => screenshotPreview.classList.toggle("show"));

// duymeye klikledikde 'captureScreen' funksiyasi islemeye baslasin
screenshotBtn.addEventListener("click", captureScreen);