import geocoder
import _mysql
import csv

db=_mysql.connect("localhost","root","UAV_HACKS","yychacksdb")

with open('cs.csv', 'r') as f:
	reader = csv.reader(f)
	for row in reader:
		g = geocoder.google(row[2])
		try:
			db.query("CALL Location_Insert('" + row[1] + "','" + row[2] + "'," + str(g.latlng[0]) + "," + str(g.latlng[1]) + ")")
		except:
			1
