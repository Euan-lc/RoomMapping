import serial
import json
from lidarData import LidarData

ser = serial.Serial(port='COM4',
                    baudrate=230400,
                    timeout=5.0,
                    bytesize=8,
                    parity='N',
                    stopbits=1)

packets = []

with open('mock.txt', 'w') as f:
    cli = client(HOST='192.168.68.64')
    loopFlag = True
    loopCounter = 0
    tmpString = ''
    while loopFlag:
        tmpString = ''
        b = ser.read()
        tmpInt = int.from_bytes(b, 'big')
        if tmpInt == 0x54:
            tmpString += b.hex() + " "
            for i in range(46):
                b = ser.read()
                tmpString += b.hex() + " "
            loopCounter += 1
            f.write(tmpString)
            f.write("\n")
            packets.append(LidarData(tmpString).attributes_to_dict())
        if loopCounter >= 100:
            loopFlag = False

mock = json.dumps(packets)
with open('mock.json', 'w') as f:
    f.write(mock)
ser.close()
