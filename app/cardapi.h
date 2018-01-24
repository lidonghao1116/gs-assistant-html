#pragma once

#define LOADWLTLIB		1
#define MULTIREADER		2

#define TYPE_IDCARD 1//????????????
#define TYPE_PRCARD 2//?????????????????????
//???????????
typedef struct _personinfow
{
	wchar_t name[16];
	wchar_t sexCode[2];
	wchar_t sex[2];
	wchar_t ethnicCode[4];
	wchar_t ethnic[10];
	wchar_t birthDate[10];
	wchar_t address[36];
	wchar_t idNumber[20];
	wchar_t issuer[16];
	wchar_t effectDate[10];
	wchar_t expiryDate[10];
	wchar_t appendInfo[36];
}PERSONINFOW,*PPERSONINFOW;

typedef struct _personinfoa
{
	char name[32];
	char sexCode[4];
	char sex[4];
	char ethnicCode[4];
	char ethnic[20];
	char birthDate[12];
	char address[72];
	char idNumber[20];
	char issuer[32];
	char effectDate[12];
	char expiryDate[12];
	char appendInfo[72];
}PERSONINFOA,*PPERSONINFOA;
//????????????????????
typedef struct _foreignerinfow
{
	wchar_t englishName[62];//60
	wchar_t sexCode[2];		//1
	wchar_t sex[4];			//??/M ?/F
	wchar_t prNumber[16];	//15
	wchar_t countryCode[4];	//3
	wchar_t country[20];	//?????/CAN
	wchar_t chineseName[16];//15????
	wchar_t effectDate[10];	//8
	wchar_t expiryDate[10];	//8
	wchar_t birthDate[10];	//8
	wchar_t version[4];		//2
	wchar_t issuerCode[6];	//4
	wchar_t issuer[48];		//??????/Ministry of Public Security
}FOREIGNERINFOW,*PFOREIGNERINFOW;

typedef struct _foreignerinfoa
{
	char englishName[64];	//60
	char sexCode[4];		//1
	char sex[8];			//??/M ?/F
	char prNumber[16];		//15
	char countryCode[4];	//3
	char country[36];		//?????/CAN
	char chineseName[32];	//15????
	char effectDate[12];	//8
	char expiryDate[12];	//8
	char birthDate[12];		//8
	char version[4];		//2
	char issuerCode[8];		//4
	char issuer[64];		//??????/Ministry of Public Security
}FOREIGNERINFOA,*PFOREIGNERINFOA;
//??????
typedef struct _fpinfow
{
	BYTE fpData1[512];
	BYTE fpData2[512];
	wchar_t fingerName1[8];
	wchar_t fingerName2[8];
}FPINFOW,*PFPINFOW;

typedef struct _fpinfoa
{
	BYTE fpData1[512];
	BYTE fpData2[512];
	char fingerName1[16];
	char fingerName2[16];
}FPINFOA,*PFPINFOA;

EXTERN_C
{
__declspec(dllimport) int __stdcall IdcrInitialize(DWORD dwFlags);

__declspec(dllimport) int __stdcall IdcrOpen(int* piPort, DWORD dwBaudRate, DWORD dwCmdIntv, int iBpPort, void** ppRD);

__declspec(dllimport) int __stdcall IdcrFindCard(void* pRD);

__declspec(dllimport) int __stdcall IdcrSelectCard(void* pRD);

__declspec(dllimport) int __stdcall IdcrReadCard(void* pRD, BOOL bReadFP, int* piCardType);

__declspec(dllimport) int __stdcall IdcrValidate(void* pRD, BOOL bReadFP, int* piCardType, BOOL bRepeatRead);

__declspec(dllimport) int __stdcall IdcrGetIDInfoW(void* pRD, PPERSONINFOW pTextInfo, LPCWSTR pszPhotoPath, PFPINFOW pFPInfo);
__declspec(dllimport) int __stdcall IdcrGetIDInfoA(void* pRD, PPERSONINFOA pTextInfo, LPCSTR  pszPhotoPath, PFPINFOA pFPInfo);

__declspec(dllimport) int __stdcall IdcrGetPRInfoW(void* pRD, PFOREIGNERINFOW pTextInfo, LPCWSTR pszPhotoPath, PFPINFOW pFPInfo);
__declspec(dllimport) int __stdcall IdcrGetPRInfoA(void* pRD, PFOREIGNERINFOA pTextInfo, LPCSTR  pszPhotoPath, PFPINFOA pFPInfo);

__declspec(dllimport) int __stdcall IdcrReadAppendInfoW(void* pRD, LPWSTR pszBuffer, UINT nBufLen);
__declspec(dllimport) int __stdcall IdcrReadAppendInfoA(void* pRD, LPSTR  pszBuffer, UINT nBufLen);

__declspec(dllimport) int __stdcall IdcrGetStatus(void* pRD);

__declspec(dllimport) int __stdcall IdcrReset(void* pRD);

__declspec(dllimport) int __stdcall IdcrGetSAMIDW(void* pRD, LPWSTR pszBuffer, UINT nBufLen, int iFormat);
__declspec(dllimport) int __stdcall IdcrGetSAMIDA(void* pRD, LPSTR  pszBuffer, UINT nBufLen, int iFormat);

__declspec(dllimport) void __stdcall IdcrClose(void* pRD);

__declspec(dllimport) void __stdcall IdcrFinalize();

__declspec(dllimport) void __stdcall IdcrGetErrorDescW(LPWSTR pszBuffer, UINT nBufLen, int nErrorCode);
__declspec(dllimport) void __stdcall IdcrGetErrorDescA(LPSTR  pszBuffer, UINT nBufLen, int nErrorCode);
}

#ifdef UNICODE

#define PERSONINFO		PERSONINFOW
#define FOREIGNERINFO	FOREIGNERINFOW
#define FPINFO			FPINFOW

#define IdcrGetIDInfo		IdcrGetIDInfoW
#define IdcrGetPRInfo		IdcrGetPRInfoW
#define IdcrReadAppendInfo	IdcrReadAppendInfoW
#define IdcrGetSAMID		IdcrGetSAMIDW
#define IdcrGetErrorDesc	IdcrGetErrorDescW

#else

#define PERSONINFO		PERSONINFOA
#define FOREIGNERINFO	FOREIGNERINFOA
#define FPINFO			FPINFOA

#define IdcrGetIDInfo		IdcrGetIDInfoA
#define IdcrGetPRInfo		IdcrGetPRInfoA
#define IdcrReadAppendInfo	IdcrReadAppendInfoA
#define IdcrGetSAMID		IdcrGetSAMIDA
#define IdcrGetErrorDesc	IdcrGetErrorDescA

#endif
