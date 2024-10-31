---
category: algo
---

Quicksort is a widely used divide-and-conquer algorithm for sorting an array ${A\[1,2,...,n\]}$. The key concept is the partitioning of the array into 2 subarrays based on a selected pivot.

- The left subarray, where each item is smaller or equal to the pivot.

- The right subarray, where each item is greater or equal to the pivot.

There are two solutions named: Hoare & Lomuto

<br>
$\pmb {Hoare \ 's \ Solution:}$

1. Select the first item as an initial pivot: ${p = A\(1)}$.

2. Indices: initialize ${i = 1 \ and \ j = n}$.

3. Loop: while i $\lt$ j:
    - ${i \leftarrow i+1 \ while \ A\(i\) \lt p}$.
    - ${j \leftarrow j-1 \ while \ A\(j\) \ge p}$.
    - if ${i \lt j: \ swap \ A\(i\) \ and \ A\(j\)}$.<br>
    
    <p><i>(the scheme will be ${|A_i|A_{i+1}|...|A_{j-1}|A_j|}$, this swapping is to move the smaller items to the leftside and the greater items to the rightside of the pivot).</i></p>
    

    Partition result: with the partition index is $j$, and the array is divided into two arrays: ${A_{left} \ and \ A_{right}}$: 
    - ${A_{left} \(k\) \le p, \ \ \ \forall k = 1,2,...,j}$.
    - ${A_{right} \(k\) \ge p, \ \forall k = j+1,j+2,...,n}$.
    - And the pivot $\\{ p \\}$ at index $j$.<br><br>
5. Recursion: recusively apply quicksort to the two arrays:
    - Result ${\=}$ quicksort($A_{left}$) $\cup$ $\\{ p \\}$ $\cup$ quicksort($A_{right}$).
    - Condition to stop the recursion is when the array size n ${\le}$ 1, it is because this input array is fully-sorted naturally at this time.

<br>
$\pmb {Lomuto \ 's \ Solution:}$

1. Select the final item as an initial pivot: ${p = A\(n)}$.

2. Indices: initialize ${i = 1}$.

3. Loop: for $j=1$ to $n$:
    - if $A(j) \le p,\$ swap $A(i)$ & $A(j)$, then increment $i \leftarrow i+1$.
    
    <i>Result: j always run faster than i, so that this swapping is to move the smaller items to the leftside of the imagined pivot. Hence, with the partition index is $(i+1)$, the array is divided as:</i>
    - ${A_{left} \(k\) \le p, \ \ \ \forall k = 1,2,...,i}$.
    - ${A_{right} \(k\) \gt p, \ \forall k = i+2,...,n-1}$.
    - The pivot ${\\{p \\}}$ at index $i+1$.<br><br>
5. Recursion: recusively apply quicksort to the two arrays:
    - Result ${\=}$ quicksort($A_{left}$) $\cup$ $\\{p\\}$ $\cup$ quicksort($A_{right}$).
    - Condition to stop the recursion is when the array size n ${\le}$ 1, it is because this input array is fully-sorted naturally at this time.

<br><br>
$\pmb {Time \ complexity:}$<br>

Call $T(n)$ to be the time complexity for sorting an array of size n. It represents the exact amount of time or number of operations that an algorithm takes with an input size n:<br>

- $T(n) =$ $T(k) + T(n-k-1) + O(n)$.
    <p><i>$k$: the number of elements in the left partition.
    <br>$n−k−1$: the elements in the right partition.
    <br>$O(n)$: the Big-O Notation corresponds to the <b>partitioning step</b> at input n, it focuses only on the most significant factor that dominates the growth as n increases <b>large</b>, ignoring constants.</i></p>

- <b>Best case & normal case:</b> the pivot split the array into two very similar parts, so: $k \simeq \frac{n}{2}$. This leads to:
    - $T(n) =$ $2T(\frac{n}{2}) + O(n)$.<br>
    <p><i>At the root (level 0), the cost is $O(n)$.<br>
    At level 1, there are 2 subarrays, size around $\frac{n}{2}$, the total cost is $2{\times}O(\frac{n}{2}) = O(n)$<br>
    
    At level k, there are $2^k$ subarrays, size around $\frac{n}{2^k}$, the total cost is $2^k{\times}O(\frac{n}{2^k}) = O(n)$</i></p>
    
    k will run until the level $\log_2 n$, so we have $T(n) = \log_2 n \times O(n) $.<br>
    Because $O(n)$ grows linearly with respect to n, $(f(n) = n, af(n) = an = f(an))$, then we have $T(n) = O(nlogn)$.<br>
  
- <b>Worst case:</b> when the partitioning is very unbalanced, $k \rightarrow 0$ or $k \rightarrow n-1$. This gives:
    - $T(n) =$ $T(n-1) + O(n)$.<br>
    
    k will run until the level n-1 $\simeq$ n at this time, this results in $T(n) = nO(n) = O(n^2)$.<br><br>

<i><b>REMARK:</b> Although the time complexity of the Hoare and Lomuto solutions look like the same, but the Lomuto partition index moves from the left to the right quite slowly, which could cause the partitioning to be unbalanced and easily to become a "worst case". This results in a higher number of swaps or a higher time complexity in the Lomuto solution compared to the Hoare solution, making Lomuto quicksort slightly more expensive.</i>
