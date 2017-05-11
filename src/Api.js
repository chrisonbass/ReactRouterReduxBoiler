var $ = jQuery;

$.support.cors = true;

const parseData = ( p_data ) => {
  var data = p_data || {};
  data.Args = data.Args || {};
  /*
  if ( undefined === data.Class || undefined === data.Method ){
    return undefined;
  }
  */
  return data;
};

const buildReq = ( p_data ) => {
  return {
    Method: "GetClassMethod", 
    Args: Object.assign({
      "Class" : p_data.Class,
      "Method" : p_data.Method,
    },p_data.Args),
  };
}

const getUrl = (p_data) => {
  return p_data.url || '/api/rest/';
};

const getHandler = (p_data ) => {
  return p_data.callback || function(r){
    console.error("No Handler for Api Request: ");
    console.dir(r);
  };
};

const Api = {
  get: (p_data) => {
    var data = parseData(p_data);
    if ( undefined === data ){
      console.error( "apiByMethod expects an object with a 'Class' and 'Method' index" );
      return undefined;
    }
    var req = {
        "Request" : JSON.stringify(buildReq(data))
      },
      apiURL = getUrl(data),
      successCallback = getHandler(data);

    if ( data.AdditionalParams ){
      req = Object.assign(data.AdditionalParams, req);
    }

    var aOps = {
      url : apiURL, 
      dataType: "JSON",
      data : req,
      method : "GET",
      success : successCallback,
      error : function(xhr, textStatus, errorThrown){
        console.log("Error during Request: \n" + apiURL);
        console.dir(arguments);
        var b = document.body.innerHTML;
        b += "<br><br><strong>ERROR</strong>: <br>";
        b += errorThrown + ": <br>";
        document.body.innerHTML = b + "<br>Response:<br>" + xhr.responseText;
      }
    };
    
    $.ajax(aOps);
  },

  post: (p_data) => {
    var data = parseData(p_data);
    data.FormData = data.FormData || new FormData();
    if ( undefined === data ){
      console.error( "apiByMethod expects an object with a 'Class' and 'Method' index" );
      return undefined;
    }
    var req = buildReq(data),
      apiURL = getUrl(data),
      successCallback = getHandler(data);

    data.FormData.append('json_request', JSON.stringify(req));

    var aOps = {
      url : apiURL, 
      dataType: "JSON",
      contentType: false,
      processData: false,
      data : data.FormData,
      method : "POST",
      success : successCallback,
      error : function(){
        tfcPopup.init({
          header: "Error",
          body: arguments[0].responseText
        }).show();
      }
    };
    if ( data.FormData.fake ){
      aOps.xhr = function() { var xhr = $.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; };
      aOps.contentType = "multipart/form-data; boundary=" + data.FormData.boundary;
      aOps.data = data.FormData.toString();
    }
    $.ajax(aOps);
  },

  newGet: (p_data) => {
    var data = parseData(p_data);

    var req = data.parameters || {},
      apiURL = getUrl(data),
      successCallback = getHandler(data);

    $.ajax({
      url: apiURL,
      type: 'GET',
      data: req,
      dataType: 'json',
      success: successCallback
    });
  }
};

export default Api;
