var data = JSON.parse(responseBody);

postman.setEnvironmentVariable("token",data.id_token);
postman.setEnvironmentVariable("refresh_token",data.refresh_token);

console.log(JSON.stringify(jwt_decode(data.id_token).userId));

postman.setEnvironmentVariable("idCellule",JSON.stringify(Number(Object.keys(jwt_decode(data.id_token).rolesMap)[0])));
postman.setEnvironmentVariable("cellId",JSON.stringify(Number(Object.keys(jwt_decode(data.id_token).rolesMap)[0])));

postman.setEnvironmentVariable("userId",JSON.stringify(jwt_decode(data.id_token).userId) );
postman.setEnvironmentVariable("personId",JSON.stringify(jwt_decode(data.id_token).personId) );

postman.setEnvironmentVariable("jwt_token_roles_map",JSON.stringify(jwt_decode(data.id_token).rolesMap));

postman.setEnvironmentVariable("jwt_token",JSON.stringify(jwt_decode(data.id_token)));

function jwt_decode(jwt) {
    var parts = jwt.split('.'); // header, payload, signature
    return JSON.parse(atob(parts[1]));
}


function jwt_decode(jwt){
var parts = null;
try{
        parts = decode_b64(jwt.split('.')[1]);
    } catch (e){
console.log("error parsing JWT");
throw (e)
    }
console.log(parts)
if (parts){
return JSON.parse(parts);
    }
return {};
}
function InvalidCharacterError(message) {
this.message = message;
}
InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';
function atob (input) {
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var str = String(input).replace(/=+$/, '');
if (str.length % 4 == 1) {
throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
for (
// initialize result and counters
var bc = 0, bs, buffer, idx = 0, output = '';
// get next character
    buffer = str.charAt(idx++);
// character found in table? initialize bit storage and add its ascii value;
~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
// and if not first of each 4 characters,
// convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
// try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
return output;
}
function b64DecodeUnicode(str) {
return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
var code = p.charCodeAt(0).toString(16).toUpperCase();
if (code.length < 2) {
      code = '0' + code;
    }
return '%' + code;
  }));
}
function decode_b64(str) {
var output = str.replace(/-/g, "+").replace(/_/g, "/");
switch (output.length % 4) {
case 0:
break;
case 2:
      output += "==";
break;
case 3:
      output += "=";
break;
default:
throw "Illegal base64url string!";
  }
try{
return b64DecodeUnicode(output);
  } catch (err) {
return atob(output);
  }
}