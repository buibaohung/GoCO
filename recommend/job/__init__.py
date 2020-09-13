from job import train
import threading
import time

def init():
    threading.Thread(target=train.run).start()