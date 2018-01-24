var FFI = require('ffi'),
    ArrayType = require('ref-array'),
    Struct = require('ref-struct'),
    ref = require('ref');
    iconv = require('iconv-lite');
const path = require('path');

var voidPtr = ref.refType(ref.types.void);
var voidPtrPtr = ref.refType(voidPtr);

var _personinfoa = exports._personinfoa = Struct({
  name: ArrayType(ref.types.byte, 32),
  sexCode: ArrayType(ref.types.char, 4),
  sex: ArrayType(ref.types.char, 4),
  ethnicCode: ArrayType(ref.types.char, 4),
  ethnic: ArrayType(ref.types.char, 20),
  birthDate: ArrayType(ref.types.char, 12),
  address: ArrayType(ref.types.char, 72),
  idNumber: ArrayType(ref.types.char, 20),
  issuer: ArrayType(ref.types.char, 32),
  effectDate: ArrayType(ref.types.char, 12),
  expiryDate: ArrayType(ref.types.char, 12),
  appendInfo: ArrayType(ref.types.char, 72),
});
var _personinfoaPtr = exports._personinfoaPtr = ref.refType(_personinfoa);


var LPCSTR = exports.LPCSTR = voidPtr;
var LPCSTRPtr = exports.LPCSTRPtr = ref.refType(LPCSTR);

var _fpinfoa = exports._fpinfoa = Struct({
  fpData1: ArrayType(ref.types.uchar, 512),
  fpData2: ArrayType(ref.types.uchar, 512),
  fingerName1: ArrayType(ref.types.char, 16),
  fingerName2: ArrayType(ref.types.char, 16),
});
var _fpinfoaPtr = exports._fpinfoaPtr = ref.refType(_fpinfoa);


var _foreignerinfoa = exports._foreignerinfoa = Struct({
  englishName: ArrayType(ref.types.char, 64),
  sexCode: ArrayType(ref.types.char, 4),
  sex: ArrayType(ref.types.char, 8),
  prNumber: ArrayType(ref.types.char, 16),
  countryCode: ArrayType(ref.types.char, 4),
  country: ArrayType(ref.types.char, 36),
  chineseName: ArrayType(ref.types.char, 32),
  effectDate: ArrayType(ref.types.char, 12),
  expiryDate: ArrayType(ref.types.char, 12),
  birthDate: ArrayType(ref.types.char, 12),
  version: ArrayType(ref.types.char, 4),
  issuerCode: ArrayType(ref.types.char, 8),
  issuer: ArrayType(ref.types.char, 64),
});
var _foreignerinfoaPtr = exports._foreignerinfoaPtr = ref.refType(_foreignerinfoa);

var LPSTR = exports.LPSTR = voidPtr;
var LPSTRPtr = exports.LPSTRPtr = ref.refType(LPSTR);

var cardpath = path.join(__dirname, '/card/cardapi6.dll');
//TODO ./cardapi6.dll
// console.log(__dirname)

var cardpath02=__dirname.split("app")[0]+"app\\card\\cardapi6.dll";
// console.log(cardpath);
console.log(cardpath02)
exports.CR = new FFI.Library(cardpath02, {
  IdcrInitialize: [ref.types.int32, [
    ref.types.uint32,
  ]],
  IdcrOpen: [ref.types.int32, [
    ref.refType(ref.types.int32),
    ref.types.uint32,
    ref.types.uint32,
    ref.types.int32,
    voidPtrPtr,
  ]],
  IdcrFindCard: [ref.types.int32, [
    voidPtr,
  ]],
  IdcrSelectCard: [ref.types.int32, [
    voidPtr,
  ]],
  IdcrReadCard: [ref.types.int32, [
    voidPtr,
    ref.types.int32,
    ref.refType(ref.types.int32),
  ]],
  IdcrValidate: [ref.types.int32, [
    voidPtr,
    ref.types.int32,
    ref.refType(ref.types.int32),
    ref.types.int32,
  ]],
  IdcrGetIDInfoA: [ref.types.int32, [
    voidPtr,
    _personinfoaPtr,
    LPCSTR,
    _fpinfoaPtr,
  ]],
  IdcrGetPRInfoA: [ref.types.int32, [
    voidPtr,
    _foreignerinfoaPtr,
    LPCSTR,
    _fpinfoaPtr,
  ]],
  IdcrReadAppendInfoA: [ref.types.int32, [
    voidPtr,
    LPSTR,
    ref.types.uint32,
  ]],
  IdcrGetStatus: [ref.types.int32, [
    voidPtr,
  ]],
  IdcrReset: [ref.types.int32, [
    voidPtr,
  ]],
  IdcrGetSAMIDA: [ref.types.int32, [
    voidPtr,
    LPSTR,
    ref.types.uint32,
    ref.types.int32,
  ]],
  IdcrClose: [ref.types.void, [
    voidPtr,
  ]],
  IdcrFinalize: [ref.types.void, [
  ]],
  IdcrGetErrorDescA: [ref.types.void, [
    LPSTR,
    ref.types.uint32,
    ref.types.int32,
  ]],
});

exports.readIdInfo = function (imgOutPath) {

var retv = -1;
var results = {};

retv = exports.CR.IdcrInitialize(1);
//console.log('IdcrInitialize ret=' + retv);
if (retv != 0) {
  return retv;
}

var piPort = ref.alloc('int', 0);
var ppRD = ref.alloc(voidPtr);
retv = exports.CR.IdcrOpen(piPort, 0, 0, 0, ppRD);
//console.log('IdcrOpen ret=' + retv);
if (retv != 0) {
  return retv;
}


var port = piPort.deref();
var pRD = ppRD.deref();
//console.log(port);
//console.log(pRD);


var piCardType = ref.alloc('int', -1);
retv = exports.CR.IdcrValidate(pRD, 0/*是否读指纹*/, piCardType, 1/*是否重复读卡*/);
//console.log('IdcrValidate ret=' + retv);
//TODO 128~寻卡失败
if (retv != 0) {
  return retv;
}

var cardType = piCardType.deref();
//console.log(cardType);

if (cardType == 1/*1为身份证*/)
{

var pTextInfo = ref.alloc(_personinfoa);
var pszPhotoPath = ref.allocCString(imgOutPath);
var pFPInfo = ref.alloc(_fpinfoa);

retv = exports.CR.IdcrGetIDInfoA(pRD, pTextInfo, pszPhotoPath, pFPInfo);
//console.log('IdcrGetIDInfoA ret=' + retv);
if (retv != 0) {
  return retv;
}


var personInfo = pTextInfo.deref();
// console.log(JSON.stringify(personInfo));

// console.log(iconv.decode(Buffer.from(personInfo.name), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.sexCode), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.sex), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.ethnicCode), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.ethnic), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.birthDate), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.address), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.idNumber), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.issuer), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.effectDate), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.expiryDate), 'GBK'));
// console.log(iconv.decode(Buffer.from(personInfo.appendInfo), 'GBK'));

// console.log('照片文件路径==> ' + pszPhotoPath.toString());

//var fpInfo = pFPInfo.deref();
//console.log(JSON.stringify(fpInfo));


results = {
name: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.name), 1), 'GBK'),
sexCode: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.sexCode), 1), 'GBK'),
sex: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.sex), 1), 'GBK'),
ethnicCode: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.ethnicCode), 1), 'GBK'),
ethnic: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.ethnic), 1), 'GBK'),
birthDate: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.birthDate), 1), 'GBK'),
address: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.address), 1), 'GBK'),
idNumber: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.idNumber), 1), 'GBK'),
issuer: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.issuer), 1), 'GBK'),
effectDate: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.effectDate), 1), 'GBK'),
expiryDate: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.expiryDate), 1), 'GBK'),
appendInfo: iconv.decode(ref.reinterpretUntilZeros(Buffer.from(personInfo.appendInfo), 1), 'GBK')
};
//TODO   name = name.substring(0,name.indexOf('/u0000'))

//console.log(JSON.stringify(results));

}
else if (cardType == 2/*2为外国人永久居留证*/)
{
    results= {
      cardType: 2
    };
}
else 
{
      results= {
      cardType: cardType
    };

}


exports.CR.IdcrClose(pRD);
exports.CR.IdcrFinalize();

return results;
}

