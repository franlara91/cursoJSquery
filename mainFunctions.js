/*
 * Slider de fotografias que tengamos en carpeta directorio
 * Autor: Francisco Lara
 * Fecha: 15/11/2014
 * 
 */

$(document).ready(function(){

    /*
     * Definimos las variables
     */

    var slides, timer;

    //Crearemos un objeto con la informcion de los slides
    slides = $('#slider .slidesContainer > .slide');


    
     //Se define la primera funcion que permite desplazar el contenedor
     
    
    //Se desplaza a la direccion indicada
    //@direction = [izquierda,derecha]
    function sliderScroll(direction){

       //Calculamos la posicion del slider
       position = $('#slider').scrollLeft();

      
       //Lo usamos para calcular cuando el scroll llega al final.
       totalWidth = (slides.length * slides[0].offsetWidth) - slides[0].offsetWidth

       //Se comprueba la variable direction para hacer el scroll hacia izquierda o derecha
       switch (direction) {
            case 'right': //Derecha
                if (position+slides[0].offsetWidth > totalWidth){ 
                    //En el caso de llegar al final del recorrido vuelve al comienzo
                    $('#slider:not(:animated)').animate({scrollLeft:0},1000);
                } else { //Si no es el final se suma a posicion la anchura
                    $('#slider:not(:animated)').animate({scrollLeft:position+slides[0].offsetWidth},1000);
                }
                break;

            case 'left': //Izquierda
                if (position-slides[0].offsetWidth < 0){ 
                    //Cuando la siguiente posicion se sale vuelve al final
                    $('#slider:not(:animated)').animate({scrollLeft:totalWidth},1000);
                } else { 
                    //Cuando no es el final resta uno a la posicion del slide
                    $('#slider:not(:animated)').animate({scrollLeft:position-slides[0].offsetWidth},1000);
                }
                break;
        }

   }

   //A continuacion se crea el temporizador para la visualizacion de las imagenes
   function initTimer(){
        timer = setInterval(function(){sliderScroll('right');}, 10000);
   }

    //Definimos la anchura del contendor
    //Multiplicamos la medida de un slide por el numero de slides
    $('#slider .slidesContainer').css('width',slides[0].offsetWidth * slides.length);


    //Se impone el click en next
    $('.next').click(function(){
        clearInterval(timer); //Corta el temporizador
        sliderScroll('right'); //Desplaza el slider a la derecha
        initTimer(); //Vuelve a iniciarse el temporizador
        return false;
    });

    //Ahora realizamos lo mismo pero para el boton anterior
    $('.prev').click(function(){
        clearInterval(timer); //Desactiva el temporizador
        sliderScroll('left'); //Desplaza el slider a la izquierda
        initTimer(); //Vuelve iniciarse el temporizador
        return false;
    });


    //Inicia el temporizador
    initTimer();

});
