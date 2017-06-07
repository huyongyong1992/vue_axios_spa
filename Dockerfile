FROM daocloud.io/library/nginx:latest
RUN rm -r /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/elm
COPY elm/ /usr/share/nginx/html/elm
EXPOSE 80
