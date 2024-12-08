---
category: ai
loadingMathjax: true
---

In AI and Machine Learning, distributions are often used to model binary outcomes (e.g., success/failure, yes/no, true/false).

1. **Bernoulli Distribution :** a single random variable $X$ that can take one of two possible outcomes:
    - $X = 1$ with probability $p$ (success)
    - $X = 0$ with probability $1-p$ (failure)
    - Mathematically, the "probability mass function" is:

    $$P(X=x) = p^{x} \cdot (1-p)^{1-x} \ \ with \ x \in \bigl\{ 0,1 \bigl\}$$

    With characteristics:
    - a. Mean (expected values): The mean of a Bernoulli random variable X is the probability of success
    
    $$\ \mathbb E[X] = \sum_{x \in \bigl\{ 0,1 \bigl\}} x \cdot P(x)$$

    $$\to \ \ \mathbb E[X] = 0 \cdot (1-p) + 1 \cdot p = p$$

    - b. Variance: The variance measures the spread of the distribution

    $$\ Var(X) = \mathbb E[(X- \mathbb E[X])^{2}] = \mathbb E[X^{2}] - (\mathbb E[X])^{2}$$

    With $\ X^{2} = X \ so \ \mathbb E[X^{2}] = \mathbb E[X] = p$

    $$\to Var(X) = p - p^{2} = p (1-p)$$