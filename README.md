# 농업에 적합한 지역인지 AI를 이용하여 질의응답 생성 봇

## 주제
농업에 대한 기술화

## 왜 이 주제를 선택하였는가?
IT의 기술과 농업에 대해서 기술을 접목 시키면서 디지털 스마트팜, 농업 최적 위치 선정, 첨단 기술(농업 기구)의 발달 등등에 대해서 고민하다가 자신의 위치가 어디인지에 따라 농사에 적합한 지역이 맞는지 틀린지에 대해서 AI가 질의응답하는 것을 주제로 선정!

## 주제에 대한 아이디어
1. 위도 경도 측정
- 지금의 위치 데이터(주소)에 대해서 위도, 경도로 변환하여 데이터 추출한다.
2. 챗봇에 의한 질의 응답
- 지금 내가 속해 있는 위치를 위도, 경도를 포함하여 다음과 같은 질의로 설명한다.
- Input: 지금 내 위치에 대해서 위치정보 알려줄게. 위도: {위도}, 경도: {경도}인데, 이 위치에 대해서 농사에 적합한지 설명해줘. 토양, 기후, 지형어 어느 정도인지 설명해줘. 마지막으로 만약 농사에 적합하면 어떠한 과일이 잘 자라고 어떠한 최소가 잘 자라는지 설명해줘.

## 수행 과정
1. 자신의 위치 장소를 주소형식으로 input하여 주소에서 위도 경도 데이터로 변환한다.
2. 위도, 경도를 입력하여 질의를 이렇게 응답한다. “
3. 위도와 경도를 이용하여 이렇게 질의를 응답한다: “지금 내 위치가 위도: {위도}, 경도: {경도}

## 설치 방법
1. gemini api API-KEY 발급
2. node.js 관련 모듈 설치
```
npm install
npm install express cors body-parser dotenv node-fetch @google/genai
node server.js
```

3. google map API-KEY 발급


