FROM daocloud.io/library/nginx:latest
RUN rm -r /usr/share/nginx/html/*
COPY elm/ /usr/share/nginx/html
COPY mp/ /usr/share/nginx/html
EXPOSE 80
