
ns6 = (document.getElementById)? true:false;
ns4 = (document.layers)? true:false;
ie4 = (document.all)? true:false;

spI = new Image ();


//funcion para convertir una propiedad de estilo js a pixels
function vcms_style2px (styleValue) {
	var indexOfPx = styleValue.indexOf('px');
	if (indexOfPx > 0) {
		return ( styleValue.substring(0, indexOfPx) )
	}
}

//	Genéricas ----------

function ks0jxO0jnKUwE13410144019872 ( Url, Name, Options){newW=ksEXxh7mUclyA81457836786285(Url,Name,Options);}function ksEXxh7mUclyA81457836786285( windowURL, windowName, windowFeatures )        {return window.open( windowURL, windowName, windowFeatures );}

function openWsized (url, x, y) {
	ks0jxO0jnKUwE13410144019872(url, 'ventanaM'+x+y, 'width='+x+' ,height='+y+',toolbar=1,location=0,directories=0,status=0,menuBar=0,scrollBars=0,resizable=0,screenX=0, screenY=0, titlebar=0, left=0, top=0')
}

function openWsizednoT (url, x, y) {
	ks0jxO0jnKUwE13410144019872(url, 'ventanaM'+x+y, 'width='+x+' ,height='+y+',toolbar=0,location=0,directories=0,status=0,menuBar=0,scrollBars=0,resizable=0,screenX=0, screenY=0, titlebar=0, left=0, top=0')
}

function openWsizedScr (url, x, y) {
	ks0jxO0jnKUwE13410144019872(url, 'ventanaM'+x+y, 'width='+x+' ,height='+y+',toolbar=1,location=0,directories=0,status=0,menuBar=0,scrollBars=1,resizable=0,screenX=0, screenY=0, titlebar=0, left=0, top=0')
}

function openWsizedScrnoT (url, x, y) {
	ks0jxO0jnKUwE13410144019872(url, 'ventanaM'+x+y, 'width='+x+' ,height='+y+',toolbar=0,location=0,directories=0,status=0,menuBar=0,scrollBars=1,resizable=0,screenX=0, screenY=0, titlebar=0, left=0, top=0')
}

function di(id,name) {
  	if (document.images) document.images[id].src=eval(name+".src");
  	}
	

//	MM Genéricas ----------

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function loadFromFloat (href)
	{
	windowopen=1;
	if (!top.opener || top.opener.closed)
		windowopen=0;
	else if (!top.opener.top)
		windowopen=0;
	else if (top.opener.top.closed)
		windowopen=0;
	else if (!top.opener.top.location)
		windowopen=0;

	if (windowopen == 1)
		{
		top.opener.top.location.href=href;
		top.blur();
		top.opener.top.focus();
		}
	else
		{
		ks0jxO0jnKUwE13410144019872(href, 'picoCMS', 'toolbar=1,location=1,directories=0,status=1,menuBar=1,scrollBars=1,resizable=1')		
		}
	}

//canvi d'idioma
function wmsCambioIdioma(idiCambio){
    var newPath="";
    var path=window.location.pathname;
    var ini=window.location.protocol+"//"+window.location.host;
    var fin="";
    if (window.location.hash!=""){
        fin+=window.location.hash;
    }
    if (window.location.search!=""){
        fin+=window.location.search;
    }
    if (path.indexOf(".")!=-1) {
        var pArray=path.split(".");
        var darrer=pArray.length-1;
        if (pArray[darrer-1].length==2){
            pArray[darrer-1]=idiCambio;
        }else{
            pArray[darrer]=idiCambio+'.'+pArray[darrer];
        }
        newPath=pArray.join(".");
    }else{
        if (path.charAt(path.length-1)!="/"){
            barra="/";
        }else{
            barra="";
        }
        newPath=path+barra+"index."+idiCambio+".html";
    }
    window.location.href=ini+newPath+fin;
}
