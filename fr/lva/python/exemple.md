````python
#Sum by condition. for each char in str add 1 if 0,2,9, 2 if 8 0 other
print(sum(1if i in'069'else 2if i is '8'else 0for i in input()))

# Convert entrée en int sous forme (a,b)
import math
print(math.gcd(*map(int,input().split())))
# ou
a,b=map(int,input().split())

# Sum 2 input line, divide the 2 sums and truncate down + print in %
e,i=[sum([int (x)for x in input().split()])for k in [0,1]]
print(str(int(100*e/i))+"%")

# Print 1rst String + 2ncd String substring first length
print(first + second[len(first):])

# Convert each number in char and concat them in 1 string
input()
for i in input().split():print(chr(int(i)),end='')

# Get info after ", " and print it or print N/A
n = int(input())
for i in range(n):
    name = input().split(", ")
    print(name[-1] if len(name)>1 else "N/A")
    
# Get 3 input : 1rst = 1 char (a), 2scd = 1 char (b) and 3rd = 1 string. Then replace all (a) char in string by (b) and vice versa
z=input
a=z()
b=z()
z(''.join({a:b,b:a}[u]for u in z()))

# Class char by upperCase 
t = input()

a=""
b=""

for i in t:
    if i.islower():b+=i
    if i.isupper():a+=i

print(a)
print(b)

# Print if
m=input()
print("snake_case"if "_"in m else"PascalCase"if m[0].isupper() else"camelCase")

# Join n*1, n*2, n*3, etc. in str and remove last char
print(''.join((str(k*n)+' ')for k in range(1,11))[:-1])

# Print each number followed by X point '.' in 1 string
len_t = int(input())
j=0
for i in input().split():
    x = int(i)
    print(end=str(x)+'.'*x*(j!=len_t-1))
    j+=1

#The single star * unpacks the sequence/collection into positional arguments
````
