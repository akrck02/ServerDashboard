# Download base image ubuntu 22.04
FROM ubuntu:22.04

# LABEL about the custom image
LABEL maintainer="akrck02@gmail.com"
LABEL version="0.1"
LABEL description="This is a custom Docker image for ServerDashboard application"

ENV NODE_VERSION=18.0.0

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Update Ubuntu Software repository
RUN apt update -y --allow-unauthenticated

# Install git
RUN apt install -y git

# Install java 
RUN apt install -y openjdk-11-jdk

# Install curl
RUN apt install -y curl
    
# Install go (1.20.3) 
RUN curl -OL https://golang.org/dl/go1.20.3.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf go1.20.3.linux-amd64.tar.gz

# Add go to the PATH environment variable
ENV PATH=$PATH:/usr/local/go/bin

# Add goPath to the PATH environment variable
RUN mkdir /cache
ENV GOPATH=/cache

# Install nodejs and npm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Make app directiory
RUN mkdir /app

# Volume configuration
VOLUME ["/app", "/app"]
WORKDIR /app

# Copy start.sh script and define default command for the container
COPY start.sh /start.sh
CMD ["/bin/bash","/start.sh"]