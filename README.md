# random-ac

BOJ 그룹 연습에서 랜디를 더 쉽게 할 수 있도록 해 주는 브라우저 확장입니다.

![](https://raw.githubusercontent.com/Bubbler-4/random-ac/a6851673729cb8bd5d92e038d51feed99df03ded/query.png)

## 설치 방법

### Chrome 및 Chromium 계열 브라우저

1. 이 레포를 `git clone`합니다.
2. `chrome://extensions`에 들어가서 개발자 모드를 켭니다.
3. "압축해제된 확장 프로그램 로드"를 누르고, `chrome` 폴더를 선택합니다.

### Firefox

1. 이 레포를 `git clone`합니다.
2. `about:debugging`에 들어가서 This Firefox를 선택합니다.
3. Load temporary Add-on을 누르고, `firefox` 폴더 내의 `manifest.json`을 선택합니다.

Chrome/Firefox 스토어 등록은 적당한 아이콘이 추가되면 할 예정입니다.

## 사용 방법

1. BOJ에서 원하는 그룹에 들어가서 "연습 만들기"를 선택합니다.
2. 오른쪽 아래에 새로 생긴 "쿼리" 칸에 solved.ac 문제 검색 쿼리를 넣고, "개수" 칸에 개수를 넣은 다음 Enter를 누릅니다.
3. 그러면 랜덤 정렬 쿼리 결과에서 원하는 개수만큼이 위에 있는 문제 목록에 추가됩니다.
4. 나머지 설정을 원하는 대로 선택하여 연습을 만들고 문제를 풀면 됩니다.

## 참고 사항

* solved.ac 쿼리는 비로그인 상태로 동작합니다. 따라서 `-s@$me`나 서포터 전용 쿼리는 동작하지 않습니다.
* solved.ac 검색 API는 50개 단위 pagination이 된 상태로 문제 목록을 반환하므로, 50개를 초과하는 문제를 한 번에 추가할 수 없습니다.
* 검색 결과가 원하는 문제 수보다 부족할 경우, 검색 결과에 있는 모든 문제가 목록에 추가됩니다.