Data structures are classified as linear or nonlinear

Linear Data Structures

  1. Arrays
  2. Linked Lists

Non Linear Data Structures
  1. Trees
  2. Graph
  
Operations on any linear structure
  1. Traversal
  2. Search
  3. Insertion
  4. Deletion
  5. Sorting
  6. Merging
  
1. LINEAR ARRAYS
  A. DEF: A linear array is a list of a finite number n of homogeneous data elements, such that:
    a. The elements of array are referenced respectively by an index set consisting of n consecutive numbers.
    b. The elements of the array are stored respectively in successive memory locations.
    
    The number n of elements is called the length or size of the array.
    
    Length = UB - LB - 1
      where UB is the largest index,
      LB is the smallest index.
      Length = UP when LB = 1.
  
  B. REPRESENTATION OF LINEAR ARRAYS IN MEMORY
    Let LA be a linear array in memory of the computer, then
      LOC(LA[k]) = address of the element LA[K] of the array LA
      
    LA are stored in successive memory cells. Accordingly we need to keep track of the address of first element of LA, denoted by 
      BASE(LA) and called the base address of LA. Using this address, computer calculates the address of any element of LA by following formula
      
      LOC(LA[K]) = Base(LA) + w(K - lower bound), where w is the number of words per memory cell for the array LA.
      
  Example:
    array AUTO which records the number of automobiles sold each year from 1932 through 1984. Suppose AUTO appears in memory as pictured below: That is, Base(AUTO) = 200, and w = 4 words per memory cell for AUTO, Then
      
      Picture:
        200 AUTO[1932]
        201
        202
        203
        204 AUTO[1933]
        205
        206
        207
        208 AUTO[1934]
        209
        210
        211
        ...
        
      LOC(AUTO[1932]) = 200
      LOC(AUTO[1933]) = 204
      LOC(AUTO[1934]) = 208
      
      Now address of array element for the year K = 1965 can be obtained by using
        LOC(AUTO[1965]) = Base(AUTO) + w(1965 - lower bound) = 200 + 4(1965 - 1932) = 332
        
    C. TRAVERSING LINEAR ARRAYS
    D. INSERTING
    E. DELETING
    F. SORTING; BUBBLE SORT
    G. SEARCHING; LINEAR SEARCH
    H. BINARY SEARCH
    I. MULTI-DIMENSIONAL ARRAYS
    J. PROBLEMS
  
  2. LINKED LISTS
    The everyday usage of the term 'list' refers to a linear collection of data items. Example of shopping list is a first element, a second element... and the last element. Frequently we want to add items to or delete items from a list. 
    
    A. DEF: A linked list or one way list is a linear collection of data elements called nodes, where the linear order is given by means of pointers. That is each node is divided into two parts, the first part contains the information of the element and second part is link field that contains the address of the next node in the list.
    
      Example:
        Bed Number  Patient   Next
        1           Kirk      7
        2           
        3           Dean      11
        4           Maxwell   12
Start-> 5           Adams     3
        6
        7           Lane      4
        8           Green     1
        9           Samuels   0
        10
        11          Fields    8
        12          Nelson    9
        
    B. REPRESENTATION OF LINKED LISTS IN MEMORY
    C. TRAVERSING
    D. SEARCHING
    E. MEMORY ALLOCATION; GARBAGE COLLECTION
    F. INSERTION
    G. DELETION
    H. HEADER LINKED LISTS
    I. TWO WAY LISTS
    J. TWO WAY HEADER LISTS
    K. OPERATIONS ON TWO WAY LISTS
    L. PROBLEMS
  
  3. STACKS
    A. DEF: A stack is a list of elements in which an element may be inserted or deleted only at one end, called the top of the stack. This means, in particular, that elements are removed from a stack in the reverse order of that in which they were inserted into the stack.
    Terminology:
    i. Push to insert an element into a stack
    ii. Pop to delete an element from a stack
  
    B. ARRAY REPRESENTATION OF STACKS
    C. ARITHMETIC EXPRESSIONS; POLISH NOTATION
    D. TRANSFORMING INFIX EXPRESSION INTO POSTFIX EXPRESSION
    E. QUICKSORT, AN APPLICATION OF STACKS
      Let A be a list of n data items, "Sorting A" refers to the operation of rearranging the elements of A so that they are in some logical order, such as numerically ordered when A contains numerical data or alphabetically ordered when A contains character data.