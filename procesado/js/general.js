/**
* Ofusca direcciones de mail
* @param {string} nom
* @param {string} dom
*/
function escribeMail( nom, dom, etiqueta){
   document.write( '<a hr'+'ef="mai'+'lto:'+nom+'@'+dom+'">'+etiqueta+'</a>' );
}

/**
 * Filtro los png para IE (Llamado en el script de menu) 
 */
function fixPngs(){
    
    DD_belatedPNG.fix('.botonContacto');
    DD_belatedPNG.fix('.botonContacto .capa1');
    DD_belatedPNG.fix('.botonContacto .capa1 .capa2');
	DD_belatedPNG.fix('#mapaPortada #decPortada');
	DD_belatedPNG.fix('#visorImagenes'); 
	DD_belatedPNG.fix('#buscadorItinerarios form .botones a .capa1');
	DD_belatedPNG.fix('#buscadorItinerarios form .botones a .capa2');
	
}

/**
 * Filtra imágenes png incrustadas en infowindows de google
 */
function fixGooglePngs(){
    if (jQuery.browser['msie'] && jQuery.browser['version']=='6.0'){
        DD_belatedPNG.fix('.puntoHito .letra');
    }
}

/**
 * Filtra imágenes de la galería multimedia
 */
function fixGalPngs(){
    if (jQuery.browser['msie'] && jQuery.browser['version']=='6.0'){
        DD_belatedPNG.fix('.capaMultimedia .capa1');
        DD_belatedPNG.fix('.capaMultimedia .capa2');
        DD_belatedPNG.fix('.capaMultimedia .capa3');
        DD_belatedPNG.fix('.capaMultimedia .capa4');
        DD_belatedPNG.fix('.innerImg #izq');
        DD_belatedPNG.fix('.innerImg #der');
        DD_belatedPNG.fix('.innerImg #tizq');
        DD_belatedPNG.fix('.innerImg #tder');
    }
}
/***********************/
/* SELECTOR DE IDIOMAS */
/***********************/

var idControl = null;

jQuery(document).ready(function(){
    
    jQuery(".selectorIdiomas").mouseenter(function(){
        
        clearTimeout(idControl);
    
        if (jQuery("#botoActiu").attr('className')=='botonUp'){
            
            doBotonUp()
            
        }
        
    });
    
    jQuery(".selectorIdiomas").mouseleave(function(){
    
        if (jQuery("#botoActiu").attr('className')=='botonDown'){
            
            idControl = setTimeout(doBotonDown,300);            
            
        }
        
    });
    
    jQuery("#botoActiu").click(function(){
        if (this.className.indexOf('botonDown')!=-1){
            doBotonDown();
        }
    });
    
    jQuery("#botoActiu").mouseenter(function(){
        if (this.className.indexOf('over')==-1){
            this.className+=' over';
        }
        if (this.className.indexOf('botonUp')!=-1){
            doBotonUp();
        }
        
    });
    jQuery("#botoActiu").mouseleave(function(){
        if (this.className.indexOf('over')!=-1){
            this.className=this.className.split(' ')[0];
        }
    });
    
});

function doBotonUp(){
    
    jQuery(".selectorIdiomas").animate({ 
        /*height:"57px"*/
		height:"105px"
    }, 300 );
    
    jQuery("#botoActiu").attr('className','botonDown');
    
}

function doBotonDown(){
    
    jQuery(".selectorIdiomas").animate({ 
        height:"27px"
    }, 300 );
    
    jQuery("#botoActiu").attr('className','botonUp');
    
}

/**************************/
/* FI SELECTOR DE IDIOMAS */
/**************************/