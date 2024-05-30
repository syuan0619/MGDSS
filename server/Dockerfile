FROM python:3.11

# insall tesseract-ocr
RUN apt-get update && apt-get -qq -y install tesseract-ocr && apt-get install -y python3-opencv

# Set the working directory
WORKDIR /server

# Install dependencies
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

