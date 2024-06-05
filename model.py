import pickle
import sys
import numpy as np

def load_model():
    with open('bangalore_house_price_model.pickle', 'rb') as f:
        model = pickle.load(f)
    return model

def predict(input_data):
    x = np.zeros(244)
    x[0] = input_data[0]
    x[1] = input_data[1]
    x[2] = input_data[2]
    x[int(input_data[3])] = 1
    x = np.array([x])
    model = load_model()
    y = model.predict(x)
    print(y)

data = sys.argv[1]
input_data = data.split(',')
predict(input_data) 
# format of input_data = [sqft, bath, bhk,location_index]
# format of x = [sqft, bath, bhk, locations...]