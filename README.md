# hatepi

This project was made to visualize hate crimes in the United States. There are currently three visualizations associated with this project. A bar chart of hate crimes over time, where the hate crimes are broken up on a month-by-month basis. A histogram map visualization where hate crimes can be visualized over space. For this visualization the hate crimes are broken up by county. The final visualization is a bubble chart that looks at the total amount of hate crimes per state. The size of the bubble relates to the amount of hate crimes in each state.

## Getting Started

To view hatepi, get started by cloning or downloading the code repository.

### Prerequisites

You will need python 3 to use hatepi. You can download python at: https://www.python.org/
It is also recommended that you use some sort of package manager to make a virtual environment. Within the environment you can install the dependencies required for hatepi without interfering with other dependencies you may have downloaded. It is suggested that you use Conda to create your virtual environment, and download the dependencies: https://docs.conda.io/en/latest/

### Installing

Once you have python 3 and conda you can create an environment by running the following command from your terminal:

```
conda create --name hatepi python
```

Next you will want to activate your environment

```
conda activate hatepi
```

Now that you are in your hatepi environment you can begin getting the required dependencies. You do not need to get these in the same order listed below

Pandas : https://pandas.pydata.org/

```
pip install pandas
```

Flask : https://www.fullstackpython.com/flask.html

```
pip install flask
```

Flask-SQLAlchemy : https://flask-sqlalchemy.palletsprojects.com/en/2.x/

```
pip install Flask-SQLAlchemy
```

## Deployment

To deploy this project, navigate in your terminal to the directory that contains the file titled 'app.py'
Within the terminal execute the following command:

```
python3 app.py
```

This should start Flask which will deploy the application on a local server. You can access the application by opening up your web browser and going to http://127.0.0.1:5000/

## Authors

* **Justin Siegel** - *Histogram, Flask app, and Database design* - [RedRanges](https://github.com/RedRanges)
* **Keith Berry** - *Bar Chart*
* **Pankaj Sahai** - *Bubble Chart*

## Data

The Hate Crimes Statistics Act of 1990 requires the Attorney General to collect data on all hate crimes that occur within the United States of America.
The data should be viewable at: https://www.fbi.gov/services/cjis/ucr/hate-crime#Resources

