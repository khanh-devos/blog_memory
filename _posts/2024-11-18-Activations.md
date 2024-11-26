---
category: ai
loadingMathjax: true
---

In artificial intelligence (AI), activation refers to the process of introducing "non-linear transformations" (***Ánh xạ phi tuyến***) to the outputs of a neuron in a neural network. These transformations are defined by activation functions.

**Why?**: Activation functions can "normalize" outputs (e.g., squashing(***nén ép***) values between 0 and 1 or -1 to 1), which helps during optimization and makes interpretation more intuitive(***trực quan***), such as in probability outputs for classification.

There are 4 types of Activation Functions: Sigmoid, Tanh, ReLU, Softmax.

1. **Sigmoid**: output between 0, 1, often used in classification

    $$\sigma(x) = \frac{1}{1 + e^{-x}}$$

    <br>
    <div style="width: 100%; text-align: center;">
        <img width="400px" src="{{ './assets/images/sigmoid.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 1: Sigmoid</h5>
    </div>

2. **Tanh**: output between -1 to 1, centered around 0. It is better for input datas that are complicated with both negative and positive information like "words data".

    $$\tanh(x) = \frac{e^{x} - e^{-x}}{e^{x} + e^{-x}}$$

    <br>
    <div style="width: 100%; text-align: center;">
        <img width="400px" src="{{ './assets/images/tanh.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 2: Tanh</h5>
    </div>

3. **ReLU** (Rectified Linear Unit): Introduces sparsity (sự thưa thớt) and avoids vanishing gradients.
    
    $$f(x) = max(0, x)$$

    <br>
    <div style="width: 100%; text-align: center;">
        <img width="300px" src="{{ './assets/images/relu.png' | relative_url }}" alt="First transformer version" />
        <h5>Figure 2: Tanh</h5>
    </div>

    - Explaination of ***"vanishing gradient"*** : Based on the learning equation $W = W - lr \cdot dW$. Because the gradient $dW$ of $Sigmoid$ and $Tanh$ is very small when x is far greater than 0, so that the back propagarion(sự lan truyền) through the layers of neurons will become slower. In contrast, with $ReLU$ $dW$ is always 1 with x > 0, this will accelerate the backward propagation or the learning. However, $ReLU$ still has a probelm when x $\le$ 0, where $dW$ = 0. This is called ***"dying ReLU problem"***. 

4. **Softmax**: Converts logits to probabilities for multi-class classification,
    given a vector $\vec{z}$ = [$z_{1}$, $z_{2}$,... , $z_{n}$]:

    $$softmax(z_{i}) = \frac{e^{z_{i}}}{\sum_{j=1}^{n} {e^{z_{j}}}} = s_{i}$$

    after applying softmax, we have $\vec{z}$ = [$s_{1}$, $s_{2}$,... , $s_{n}$] with:

    $$ \sum_{i=1}^{n} {s_{i}} = 1 $$
