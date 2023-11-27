const body = document.querySelector("body");
// burda 'input' tag-ini elde edirik
const input = document.querySelector("input");
// burda hemin 'input' sahesi icerisinde artib-azalan DIV tag-ini elde edirik
const bar = document.querySelector(".progress-bar");
// burda ise artib-azaltmaq ucun istifade edilen yumru topu secirik (DIV tag-idir)
const thumb = document.querySelector(".thumb");
// LI tag-ini cagirirq hansiki bu LI tag-inin icinde IMG var.
const emoji = document.querySelector(".slide-emoji");


// 'oninput' yeni INPUT tag-i uzerine kursor ile klikledikde //! yaxud INPUT tag-i uzerinde her hansisa bir HEREKET
input.oninput = () => {
    // 'value' deyiskenine INPUT tag-inden 0 (sifir) ile 100 (yuz) arasinda deyise bilen deyerleri veririk
    let sliderValue = input.value;
    // 0 - 100 arasindaki ededleri DIV tag-inin "LEFT" css stiline veririk. belelikle topu hereket etdirmek olacaq.
    thumb.style.left = sliderValue + '%';
    bar.style.width = sliderValue + '%';

    //! 1
    if(sliderValue < 20) {
        emoji.style.marginTop = "0px";
        body.classList.add("angry");
        body.classList.remove("confuse");
        body.classList.remove("like");
    }
    //! 2
    if(sliderValue >= 20) {
        emoji.style.marginTop = "-150px";
        body.classList.add("confuse");
        body.classList.remove("angry");
        body.classList.remove("like");
    }
    //! 3
    if(sliderValue >= 40) {
        emoji.style.marginTop = "-300px";
    }
    //! 4
    if(sliderValue >= 60) {
        emoji.style.marginTop = "-450px";
        body.classList.add("like");
        body.classList.remove("confuse");
        body.classList.remove("angry");
    }
    //! 5
    if(sliderValue >= 80) {
        emoji.style.marginTop = "-600px";
    }
    
}