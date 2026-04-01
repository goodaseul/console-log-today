# console.log(today)

[Demo](https://console-log-today-xhnt.vercel.app/)

사용자의 일기를 날짜별로 기록하고 관리할 수 있는 웹 애플리케이션입니다.

- 캘린더 기반 UI를 통해 특정 날짜의 일기를 확인
- 작성/수정/삭제 가능
- 연속 기록(streak) 시각화 제공
- 검색 기능으로 과거 일기 내용을 빠르게 조회

---

## 미리보기

### 로그인

<img src="./assets/readme/login.png" alt="로그인 페이지" />

### 홈

<img src="./assets/readme/home.png" alt="홈 페이지" />

### 검색

<img src="./assets/readme/search.png" alt="검색 페이지" />

### 마이페이지

<img src="./assets/readme/mypage.png" alt="마이 페이지" />

---

## 주요 기능

- 📅 캘린더 기반 일기 조회
- ✍️ 일기 작성 / 수정 / 삭제 (CRUD)
- 🔍 **일기 내용 검색**
  - 키워드 입력 시 해당 내용이 포함된 일기 리스트 실시간 필터링
  - 검색어가 포함된 내용 일부를 하이라이트 표시
- 🔥 연속 기록(streak) 계산
- 📊 월별 / 전체 작성 통계
- 👤 프로필 수정 (닉네임, 아바타)
- 🌙 다크모드 지원

---

## 기술 스택

- React
- TypeScript
- TanStack Query (React Query)
- Zustand (전역 상태 관리)
- Supabase (Auth / DB / Storage)
- Tailwind CSS
- date-fns
- React-hook-form
- Zod

---

## 핵심 구현 포인트

### 1. React Query 기반 데이터 관리

- queryKey를 도메인 단위로 구조화하여 캐시 일관성 유지
- invalidateQueries를 활용해 CRUD 이후 데이터 자동 동기화

### 2. 캘린더 성능 최적화

- 일기 존재 여부를 Set으로 변환하여 불필요한 반복 탐색 제거

### 3. 연속 기록(streak) 알고리즘 구현

- 날짜를 기준으로 역순 탐색하여 현재 연속 기록 계산
- 정렬 + 인접 날짜 비교를 통해 최대 연속 기록 계산

### 4. 검색 기능

- 모든 일기 데이터를 가져와 클라이언트에서 필터링
- 디바운스 처리로 입력 속도에 따른 렌더링 최소화
- 검색어가 포함된 텍스트 일부를 하이라이트 표시
- 클릭 시 해당 날짜로 바로 이동 가능

### 5. UI 상태 관리 분리

- view / edit 모드를 명확히 분리하여 UX 안정성 확보
- 수정 취소 시 원래 데이터 복구 처리
- 일기 작성 또는 수정 중 다른 날짜로 이동해도 작성 중인 내용이 localStorage에 자동 저장

### 6. 비동기 UX 개선

- mutation onSuccess를 활용한 정확한 사용자 피드백 처리

### 7. Form 상태 관리 및 유효성 검증

- React Hook Form으로 로그인/회원가입 폼 상태 효율 관리
- Zod로 입력값 검증 로직 스키마로 분리
- 비밀번호 확인, 길이 제한 등의 검증을 schema 기반 처리
