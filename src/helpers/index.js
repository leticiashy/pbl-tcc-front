const Helpers = {};

/**
 * Atualiza uma URL com um pa../services/LanguagesManagerring
 * @param {[type]} key   Nome do parâmetro
 * @param {[type]} value Valor do parâmetro
 * @param {[type]} url   Url a ser modificada
 */
Helpers.updateQueryString = (key, value, url) => {
  if (!url) url = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
    hash;

  if (re.test(url)) {
    if (typeof value !== "undefined" && value !== null) {
      return url.replace(re, "$1" + key + "=" + value + "$2$3");
    } else {
      hash = url.split("#");
      url = hash[0].replace(re, "$1$3").replace(/(&|\?)$/, "");
      if (typeof hash[1] !== "undefined" && hash[1] !== null) {
        url += "#" + hash[1];
      }
      return url;
    }
  } else {
    if (typeof value !== "undefined" && value !== null) {
      var separator = url.indexOf("?") !== -1 ? "&" : "?";
      hash = url.split("#");
      url = hash[0] + separator + key + "=" + value;
      if (typeof hash[1] !== "undefined" && hash[1] !== null) {
        url += "#" + hash[1];
      }
      return url;
    } else {
      return url;
    }
  }
};

Helpers.arrayDiff = (array1, array2) => {
  return array1.filter(function(elm) {
    return array2.indexOf(elm) === -1;
  });
};

Helpers.arrayValues = a => {
  let array = [];

  for (let key in a) {
    if (a.hasOwnProperty(key)) {
      array.push(a[key]);
    }
  }

  return array;
};

Helpers.arrayKeys = input => {
  let output = new Array();
  let counter = 0;
  for (let i in input) {
    output[counter++] = i;
  }
  return output;
};

/**
 * Validates a Brazilian CPF number
 * @type {[type]}
 */
Helpers.validateCPF = cpf => {
  let sum;
  let rest;
  sum = 0;
  if (cpf == "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return false;
  return true;
};

/**
 * Validades a e-mail
 * @type {[type]}
 */
Helpers.validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a brazilian CNPJ document
 * @param {[type]} cnpj CNPJ number
 */
Helpers.validateCNPJ = (cnpj = "") => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};

/**
 * Merges the properties from a source and destination object
 * @param  {Object} destination Destination object
 * @param  {Object} source      Source object
 * @return {Object}             Merged Destination object
 */
Helpers.copyObject = (destination, source) => {
  return Object.assign({}, destination, source);
};

/**
 * Obtains a querystring parameter value
 * @param  {String} name parameter name
 * @param  {String} url  url
 * @return {String}      parameter value
 */
Helpers.getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * Returns the size in KB of a base64 image
 * @param  {String} base64Image Base 64 image
 * @return {Number}             Size in KB
 */
Helpers.base64FileSize = base64Image => {
  return parseInt(base64Image.replace(/=/g, "").length * 0.75) / 1024;
};

/**
 * Checks if an object is an HTML Element0
 * @param  {[type]}  obj Javascript object
 * @return {Boolean}     is element or not
 */
Helpers.isElement = obj => {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
};

/**
 * Masks a string according to a given pattern
 * @param  {[type]} value        Pure string value
 * @param  {[type]} mask         Mask
 * @param  {[type]} maskPatterns Mask replacement pattern
 * @return {[type]}              Masked string
 */
Helpers.maskString = (value, mask, maskPatterns) => {
  value = value || "";
  mask = mask || "";
  maskPatterns = maskPatterns || {};

  var maskedValue = "";
  // array representation of string under test
  var valueParts = value.split("");
  // array representation of the mask
  var maskParts = mask.split("");

  // as long as there are still characters left in
  // the original string, one must try to mask them
  while (valueParts.length > 0) {
    // take the first character and remove
    // it from the original string
    var unmaskedChar = valueParts.shift();

    // as long as the character has not been masked
    // one must try to find a mask
    while (unmaskedChar !== null) {
      // take the first mask character from
      // the mask string
      var maskChar = maskParts.shift();

      // make sure the masking character exists
      // otherwise this means that the original string
      // exceeds the masking pattern length
      if (maskChar !== undefined) {
        // try to find a pattern for the particular
        // mask character
        var maskPattern = maskPatterns[maskChar.toUpperCase()];

        // if there is no pattern configured for
        // this particular mask character, assume
        // the mask character is a placeholder / formatting
        // value that must be added to the string
        if (maskPattern !== undefined) {
          var check = false;

          // mask pattern can be either a function
          if (typeof maskPattern === "function") {
            check = maskPattern(unmaskedChar);
          }
          // or a regex string
          else if (maskPattern instanceof RegExp) {
            check = maskPattern.test(unmaskedChar);
          }

          // if character has passed the mask check,
          // it can bee added to the final masked value
          if (check) {
            maskedValue += unmaskedChar;
          }
          // otherwise one must put the pattern back into
          // the array so the next character can try to
          // pass the mask check
          else {
            maskParts.unshift(maskChar);
          }

          unmaskedChar = null;
        }
        // mask character is a placeholder / formatting value
        // and must be added to the masked string
        else {
          maskedValue += maskChar;
        }
      }
      // no masking character could be found,
      // the original string is probably longer
      // then the mask pattern and therefore
      // the leftovers can be cut off
      else {
        // reset current character to continue the loop
        unmaskedChar = null;
      }
    }
  }

  return maskedValue;
};

/**
 * Removes the accents from a string
 * @param  {[type]} s Original string
 * @return {[type]}   [description]
 */
Helpers.normalizeString = (s, transform = s => s.toLocaleLowerCase()) => {
  let normalized = transform(s);
  if (String.prototype.normalize) {
    try {
      normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } catch (e) {
      // just ignore
    }
  }
  return normalized;
};

Helpers.randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

Helpers.kebab = str => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

Helpers.toggleFullScreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  let cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

export default Helpers;
