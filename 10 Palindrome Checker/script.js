const txtInput = document.querySelector('.inputs input'),
checkBtn = document.querySelector('.inputs button'),
infoTxt = document.querySelector('.info-txt');

let filterInput;

checkBtn.addEventListener("click", () => {
    //! split() - metodu sətrləri alt sətrlərə bölərək Array qaytarır:   
    // var a = "hello"; 
    //     a.split();       >['hello']
    //     a.split(' ');    >(5) ['h', 'e', 'l', 'l', 'o']
    //! reverse() - metodu deyerleri terseine cevirir:
    //     a.reverse();     >(5) ['o', 'l', 'l', 'e', 'h']
    //! join() metodu Array-yi birlesdirerek Array halindan cixarir ve setr olaraq qaytarir.
    //     a.join();        >olleh
    let reverseInput = filterInput.split("").reverse().join("");

    infoTxt.style.display = "block";

    if(filterInput != reverseInput) {
        return infoTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a palindrome!`;
    }
    infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a palindrome!`;
});



// 'keyup' - klavyatura ile input sahesinde yazilan deyerleri elde etmek ucundur.
txtInput.addEventListener('keyup', () => {
    // @!#$%^&* ve.s kimi simvollar yazmaq mumkun olmasin deye RegExp-den istifade edirik.
    filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9 ]/ig, "");
    if(filterInput) {
        return checkBtn.classList.add('active');
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove('active');
});