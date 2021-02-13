
/*************/
/* tractament de target _blank
/*************/

function loadExternalUrl(){

    if( !document.getElementsByTagName ){
        return;
    }

    var links=document.getElementsByTagName( 'a' );
    for( var i=0; i<links.length; i++ ){
    	if( links[i].rel=="external" ){
			links[i].target="_blank";
        }
    }

}

/******************/
/* inici execució */
/******************/

if( navigator.userAgent.indexOf('MSIE')!=-1 ){
    window.attachEvent('onload', loadExternalUrl );
}
if( navigator.userAgent.indexOf('Gecko')!=-1 ){
    window.addEventListener( 'load', loadExternalUrl, false );
}
