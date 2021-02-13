var MSIE = false;
var GECKO = false;

// Detectamos el navegador
if( navigator.userAgent.indexOf('MSIE')!=-1){
    MSIE = true;            
}else if( navigator.userAgent.indexOf('Gecko')!=-1 ){
    GECKO = true;   
}else{
    GECKO = true;
}	
    
//----------------------------------------------------------------
// Obtiene el ancho del area cliente de la ventana del explorador.
function getAnchoCliente(){
    var anchoDoc = 0;
    
    if( GECKO ){
        anchoDoc = window.innerWidth;            
    } else if( MSIE ){        
        anchoDoc = document.body.clientWidth;            
    }
    return (anchoDoc + getOrigenX()); 
}

//----------------------------------------------------------------
// Obtiene el alto del area cliente de la ventana del explorador.
function getAltoCliente(){
    var altoDoc = 0;
    if( GECKO ){            
        altoDoc = window.innerHeight;
    } else if( MSIE == true ){
        altoDoc = document.body.clientHeight;
    }        
    return (altoDoc + getOrigenY());
}

//----------------------------------------------------------------

function getClientWidth(){
    if( GECKO == true ){
        return window.innerWidth;
    } else if( MSIE == true ){        
        return document.body.clientWidth;
    }
}

//----------------------------------------------------------------

function getClientHeight(){
    if( GECKO == true ){
        return window.innerHeight;        
    } else if( MSIE == true ){
        return document.body.clientHeight;
    }
}

//----------------------------------------------------------------    

function getOffsetLeft (el) {
    var ol = el.offsetLeft;
    while ((el = el.offsetParent) != null){
        ol += el.offsetLeft;
    }
    return ol;
}
            
//----------------------------------------------------------------    

function getOffsetTop (el) {
    var ot = el.offsetTop;
    while((el = el.offsetParent) != null){
        ot += el.offsetTop;
    }
    return ot;
}

//----------------------------------------------------------------

function getOrigenX(){
    if( GECKO == true ){                
        return window.pageXOffset;                     
    } else if( MSIE == true ){
        return document.body.scrollLeft;        
	}
}

//----------------------------------------------------------------

function getOrigenY(){
    if( GECKO == true ){          
        return window.pageYOffset;                  
    } else if( MSIE == true ){                        
        return document.body.scrollTop;        
    }
}

/**
 * Item de galería.
 *     
 * @param uknown a Enlace DOM.
 */
function ItemGaleria( a ){
    var _enlace = a;    

    this.atributo = function( nombre ){
        var parametros = _enlace.rel.split(";");
        var parametro;
        
        for( var i=0; i<parametros.length; i++ ){
            parametro = parametros[i].split("=");
            if( parametro[0] == nombre ){
                return parametro[1];
            }
        }
        
        return null;
    }
    
    this.titulo = function(){
        return _enlace.title;
    }
    
    this.tipo = function(){
        return this.atributo("tipo");
    }
    
    this.url = function(){
        return _enlace.href;
    }
    
    this.ancho = function(){
        return parseInt(this.atributo("width"),10);
    }
    
    this.alto = function(){
        return parseInt(this.atributo("height"),10);
    }
    
    this.descripcion = function(){
        return this.atributo("descrip");
    }
}


/**
 * Objeto galería multimedia.
 */
function GaleriaMultimedia( locale ){
    var _capaFondo;
    var _capaPadre;     
    var _capaMultimedia;
    var _capaDummy;
    var _capaTitulo;
    var _capaDescripcion
    var _capaNavegacion;    
    var _botonAnterior;
    var _botonSiguiente;
    var _capaNumItems;
    var _capaItem;
    var _botonCerrar;    
    var _botonSiguienteSup;
    var _botonAnteriorSup;
    var _botonSiguienteInt;
    var _botonAnteriorInt;
    var _items = [];
    var _itemActual = 0;
    var _that = this;
    var PADDING = 0;
    var MARGEN_FLASH = 127*2;
    
    var _teclaCerrar = 'c'; // Por defecto 'c'.
    var _teclaAnterior = 'a'; // Por defecto 'a'.
    var _teclaSiguiente = 's'; // Por defecto 's'.
    
    var _locale = new Array();
    _locale["anterior"] = "<strong>a</strong>nterior";
    _locale["siguiente"]  = "<strong>s</strong>iguiente";
    _locale["cerrar"] = "<strong>c</strong>errar";
    
    // Capas para el borde.
    var _capa1,_capa2,_capa3,_capa4,_capa5,_capa6,_capa7,_capa8;
    
    var _actualizaInfo = function(){
        var item = _items[_itemActual];
        
        _capaTitulo.innerHTML = item.titulo();
        
        var desc = item.descripcion();
        if( desc ){
            _capaDescripcion.innerHTML = item.descripcion();
            _capaDescripcion.style.display = "block";
        }else{
            _capaDescripcion.style.display = "none";
        }
        
        _capaNumItems.innerHTML = (_itemActual+1) +"/"+ _items.length;        
        
    }
    
    /**
     * Ajusta el tamaño de la ventana y la centra en el area cliente.
     */
    var _ajustaVentana = function(){
        
        var w = _anchoVentana();        
        _capaPadre.style.width = w+"px";
        _capaPadre.style.left = (getOrigenX() + (Math.floor(( getClientWidth() - w )/2) ))+"px";
        
        var h = _altoVentana();
        _capaPadre.style.height = h+"px";
        _capaPadre.style.top = (getOrigenY() + (Math.floor(( getClientHeight() - h )/2) ))+"px";
        
        _capa5.style.height = (h - 16 ) + "px";
        _capa6.style.height = (h - 16 ) + "px";
        
        _capa7.style.width = (w - 31 ) +"px";
        _capa8.style.width = (w - 32) + "px";
    }
    
    /**
     * Obtiene el ancho de la ventana.
     */
    var _anchoVentana = function(){
        var item = _items[_itemActual];
        return ( item.ancho() + (PADDING*2) );
    }
    
    /**
     * Muestra el siguiente item de la galer�a.
     */
    var _anterior = function(){
        if( _itemActual > 0 ){
            _that.muestraItem( _itemActual-1 );            
        }
    }
    
    /**
     * Obtiene el alto de la ventana.
     */
    var _altoVentana = function(){        
        return ( getOffsetTop(_capaDummy) - getOffsetTop(_capaPadre) );
    }
    
    /**
     * Cerrar ventana.
     */
    var _cierra = function(){
        _botonSiguienteInt.style.visibility = "hidden";
        _botonAnteriorInt.style.visibility = "hidden";
        _capaPadre.style.display = "none";
        _capaFondo.style.visibility = "hidden";
    }
    
    /**
     * Muestra la ventana con el contenido html.
     */
    var _muestraHTML = function( html ){
                        
        //_capaFondo.style.width = "100%";//getClientWidth() + "px";
        _capaFondo.style.height = jQuery(document).height() + "px";
        _capaFondo.style.visibility = "visible";        
        
        _capaPadre.style.width = "auto";
        _capaPadre.style.height = "auto";
        _capaItem.innerHTML = html;
        
        _actualizaInfo();        
        
        _capaPadre.style.display= "block";
        
        _ajustaVentana();
        fixGalPngs();
        
        return;
    }
    
    /**
     * Muestra un item de imagen.
     * 
     * @param ItemGaleria item
     */
    var _muestraImagen = function( item ){        
        
        var divsEsquinas = '<div id="izq"></div><div id="der"></div><div id="tizq"></div><div id="tder"></div>';
        _muestraHTML('<div class="innerImg">' + divsEsquinas + '<img src="'+item.url()+'" width="'+item.ancho()+'" height="'+item.alto()+'" /></div>');        
        
        // Ajustamos la altura de los botones siguiente/anterior a la altura del conenido.
        jQuery(_botonAnteriorSup).height(item.alto());
        jQuery(_botonSiguienteSup).height(item.alto());
    }
    
    /**
     * Muestra un item flash.
     *
     * @param ItemGaleria item
     */
    var _muestraFlash = function( item ){        
        var anchoFlash = item.ancho()-MARGEN_FLASH;        
        _muestraHTML('<div class="flash" style="width:'+anchoFlash+'px;margin:auto;"><object width="'+anchoFlash+'" height="'+item.alto()+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"> <param value="'+item.url()+'" name="movie"/> <param value="high" name="quality"/> <param value="transparent" name="wmode"/> <embed wmode="transparent" width="'+anchoFlash+'" height="'+item.alto()+'" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="opaque" name="prettyFlash"  allowscriptaccess="always" bgcolor="#FFFFFF" quality="high" src="'+item.url()+'"/> </object></div>');        
        
        // Ajustamos la altura de los botones siguiente/anterior a la altura del conenido.
        jQuery(_botonAnteriorSup).height(item.alto());
        jQuery(_botonSiguienteSup).height(item.alto());
    }
    
    /**
     * Muestra un item de video.
     *
     * @param ItemGaleria item
     */
    var _muestraVideo = function( item ){        
        _muestraFlash( item );
    }
    
    /**
     * Muestra el siguiente item de la galer�a.
     */
    var _siguiente = function(){
        if( _itemActual+1 < _items.length ){
            _that.muestraItem( _itemActual+1 );            
        }
    }
    
    /**
     * Carga los enlaces de los elementos de la galería.
     */
    this.carga = function(){
        var parametros, tipo, ancho, alto, descripcion, indice, a;
        var enlaces = document.getElementsByTagName("a");
        
        _items = new Array();
        
        // Cargamos los enlaces a los elementos de la galería.
        for( var i=0; i<enlaces.length; i++ ){        
            if( enlaces[i].rel.indexOf("multimedia") > -1 ){
                a = enlaces[i];            
                indice = this.insertaItem( new ItemGaleria(a) );
                
                a.objGaleria = this;
                a.indiceItem = indice;
                a.onclick = function(){          
                    this.objGaleria.muestraItem(this.indiceItem);
                    return false;
                }
            }
        }
    }
    
    /**
     * Inserta un nuevo item en la galería.
     *
     * @param ItemGaleria item
     */
    this.insertaItem = function( item ){
        _items.push( item );
        return _items.length-1;
    }
    
    /**
     * Muestra un item en la ventana.
     *
     * @param integer num �ndice de item a mostrar.
     */
    this.muestraItem = function( num ){
        var item;
        
        if( num != undefined ){
            _itemActual = num;
        }
        
        if( _itemActual == 0 ){
            if( _botonAnterior ){
        	   jQuery(_botonAnterior).attr('style','opacity:0.5;filter: alpha(opacity=50);cursor:default;');
            }
       	}else{
       	    if( _botonAnterior ){
       		   jQuery(_botonAnterior).attr('style','opacity:1;filter: alpha(opacity=100);cursor:pointer;');
       	    }
       	}
       	              	
       	if( _itemActual == _items.length-1 ){
       	    if( _botonSiguiente ){
	       	   jQuery(_botonSiguiente).attr('style','opacity:0.5;filter: alpha(opacity=50);cursor:default;');
       	    }
       	}else{
       	    if( _botonSiguiente ){
     	      jQuery(_botonSiguiente).attr('style','opacity:1;filter: alpha(opacity=100);cursor:pointer;');     	    
       	    }
       	}
       	
        item = _items[_itemActual];
        
        switch( item.tipo() ){
            case "image":                
                _muestraImagen(item);
                break;
            case "flash":
                _muestraFlash(item);
                break;
            case "video":
                _muestraVideo(item);
                break;
        }
        _capaPadre.style.display = "block";
        
        if( _itemActual == 0 ){
            _botonAnteriorSup.style.visibility = "hidden";
        }else{
            _botonAnteriorSup.style.visibility = "visible";
        }
        
        if( _itemActual == _items.length-1 ){
            _botonSiguienteSup.style.visibility = "hidden";
        }else{
            _botonSiguienteSup.style.visibility = "visible";
        }
    }
    
    /**
     * Cambia las teclas de acceso directo por defecto.
     */
    this.setKeys = function(anterior, siguiente, cerrar){
        _teclaAnterior = anterior;
        _teclaSiguiente = siguiente;
        _teclaCerrar = cerrar;
    }    

    // Constructor
    _locale = locale;
    _teclaAnterior = locale["tecla_anterior"];
    _teclaSiguiente = locale["tecla_siguiente"];
    _teclaCerrar = locale["tecla_cerrar"];
    
    _capaFondo = document.createElement("div");
    _capaFondo.className = "galeriaMultimedia_fondo";
    //_capaFondo.style.width = getClientWidth()+"px";
    _capaFondo.style.height = getClientHeight()+"px";        
    _capaFondo.onclick = function(){
        _cierra();
    }
    document.body.appendChild( _capaFondo );
    
    _capaPadre = document.createElement("div");
    _capaPadre.className="galeriaMultimedia";    
    
        _capaMultimedia = document.createElement("div");
        _capaMultimedia.className = "capaMultimedia";
        _capaPadre.appendChild( _capaMultimedia );
        
            _capaDummy = document.createElement("div");    
            _capaDummy.className = "dummy";
            _capaMultimedia.appendChild( _capaDummy );

            _capa1 = document.createElement("div");
            _capa1.className = "capa1";
            _capaMultimedia.appendChild( _capa1 );
            
            _capa2 = document.createElement("div");
            _capa2.className = "capa2";
            _capaMultimedia.appendChild( _capa2 );
                 
            _capa3 = document.createElement("div");
            _capa3.className = "capa3";
            _capaMultimedia.appendChild( _capa3 );
            
            _capa4 = document.createElement("div");
            _capa4.className = "capa4";
            _capaMultimedia.appendChild( _capa4 );
            
            _capa5 = document.createElement("div");
            _capa5.className = "capa5";
            _capaMultimedia.appendChild( _capa5 );
            
            _capa6 = document.createElement("div");
            _capa6.className = "capa6";
            _capaMultimedia.appendChild( _capa6 );
            
            _capa7 = document.createElement("div");
            _capa7.className = "capa7";
            _capaMultimedia.appendChild( _capa7 );
            
            _capa8 = document.createElement("div");
            _capa8.className = "capa8";
            _capaMultimedia.appendChild( _capa8 );
            
            _capaItem = document.createElement("div");
            _capaItem.className = "capaItem";
            _capaMultimedia.appendChild( _capaItem );

            
            // Botones anterior/siguiente sobre la imagen.
            
            _botonAnteriorSup = document.createElement("a");
            _botonAnteriorSup.className = "botonAnterior";
            _botonAnteriorSup.href = "javascript:void(0)";
            _capaMultimedia.appendChild( _botonAnteriorSup );
            
                _botonAnteriorSup.onclick = function(){
                    _anterior();
                    this.blur();
                    return false;
                }
                _botonAnteriorSup.onmouseover = function(){
                    if( _botonAnteriorInt ){
                        _botonAnteriorInt.style.visibility = "visible";
                    }
                }
                _botonAnteriorSup.onmouseout = function(){
                    if( _botonAnteriorInt ){
                        _botonAnteriorInt.style.visibility = "hidden";
                    }
                }
                
                _botonAnteriorInt = document.createElement("span");                
                _botonAnteriorInt.className = "interior";
                _botonAnteriorInt.innerHTML =  '<span class="texto">'+_locale["anterior"]+'</span>';
                _botonAnteriorSup.appendChild( _botonAnteriorInt );
            
            _botonSiguienteSup = document.createElement("a");
            _botonSiguienteSup.className = "botonSiguiente";
            _capaMultimedia.appendChild( _botonSiguienteSup );
            
                _botonSiguienteSup.href = "javascript:void(0)";
                _botonSiguienteSup.onclick = function(){
                    _siguiente();
                    this.blur();
                    return false;
                }
                _botonSiguienteSup.onmouseover = function(){                    
                    if( _botonSiguienteInt ){
                        _botonSiguienteInt.style.visibility = "visible";
                    }
                }
                _botonSiguienteSup.onmouseout = function(){
                    if( _botonSiguienteInt ){
                        _botonSiguienteInt.style.visibility = "hidden";
                    }
                }
                
                _botonSiguienteInt = document.createElement("span");
                _botonSiguienteInt.className = "interior";
                _botonSiguienteInt.innerHTML = '<span class="texto">'+_locale["siguiente"]+'</span>';                
                _botonSiguienteSup.appendChild( _botonSiguienteInt );
                
            _capaDescripcion = document.createElement("div");
            _capaDescripcion.className = "capaDescripcion";
            _capaMultimedia.appendChild( _capaDescripcion );
            
            _capaNavegacion = document.createElement("div");
            _capaNavegacion.className = "capaNavegacion";
            _capaMultimedia.appendChild( _capaNavegacion );
            
                /*
                // Botón anterior inferior.
                
                _botonAnterior = document.createElement("a");
                _botonAnterior.className = "btnAnterior";
                _botonAnterior.href = "javascript:void(0)";
                _botonAnterior.innerHTML = '<span>anterior</span>';
                _botonAnterior.onclick = function(){
                    _anterior();
                    return false;
                }
                _capaNavegacion.appendChild( _botonAnterior );
                */
                
                _capaNumItems = document.createElement("span");
                _capaNumItems.className = "capaNumItems";
                _capaNavegacion.appendChild( _capaNumItems );
                
                /*
                // Botón siguiente inferior.
                
                _botonSiguiente = document.createElement("a");
                _botonSiguiente.className = "btnSiguiente";
                _botonSiguiente.href = "javascript:void(0)";
                _botonSiguiente.innerHTML = '<span>siguiente</span>';
                _botonSiguiente.onclick = function(){
                    _siguiente();
                    return false;
                }
                _capaNavegacion.appendChild( _botonSiguiente );
                */
                
                // Capa de título.
                
                _capaTitulo = document.createElement("h4")
                _capaTitulo.className = "capaTitulo";
                _capaNavegacion.appendChild( _capaTitulo );
                
                _botonCerrar = document.createElement("a");
                _botonCerrar.className = "btnCerrar";
                _botonCerrar.href = "javascript:void(0)";
                _botonCerrar.innerHTML = '<span>'+_locale["cerrar"]+'</span>';
                _botonCerrar.onclick = function(){
                    _cierra();
                    return false;
                }
                _capaNavegacion.appendChild( _botonCerrar );
            
        
    document.body.appendChild( _capaPadre );
    
    this.carga();
    
    
    // Asociación de teclas.
    
    $(document).bind("keydown",function(e){
        if( _capaPadre.style.display == "block" ){
        
            var car = String.fromCharCode(e.keyCode);        
            
            if( car == _teclaCerrar.toUpperCase() || e.keyCode == 27 ){
                _cierra();
            }else if( car == _teclaAnterior.toUpperCase() ){
                _anterior();
            }else if( car == _teclaSiguiente.toUpperCase() ){
                _siguiente();
            }
        }
    });
}