export function setWithExpiry(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 8.64e7,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function formatStringToPhoneNumber(number) {
  const numberString = String(number);
  const code = numberString.slice(0, 2);
  const firstPart = numberString.slice(2, 5);
  const secondPart = numberString.slice(5, 7);
  const thirdPart = numberString.slice(7, 9);
  return '(' + code + ')-' + firstPart + '-' + secondPart + '-' + thirdPart;
}
