import { Database } from 'sqlite3';

const db = new Database("./base.db");

db.exec(`CREATE TABLE report_monthly (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  month INTEGER, 
  year INTEGER
)`);

db.exec(`CREATE TABLE report_list (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  date TEXT NOT NULL, 
  report_monthly_id INTEGER, 
  desc TEXT, 
  status INTEGER,
  type INTEGER,
  cash INTEGER, 
  FOREIGN KEY (report_monthly_id) REFERENCES report_monthly (id)
)`);