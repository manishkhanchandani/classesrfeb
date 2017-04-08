Data Structures are either linear or non linear.

Linear Structures:
  Array
  Linked List
  
Non Linear Structures:
  Trees
  Graph
  
  
Operations
1. Traverse
2. Search
3. Insertion
4. Deletion
5. Sorting
6. Merging

Array:

A linear array structure is a list of finitenumber n of homogeneous data elements such that:

Elements of array are referenced respectively by an indexset consisting of n consecutive numbers.
Elements of array are stored in successive memore locations.

E.g.
Data: 247, 56, 429, 135, 87, 156

Data

1   247
2   56
3   429
4   135
5   87
6   156


Length = UB - LB + 1
e.g. 1984 - 1930 + 1 = 55



Traversing Linear Array

  Method 1:
    LA is linear array with lower bound LB and upper bound UB. This algorithm traverses LA applying an operation PROCESS to each element of LA.
    
    1. Set k = LB
    2. Repeat 3 and 4 while k <= UB
    3. Apply process to LA[k]
    4. Increase Counter set k = k + 1
      End of loop
    5. Exit
    
  Method 2:
    This algorithm traverses a linear array LA with lower bound LB and upper bound UB.
    
    1. Repeat for K = LB to UB
      Apply Process to LA[k]
      End of loop
    2. Exit
    
    

    
    
Stacks

PUSH (STACK, TOP, MAXSTK, ITEM)
  1. If TOP = MAXSTK, then print OVERFLOW and return
  2. set TOP = TOP + 1 (increases top by 1)
  3. set STACK[TOP] = ITEM (INsert item in new Top position)
  4. Return
  
  