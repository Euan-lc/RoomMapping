from dataStreamTest import client as Client
from lidarData import LidarData
import serial

ser = serial.Serial(port='COM4',
                    baudrate=230400,
                    timeout=5.0,
                    bytesize=8,
                    parity='N',
                    stopbits=1)

client = Client(HOST='192.168.68.64')

try:
    while True:
        tmpString = ''
        b = ser.read()
        tmpInt = int.from_bytes(b, 'big')
        if tmpInt == 0x54:
            tmpString += b.hex() + " "
            for i in range(46):
                b = ser.read()
                tmpString += b.hex() + " "
            client.send_message(LidarData(tmpString).attributes_to_dict())
except KeyboardInterrupt:
    pass

client.cleanup()
