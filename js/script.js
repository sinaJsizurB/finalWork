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
