FROM python:3.11

# insall tesseract-ocr
RUN apt-get update && apt-get -qq -y install tesseract-ocr && apt-get install -y python3-opencv

# Set the working directory
WORKDIR /server

# Install dependencies
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0,0,0,0","--port", "8080"]
