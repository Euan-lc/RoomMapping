import socket
from socket import SOCK_DGRAM, SO_REUSEADDR
import numpy as np
import threading


class client:

    def __init__(self, HOST="192.168.0.51", PORT=9077):
        self.s = socket.socket(type=SOCK_DGRAM)
        self.HOST = HOST
        self.PORT = PORT

    def send_message(self, message):
        self.s.sendto(str(message).encode(), (self.HOST, self.PORT))

    def cleanup(self):
        self.s.close()


class server:

    def __init__(self, PORT=9077, BUFF_SIZE=1024, MAX_CONNECTIONS=1000):
        self.s = socket.socket(type=SOCK_DGRAM)
        self.HOST = socket.gethostbyname(socket.gethostname())
        self.PORT = PORT
        self.MAX_CONNECTIONS = MAX_CONNECTIONS
        self.BUFF_SIZE = BUFF_SIZE
        self.s.bind((self.HOST, self.PORT))
        # self.s.listen(self.MAX_CONNECTIONS)
        self.recievingData = False
        self.recievedData = np.zeros((1, 4))

        self.thread = threading.Thread(target=self.recieveData)
        self.thread.start()
        # self.s.setblocking(0)
        self.startRecieving()

        print("Starting a server")
        print("IP: " + str(self.HOST))
        print("Port: " + str(self.PORT))

    def startRecieving(self):
        self.recievingData = True
        self.recievedData = np.zeros((1, 4))
        self.thread = threading.Thread(target=self.recieveData)
        self.thread.start()
        print("Started reading data")

    def stopRecieving(self):
        self.recievingData = False
        self.thread.join()
        print("Stopped reading data")

    def recieveData(self):
        self.recievingData = True
        while self.recievingData:
            # print("Waiting for data")
            part, addr = self.s.recvfrom(self.BUFF_SIZE)
            # print(part, addr)
            data = b''
            data += part
            while len(part) > self.BUFF_SIZE:
                # print("looping")
                part = self.s.recvfrom(self.BUFF_SIZE)
                # print(len(part))
                data += part
            self.lastData = data
            print(data)
            # as_float = np.array([[float(x.strip()) for x in data.decode().split(',')]])
            # self.recievedData = np.vstack((self.recievedData, as_float))

if __name__ == '__main__':
    server()
