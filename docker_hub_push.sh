#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  
# build production docker images
docker build -t sirdnt/fc-client ./client
docker build -t sirdnt/fc-api ./server
docker build -t sirdnt/fc-nginx ./nginx
docker build -t sirdnt/fc-worker ./worker

# push image to docker hub
docker push sirdnt/fc-client
docker push sirdnt/fc-api
docker push sirdnt/fc-nginx
docker push sirdnt/fc-worker