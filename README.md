# 📍 Remembrall

> 지도 위에 추억을 기록하고, 그 장소를 다시 방문할 때 자동으로 추억을 되살려주는 위치 기반 일기 앱

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-95.1%25-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/iOS-Swift-FA7343?style=flat-square&logo=swift&logoColor=white" />
  <img src="https://img.shields.io/badge/Android-Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" />
</p>

---

## ✨ 소개

**Remembrall**은 해리포터의 '기억구슬(Remembrall)'에서 영감을 받은 위치 기반 일기 앱입니다. 

특별한 순간을 장소와 함께 기록하고, 그 장소를 다시 방문할 때 자동으로 알림을 받아 소중한 추억을 되살릴 수 있습니다.

---

## 🎯 주요 기능

### 📝 지도 기반 일기 작성
- 현재 위치 또는 원하는 장소에 일기를 작성할 수 있습니다
- 지도에서 내 모든 일기를 한눈에 확인할 수 있습니다

### 📍 위치 기반 푸시 알림
- 일기를 작성했던 장소 근처를 지나갈 때 자동으로 알림
- 과거의 추억을 자연스럽게 떠올릴 수 있습니다

### 🗺️ 추억 지도
- 지도 위에 표시된 마커를 통해 추억의 장소를 시각적으로 탐색
- 나만의 추억 지도를 만들어갈 수 있습니다

### 🔒 프라이버시 보호
- 모든 일기는 안전하게 보관됩니다
- 내 추억은 나만 볼 수 있습니다

---

## 🛠️ 기술 스택

### Frontend
- **React Native** - 크로스 플랫폼 모바일 앱 개발
- **TypeScript** - 타입 안정성을 위한 정적 타입 언어

### Mobile Platform
- **iOS** (Swift) - 네이티브 iOS 기능 구현
- **Android** (Kotlin) - 네이티브 Android 기능 구현

### Core Features
- **Geolocation API** - 위치 정보 수집
- **Push Notification** - 위치 기반 알림 발송
- **Maps Integration** - 지도 표시 및 마커 관리

---

## 📱 스크린샷

> 추가 예정

---

## 🚀 시작하기

### Prerequisites
```bash
node >= 18.x
npm or yarn
Xcode (iOS 개발)
Android Studio (Android 개발)
```

### Installation

1. 레포지토리 클론
```bash
git clone https://github.com/yoo94/remembrall.git
cd remembrall
```

2. 의존성 설치
```bash
npm install
# or
yarn install
```

3. iOS 설정 (macOS only)
```bash
cd ios
pod install
cd ..
```

4. 앱 실행
```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
```

---

## 📂 프로젝트 구조

```
remembrall/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── screens/        # 화면 컴포넌트
│   ├── navigation/     # 네비게이션 설정
│   ├── services/       # API 및 외부 서비스
│   ├── utils/          # 유틸리티 함수
│   ├── hooks/          # 커스텀 훅
│   └── types/          # TypeScript 타입 정의
├── ios/                # iOS 네이티브 코드
├── android/            # Android 네이티브 코드
└── assets/             # 이미지, 폰트 등 리소스
```

---

## 🔐 권한 요구사항

### iOS (Info.plist)
- `NSLocationAlwaysAndWhenInUseUsageDescription` - 백그라운드 위치 추적
- `NSLocationWhenInUseUsageDescription` - 위치 정보 사용
- `NSUserNotificationsUsageDescription` - 푸시 알림

### Android (AndroidManifest. xml)
- `ACCESS_FINE_LOCATION` - 정확한 위치 정보
- `ACCESS_COARSE_LOCATION` - 대략적인 위치 정보
- `ACCESS_BACKGROUND_LOCATION` - 백그라운드 위치 추적
- `POST_NOTIFICATIONS` - 알림 권한

---

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

---

## 👨‍💻 개발자

**yoo94**
- GitHub: [@yoo94](https://github.com/yoo94)

---

## 📮 문의

프로젝트에 대한 질문이나 제안이 있으시면 [Issue](https://github.com/yoo94/remembrall/issues)를 열어주세요.

---

<p align="center">
  Made with ❤️ by yoo94
</p>
