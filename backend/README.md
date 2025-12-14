# Travel Assistant

To run the project, follow the steps listed below

## Prerequisites

1. Python
2. pip

## Set up the backend

1. change directory into the backend folder by running `cd backend`

2. install the flask virtual env package by running

   For macOS/linux

   ```
       sudo apt install python3-venv
   ```

   For Windows

   ```
       pip install virtualenv
   ```

3. create a virtual environment by running the following

   For macOS/linux

   ```
       python3 -m venv venv
   ```

   For windows

   ```
       python -m virtualenv venv
   ```

4. activate the virtual env by running

   For macOS/linux

   ```
       source venv/bin/activate
   ```

   For windows

   ```
       .\venv\Scripts\activate
   ```

5. install the required packages by running

   ```
       pip install -r requirements.txt
   ```

6. start the application server by running the following command `python3 main.py` for macOS/linux systems and `python main.py` for windows systems

7. Visit http://127.0.0.1:5000 to access the backend and get started.