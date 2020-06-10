$document = $(document);

$document.ready(function(){
  //Initializing Panorama
  $('#panorama-div').cyclotron({dampingFactor:1,autorotation:1, continuous:0});
  //Initializing Paroller.js
  $('.paroller').paroller();
  $(".v-paroller").paroller({ factor: 0.5, factorXs: 0.2, type: 'foreground', direction: 'vertical' });
  $(".h-paroller").paroller({ factor: -0.2, factorXs: 0.2, type: 'foreground', direction: 'horizontal' });
  //Fade
});

$document.on("scroll", function(){
  var scrollPos = $document.scrollTop();
  $(".fadeIn").each(function(){
    var $this = $(this), elemOffsetTop = $this.offset().top;
    if (scrollPos + ($this.height()) > elemOffsetTop) {
      $this.css("opacity", (scrollPos + ($this.height()/2) - elemOffsetTop)/200);
    }
    console.log(scrollPos + $this.height() );
  });
});
