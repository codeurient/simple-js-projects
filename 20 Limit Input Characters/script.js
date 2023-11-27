// FORM tag-i icerisindeki INPUT tag-ini elde edirik
const input = document.querySelector("form input"),
// FORM tag-i icerisindeki .COUNTER klas adina sahib SPAN tag-ini elde edirik
counter = document.querySelector("form .counter"),
// INPUT tag-inin 'maxlength' atributunu elde edirik.
maxLength = input.getAttribute("maxlength");


// onkeyup - yeni her defe klavyaturada duymeni basib buraxdiqdan sonra funksiya işləsin
input.onkeyup = () => {
    // bu funksiya SPAN tag-i icerisindeki metni deyisdirir.
    counter.innerText = maxLength - input.value.length;
}