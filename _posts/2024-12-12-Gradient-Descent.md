---
category: ai
loadingMathjax: true
---

**Gradient Descent** is an optimization algorithm used to minimize a function by iteratively moving in the direction of *steepest descent* as defined by the negative of the gradient. It's the core key to train a model in Machine Learning.

1. Objective:
    Minimize a function $f(x)$, where $x \in \mathbb R^{n}$ is a vector of parameters. The function $f(x)$ could represent the error or cost function in machine learning.

2. Gradient:
    The gradient of f with respect to x is denoted by:

    $$\Delta f(x) = \Bigr[\frac{\partial f}{\partial x_{1}}, \frac{\partial f}{\partial x_{2}},.. ,\frac{\partial f}{\partial x_{n}}  \Bigr]$$

    $\Delta f(x)$ is a vector that points in the direction of the greatest increase of $f$ (direction where $f$ increases most rapidly).

3. Update Rule:
    To minimize $f(x)$, we move in the direction opposite to the gradient:

    $$x^{t+1} = x^{t} - \alpha \cdot \Delta f(x^{t})$$

    Where:
    - $x^{t}$ is the parameter vector at iteration t,
    - $\alpha > 0$ is the learning rate, which controls the step size,
    - $\Delta f(x^{t})$ is the gradient of $f$ at $x^{t}$, denoting how $f(x)$ changes with respect to $x$.

    Explanation : At each iteration, compute the $\Delta f(x^{t})$, update $x^{t+1}$, repeat until convergence *(e.g. when the gradient magnitude is close to zero OR the change of $f(x)$ is smallest)*.

    <div style="width: 90%; text-align: center;">
      <img class="ai-images small" src="https://repository-images.githubusercontent.com/278349549/06574480-c20c-11ea-9079-277c37d7f8cd" alt="Gradient Descent" />
      <h5>Figure 1: Gradient Descent</h5>
    </div>

4. **Convergence Conditions**:
    Gradient descent converges to a local minimum if:
    
    - The learning rate $\alpha$ is set properly (neither too large nor too small).

    - Smoothness (Êm): $\Delta f(x)$ > 0 exists everywhere and should not change too abruptly.
    
    - Convexity (Cong): The Hessian matrix H (matrix of second derivatives) must have all eigenvalues > 0. To be simple, we all learnt at school:

    $$f(x) \ has \ a \ minimum \ at \ x^{*} \ if 
    \begin{cases}
        f'(x^{*}) \ \ \ = 0 \\
        f"(x^{*}) > 0
    \end{cases}
    $$

    - Poor initialization of $x_{0}$ can require many iterations to reach the minimum.

    <br><br>
5. **Variants** (not yet):
    
    1. Stochastic Gradient Descent (SGD): Uses a single or small batch of data to estimate the gradient, introducing randomness.

    2. Mini-Batch Gradient Descent: Combines the benefits of full-batch and stochastic methods by using small batches.

    3. Momentum, Adam, RMSProp: Modifications of gradient descent that adjust the learning rate or use momentum to accelerate convergence.

