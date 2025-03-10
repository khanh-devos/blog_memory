---
category: ai
loadingMathjax: true
---

A. **VECTORS**: 
- A vector is a mathematical object that represents a quantity with both magnitude and direction

1. **Magnitude $\Vert v \Vert$** : a length or size of vector, given a vector $\vec{v}$ = [$v_{1}$, $v_{2}$,... , $v_{n}$], we have:

    $\Vert v \Vert$ = $\sqrt {v_{1}^{2} + v_{2}^{2} ... + v_{n}^{2}}$

2. **Direction** : The relative orientation of a vector in space.

3. **Dot Product (Inner Product = IP)** : an operation that combines two vectors to yield a scalar.
    - For 2 vectors $\vec{u}$ = [$u_{1}$, $u_{2}$,... , $u_{n}$] and $\vec{v}$ = [$v_{1}$, $v_{2}$,... , $v_{n}$]:

    $$\vec{u} \cdot \vec{v} = \sum_{i=1}^{n} {u_{i} \cdot v_{i}} = IP$$
    
    - The dot product is used to measure the angle between vectors, if *dot product = 0*, then 2 vectors are *perpendicular* and their angle is $90^{o}$ or $270^{o}$.
    - In numpy, np.dot($\vec{u}$, $\vec{v}$)
    - **Magnitude $\Vert v \Vert$** = $\sqrt{IP \ of \ itself}$ = $\sqrt{\vec{v} \cdot \vec{v}}$.

    - **Extention 1** : If we consider two vectors as 1-D matrices, the inner product looks like matrix multiplication. However, when using np.dot() with matrices, the result is another matrix rather than a scalar.

    - **Extension 2** : IP can be used to calculate the angle $\alpha$ between 2 vectors:
    
    $$ cos(\alpha) = \frac{IP}{\Vert u \Vert \cdot \Vert v \Vert} $$ 

    - **Extention 3** : Length $Pro^{u}_{v}$ of projection(Hình chiếu) of vector $\vec{u}$ on vector $\vec{v}$:

    $$ Pro^{u}_{v} = cos(\alpha) \cdot \Vert u \Vert = \frac{IP}{\Vert v \Vert} $$ 

4. **Softmax**: a function used to transform a vector into another vector, which has the sum of all elements is 1, making it like a probability distribution. The formula for softmax for a vector $\vec{z}$ = [$z_{1}$, $z_{2}$,... , $z_{n}$]:

    $$softmax(z_{i}) = \frac{e^{z_{i}}}{\sum_{j=1}^{n} {e^{z_{j}}}}$$

    - For example : z = [2, 1, 0.1]<br>
    Calculate $e^{z_{i}}$ :  $e^{2}$ = 7.39, $e^{1}$ = 2.72, $e^{0.1}$ = 1.11<br>
    
    Sum: 7.39 + 2.72 + 1.11 = 11.22<br>
    
    softmax($z_{1}$) = 7.39/11.22 = 0.66<br>
    softmax($z_{2}$) = 7.39/11.22 = 0.24<br>
    softmax($z_{3}$) = 7.39/11.22 = 0.10<br>
    
    After softmax(z) = [0.66, 0.24, 0.10], with the sum = 1.
    <br><br>

B. **VECTOR SPACE $\mathbb R^{n}$** : 
- A vector space (also a linear space, **ko gian tuyến tính**) is a collection of objects called vectors.
- $\mathbb{R^{n}}$ is a symbol of a vector space of n-dimentional vectors that must be linear independent. And $n$ is called *space dimension*.

- FIVE typical features of **Vector Addition**:

    1. Closed (kín): $\vec{s}$ = $\vec{u}$ + $\vec{v}$ <br>
    if 2 vectors $\vec{u}$ & $\vec{v}$ belongs to the vector space $\mathbb{R}$, their sum vector $\vec{s}$ must lie in the vector space  $\mathbb{R}$.
    2. Commutative (giao hoán): $\vec{u}$ + $\vec{v}$ = $\vec{v}$ + $\vec{u}$
    3. Associative (kết hợp): ($\vec{u}$ + $\vec{v}$) + $\vec{w}$  = $\vec{u}$ + ($\vec{v}$ + $\vec{w}$)
    4. Existence of Additive Identity vector $\vec{0}$ to have $\vec{u}$ + $\vec{0}$ = $\vec{u}$
    5. Existence of Additive Inverses vector $\vec{x}$ to have $\vec{u}$ + $\vec{x}$ = $\vec{0}$, so $\vec{x}$ = $\vec{-u}$
    <br><br>

- FIVE typical features of **Scalar Multiplication**:

    1. Closed (kín): $\vec{s}$ = $c \cdot \vec{u}$<br>
    if vector $\vec{u}$ belongs to the vector space  $\mathbb{R}$, the scaled vector $\vec{s}$ must also lie in the vector space  $\mathbb{R}$.
    2. Commutative with scalar (giao hoán với hệ số) : $\vec{u} \cdot c$ = $c \cdot \vec{u}$
    3. Associative with scalar (kết hợp với hệ số) : $a \cdot (b \cdot \vec{u})$ = $(b \cdot a) \cdot \vec{u}$
    4. Distributive over Vector Addition (phân phối với hệ số) : $c\cdot$($\vec{u}$ + $\vec{v}$) = $c \cdot \vec{u}$ + $c \cdot \vec{v}$
    5. Distributive over Scalar Addition (phân phối với vectơ) : $(a + b) \cdot \vec{u}$ = $a \cdot \vec{u}$ + $b \cdot \vec{u}$
<br><br>


    

    

