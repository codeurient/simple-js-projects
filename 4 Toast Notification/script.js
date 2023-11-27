// 'ul' tag-ini cagiririq.
const notifications = document.querySelector(".notifications"),
// butun button duymelerini secirik querySelectorAll deyerek
buttons = document.querySelectorAll(".buttons .btn");

// Burada Object yaradiriq ve obyekte deyer olaraq ferqli metnler ve ikonlar veririk.
const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-circle-check",
        text: "Success: This is a success toast.",
    },
    error: {
        icon: "fa-circle-xmark",
        text: "Error: This is a error toast.",
    },
    warning: {
        icon: "fa-circle-exclamation",
        text: "Warning: This is a warning toast.",
    },
    info: {
        icon: "fa-circle-info",
        text: "Info: This is a information toast.",
    }
}

const removeToast = (toast) => {
    // Button-a klikledikde 'li' tag-i yaradilir ve 5 saniye sonra 
    // 'hide' klas adi elave edilerek 'li' tag-i gizledilir ancaq 
    // 'li' tag-i silinmir ve onu silmek lazimdir. 
    toast.classList.add("hide");

    // "toast" deyiskeninin icinde 'timeoutId' adinda açar söz var və bu açar sözə 'setTimeout()' funksiyasını vermişik.
    // Eger setTimeout() funksiyası 5 saniye sonra işləyərsə onda bu "true" deməkdir. Eger 'true' elde edersek onda
    // 'clearTimeout()' funksiyasını çağırırıq. Eger clearTimeout() funksiyasını yazmasaq onda setTimeout() funksiyası
    // arxa paneldə öz işini dayandırmaz və bu proqramın sürətini zəiflədər. 
    if(toast.timeoutId) clearTimeout(toast.timeoutId);

    // 500 millisaniye sonra 'li' tag-ini silirik. 
    setTimeout(() => toast.remove(), 500);
}

// asagida funksiyani cagirdiqda "btn" arqumentine gonderdiyimiz duymeleri
// burda parametr olaraq elde edirik. 
const createToast = (id) => {
    // Object icinde yaratdigimiz "success, error, warning ve info" acar sozlerini burda
    // cagiraraq, "icon ve text" deyiskenlerine hemin "success, error, warning ve info"
    // icindeki "icon ve text" acar sozlerini gonderirik.
    const {icon, text} = toastDetails[id];

    // 'li' tag-ini yaradiriq
    const toast = document.createElement("li");
    // 'li' tag-ine uygun klas adlarini elave edirik. <li class="toast success"> ve.s
    toast.className = `toast ${id}`;
    // 'li' tag-inin icine asagidaki elementleri yerlesdiririk.
    // this - dedikde nezerde tutulan 'i' tag-idir. parentElement dedikde hemin 'i' tag-inin ana elementi olan 'li' tag-i nezerde tutulur.
    // yeni 'i' tag-ine basdiqda removeToast() funksiyasina 'li' tag-ini gonderirik.
    toast.innerHTML = `<div class="column">
                            <i class="fa-solid ${icon}"></i>
                            <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;  
    // 'ul' tag-ine 'li' tagini icindeki diger elementler ile elave edirik
    notifications.appendChild(toast);

    // 5 saniye sonra removeToast() funksiyasi iwe baslayacaq.
    // 'toast' deyiskeninin icinde 'li' tag-i var icindeki diger elementler ile 
    // birlikde ve bu deyiskeni biz removeToast(toast) funksiyasina gonderirik.
    // "toast" bir Object-dir ve Object-lere açar təyin etmək mümkündür.
    // timeoutId bir açardır və bu açara setTimeout() funksiyasini veririk.
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}
// forEach() metodu her duymeni ayri-ayri secmek ucun istifade edilir ve
// her secilen duymeye klikledikde ozumuzun yaratdigi createToast()
// funksiyasi iwe kecsin deyirik. Her duyme "btn" atributuna gonderilir.
// "btn" atributu createToast() fonksiyasina gonderilir.
// createToast() funksiyasini yuxarida yaratmisiq ve forEach() icerisinde
// cagirmisiq. createToast() fonksiyasini cagirdiqda onunda icinde "btn"
// arqumentini yaratmisiq ve her bir duymeni ayri-ayri bu arqumente gondermisik.
buttons.forEach(btn => {
    // button tag-lerinin "id" atributuna verdiyimiz deyeri elde etmek ucun,
    // "btn.id" deyirik. Yeni, success, info, warning ve danger string-lerini elde edirik.
    btn.addEventListener("click", () => createToast(btn.id));
});