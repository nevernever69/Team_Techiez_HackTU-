export const modules = [
    {
      title: "Data Types",
      content: `In Python, there are several basic data types:
  
  1. Integers (int): Whole numbers, e.g., 5, -3, 0
  2. Floating-point numbers (float): Decimal numbers, e.g., 3.14, -0.5
  3. Strings (str): Text enclosed in quotes, e.g., "Hello, World!"
  4. Booleans (bool): True or False
  
  Try creating variables of each type in the IDE!`,
      task: `# Create variables for each data type
# Integer
my_int = 10
  
# Float
my_float = 3.14
  
# String
my_string = "Python is fun!"
  
# Boolean
my_bool = True
  
# Print all variables
print(my_int, my_float, my_string, my_bool)
  
# Check the type of each variable
print(type(my_int), type(my_float), type(my_string), type(my_bool))`,
      expectedOutput: `10 3.14 Python is fun! True
<class 'int'> <class 'float'> <class 'str'> <class 'bool'>`,
    },
    {
      title: "Functions",
      content: `Functions in Python are defined using the 'def' keyword. They allow you to group code that performs a specific task.
  
  Basic syntax:
  def function_name(parameters):
      # function body
      return result
  
  Functions can have parameters and return values.`,
      task: `# Define a function that adds two numbers
  def add_numbers(a, b):
      return a + b
  
  # Call the function and print the result
  result = add_numbers(5, 3)
  print("5 + 3 =", result)
  
  # Define a function that greets a person
  def greet(name):
      return f"Hello, {name}!"
  
  # Call the greet function
  message = greet("Alice")
  print(message)`,
      expectedOutput: `5 + 3 = 8
  Hello, Alice!`,
    },
    {
      title: "Loops",
      content: `Loops in Python allow you to repeat a block of code multiple times. The two main types of loops are:
  
  1. For loops: Used to iterate over a sequence (like a list, tuple, or string) or other iterable objects.
  2. While loops: Repeat as long as a certain condition is true.
  
  Let's focus on for loops in this example.`,
      task: `# Using a for loop to iterate over a list
  fruits = ["apple", "banana", "cherry"]
  for fruit in fruits:
      print(fruit)
  
  # Using a for loop with the range function
  print("Counting from 1 to 5:")
  for i in range(1, 6):
      print(i)
  
  # Using a for loop to calculate the sum of numbers
  numbers = [1, 2, 3, 4, 5]
  sum = 0
  for num in numbers:
      sum += num
  print("Sum of numbers:", sum)`,
      expectedOutput: `apple
  banana
  cherry
  Counting from 1 to 5:
  1
  2
  3
  4
  5
  Sum of numbers: 15`,
    },
  ];