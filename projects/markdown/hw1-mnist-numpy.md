# HW1: MNIST Neural Network

Due **Wednedsay, 09/25/19 at 11:59pm**

A new CS professor has just arrived at Brown, but is having trouble understanding the number system. They were from a different planet where numbers are not used. They wonder: are numbers not just social constructs used to limit and ensure social order? Why do humans subject themselves to this straightjacket of numbers - from number of swipes on Tunder to deadlines, numbers only exist to enforce put people in place. They want to learn more about this number system but don't know how to recognize any digits. Even worse, they've gone on a few dates but can't pay for the meal when the bill comes! Those poor dates...Can you help him build a classifier to do recognize some digits?

In this assignment, you will be coding a single-layer neural network to classify handwritten digits using only [NumPy](https://docs.scipy.org/doc/numpy/user/quickstart.html).
You will not be using TensorFlow, or any other deep learning framework, for this assignment. **<em>Please read this handout in its entirety before beginning the assignment.</em>**

## Getting the Stencil

You can find the files located here or on the "Files" column under the Assignments page. The files are compressed into a ZIP file, and to unzip the ZIP file, you can just double click on the ZIP file. There should be the files: assignment.py, preprocess.py, README,and MNIST_data folder.
You can find the conceptual questions located here or the "Conceptual Questions" column in the Assignments page.

## Logistics

Work on this assignment off of the stencil code provided, but **do not change the stencil except where specified.** Changing the stencil will result in incompatiblity with the autograder and result in a low grade. You shouldn't change any method signatures or add any trainable parameters to __init__ that we don't give you (other instance variables are fine).

Make sure that you are using Python version 3.7+ on this assignment and all future assignments. You can check this in the terminal with:

```bash
python --version
```

Most department machines should have Python 3.7. Please see the installing TensorFlow document for installing Python 3.7 on your local machine.

This assignment also requires the NumPy and Matplotlib packages. You can install them using pip or run the assignment in a virtual environment.

To run the virtual environment on a department machine, you can run:

```bash
source /course/cs1470/tf-2.0/bin/activate
```
You can also check out the Python virtual environment guide to set up TensorFlow 2.0 on your local machine.

## Assignment Details

Your task is a multi-classification problem, you will build a one layer neural network to take an image of a handwritten digit and predict its class.

The assignment has **2 parts**.

Our stencil provides a model class with several methods and hyperparameters you need to use for your network. You will also answer questions related to the assignment and class material. If you are taking 2470, you must also submit another file with your answers to the additional questions.

You should include a brief README with your model's accuracy and any known bugs.

## Roadmap

For this assignment, we'll walk you through the pipeline of training a neural net, including the structure of the model class and the methods you will have to fill in.

Step 1. Preprocess the data
- Before training a network, you need to clean your data. This includes retrieving the data, altering the data, and formatting them into the inputs for your network. For this assignment, you will be working on the MNIST dataset (see more detailed explanation of MNIST below). MNIST is a dataset containing of images of handwritten digits (0 - 9). You want the inputs for your model to be batch size of images, where each image is a 28 x 28 matrix of pixel values.
- In preprocessing.py, we have provided you with a get_data(inputs_file_path, labels_file_path, num_examples) method and a get_next_batch(idx, data, labels, batch_size) method that you will have to fill in.
- Please normalize the pixel values.

Step 2. Fill in your model
- Your next step should be to fill out the methods in the model, including all of the TODOs listed in assignment.py. This entails setting your hyperparameters and trainable parameters within the constructor of the model class, filling out the call function (forward pass), calculating the loss, doing back propogation, and writing a function to calculate your model's accuracy.
- You should initialize all hyperparameters and trainable parameters in the constructor of the class. Hyperparameters are typically not members of the model class, but doing this is necessary so that when we run your model, we use the exact same hyperparameters you did. Trainable parameters are modified through and through the entirety of training the model (that's what the model is learning!) so it makes sense to initialize this in the model class.
- You should **NOT** edit the constructor of the Model class to take in any arguments. As mentioned above, everything should be initialized (hard coded) in the constructor.
- You should also fill out the model's gradient_descent(self, gradW, gradB) method. Generally, optimizations of the model's parameters are done outside of the model, but having it be done within the model is necessary for the autograder.
- You will then initialize an instance of your model class in the main function, train your model by doing the forward pass and backward pass many times, and the test your model using the testing data and the accuracy function.

Step 3. Train and test
- In the main function, you will want to get your train and test data, initialize your model, and train it for one epoch. An epoch consists of going through the entirety of the training set once. We have provided for you a train and test method. The train method will take in the model and do the forward and backward pass for one epoch.
- The test method will take in the same model, now with trained parameters, and return the accuracy given the test data and test labels.
- At the very end, we have written a method for you to visualize your results.

## Model Parameters

- Take batch size images of 784 values as input (784 values representing the 28x28 image) and output the probabilities for each image belonging to each of the 10 class labels (one class for each digit from 0-9 for each image).
- Have a total of 7850 parameters per image. These are the weights $w\_{i, j}$ and the biases $b\_{j}$ where $0 \leq i \leq 783$ and $0 \leq j \leq 9$. All parameters should be initialized to 0.
- Trained using the cross-entropy loss function. For a given training example, the error $E = -\log(p\_c)$ where $p\_c$ is the probability
of the correct answer in the example. Note that **while you will not directly use the loss for training or updating your parameters in this assignment, printing out the loss will be a very valuable tool in debugging, and you will use the loss to update your parameters in future assignments**
- Train your network on all $60,000$ training examples with a learning rate of $\lambda = 0.5$.
- You should also be coding the stochastic gradient descent (SGD) algorithm as discussed in class with a set batch size. We recommend using a batch size of 100. Your calculation should take batch size into account by averaging the gradients, and then using that average to update your parameters.

## Data
As mentioned above, you will be using the MNIST dataset to train and test your network. The dataset can be found here: [http://yann.lecun.com/exdb/mnist/
](http://yann.lecun.com/exdb/mnist/), but we have also provided it to you within the ZIP file.

The training data contains 60,000 examples broken into two files: one file contains the image pixel data and the other contains the class label.

You should train your network using **only** the training data and then test your network's accuracy on the testing data. Your program should print its accuracy over the test dataset upon completion.

### Reading in the Data
The MNIST data files are gzipped. You can use the `gzip` library to read these files from Python.

To open a gzipped file from Python you can use the following code:
```python
import gzip
with open('file.gz', 'rb') as f, gzip.GzipFile(fileobj=f) as bytestream:
  # bytestream contains the data of the fileobj
  # You can use bytestream.read(n) to read n bytes from the file.
  # If you use bytestream.read(n) twice,
  # the first call reads the first n bytes, the second reads the second n bytes
```

You might find the function `numpy.frombuffer`  ([https://docs.scipy.org/doc/numpy/reference/generated/numpy.frombuffer.html](https://docs.scipy.org/doc/numpy/reference/generated/numpy.frombuffer.html))
helpful to convert from a buffer of bytes to a NumPy array.

*Note:* You should normalize the pixel values so that they range from 0 to 1
(This can easily be done by dividing each pixel value by 255) to avoid any numerical overflow issues. Each pixel is exactly 1 byte.

### Data format
The testing and training data are in the following format:

`train-images-idx3-ubyte.gz`: 16 byte header (which you can ignore) followed by 60,000 training images. A training example consists of 784 *single-byte* integers (from 0-255) which represent pixel intensities. You will want to read the 16 byte header and then save the rest of the data as the actual training inputs.

`train-labels-idx1-ubyte.gz`: 8 byte header (which you can ignore) followed by 60,000 training labels. A training label consists of  *single-byte* integers from 0-9 representing the class label. You will want to read the 8 byte header and then save the rest of the data as the actual training labels.

`t10k-images-idx3-ubyte.gz`: 16 byte header (which you can ignore) followed by 10,000 testing images. You will want to read the 16 byte header and then save the rest of the data as the actual testing inputs.

`t10k-labels-idx1-ubyte.gz`: 8 byte header (which you can ignore) followed by 10,000 testing labels. You will want to read the 8 byte header and then save the rest of the data as the actual training labels.

*Note*: You can use the data type `np.uint8` for single-byte (or 8-bit) integers. You may have to convert to `np.float32` when preprocessing to normalize the data.

## Visualizing Results
We've provided the visualize_results(image_data, probabilities, image_labels) method for you to visualize your predictions against the true labels using matplotlib, a useful Python library for plotting graphs. **<em>DO NOT EDIT THIS FUNCTION.</em>** You should call this function after training and testing on a set of 10 test images, which you can get by calling get_next_batch(). This should result in a visual of 10 images with your predictions and the actual label written above so you can compare your results! You should do this **last**, after you are sure you have met the benchmark for test accuracy.

## Conceptual Questions
A new feature of assignments this year is the addition of conceptual questions (hooray!) to be filled out and submitted in either PDF or txt format. Submitting a scan of written work is also fine, but please make sure your handwriting is readable or we will not be able to grade your answers. You are encouraged to discuss the problems and approaches but you should NOT share any written information or show your written responses to any student.

## Grading and Autograder Compatibility
**Code:** You will be primarily graded on functionality. Your model should have an accuracy that is at least greater than 80% on the testing data.

**While there is no strict time limit for the running this assignment, it can take less than a minute. If it takes more than >5 minutes on a department machine, you are probably doing something incorrectly.**

**Conceptual:** You will be primarily graded on correctness (when applicable), thoughtfulness, and clarity.

**We will test by running your Model class against our test suite**, where we provide the training and testing data. This means that your program has to be able to run without any arguments from the command line, and that it cannot import files as global variables if they are in your local directory. To be clear, we will not be running your main function, but you should ensure that you have implemented your main function correctly such that it will produce the desired output. **We will be running your train and preprocessing functions, so you should make sure that they are implemented correctly.** **Please read the pinned autograding guide on Piazza to ensure that your assignment will pass the autograder.**

## CS2470 Students

Please complete the CS2470-only conceptual questions **in addition** to the coding assignment and the CS1470 conceptual questions.
 **Note: Note: Questions about 2470 will only be answered on Piazza, or by TAs marked with an asterisk (*) on the calendar.**

## Handing in

You should submit the assignment using [this Google Form](https://forms.gle/pTiBf64TUCf7ugZE7). You must be logged in with your Brown account. Your assignment.py and preprocess.py files should be Python files, while the written up conceptual questions should be either of PDF or txt format.

<sub>This assignment is dedicated to Alex and Katie, two awesome retired Deep Learning HTAs.</sub>
