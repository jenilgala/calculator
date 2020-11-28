import tkinter as tk
import tkinter.ttk as ttk


win = tk.Tk()
win.title('Calculator')
win.geometry('300x300+300+300')


expression = ""

text = tk.StringVar()

def click(number):
    global expression
    expression += str(number)
    text.set(expression)

def clickEquals():
    try:
        global expression
        total = str(eval(expression))
        text.set(total)
        

    except:
        text.set("Error")
        expression = ""
        

def clear():
    global expression
    expression = ''
    text.set("")


field = ttk.Entry(win, textvariable=text) 
field.grid(row = 0, columnspan = 4, sticky = 'nsew')


button7 = ttk.Button(win, text = '7', command = lambda : click(7))
button7.grid(row = 1, column = 0)

button8 = ttk.Button(win, text = '8', command = lambda : click(8))
button8.grid(row = 1, column = 1)

button9 = ttk.Button(win, text = '9', command = lambda : click(9))
button9.grid(row = 1, column = 2)

button4 = ttk.Button(win, text = '4', command = lambda : click(4))
button4.grid(row = 2, column = 0)

button5 = ttk.Button(win, text = '5', command = lambda : click(5))
button5.grid(row = 2, column = 1)

button6 = ttk.Button(win, text = '6', command = lambda : click(6))
button6.grid(row = 2, column = 2)

button1 = ttk.Button(win, text = '1', command = lambda : click(1))
button1.grid(row = 3, column = 0)

button2 = ttk.Button(win, text = '2', command = lambda : click(2))
button2.grid(row = 3, column = 1)

button3 = ttk.Button(win, text = '3', command = lambda : click(3))
button3.grid(row = 3, column = 2)

button0 = ttk.Button(win, text = '0', command = lambda : click(0))
button0.grid(row = 4, column = 1)

buttonClear = ttk.Button(win, text = 'CLEAR', command = lambda : clear())
buttonClear.grid(row = 4, column = 0)

buttonEquals = ttk.Button(win, text = '=',command = lambda : clickEquals())
buttonEquals.grid(row = 4, column = 2)

buttonAdd = ttk.Button(win, text = '+',command = lambda : click('+'))
buttonAdd.grid(row = 1, column = 3)

buttonSubtract = ttk.Button(win, text = '-',command = lambda : click('-'))
buttonSubtract.grid(row = 2, column = 3)

buttonMultiply = ttk.Button(win, text = 'x',command = lambda : click('*'))
buttonMultiply.grid(row = 3, column = 3)

buttonDivide = ttk.Button(win, text = '/',command = lambda : click('/'))
buttonDivide.grid(row = 4, column = 3)


win.mainloop()

