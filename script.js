const bgImg = document.getElementById('header_img')
window.addEventListener('scroll', function(){
bgImg.style.opacity = 1 - +this.window.pageYOffset/350+''

})

window.addEventListener('scroll', appearOnScroll);

    function appearOnScroll(){
      var appearOnScroll = document.querySelectorAll('.appearOnScroll');

      for(var i = 0; i < appearOnScroll.length; i++){

        var windowheight = window.innerHeight;
        var appearOnScrolltop = appearOnScroll[i].getBoundingClientRect().top;
        var appearOnScrollpoint = 50;

        if(appearOnScrolltop < windowheight - appearOnScrollpoint){
          appearOnScroll[i].classList.add('active');
        }
        else{
          appearOnScroll[i].classList.remove('active');
        }
      }
    }

    function el(selector) { return document.querySelector(selector) }
function els(selector) { return document.querySelectorAll(selector) }
function on(selector, event, action) { els(selector).forEach(e => e.addEventListener(event, action)) }
function cookie(name) { 
  let c = document.cookie.split('; ').find(cookie => cookie && cookie.startsWith(name+'='))
  return c ? c.split('=')[1] : false; 
}


/* popup button hanler */
on('.cookie-popup button', 'click', () => {
  el('.cookie-popup').classList.add('cookie-popup--accepted');
  document.cookie = `cookie-accepted=true`
});

/* popup init hanler */
if (cookie('cookie-accepted') !== "true") {
  el('.cookie-popup').classList.add('cookie-popup--not-accepted');
}



/* page buttons handlers */

function _reset() {
  document.cookie = 'cookie-accepted=false'; 
  document.location.reload();
}

function _switchMode(cssClass) {
  el('.cookie-popup').classList.toggle(cssClass);
}
//datepicker

$( function() {
    $( "#datepicker" ).datepicker({
      firstDay: 1,
      dateFormat: "dd-mm-yy",
      maxDate: '+2m',              
      minDate: 'date',         
      dayNamesMin: [ "Sv", "P", "O", "T", "C", "P", "S" ],
      dayNames: [ "Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena" ],
      monthNames: [ "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris" ],
      monthNamesShort: [ "Jan", "Feb", "Marts", "Apr", "Maijs", "Jūn", "Jūl", "Aug", "Sept", "Okt", "Nov", "Dec" ],


    });
  } );

const req = new Request();

req.get('api.php?name=getSubscribers', function (response) {
    for (let subscriber of response.subscribers) {
        printSubscriber(subscriber)
    }
})

document.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    if(document.getElementById('subscription_check').checked) {
        const url = this.getAttribute('action')
        let form = this;
        req.post(url, new FormData(this), function (response) {
            if (response.hasOwnProperty('entity')) {
                for (let input of form.querySelectorAll('input')) {
                    input.value = ''
                    input.checked = false
                }
                document.getElementById('message').textContent = 'Jūsu pieteikums ir nosūtīts!'
            }
        })
    }
    else {
        document.getElementById('message').textContent = "Lūdzu apstipriniet noteiktumus!"
    }
}




function deleteHandler(event) {
    event.preventDefault()
    const url = this.getAttribute('href')
    const data = new FormData()
    data.append('id', this.dataset.id)
    const btn = this

    req.post(url, data, function (response) {
        btn.parentNode.parentNode.remove()
    })
}