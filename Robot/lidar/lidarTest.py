import unittest
from lidarData import LidarData


class DocCompare(unittest.TestCase):
    def setUp(self):
        self.LidarClass = LidarData("""54 2C 68 08 AB 7E E0 00 E4 DC 00 E2 D9 00 E5 D5 00 E3 D3 00 E4 D0 00 E9 CD 00 E4
                                       CA 00 E2 C7 00 E9 C5 00 E5 C2 00 E5 C0 00 E5 BE 82 3A 1A 50""")

    def test_radar_speed(self):
        self.assertEqual(self.LidarClass.radarSpeed, 2152)

    def test_start_angle(self):
        self.assertEqual(self.LidarClass.startAngle, 324.27)

    def test_end_angle(self):
        self.assertEqual(self.LidarClass.endAngle, 334.7)

    def test_data_points(self):
        # measurement point 1
        self.assertEqual(self.LidarClass.dataPoints[0][0], 224)
        self.assertEqual(self.LidarClass.dataPoints[0][2], 228)

        # measurement point 2
        self.assertEqual(self.LidarClass.dataPoints[1][0], 220)
        self.assertEqual(self.LidarClass.dataPoints[1][2], 226)

        # measurement point 12
        self.assertEqual(self.LidarClass.dataPoints[11][0], 192)
        self.assertEqual(self.LidarClass.dataPoints[11][2], 229)


if __name__ == '__main__':
    unittest.main()
