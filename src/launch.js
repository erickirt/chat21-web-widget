/** */
ready(function() {
    console.log('DOM is ready, call initWidget');
    if(!window.tileDeskAsyncInit){
      initAysncEvents();
    }
    initWidget();
});


/** */
function ready(callbackFunction){
  // if(document.readyState != 'loading'){
  //   console.log('in ifffffff', document.readyState)
  //   callbackFunction()
  // }
  // else{
  //   document.addEventListener("DOMContentLoaded", callbackFunction)
  // }
  document.addEventListener('scroll', start);
  document.addEventListener('mousedown', start);
  document.addEventListener('mousemove', start);
  document.addEventListener('touchstart', start);
  document.addEventListener('keydown', start);

  let time = 5000;
  let timeout = setTimeout(()=> {
    console.log('in timeout')
    start();
  }, time)
  
  function start(){
    clearTimeout(timeout);
    if(document.readyState==='complete'){
      callbackFunction()
    }else if(window.attachEvent){
      window.attachEvent('onload',callbackFunction);
    }else{
      window.addEventListener('load',callbackFunction,false);
    }
    
    document.removeEventListener('scroll', start);
    document.removeEventListener('mousedown', start);
    document.removeEventListener('mousemove', start);
    document.removeEventListener('touchstart', start);
    document.removeEventListener('keydown', start);
  }

    
}
       

/** */
function loadIframe(tiledeskScriptBaseLocation) {
    var dev = window.location.hostname.includes('localhost')? true: false;

    var containerDiv = document.createElement('div');
    containerDiv.setAttribute('id','tiledesk-container');
    containerDiv.classList.add("closed");
    document.body.appendChild(containerDiv);
    
    var iDiv = document.createElement('div');
    iDiv.setAttribute('id','tiledeskdiv');
    containerDiv.appendChild(iDiv);

    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("border", "0");
    ifrm.setAttribute("title", "Tiledesk Widget")
       
    var srcTileDesk = '<html lang="en">';
    srcTileDesk += '<head>';
    srcTileDesk += '<meta charset="utf-8">';
    srcTileDesk += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />';
    srcTileDesk += '<title>Tilechat Widget</title>';
    srcTileDesk += '<base href="'+tiledeskScriptBaseLocation+ '/">';
    srcTileDesk += '<link rel="icon" type="image/x-icon" href="favicon.ico">';
    srcTileDesk += '<link rel="stylesheet" type="text/css" href="' + tiledeskScriptBaseLocation +'/assets/styles/tiledesk_v1.scss" media="all">';
    srcTileDesk += '</head>';
    srcTileDesk += '<body>';
    srcTileDesk += '<chat-root></chat-root>';
    srcTileDesk += '<script async type="text/javascript" src="'+tiledeskScriptBaseLocation+'/runtime.js"></script>';
    srcTileDesk += '<script async type="text/javascript" src="'+tiledeskScriptBaseLocation+'/polyfills.js"></script>';
    srcTileDesk += '<script async type="text/javascript" src="'+tiledeskScriptBaseLocation+'/vendor.js"></script>';
    srcTileDesk += '<script async type="text/javascript" src="'+tiledeskScriptBaseLocation+'/main.js"></script>';
    srcTileDesk += '<link type="text/css" rel="stylesheet" href="'+tiledeskScriptBaseLocation+'/styles.css" media="all"></link>';
    srcTileDesk += '</body>';
    srcTileDesk += '</html>';
    
    ifrm.setAttribute('id','tiledeskiframe');
    ifrm.setAttribute('tiledesk_context','parent');
   
    /** */
    window.tiledesk.on('onInit', function(event_data) {
        // console.log("launch onInit isopen", tiledeskScriptBaseLocation, window.tiledesk.angularcomponent.component.g.isOpen);
        if (window.tiledesk.angularcomponent.component.g.isOpen) {
            containerDiv.classList.add("open");
            containerDiv.classList.remove("closed");
            iDiv.classList.remove("callout");
        } else {
            containerDiv.classList.add("closed");
            containerDiv.classList.remove("open");
            iDiv.classList.remove("messagePreview");
        }         
    });
    /** */
    window.tiledesk.on('onOpen', function(event_data) {
        containerDiv.classList.add("open");
        containerDiv.classList.remove("closed");
        iDiv.classList.remove("callout");
        iDiv.classList.remove("messagePreview");
    });
    /** */
    window.tiledesk.on('onClose', function(event_data) {
        containerDiv.classList.add("closed");
        containerDiv.classList.remove("open");
    });

    /** */
    window.tiledesk.on('onOpenEyeCatcher', function(event_data) {
        iDiv.classList.add("callout");
    });
    /** */
    window.tiledesk.on('onClosedEyeCatcher', function(event_data) {
        iDiv.classList.remove("callout");
    });

    /** */
    window.tiledesk.on('onConversationUpdated', function(event_data) {
        const messagePreview = window.tiledesk.angularcomponent.component.g.isOpenNewMessage
        const isOpen = window.tiledesk.angularcomponent.component.g.isOpen
        try {
            if (!isOpen && messagePreview) {
                iDiv.classList.add("messagePreview");
                iDiv.classList.remove("callout");
                // ----------------------------//
            }  
        } catch(er) {
            console.error("onConversationUpdated > error: " + er);
        }
    });

    window.tiledesk.on('onCloseMessagePreview', function(event_data) {
        try {
            iDiv.classList.remove("messagePreview");
        } catch(er) {
            console.error("onCloseMessagePreview > error: " + er);
        }
    });


    /**** BEGIN EVENST ****/
    /** */
    window.tiledesk.on('onNewConversation', function(event_data) {
        // console.log("test-custom-auth.html onNewConversation >>>",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        
        // if hiddenMessage is present, do not call /events endpoint because conversation is created by /messages endpoint
        const hiddenMessage = window.tiledesk.angularcomponent.component.g.hiddenMessage;
        if(hiddenMessage){
          return;
        }
        // console.log(">>>> tiledeskToken >>>> ",event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid);
        if(tiledeskToken) {
          var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
          httpRequest.setRequestHeader('Content-type', 'application/json');
          httpRequest.setRequestHeader('Authorization',tiledeskToken);
          httpRequest.send(JSON.stringify({ "name":"new_conversation",
                                            "attributes": {
                                              "request_id":event_data.detail.newConvId, 
                                              "department": event_data.detail.global.departmentSelected.id, 
                                              "participants": event_data.detail.global.participants, 
                                              "language": event_data.detail.global.lang, 
                                              "subtype":"info", 
                                              "fullname":event_data.detail.global.attributes.userFullname, 
                                              "email":event_data.detail.global.attributes.userEmail, 
                                              "attributes":event_data.detail.global.attributes
                                            }
                                          }
          ));
        }
    });

    /** @deprecated event */
    window.tiledesk.on('onLoggedIn', function(event_data) {
        // console.log("test-custom-auth.html onLoggedIn",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        // console.log("------------------->>>> tiledeskToken: ",window.tiledesk.angularcomponent.component.g);
        if(tiledeskToken) {
            var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
            httpRequest.setRequestHeader('Content-type','application/json');
            httpRequest.setRequestHeader('Authorization',tiledeskToken);
            httpRequest.send(JSON.stringify({"name":"logged_in","attributes": {"fullname":event_data.detail.global.attributes.userFullname, "email":event_data.detail.global.attributes.userEmail, "language": event_data.detail.global.lang, "attributes":event_data.detail.global.attributes}}));
        }
    });

    /** */
    window.tiledesk.on('onAuthStateChanged', function(event_data) {
        // console.log("test-custom-auth.html onAuthStateChanged",event_data);
        const tiledeskToken = window.tiledesk.angularcomponent.component.g.tiledeskToken;
        // console.log("------------------->>>> tiledeskToken: ",window.tiledesk.angularcomponent.component.g);
        if(tiledeskToken) {
            var httpRequest = createCORSRequest('POST', event_data.detail.appConfigs.apiUrl+event_data.detail.default_settings.projectid+'/events',true); //set async to false because loadParams must return when the get is complete
            httpRequest.setRequestHeader('Content-type','application/json');
            httpRequest.setRequestHeader('Authorization',tiledeskToken);
            httpRequest.send(JSON.stringify({"name":"auth_state_changed","attributes": {"user_id":event_data.detail.global.senderId, "isLogged":event_data.detail.global.isLogged, "event":event_data.detail.event, "subtype":"info", "fullname":event_data.detail.global.attributes.userFullname, "email":event_data.detail.global.attributes.userEmail, "language":event_data.detail.global.lang, "attributes":event_data.detail.global.attributes}}));  
            httpRequest.onload = function(event) {
              if(event.target && event.target.status === 401){
                window.tiledesk.hide()
                window.tiledesk.dispose()
              }
            } 
          }
    }); 
    /**** END EVENST ****/

    iDiv.appendChild(ifrm);

    if(tiledeskScriptBaseLocation.includes('localhost')){
      ifrm.contentWindow.document.open();
      ifrm.contentWindow.document.write(srcTileDesk);
      ifrm.contentWindow.document.close();
    }else {
      ifrm.srcdoc = srcTileDesk
    }


}


function initAysncEvents() {
  console.log('INIT ASYNC EVENTS')

  window.tileDeskAsyncInit = function() {  
    // console.log('launch tiledeskAsyncInit:::', window.Tiledesk.q)
    window.tiledesk.on('onLoadParams', function(event_data) {
      if (window.Tiledesk && window.Tiledesk.q && window.Tiledesk.q.length>0) {
        window.Tiledesk.q.forEach(f => {
          if (f.length>=1) {
            var functionName = f[0];
            if (functionName==="onLoadParams") {
              //CALLING ONLY FUNCTION 'onLoadParams'
              if (f.length==2) {
                var functionCallback = f[1];
                if(typeof functionCallback === "function") {
                  window.tiledesk.on(functionName, functionCallback); 
                  functionCallback(event_data);
                } else {
                  console.error("initAysncEvents --> functionCallback is not a function.");
                }
              }   
            }else if(functionName=='setParameter'){
              //CALLING ONLY METHOD 'setParameter' AND CHECK IF IT HAS OBJECT ARG
              if (f.length==2) {
                var functionArgs = f[1];
                if(typeof functionArgs === "object") {
                  window.tiledesk[functionName](functionArgs);
                } else {
                  console.error("initAysncEvents --> functionArgs is not a object.");
                }
              }
            }
          }
        });
      }
    });

    window.tiledesk.on('onBeforeInit', function(event_data) {
      if (window.Tiledesk && window.Tiledesk.q && window.Tiledesk.q.length>0) {
        // console.log("w.q", window.Tiledesk.q);
        window.Tiledesk.q.forEach(f => {
          if (f.length>=1) {
            var functionName = f[0];
            if (functionName==="onLoadParams" || functionName==="setParameter") {
              //SKIP FUNCTION WITH NAMES 'onLoadParams' AND METHOD 'setParameter'
            } else if (functionName.startsWith("on")) {
              // CALLING METHOD THAT STARTS WITH 'on'
              if (f.length==2) {
                var functionCallback = f[1];
                if(typeof functionCallback === "function"){
                  window.tiledesk.on(functionName, functionCallback); //potrei usare window.Tiledesk ?!?
                  if (functionName==="onBeforeInit") {
                      functionCallback(event_data)
                  }
                } else {
                  console.error("functionCallback is not a function.");
                }
              }   
            } else {
              //CALLING REMAININGS METHOD and CHECK IF CONTAINS ARG TO PASS THROUGH THE METHOD
              if (f.length==2) {
                let args = f[1]
                window.tiledesk[functionName](args);
              } else {
                window.tiledesk[functionName](); 
              }
            }

          }   
        });

      }

      // RICHIAMATO DOPO L'INIT DEL WIDGET
      window.Tiledesk = function() {
        if (arguments.length>=1) {
          var functionName = arguments[0];
          if (arguments.length==2) {
              var functionCallback = arguments[1];
          }
          var methodOrProperty = window.tiledesk[functionName];
          if(typeof methodOrProperty==="function"){            
            return window.tiledesk[functionName](functionCallback);            
          }else { //property
            return window.tiledesk[functionName];
          }
        }
      };

    });
  }
}


/**
 * 
 */
function initWidget() {
    var tiledeskroot = document.createElement('chat-root');
    var tiledeskScriptLocation = document.getElementById("tiledesk-jssdk").src;
    //var currentScript = document.currentScript;
    //var tiledeskScriptLocation = '';
    //setInterval(function(){
        //tiledeskScriptLocation = currentScript.src;
        var tiledeskScriptBaseLocation = tiledeskScriptLocation.replace("/launch.js","");
        window.tiledesk = new function() {
            //this.type = "macintosh";
            this.tiledeskroot = tiledeskroot;
            this.on = function (event_name, handler) {
                tiledeskroot.addEventListener(event_name, handler);
            };
            this.getBaseLocation = function() {
                return tiledeskScriptBaseLocation;
            }
        }

        try {
            window.tileDeskAsyncInit();
        }catch(er) {
            if (typeof window.tileDeskAsyncInit == "undefined") { 
                console.log("tileDeskAsyncInit() doesn't exists");
            } else {
                console.log(er);
            }
        }
        document.body.appendChild(tiledeskroot);
        initCSSWidget(tiledeskScriptBaseLocation);
        loadIframe(tiledeskScriptBaseLocation);
    //},2000);
}





function initCSSWidget(tiledeskScriptBaseLocation) {
    var cssId = 'iframeCss';  // you could encode the css path itself to generate id..
    // if (!document.getElementById(cssId))
    // {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = tiledeskScriptBaseLocation+'/iframe-style.css';
        link.media = 'print';
        link.onload = function(){
          link.media = 'all'
        }
        head.appendChild(link);
    // }
}


//DEPRECATED
function signInWithCustomToken() {
    let json = JSON.stringify({
        "id_project": "5b55e806c93dde00143163dd"
    });
	var httpRequest = createCORSRequest('POST', 'https://tiledesk-server-pre.herokuapp.com/auth/signinAnonymously',true); 
    if (!httpRequest) {
        throw new Error('CORS not supported');
    }
    httpRequest.setRequestHeader('Content-type','application/json');
	  httpRequest.send(json);
    httpRequest.onload = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
                    try {
                        var response = JSON.parse(httpRequest.responseText);
                        window.tiledesk.signInWithCustomToken(response);
                    }
                    catch(err) {
                        console.error(err.message);
                    }
                    return true;
        } else {
            alert('There was a problem with the request.');
        }
      }
   	};
	httpRequest.onerror = function() {
		console.error('There was an error!');
        return false;
	};
}


function createCORSRequest(method, url, async) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, async);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}
