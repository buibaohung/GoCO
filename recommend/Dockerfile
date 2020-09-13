FROM python:3.8.0-alpine AS builder
RUN apk update && \
    apk add --no-cache tzdata postgresql-libs openblas gcc && \
    apk add --no-cache --virtual .build-deps make postgresql-dev build-base openblas-dev && \
    pip3 install --no-cache-dir numpy==1.17.4 Cython==0.29.14 && \
    pip3 install --no-cache-dir pandas==0.25.3 scipy==1.3.3 scikit-learn==0.21.3
WORKDIR /app
COPY requirements.txt .
RUN pip3 install -r requirements.txt --no-cache-dir
RUN apk --purge del .build-deps
COPY . .
EXPOSE 8000
CMD ["python3", "main.py"]