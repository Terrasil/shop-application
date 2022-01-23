FROM python:3.9
WORKDIR /
COPY . /
RUN pip install -r requirements.txt
EXPOSE 8000
ENTRYPOINT ["/bin/sh"]
CMD ["run.sh"]