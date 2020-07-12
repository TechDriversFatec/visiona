import pandas as pd
import numpy as np
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense
from sklearn.model_selection import train_test_split

def process():
  meta_dados = pd.read_csv("./dataset_in.csv")
  meta_dados.head()

  ndvi_temp = meta_dados['in_ndvi']
  meta_dados = meta_dados/meta_dados.max()
  meta_dados['in_ndvi'] = ndvi_temp
  meta_dados = meta_dados.drop(["Unnamed: 0","x","y"], axis = 1)
  meta_dados.loc[meta_dados["result"] > 0, 'result'] = 1

  arr_out = []
  result_column= meta_dados["result"]
  for i in range(3348900):
    if(result_column[i] == 1):
      arr_out.append([0,1])
    else:
      arr_out.append([1,0])
  np.array(arr_out)

  result_img = []
  for i in range(0, 1830):
    col = []
    for j in range(0, 1830):
      col.append(meta_dados['result'][j + i * 1830])
    result_img.append(col)
  result_img = np.array(result_img)

  y = np.array(arr_out)
  x = meta_dados.drop(columns = "result", axis = 0).to_numpy()
  x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.3, random_state = 1)

  model = Sequential()
  input_shape = x_train[0].shape
  model.add(Dense(5,activation = 'relu', input_shape = input_shape))
  model.add(Dense(5,activation = 'relu'))
  model.add(Dense(2,activation = 'relu'))
  model.add(Dense(2,activation = 'sigmoid'))

  model.summary()

  model.compile(optimizer = "adam", loss = "binary_crossentropy", metrics = ["acc"])

  model.fit(x_train, y_train, epochs = 100, batch_size = 50000, shuffle = True)

  # Porcentagem de treino
  # test_acc = model.evaluate(x_test,  y_test, verbose = 2)

  # Printa a probabilidade de ser um talhão
  # print('\nPorcentagem de Sucesso no reconhecimento:', test_acc)

  preds = model.predict(x, batch_size = 50000)

  prev_img = []
  def eps(n):
    return n > 0.042
  for i in range(0,1830):
    prev_img.append([])
    for j in range(0,1830):
      prev_img[i].append(1 if eps(preds[j + i * 1830][1]) else 0)
  prev_img = np.array(prev_img)