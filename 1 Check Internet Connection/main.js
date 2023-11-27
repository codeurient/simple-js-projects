//! 1
// Ana DIV tag-ini cagirmisiq
const popup = document.querySelector(".popup"),
// i tag-ini cagiririq
    wifiIcon = document.querySelector(".icon i"),
// h2 tag-ini cagiririq
    popupTitle = document.querySelector(".popup .title"),
// p tag-ini cagiririq
    popupDesc = document.querySelector(".desc"),
// button tag-ini cagirirq
    reconnectBtn = document.querySelector(".reconnect");

//! 2
let isOnline = true, intervalId, timer = 10;


const checkConnection = async () => {
    try{
        // fetch getirmek demekdir. bu metod awagida gorduyunuz linkden
        // melumatlari cagirmaq, getirmek ucun istifade edilir.
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        // eger status 200-den boyuk 300 den kicikdirse TRUE elde edirik eks teqdirde FALSE
        isOnline = response.status >= 200 && response.status < 300;
    } catch(error){
        isOnline = false;
    }

   
    timer = 10;
    clearInterval(intervalId);

    // arqument olaraq TRUE yaxud FALSE gonderirirk funksiyamiza
    handlePopup(isOnline);
}



// status TRUE yaxud FALSE olduqda bu funksiya iwe kecir.
const handlePopup = (status) => {
    // Eger status TRUE olarsa bu o demekdirdi ki, internet vardir,
    // ve 'div' tag-inin icerisinden "show" klass adini silirik.
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    // eger internet YOXDUR-sa onda, 'show' klass adini elave edirik 
    else {
        wifiIcon.className = "uil uil-wifi-slash";
        popupTitle.innerText = "Lost Connection";
        popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
        popup.className = "popup show";
    }
    
    intervalId = setInterval( () => {
        timer--;
        if(timer === 0){
            checkConnection();
        }
        popup.querySelector(".desc b").innerText = timer;
    },1000);
}



// Tekce, eger isOnline deyiskeni TRUE olarsa, internet baglantisini
// her 3 saniyeden bir yoxla. TRUE olmasi o demekdir ki, yeni internet var
// ve biz 3 saniyeden bir internet varmi yoxsa yoxmu deye yoxluyuruq.
setInterval( () => isOnline && checkConnection(), 3000);

reconnectBtn.addEventListener('click', () => checkConnection());