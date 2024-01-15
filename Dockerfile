# 베이스 이미지 설정
FROM node:18.12.1-alpine

WORKDIR /frontend

# 소스 코드 복사
COPY ./package.json ./

COPY . ./

RUN yarn

CMD ["yarn", "build"]

# # 현재 플랫폼에 해당하는 종속성을 무시하고, 모든 플랫폼에서 사용 가능한 일반적인 종속성만을 설치
# RUN yarn install --ignore-platform
# RUN yarn global add create-vite

# COPY . ./

# ENV REACT_APP_HOST_IP_ADDRESS $API_URL
# ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

# Vite 애플리케이션을 빌드
# CMD ["yarn", "start"]

# #사용할 포트 설정
# EXPOSE 5173