---
category: ai
loadingMathjax: true
---

**Matrixes** are fundamental in AI, especially in machine learning and deep learning, as they provide a key foundation for creating **tensors**, which is widely used to represent **vast multi-dimensional data**. Most tensor computations are based on matrix operations, so understanding of matrixes is essential for buildind or fine tuning AI models.

1. **Matrix in programming:**
    - Below is a matrix $A$ with $m$ rows and $n$ columns.

    $$ A_{m\times n} = \begin{bmatrix} a_{11} & a_{12} & \dots & a_{1n} \\ 
                        a_{21} & a_{22} & \dots & a_{2n} \\
                        \vdots & \vdots & \vdots & \vdots \\
                        a_{m1} & a_{m2} & \dots & a_{mn} \end{bmatrix} $$

    - If $m = n$, $A$ is a **square matrix**, which has only one **principal diagonal** ($[a_{11}, a_{22}, ..., a_{nn}]$).

    - In programming, matrix is two-dimentional 2D array $[[a_{11}, \\ a_{12}], [a_{21}, \\ a_{22}]]$.

    - In math of linear algebra (**Đại số tuyến tính**) : matrix is used in *set of linear equations (hệ pt tuyến tính)*  :

        $$
        \begin{cases}
            a_{11}x_{1} + a_{12}x_{2} = y_{1}\\ 
            a_{21}x_{1} + a_{22}x_{2} = y_{2}\\
        \end{cases}
        $$
        $ \ \sim \ $ 
        $$
        \begin{bmatrix} 
            a_{11} & a_{12}  \\ 
            a_{21} & a_{22} \\
        \end{bmatrix}
        \times
        \begin{bmatrix} 
            x_{1}\\ 
            x_{2}\\
        \end{bmatrix}
        = 
        \begin{bmatrix} 
            y_{1}\\ 
            y_{2}\\
        \end{bmatrix}
        $$



2. **Vector space ($\mathbb{R^{n}}$) vs Matrix**:
    - A vector space (also a linear space, **ko gian tuyến tính**) is a collection of objects called vectors.
    - $\mathbb{R^{n}}$ is a symbol of a vector space of n-dimentional vectors that must be linear independent. And $n$ is called *space dimension*
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

    - **Matrix in vector space**: a matrix represents a transformation between vector spaces, a kind of a bridge or mapping between vector spaces. This means a matrix can help "move" a vector in one vector   space to another vector space. For example, vector $\vec{X}$ in vector space $R_{x}$ is transformed to another vector space $R_{y}$ by matrix $A_{2 \times 2}$. This is a key concept in neuron network to build a bridge (model).

        $$ A \cdot \vec{X} = \vec{Y} $$

<br><br>

2. **Tensor ($T$) vs Matrix :**
    - Tensor is a data structure used mainly in tensorflow or Pytorch:

        - Tensor rank 1 with only 1 element = scalar: torch.tensor([[2]])
        - Tensor rank 1 with over 2 elements = vector:  torch.tensor([[1, 2]])
        - Tensor rank 2 = 2D matrix: torch.tensor([[1, 2], [2, 3]]).float()
        - Tensor rank 3 = 3D matrix: torch.tensor([[0, 0, 1], [0, 1, 0], [1, 0, 0]]).float()
        - Tensor rank n = nD matrix: used to represent for vast multi-dim data.





2. **Identity matrix ($I$) :** is a square matrix where all items on **principal diagonal** are 1, other items are zeros.

    - import torch<br>
    $I$ = torch.eye(3)<br>
    print($I$)<br>

    $$ I_{3\times 3} = I_{3} = \begin{bmatrix} 1 & 0 & 0 \\ 
                                       0 & 1 & 0 \\
                                       0 & 0 & 1 \end{bmatrix} $$


3. **Transpose ($A^{T}$) :** is a matrix created by flipping a matrix A over its diagonal (rows become columns).
    
    - A = torch.tensor([[1, 2], [3, 4]]).float()<br>
    A_T = A.T <i class="grey-font"># [[1., 3.], [2., 4.]]</i>


4. **Matrix Multiplication ($AB$)**: row(A) x column(B)
    
    $$ \begin{bmatrix} a_{11} & a_{12} \\ 
                                       a_{21} & a_{22} \end{bmatrix}
    \times
    \begin{bmatrix} b_{11} & b_{12} \\ 
                                       b_{21} & b_{22} \end{bmatrix}
    =                             
    \begin{bmatrix} a_{11}b_{11} + a_{12}b_{21} & a_{11}b_{12} + a_{12}b_{22} \\ 
                    a_{21}b_{11} + a_{22}b_{21} & a_{21}b_{12} + a_{22}b_{22} \end{bmatrix} $$
                                       

    
    - A = torch.tensor([[1, 2], [0, 1]]).float()<br>
    B = torch.tensor([[1, 3], [0, 2]]).float()<br>
    AB = torch.matmul(A, B)  <i class="grey-font"># tensor([[1., 7.], [0., 2.]])</i>

5. **Determinant ($det$)**: only for square matrices:
    
    $$ A_{2\times 2} = \begin{bmatrix} a & b\\ 
                                       c & d \end{bmatrix} $$

    - det($A$) = $ad - bc$
    - matrix = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)<br>
    det$A$ = torch.det(matrix) <i class="grey-font"># output is "-2"</i>
    <br><br>


6. **Matrix Inverse ($A^{-1}$) :** 
    - If det($A$) $\neq 0$, $A$ should has an inverse matrix $A^{-1}$, then multiplying a matrix by its inverse results in an identity matrix ($A \times A^{-1} = I$).
    - A = torch.tensor([[4, 7], [2, 6]]).float()<br>
    A_inv = torch.inverse($A$)<br>
    AB = torch.matmul(A, A_inv) <i class="grey-font"># output is $I_{2}$</i>
    <br><br>

7. **Trace ($Tr(A)$) :** sum of the elements along main diagonal of a square matrix or along the first main diagonal of a rectangular matrix.
    - matrix = torch.tensor([[1, 2, 4], [3, 4, 1]], dtype=torch.float32)
    - torch.trace(matrix)  <i class="grey-font"># tensor(5.)</i>

8. **Rank ($rank(A)$) :** The minimum number of **linearly independent** (độc lập tuyến tính) rows or columns (if rows are multiples of each other, they are not linearly independent).
    - A = torch.tensor([[1, 2], [2, 4], [2, 1], [0, 3], [3, 5]]).float()<br>
    rank_A = torch.linalg.matrix_rank(A)  <i class="grey-font"># 2</i> 

9. **Singular Matrix** (Ma trận đơn):

    - A matrix includes only **linearly dependent** rows. **(phụ thuộc tuyến tính)**, rows are multiples of each other. 
    - Determinant of singular matrix is always zero.<br><br>

10. **Eigenvectors ($\nu$) :** Vectors that are stretched by a matrix without changing direction.<br> 
    **Eigenvalues ($\lambda$) :** are scalar values or amount the eigenvectors are scaled by the matrix.
    - $A \nu$ = $\lambda \nu$<br>
    Rearrange the equation: $(A - \lambda I) \nu$ = 0<br>
    To have non-zero eigenvectors $\nu \neq 0$, so det(A - $\lambda I$) = 0
    <br><br>
    - A = torch.tensor([[3, 0], [0, 2]]).float()<br>
    $\lambda$, $\nu$ = torch.linalg.eig(A)<br>
    print($\lambda$) <i class="grey-font"># tensor([3.+0.j, 2.+0.j])</i> <br>
    print($\nu$) <i class="grey-font"># [[1.+0.j, 0.+0.j], [0.+0.j, 1.+0.j]]</i>
    - Complex number : = a + bi with $i^{2}$ = -1 (not mentioned here).


- Ma trận chéo là ma trận mà các phần tử khác 0 chỉ nằm trên đường chéo chính. Trường hợp đặc biệt, nếu cả đường chéo chính chỉ gồm các số 1 thì đó gọi là ma trận đơn vị (**identity** or **unit** matrix).

- Cách tạo ma trận chuyển vị $$ A^T $$: Đem cột rải thành hàng

- Ma trận đối xứng (**symmetric matrix**) khi $$ A = A^T $$, phản đối xứng (**skew symmetric matrix**) khi $$ A = -A^T $$

- Hai ma trận bằng nhau khi chúng có cùng shape, các cặp phần tử tương ứng đều bằng nhau.

- Nhân vô hướng (multiplication by a scalar) một số với ma trận: nhân số đó với từng phần tử trong ma trận

- Cộng ma trận (phải cùng shape): các cặp phần tử tương ứng cộng nhau
    - Tính chất giao hoán (commulative) $$ A+B=B+A $$
    - Tính chất kết hợp (associative) $$ (A+B)+C=A+(B+C) $$
    - Tính chất phân phối (distributive): $$ \lambda(A+B)=\lambda A+\lambda B $$
- Nhân ma trận `a[m][n]` với `b[n][k]`, tạo ra ma trận `c[m][k]`:

```python
    for i in range(m):
        for j in range(k):
            for x in range(n):
                c[i][j] += a[i][x] * b[x][j]
```

- Tính chất nhân ma trận:
    - Phản giao hoán: $$ AB\neq BA $$
    - Tính chất kết hợp: $$ (AB)C=A(BC) $$
    - Nếu $$ \lambda $$ là số, thì: $$ (\lambda A)B = A(\lambda B) = \lambda(AB) $$
    - Tính chất phân phối với phép cộng: $$ (A+B)C=AC+BC $$ và $$ A(B+C)=AB+AC $$
- Tính chất của ma trận chuyển vị:
    - $$ (A+B)^T=A^T+B^T $$
    - $$ (A^T)^T = A $$
    - $$ (AB)^T=B^TA^T $$

Định thức (determinant) của ma trận vuông bậc $$n$$ $$A$$ được định nghĩa đệ quy như sau:

- Nếu ma trận chỉ có một phần tử, $$\|A\| = a_{11}$$
- Ngược lại, $$ \|A\|=\sum_{j=1}^{n}(-1)^{i+j}a_{ij}M_{ij} $$ (với $$i$$ bất kì), trong đó $$M_{ij}$$ là định thức của ma trận vuông còn lại sau khi bỏ hàng $$i$$ cột $$j$$.

Khái niệm:

- $$M_{ij}$$ được gọi là minor của phần tử $$i,j$$
- $$(-1)^{i+j}M_{ij}$$ được gọi là cofactor của phần tử $$i,j$$

Tính chất của định thức:

- Nếu matrix có hai hàng (cột) bằng nhau thì det bằng 0.
- Nếu một hàng (cột) của matrix cùng chia hết cho một số $$\lambda$$ thì có thể tách nhân tử $$\lambda$$ ra ngoài matrix, tính det của matrix mới, rồi nhân với $$\lambda$$ để có được det của matrix ban đầu.
- Tráo đổi hai hàng (cột) của matrix làm đổi dấu det.

$$ \begin{vmatrix} a_{11}+b_{11} & a_{12}+b_{12}\\ a_{21} & a_{22} \end{vmatrix}=\begin{vmatrix} a_{11} & a_{12}\\ a_{21} & a_{22} \end{vmatrix}+\begin{vmatrix} b_{11} & b_{12} \\ a_{21} & a_{22} \end{vmatrix} $$

- $$\|A^T\|=\|A\|$$
- $$\|AB\|=\|A\|B\|$$

Ma trận liên hợp (**adjoint matrix**) là ma trận chuyển vị của ma trận các cofactor của một ma trận vuông.

- $$A(\textrm{adj}\ A) = \|A\|I$$
- $$\|\textrm{adj}\ A\|=\|A\|^{n-1}$$, với $$n$$ là bậc của ma trận
- $$\textrm{adj}\ AB=(\textrm{adj}\ B)(\textrm{adj}\ A)$$

Ma trận nghịch đảo:

- $$ A^{-1}A=AA^{-1}=I $$
- Nếu det của **A** khác 0: $$ A^{-1}=(\textrm{adj}\ A)^T/\|A\| $$, ngược lại thì nghịch đảo của **A** không tồn tại
- $$ (AB)^{-1}=B^{-1}A^{-1} $$