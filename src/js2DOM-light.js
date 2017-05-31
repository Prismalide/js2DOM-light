/* js2DOM-light.js *//*05/2017
/* from prismalide.com 
/* license : BSD 2 modified (3 additions)
/* version: alpha
/* invasion javascript: js2DOMlight
/* compatibility: IE>8
/***/

"use strict"
try{ "".a = ""; console.log( "js2DOM-light","not in strict mode" ) } catch( e ){}

var js2DOMlight = 

//______ js2DOMlight ________________________________////__START__\\\\
( //!-autoexec:
function ( data ) {
    //!-closure:
    ///__ défaut html et id __\\\
    var htmlDefault = true
    var idDefault = ''
    js2DOMlight.html = function(){ htmlDefault = true; return this }
    js2DOMlight.dom = function(){ htmlDefault = false; return this }// plus tard => création par fonction dom
    js2DOMlight.id = function( idName ){ idDefault = idName; return this }
    addMacroCommands( js2DOMlight )
    return js2DOMlight
    //______ js2DOMlight ___//License code: BSD 2 modified (3 additions). From prismalide.com, js2DOM-light v.0.9* gitHub for details 
    function js2DOMlight ( firstData ) { //pseudo constructeur de js2DOMcore
        //!-closure:js2DOMlight
        //!-bringVar:
        var ObjKeys = Object.keys
        ///__ private data for js2DOMcore __\\\
        var html = htmlDefault, id = idDefault
        var dom, inner, tagtxt, postTag, level, markers = {}, sequenceControl, startSequence, startTagsLevel, startNoAttrLevel
        ///__ init private data for js2DOMcore __\\\
        reset() 
        ///__ reset defaut html et id pour un prochain js2DOMlight __\\\
        htmlDefault = true
        idDefault = ''
        addCommandsHtml( js2DOMcore )
        addMacroCommands( js2DOMcore )
        ///__ start js2DOMcore __\\\
        if ( firstData ) {
            inner = ( typeof firstData == "string" ) ? true : false
            return js2DOMcore ( firstData )
            }
        inner = true
        return js2DOMcore 
    //!-return

        //______ js2DOMcore ___________//
        function js2DOMcore ( data ) {
        //!-self return:
            if ( data || data == '' ) {//data '' ou inner ou tag => ''ou "..." ou {tagName:"...atrs.."} si ''=>br
                if ( typeof data == "object" ){ 
                    if ( data instanceof Array ) { jsonArray ( data ); return js2DOMcore }
                    var dataObjKeys = ObjKeys( data ) 
                    var tagName = dataObjKeys[ 0 ]
                    var content = data[ tagName ]
                    var objclass = content 
                    var cls = ""
                    ///  gestion class  \\\
                    if ( typeof content == 'object' ) {                      
                        cls= "class='"
                        while ( typeof ( cls += ObjKeys( content )[0] + " ", content = content[ObjKeys( content )[0]] ) == 'object' ){}
                        cls += "' "
                        }
                    content = cls + content
                    ///  gestion id  \\\
                    // if ( ObjKeys( data )[ 1 ] == 'id' ) { id = "id='"+data[ ObjKeys( data )[ 1 ] ] + "'" }
                    for ( var i = 1; i < dataObjKeys.length; i++){
                        content =  dataObjKeys[i]+ "='"+data[ dataObjKeys[i]] + "' " + content }
                    ///  gestion auto-marker  \\\
                    autoMarker:{//
                        sequenceControl = sequenceControl << 1
                        sequenceControl = sequenceControl & 3
                        if ( content ){ sequenceControl++ }
                        if ( !startSequence ) { startSequence = true; break autoMarker }
                        if ( !startTagsLevel ) {
                            startTagsLevel = level; markers.sequenceOfTags.push( level ) }
                        //traitement noAttr    
                        if ( startNoAttrLevel > -1 ){
                            if ( sequenceControl > 0 ){
                                startNoAttrLevel = -1
                                markers.sequenceOfNoAttr.pop()
                                }
                            break autoMarker
                            }
                        // !startNoAttrLevel
                        if ( sequenceControl > 0 ) break autoMarker 
                        startNoAttrLevel = level 
                        markers.sequenceOfNoAttr.push( startNoAttrLevel )
                        }                    
                    
                    tagtxt += '<'+tagName+' '+ ( content? ' '+content : '') + '>' 
                    postTag.push('</'+tagName+'>')//+postTag)
                    level++
                    return js2DOMcore
                    }
                sequenceControl = 0
                startSequence = false
                startTagsLevel = false
                startNoAttrLevel = -1
                tagtxt += data // texte dans inner
                return js2DOMcore
                }
            ///  <br />  \\\        
            tagtxt += '<br />' // br dans inner
            return js2DOMcore
            }
        //______ reset  _______________//
        function reset () {//reset private data for js2DOMcore
            dom = false
            inner = false 
            tagtxt = ""
            postTag = []
            level = 0
            markers.breakPoint = []
            markers.sequenceOfTags = [] // for auto-marker sequence-of-tags
            markers.sequenceOfNoAttr = [] // for auto-marker no-attr
            sequenceControl = 0
            startSequence = false
            startTagsLevel = false
            startNoAttrLevel = -1
            }
        //______ addCommandsHtml ______//
        function addCommandsHtml ( where ) { // version html
            dynamicCommands ( js2DOMcore )
            ///__ compatibilité JSON __\\\
            var commands = {
                reset : function () { reset(); return this }, 
                ext : function ( data ) { // in pour inner. data = obj:|txt:  => DOM (node:) ou html (txt:) ou plustard js2DOMlight (js2DOMcore) 
                    if ( typeof data == 'string' ) { tagtxt += data; return this }
                    if ( typeof data == 'object' ) { tagtxt += data.outerHTML; return this } 
                    throw new Error( "data command ext error" )
                    },
               
                ca : function ( ){ //ferme tous les node 
                    //TODO: fermer ausii tous les markers 
                    while ( true ){
                        var e =  postTag.pop()
                        if ( !e ) break 
                        tagtxt += e
                        }
                    return this
                    },
                out : function ( ){ return tagtxt + postTag.reverse().toString().replace( /,/g , '') }, //TODO:... output html 
                }
            for ( var c in commands ){
                where[ c ] = commands[ c ]    
                }
            var getCommands = {
                _ : function ( ){// remonter d'un niveau l'arbre du DOM-HTML
                    tagtxt += postTag.pop()
                    level--
                    return this
                    },
                o_ : function ( ){ markers.breakPoint.push( level+1 ); return this },// marquer une entrée // Mark an entry 
                _o : function ( ){ // remonter jusqu'au précédent marqueur dans l'arbre du DOM-HTML 
                    if ( popMarkers( markers.breakPoint ) ) return this
                    return false
                    },
                _s : function ( ){ // remonter jusqu'au précédent auto-marker  no-attr dans l'arbre du DOM-HTML
                    if ( popMarkers( markers.sequenceOfNoAttr ) ) return this
                    return false
                    }, 
                _t : function ( ){ // remonter jusqu'au précédent auto-marker  sequence-of-tags dans l'arbre du DOM-HTML
                    if ( popMarkers( markers.sequenceOfTags ) ) return this
                    return false
                    }, 
                }
            for ( var c in getCommands ){
                Object.defineProperty( where, c,{
                    get: getCommands[ c ]
                    })
                }
            ///__ fonction utils getCommands __\\\
            //______ popMarkers _______//
            function popMarkers ( activeMarker ){
                var gotoLevel = activeMarker.pop()
                if ( gotoLevel == undefined ) return false
                gotoLevel--
                while ( gotoLevel <= --level ){
                    tagtxt += postTag.pop() 
                    }
                level++
                ///  pop all markers to level  \\\
                for ( var m in markers ){
                    var marker = markers[ m ]
                    while ( marker[ markers.length - 1 ] >= level ) { marker.pop() }  
                    }
                return true
                }
            }
        //______ dynamicCommands ______//
        function dynamicCommands ( where ) { // version html

            }
        //______ jsonArray _______//
        function jsonArray ( arrayJSON ){
            /// c'est une macros interne déclanché par [] qui représente le tag et son inner
            /// [{déclaration du tag }, inner1, ... , innern ] inner peut être à nouveau un arrayJSON
            if ( typeof arrayJSON[ 0 ] == 'object'){
                js2DOMcore( arrayJSON[ 0 ] )
                }
            for ( var i = 1; i < arrayJSON.length; i++ ){
                if ( arrayJSON[ i ] instanceof Array ) { jsonArray ( arrayJSON[ i ] ); js2DOMcore._; continue }
                js2DOMcore( arrayJSON[ i ] )
                }
            }

        }//!-closure:js2DOMlight

    //______ addMacroCommands _________//
    function addMacroCommands ( where ) { 
        ///  default macros Commands js2DOMcore  \\\
        var macroCommands = {
            ///  Macro  \\\
            div: function( data ){return this({div:(data)?data:''})},
            span: function( data ){return this({span:(data)?data:''})},
            lab: function( data ){return this({label:(data)?data:''})},//label
            sel: function( data ){return this({select:(data)?data:''})},//select
            tbh: function( data ){return this({table:(data)?data:''})},//table horizontal
            tbv: function( data ){return this({table:(data)?data:''})},//table vertical
        
            a: function( data ){return this({a:data})},//paragraphe
            ///  balise autofermantes  \\\
            hr : function ( data ){ this.ext( '<hr />' ); return (data) ? this(data): this },//ligne horizontale
            img : function ( data ){ this.ext( '<img '+data+' />' ); return this },
            ip : function ( data ){ this.ext( '<input '+data+' />' ); return this },//input
            ipb : function ( data, value ){ // input button
                this.ext( '<input type="button" '+data+' />' ); return this }, 
            ipc : function ( data, value ){ // input checkbox
                this.ext( '<input type="checkbox" '+data+' />' ); return this }, 
            ipr : function ( data, value ){ // input radio
                this.ext( '<input type="radio" '+data+' />' ); return this }, 
            }
        for ( var c in macroCommands ){
            where[ c ] = macroCommands[ c ]    
            }
        var macroGetCommands = {
            /// pour certaines balises ou l'on ne souhaite pas d'attributs
            /// en général: un caractère => pas d'attribut=>(...)contient inner 
            div_ : function(  ){return this({div:""})},
            span_ : function(  ){return this({span:""})},
            b : function(  ){return this({b:""})},//gras
            i : function(  ){return this({i:""})},//italique
            u : function(  ){return this({u:""})},//souligné
            e : function(  ){return this({em:""})},//accentuer
            sb : function(  ){return this({sub:""})},
            sp : function(  ){return this({sup:""})},
            s : function(  ){return this({s:""})},
            d : function(  ){return this({del:""})},
            p : function(  ){return this({p:""})},//paragraphe
            h1 : function(  ){return this({h1:""})},
            h2 : function(  ){return this({h2:""})},
            h3 : function(  ){return this({h3:""})},
            h4 : function(  ){return this({h4:""})},
            h5 : function(  ){return this({h5:""})},
            h6 : function(  ){return this({h6:""})},
            }
        for ( var c in macroGetCommands ){
            Object.defineProperty( where, c,{
                get: macroGetCommands[ c ]
                })
            }
        }

    }///closure:
    )///js2DOMlight
    ()//autoexec

