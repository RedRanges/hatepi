import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/hate_crimes_2012.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
Crime_data = Base.classes.hate_crime_2012
Histo_data = Base.classes.histo_hate
Map_data = Base.classes.map_hate
Bubble_data = Base.classes.bubble_hate


@app.route("/")
def index():
    """Return the homepage."""

    return render_template("index.html")

@app.route("/api/crime")
def crime():
    """Return the homepage."""
    Samples =[
    Crime_data.index,
    Crime_data.incident_id,
    Crime_data.data_year,
    Crime_data.ori,
    Crime_data.state_name,
    Crime_data.county_name,
    Crime_data.division_name,
    Crime_data.victim_count,
    Crime_data.offense_name,
    Crime_data.bias_desc,
    Crime_data.county_state,
    ]

    stmt = db.session.query(*Samples).all()

    crime_result_data = []

    for result in stmt :
        crime_result = {}
        crime_result['index'] = result[0]
        crime_result['Incident Id'] = result[1]
        crime_result['Data Year'] = result[2]
        crime_result['Ori'] = result[3]
        crime_result['State Year'] = result[4]
        crime_result['County'] = result[5]
        crime_result['Division'] = result[6]
        crime_result['Victim'] = result[7]
        crime_result['Bias'] = result[8]
        crime_result['County State'] = result[9]
        crime_result_data.append(crime_result)

    return jsonify({"data" : crime_result_data})


@app.route("/api/histo")
def histo():

    Samples =[
    Histo_data.Date, 
    Histo_data.counts
    ]

    stmt = db.session.query(*Samples).all()

    histo_result_data = []  

    for result in stmt: 
        histo_result = {}
        histo_result['date'] = result[0]
        histo_result['counts'] = result[1]   
        histo_result_data.append(histo_result)

    return jsonify({"data" : histo_result_data})


@app.route("/api/map")
def map():
    Samples =[
    Map_data.census_area, 
    Map_data.county_name,
    Map_data.state_name,
    Map_data.hate_crime_count,
    Map_data.geom_type,
    Map_data.coords,
    ]

    stmt = db.session.query(*Samples).all()

    map_result_data = []

    for result in stmt: 
        map_result = {}
        map_result['census_area'] = result[0]
        map_result['county_name'] = result[1]
        map_result['state_name'] = result[2] 
        map_result['hate_crime_count'] = result[3]
        map_result['geom_type'] = result[4]
        map_result['coords'] = result[5]

        map_result_data.append(map_result)

    return(jsonify({'data': map_result_data}))


@app.route("/api/bubble")
def bubble():
    Samples =[
    Bubble_data.State,
    Bubble_data.Count 
    ]
    stmt = db.session.query(*Samples).all()

    bubble_data_result = []

    for result in stmt:     
        bubble_result = {}
        bubble_result['state'] = result[0]
        bubble_result['count'] = result[1]
        bubble_data_result.append(bubble_result)

    return(jsonify({'data': bubble_data_result}))


if __name__ == "__main__":
    app.run()
