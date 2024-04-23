## 여행지에서의 만남 웹 (2024/02)

### 여행지에서의 모임을 검색하고 참여 할 수 있는 웹입니다.
### 카테고리, 검색어, 날짜, 인원선택, 지역선택으로 모임을 검색할 수 있고 참여 신청을 할 수 있습니다.
### 가장 고민한 점:
1. 메인 페이지에 input이 많다. 캘린더, 카테고리, 키워드 각 인풋의 상태를 어떻게 잘 관리해서 검색결과 화면까지 넘겨 줄 지, 카테고리 여러개 선택히 어떻게 화면에 반영하고 값을 잘 전달할지를 가장 고민했습니다.
2. 회원가입 페이지, 리액트 훅폼을 사용했고, 인증 이메일을 보낼때 다시전송 기능과 이메일인풋을 수정할때 인증시간 타이머를 초기화해서 다시 이메일 입력할 수 있게 하는 부분, 닉네임 인증시 실시간으로 https요청을 통해 중복닉네임 체크하는 로직에 대해 고민했습니다.
### 개선해야 할 점
1. 체계적으로 진행하지 못함. 웹의 모든기능 정리->글로벌 레이아웃->페이지분리->컴포넌트 분리 구상->페이지 디자인->기능구현->기본 기능들 완성 후 추가 기능 구현
식으로 진행하지 못하고, 지엽적으로 접근하고 지엽적으로 기능 구현에 집중해서 전체적인 구조가 잡히지 않음.
2. 의미 없는 커밋 남발. vercel로 배포를 하였는데 백엔드 서버가 localhost의 접근을 막아 두어서 커밋하기 전에 css확인을 못했고, 의미없는 커밋을 남발, 정작 해야 할 커밋은 잘 못해서 커밋 히스토리가 의미 없어짐.
3. 컴포넌트가 적절히 구조화 되어있지 않음. (1과 같은 이유로 먼저 계획을 잘 세우지 못함)
4. 배포링크 x -> 백엔드 서버가 닫혀서 배포링크가 없다. 다음 프로젝트에서는 파이어베이스로 간단히 데이터 처리를 해서 aws amplify로 배포하고 싶다.



이후 프로젝트에서 개선이 필요.
